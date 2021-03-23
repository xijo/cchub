import React, {useEffect, useState} from 'react'
import {useInterval, useBoolean} from 'react-use'
import {store} from './Store'
import {useStore} from './useStore'
import dateMin from 'date-fns/min'
import dateMax from 'date-fns/max'
import formatDistance from 'date-fns/formatDistance'

import {graphql} from '@octokit/graphql'

export const Fetcher = (props) => {
  const [interval, _] = useStore('interval')
  const [repoIds, setRepoIds] = useStore('repo_ids')

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${store.get('github_token')}`,
    },
  })

  useEffect(() => {
    store.onDidAnyChange(fetchData)
  }, [])

  const [loading, setLoading] = useState(false)
  const [lastFetch, setLastFetch] = useState(new Date())

  const fetchData = async () => {
    setLoading(true)
    const newDetails = await Promise.all(repoIds.map(async (repoId) => {
      try {
        const [owner, repo] = repoId.split('/')

        const { repository } = await graphqlWithAuth(
          `query {
            repository(owner: "${owner}", name: "${repo}") {
              url
              defaultBranchRef {
                target {
                  ... on Commit {
                    url
                    status {
                      contexts {
                        id
                        avatarUrl
                        context
                        createdAt
                        state
                        targetUrl
                      }
                    }
                    statusCheckRollup {
                      state
                      contexts(first: 20) {
                        edges {
                          node {
                            ... on CheckRun {
                              id
                              name
                              completedAt
                              conclusion
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
        )

        const commit = repository.defaultBranchRef?.target
        
        // break if there is no commit or the commit has no status
        if (!commit?.statusCheckRollup) return { repoId, statuses: [] }

        const statuses = [
          // status checks such as github workflows/actions, linter integrations etc.
          // currently includes classic commit statuses as empty nodes - hopefully
          // it will contain all data at some point.
          ...commit.statusCheckRollup.contexts.edges.map(e => e.node).filter(e => e.id),
          // classic commit status flags. fetching these too might become obsolete.
          // let's unify their data model with that of checks until then.
          ...(commit.status?.contexts || []).map(e => ({
            avatarUrl:   e.avatarUrl,
            completedAt: e.createdAt,
            conclusion:  e.state,
            id:          e.id,
            name:        e.context,
            url:         e.targetUrl,
          })),
        ]
        statuses.forEach(s => s.conclusion = simplifiedState(s.conclusion))

        const createdAt = dateMax(statuses.map(v => new Date(v.completedAt)))
        
        // github helpfully provides a combined state that covers checks AND status.
        const state = simplifiedState(commit.statusCheckRollup.state)

        return { commitUrl: commit.url, repoId, createdAt, state, statuses }
      }
      catch (err) {
        return { repoId, errorName: err.name, errorMessage: err.message }
      }
    }))
    props.setDetails(newDetails)
    setLastFetch(new Date())
    setTimeout(() => setLoading(false), 1000)
  }

  useEffect(fetchData, [repoIds])
  useInterval(fetchData, interval)

  return loading ?
    <div className='absolute bottom-0 left-0 text-gray-300 m-2 blinking'><LoadingIcon /></div> :
    <div className='absolute bottom-0 left-0 text-gray-300 m-2 text-xs'>last fetch {formatDistance(lastFetch, new Date())} ago</div>
}

const LoadingIcon = () => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>

// map various github StatusState / CheckConclusionState values to a smaller set
const simplifiedState = (githubState) =>
({
  ACTION_REQUIRED:    'failure',
  CANCELLED:          'failure',
  ERROR:              'failure',
  EXPECTED:           'success',
  FAILURE:            'failure',
  NEUTRAL:            'pending',
  PENDING:            'pending',
  SKIPPED:            'pending',
  STALE:              'failure',
  STARTUP_FAILURE:    'failure',
  SUCCESS:            'success',
  TIMED_OUT:          'failure',
}[String(githubState).toUpperCase()])