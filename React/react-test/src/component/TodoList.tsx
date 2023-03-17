import React, { useState } from 'react'

interface ListItem {
  title: string
  done: boolean
  id: string
}

export default function TodoList() {
  const [listItems, setListItems] = useState<ListItem[]>([{
    title: '吃饭',
    done: false,
    id: `${Math.random()}`,
  },
  {
    title: '睡觉',
    done: false,
    id: `${Math.random()}`,
  },
  {
    title: '打豆豆',
    done: false,
    id: `${Math.random()}`,
  }])

  function checkItem(e: React.ChangeEvent<HTMLInputElement>, checekedItem: ListItem) {
    setListItems(state => state.map((item) => {
      console.log(e.target)
      if (item.id === checekedItem.id)
        item.done = !item.done
      return item
    }))
  }

  const [newTitle, setNewTitle] = useState('')
  function addItem() {
    setListItems([
      {
        title: newTitle,
        id: `${Math.random()}`,
        done: false,
      },
      ...listItems,
    ])
  }
  return (
    <div>
      <form >
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} ></input>{' '}<button onClick={addItem}>add</button>
        <ul>
          {listItems.map(listItem => (
            <li key={listItem.id}>{ listItem.title } <input type="checkbox" value={listItem.id} checked={listItem.done} onChange={e => checkItem(e, listItem)} /></li>
          ))}
        </ul>
      </form>
    </div>
  )
}
