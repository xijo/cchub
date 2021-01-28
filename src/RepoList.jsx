import React from 'react'
import {store} from './Store'
import {useStore} from './useStore'

const Times = () => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="inline-block w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
const Bell = () => <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bell-slash" class="inline-block w-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M633.99 471.02L36 3.51C29.1-2.01 19.03-.9 13.51 6l-10 12.49C-2.02 25.39-.9 35.46 6 40.98l598 467.51c6.9 5.52 16.96 4.4 22.49-2.49l10-12.49c5.52-6.9 4.41-16.97-2.5-22.49zM163.53 368c16.71-22.03 34.48-55.8 41.4-110.58l-45.47-35.55c-3.27 90.73-36.47 120.68-54.84 140.42-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h279.66l-61.4-48H163.53zM320 96c61.86 0 112 50.14 112 112 0 .2-.06.38-.06.58.02 16.84 1.16 31.77 2.79 45.73l59.53 46.54c-8.31-22.13-14.34-51.49-14.34-92.85 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84c-26.02 5.41-49.45 16.94-69.13 32.72l38.17 29.84C275 103.18 296.65 96 320 96zm0 416c35.32 0 63.97-28.65 63.97-64H256.03c0 35.35 28.65 64 63.97 64z"></path></svg>
const Bullhorn = () => <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullhorn" class="inline-block w-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path></svg>

export const RepoList = () => {
  const [repoIds, setRepoIds] = useStore('repo_ids')
  const [silencedIds, setSilencedIds] = useStore('silenced_ids')

  const removeRepo = (i) => {
    const newRepoIds = Array.from(repoIds)
    newRepoIds.splice(i, 1)
    setRepoIds(newRepoIds)
  }

  const toggleSilence = (repoId) => {
    if (silencedIds.includes(repoId)) {
      let newSilencedIds = Array.from(silencedIds)
      newSilencedIds.splice(repoId, 1)
      setSilencedIds(newSilencedIds)
    } else {
      const newSilencedIds = [...silencedIds, repoId]
      setSilencedIds(newSilencedIds)
    }
  }

  return <div>
    {repoIds.map((repoId, i) => <div className={`flex items-start justif-between mb-1 ${silencedIds.includes(repoId) ? 'text-gray-300' : ''}`} key={repoId}>
      <button type="button" className='mr-2 inline-block' onClick={() => removeRepo(i)}><Times /></button>
      <button type="button" className='mr-2 inline-block' onClick={() => toggleSilence(repoId)}><Bullhorn /></button>
      <span>{repoId}</span>
    </div>)}
  </div>
}
