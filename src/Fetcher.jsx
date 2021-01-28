import React, {useEffect, useState} from 'react'
import {useInterval, useBoolean} from 'react-use'
import {store} from './Store'
import {useStore} from './useStore'
import dateMin from 'date-fns/min'
import dateMax from 'date-fns/max'
import formatDistance from 'date-fns/formatDistance'

import {Octokit} from '@octokit/rest'
import {retry} from "@octokit/plugin-retry"
import {throttling} from "@octokit/plugin-throttling"

export const Fetcher = (props) => {
  const [interval, _] = useStore('interval')
  const [repoIds, setRepoIds] = useStore('repo_ids')

  const octokit = new Octokit({
    auth: `token ${store.get('github_token')}`,
    throttle: {
      onRateLimit: (retryAfter, options) => {
        myOctokit.log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`
        );

        if (options.request.retryCount === 0) {
          // only retries once
          myOctokit.log.info(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onAbuseLimit: (retryAfter, options) => {
        // does not retry, only logs a warning
        myOctokit.log.warn(
          `Abuse detected for request ${options.method} ${options.url}`
        );
      },
    },
    retry: {
      doNotRetry: ["429"],
    },
    log: {
      debug: () => { },
      info: () => { },
      warn: console.warn,
      error: console.error
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
        const repoDetails = await octokit.repos.get({owner, repo})
        const ref = repoDetails.data.default_branch

        console.log(await octokit.repos.getCommit({owner,repo,ref}))


        const commitStatus = (await octokit.repos.getCombinedStatusForRef({owner, repo, ref})).data
        const createdAt = dateMax((commitStatus.statuses || []).map(v => new Date(v.created_at)))
        return { repoId, createdAt, ...commitStatus }
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
