import type { FC } from 'react'
import type { Path } from './types'

interface IProps {
  pathList: Path[]
}

export const NavTd: FC<IProps> = (props) => {
  return (
    <ul className='flex justify-evenly items-center w-80 h-16 rounded-md mx-auto bg-slate-800 text-slate-100'>
      {
        props.pathList.map(path => (
          <li className='relative p-2 hover:bg-slate-500 rounded-md'>
            {path.label}
            {path.child
              ? <ul className='absolute top-12 bg-slate-800 rounded-md p-4'>
              {path.child.map(subPath => (<li>{subPath.label}</li>))}
              </ul>
              : null}
          </li>
        ))
      }
    </ul>
  )
}
