import React, {useEffect, useState} from 'react'
import {shell} from 'electron'
import {store} from './Store'
import {useStore} from './useStore'
import {RepoList} from './RepoList'

export const Settings = () => {
  return <div className='p-2'>
    <h1 className='text-2xl font-bold mb-2'>Settings</h1>
    <h2 className='text-lg font-bold mb-2'>Github Token</h2>
    <TokenForm />
    <h2 className='text-lg font-bold mb-2'>Repos</h2>
    <RepoList />
    <RepoForm />
    <h2 className='text-lg font-bold mb-2'>Credits</h2>
    <Credits />
  </div>
}

const TokenForm = () => {
  const [currentToken, setCurrentToken] = useStore('github_token')
  const [token, setToken] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    setCurrentToken(token)
    event.target.reset()
  }

  return <form onSubmit={handleSubmit}>
    <div style={{marginBottom: 15}}>
      {!currentToken && <div className='p-2 bg-yellow-500 rounded text-white'>
        <div style={{marginBottom: 5}}>
          <div className='text-center text-lg font-bold mb-2'>
            Action required <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="inline-block w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
          </div>

          cchub needs a github personal access token to retrieve information from github. Please generate a token and select <code className='text-sm'>repo:status</code> as scope at:
        </div>
        <a onClick={() => shell.openExternal('https://github.com/settings/tokens')} className="underline">https://github.com/settings/tokens</a>
      </div>}

      {currentToken && <div className='p-2 bg-green-500 rounded text-white'>
        <div className='text-center text-lg font-bold mb-2'>
          A-Okay <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="w-4 inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path> </svg>
        </div>
        <div className='mb-2'>
          Your github token is set, its last 4 chars are <code className='text-sm'>...{currentToken.substr(currentToken.length - 4)}</code>.
        </div>
        <div>
          Generate new token at <a onClick={() => shell.openExternal('https://github.com/settings/tokens')} className="underline">https://github.com/settings/tokens</a>
        </div>
      </div>}
    </div>

    <div className="flex mb-2">
      <Input type="text" placeholder="Github Token" onChange={ev => setToken(ev.target.value)} />
      <Button type="submit" className="btn btn-form btn-primary">Save</Button>
    </div>
  </form>
}

const Button = ({children, ...props}) => {
  return <button {...props} className="hover:bg-gray-200 hover:text-gray-800 flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-2 py-2 cursor-pointer">{children}</button>
}

const Input = (props) => {
  return <input class="focus:ring-1 focus:ring-blue-200 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2 mr-2" {...props} />
}

const RepoForm = () => {
  const [repoId, setRepoId] = useState()
  const [repoIds, setRepoIds] = useStore('repo_ids')

  const handleSubmit = (event) => {
    event.preventDefault()
    setRepoIds([repoId, ...repoIds].sort())
    event.target.reset()
  }

  // TODO doppelt
  // TODO empty
  // TODO bad format

  return <form onSubmit={handleSubmit}>
    <div className="flex mb-2">
      <Input type="text" placeholder="user/repo" onChange={ev => setRepoId(ev.target.value)} />
      <Button type="submit" className="btn btn-form btn-primary">Add</Button>
    </div>
  </form>
}

const Credits = () => {
  return <div>
    <div className='mb-1'>
      Build for the betterplace.org dev team! Thanks for those great and nerdy years with all of you! <span style={{color: 'rgb(158,203,10)'}}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className='h-4 w-4 inline' data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
      </span>
    </div>

    <hr/>

    <div className='text-sm mt-1'>
      Icons by fontawesome <code className='text-xs'>https://fontawesome.com</code>
    </div>
  </div>
}
