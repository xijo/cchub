import Store from 'electron-store'

export const store = new Store({
  schema: {
    silenced_ids: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    repo_ids: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    github_token: {
      type: 'string'
    },
    interval: {
      type: 'integer'
    }
  }
})

if (typeof(store.get('silenced_ids')) !== 'object') {
  store.set('silenced_ids', [])
}

if (typeof(store.get('repo_ids')) !== 'object') {
  store.set('repo_ids', [])
}

if (!store.get('interval')) {
  store.set('interval', 60000)
}
