import React, {useEffect} from 'react'
import {ipcRenderer} from 'electron'

const switchIcon = (icon) => {
  ipcRenderer.send('switch-icon', icon)
}

export const StateWatcher = (props) => {
  useEffect(() => {
    const fail = props.repos.find(repo => repo.state !== 'success')
    if (fail) {
      switchIcon(`icon-${fail.state}`)
    } else {
      switchIcon(`icon-success`)
    }
  }, [props.repos])

  return null
}
