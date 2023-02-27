import { useState } from 'react'
import { NavTd } from './Nav/NavTd'
import type { Path } from './Nav/types'

export default function TestComponent() {
  const [pathList] = useState<Path[]>([
    {
      label: 'test01',
      path: 'test01Path',
      child: null,
    },
    {
      label: 'test02',
      path: 'test02Path',
      child: [
        {
          path: 'subPath1',
          label: 'sub1',
          child: null,
        },
      ],
    },
  ])
  return (
    <>
    <div className=" w-96 mx-auto font-bold">
      test TestComponent
    </div>
    <NavTd pathList={pathList}></NavTd>
    </>
  )
}
