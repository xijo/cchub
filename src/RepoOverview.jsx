import React, {useEffect} from 'react'
import {usePreviousDistinct} from 'react-use'
import formatDistance from 'date-fns/formatDistance'
import isValid from 'date-fns/isValid'
import {ipcRenderer} from 'electron'

const colors = {
  pending: 'bg-gray-500',
  success: 'bg-green-500',
  failure: 'bg-red-500',
}

export const RepoOverview = (props) => {
  const previousState = usePreviousDistinct(props.state)

  let stateColor = colors[props.state]

  const building = (previousState && props.state === 'pending')
  if (building) stateColor = colors[previousState]

  useEffect(() => {
    ipcRenderer.send('notify-state', [props.repoId, props.state])
  }, [props.state])

  return <li className={`flex items-start p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-200 ${props.active ? 'bg-gray-200' : ''}`} onClick={props.onClick}>
    <div className={`mr-2 mt-0.5 h-3 w-3 ${stateColor} ${building ? 'blinking' : ''} rounded-full`} />
    <div>
      <code className='text-xs block'>{props.repoId}</code>

      {props.errorMessage && <div className='text-xs text-red-700 mt-2'>{props.errorMessage}</div>}

      {props.statuses?.length > 0 && <div className='text-xs text-gray-700 mt-2'>{isValid(props.createdAt) ? formatDistance(props.createdAt, new Date()) : '¯\_(ツ)_/¯'} ago</div>}

      {props.statuses?.length === 0 && <div className='text-xs text-gray-700 mt-2'>No commit status found</div>}
    </div>
  </li>
}
