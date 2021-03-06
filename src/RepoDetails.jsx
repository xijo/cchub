import React from 'react'
import {shell} from 'electron'

const githubLogo = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyQTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyQjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTI4OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTI5OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m4QGuQAAAyRJREFUeNrEl21ojWEYx895TDPbMNlBK46IUiNmPvHBSUjaqc0H8pF5+aDUKPEBqU2NhRQpX5Rv5jWlDIWlMCv7MMSWsWwmb3tpXub4XXWdPHvc9/Gc41nu+nedc7/8r/99PffLdYdDPsvkwsgkTBwsA/PADJCnzX2gHTwBt8Hl7p537/3whn04XoDZDcpBlk+9P8AFcAghzRkJwPF4zGGw0Y9QS0mAM2AnQj77FqCzrtcwB1Hk81SYojHK4DyGuQ6mhIIrBWB9Xm7ug/6B/nZrBHBegrkFxoVGpnwBMSLR9EcEcC4qb8pP14BWcBcUgewMnF3T34VqhWMFkThLJAalwnENOAKiHpJq1FZgI2AT6HZtuxZwR9GidSHtI30jOrbawxlVX78/AbNfhHlomEUJJI89O2MqeE79T8/nk8nMBm/dK576hZgmA3cp/R4l9/UeSxiHLVIlNm4nFfT0bxyuIj7LHRTKai+zdJobwMKzcZSJb0ePV5PKN+BqAAKE47UlMnERELMM3EdYP/yrd+XYb2mOiYBiQ8OQnoRBlXrl9JZix7D1pHTazu4MoyBcnYamqAjIMTR8G4FT8LuhLsexXYYjICBiqhQBvYb6fLZIJCjPypVvaOoVAW2WcasCnL2Nq82xHJNSqlCeFcDshaPK0twkAhosjZL31QYw+1rlMpWGMArl23SBsZZO58F2tlJXmjOXS+s4WGvpMiBJT/I2PInZ6lIs9/hBsNS1hS6BG0DSqmYEDRlCXQrmy50P1oDRKTSegmNbUsA0zDMwRhPJXeCE3vWLPQMvan6X8AgIa1vcR4AkGZkDR4ejJ1UHpsaVI0g2LInpOsNFUud1rhxSV+fzC9Woz2EZkWQuja7/B+jUrgtIMpy9YCW4n4K41YfzRneW5E1KJTe4B2Zq1Q5EHEtj4U3AfEzR5SVY4l7QYQPJdN2as7RKBF0BPZqqH4VgMAMBL8Byxr7y8zCZiDlnOcEKIPmUpgB5Z2ww5RdOiiRiNajUmWda5IG6WbhsyY2fx6m8gLcoJDJFkH219M3We1+cnda93pfycZpIJEL/s/wSYADmOAwAQgdpBAAAAABJRU5ErkJggg=='

export const RepoDetails = (props) => {
  return <div className='h-screen relative'>
    {(props.statuses || []).map(status => <Item {...status} key={status.id} showConclusion />)}
    {props.commitUrl && <Item url={props.commitUrl} name='open commit' />}
    <Bug
      className='w-8 absolute bottom-0 right-0 text-gray-200 hover:text-gray-300 cursor-pointer p-2'
      onClick={() => console.log(props)}
    />
  </div>
}

const Item = (props) => {
  return <div className="flex justify-between items-center hover:bg-gray-100 cursor-pointer p-2 border-b" onClick={() => shell.openExternal(props.url)}>
    {props.showConclusion && <img className='flex-shrink-0 flex-grow-0 mr-2' src={conclusionIcon(props.conclusion)} width="24" height="24" />}
    <img className='flex-shrink-0 flex-grow-0 mr-2' src={props.avatarUrl || githubLogo} width="24" height="24" />
    <div className='text-sm flex-grow flex-shrink'>
      {props.name}
    </div>
    <img width="12" height="12" className='flex-shrink-0 flex-grow-0' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAABQCAYAAAC0wU3eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABOlJREFUeJztmj1sG2Ucxp//2VHJBxmQkNpKYUFiYEaIhY8sIAYWJAx357RpB6TaLgMLNE1i56tphRgQdiRLBZHEd5bcARHEiAoTCAlYqRADVSNFYkciudzTIXaxyp19H+/ruCjPFvvuef6/vP973/fOB/yPJHFPKN++nT19794zMIyJw5GRu6Vcbk9HYUkUGaZer48cjD8+B/A9EXmi8zmBHwm+f9m2f9BTYnRFgvm41Rp9bN/7EoLXAg8gPRFYBdu+pbS6mDL6HVCv74ydOvB2QkEAQCTrE80Nx3lLaXUx1XNkPtraGh/NZL8WYDqKGclDGGKVLKulprx4CoWptloTcuB9A+ClOIbHCRTYZiQF+56LmCAAICIZ+HSrrptLXV1MBcLUXPd1EbyR1LQDVGs0305eWnwFTwCU1EWISIbwnUECBcKI4GkV5oMGCr5mgH1VASKSgQym5ULWGf6sPGcAQIEwhu/fJHmoPEvofuo47yj27QoIUGFm5g4E8zryDIijCyh0O1O0rBsEbujINCBO1XVN1cY9tzMkpeY21wX4QHUwAJ+CfMmymqoMe240RYRFy7wC4rqqwO5sIRoqR6jvrllEWLDNOZ1AG42mpcIs8s0ZSdlwmtcg+FBF8EPyhTJTyJtuGpO+I9NRZ4QIrqcJDKuDwu2q49hpTGI/AziaFNw1gVxJExwin+C5km07SU6ODQPoB4LgfNGyGnFPTAQDPLiGViGYS+rRQ4mAEsMAwwcUeQIIUntSmCexlsYnRAaIzZrr5qOfkFIiwqJtLugCos+tqECp2qxbJKXmNFdEcFWVZ5c3AeN8KW9u9zpOGUw7VDZcdxkQ5TvuKEBKYdqhxwaU+pp5WCLCgmUtAlzV4C2Av1lznHNB3yuHaYceARErGryFxBdBQMrbrFvtdWgJggUN3v9pOa0w7VCpOc2KCBY1mHtiyPMFy/oV0NRm3WqvQxUSyxrMs77/7z9JO8xRpk4gvloulw1gQDDAEVApb5UJ7ij1hYxNTU2NAwOEAYDqtnsRTP5APlDkP5OTk38DA4SpbrsXIbx5tFaoEwXf53K5Q2BAMLpAAIC+8eA2XjuMVhBi+fKM+V3nb63rjE4QENcLtjknIux8pA1m0CCApjbT2lrgehAIoGFkdIMULetqEAigGEZza10r2OZ8GAigEOa4QQAgoyKr5jgXAHymafpdK9rmQj8QQMHI1BznAnn8IEBKmGECAVLA6AQBuFqwrMU4IEBCmGEEARLAVBuNWUA+1zRrrRRss5wEBIgJM8wgQAyYYQcBIu7NdIKQWFYBAkQYGd0gRdusqAAB+sBobS1wqWjbFZWO4e9ouq4Jn86jAgKEwNQ3W095mYPfIDKqOlAXCBAyARxkvHcfNRAg9LVGvqA+Si8IEP7C6ZjKEBIV3SBA2DuawruqAkhUSnlrSZVfLwWPjMhXauxZHhQIEALz15kzt0j8lM6a5aJtq3/q30OBMEvT017Gy74J8o9ktoMHAXrszS7N5nYNb+RlEr/HMSS4eBwgQJ+N5qXZ3C4NvELgThQzgosl21b+o2xURdqqVFut0zjwvhXg2bBjSCyU8pbyn8vjKNItQCmX2zs1kn2RxBYAv/s7grs+aB43CJDgtvmTVuvJkf3D5yD+hAB/7p09+8vS9LSno7gTnehEJzrRiYZJ9wE+7lpS3DuPnwAAAABJRU5ErkJggg==" />
  </div>
}

const Bug = (props) => {
  return <svg {...props} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"></path></svg>
}

import ICON_SUCCESS from '../icon-success.png'
import ICON_FAILURE from '../icon-failure.png'
import ICON_PENDING from '../icon-pending.png'

const conclusionIcon = (conclusion) => {
  if      (conclusion === 'success') return ICON_SUCCESS
  else if (conclusion === 'failure') return ICON_FAILURE
  else                               return ICON_PENDING
}
