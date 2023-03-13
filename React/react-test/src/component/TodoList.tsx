import React, { useId, useState } from 'react'

interface ListItem {
  title: string
  done: boolean
  id: string
}

export default function TodoList() {
  const [listItems, setListItems] = useState<ListItem[]>([{
    title: '吃饭',
    done: false,
    id: useId(),
  },
  {
    title: '睡觉',
    done: true,
    id: useId(),
  },
  {
    title: '打豆豆',
    done: false,
    id: useId(),
  }])

  function checkItem(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    setListItems(() => {
      return listItems.map((item, i) => {
        if (i === index) {
          item.id = `${item.id}${Math.random()}` // 排除key的影响
          item.done = !item.done
        }

        return item
      })
    })
    console.log(listItems)
  }

  return (
    <div>
      <ul>
        {listItems.map((listItem, index) => (
          <li key={listItem.id}>{ listItem.title } <input type="checkbox" checked={listItem.done} onChange={e => checkItem(e, index)} /></li>
        ))}
      </ul>
    </div>
  )
}
