import { Button, Dropdown, Menu, Space } from '@arco-design/web-react'
import { IconDown } from '@arco-design/web-react/icon'
const dropList = (
  <Menu>
    <Menu.Item key='1'>Beijing</Menu.Item>
    <Menu.Item key='2'>Shanghai</Menu.Item>
    <Menu.Item key='3'>Guangzhou</Menu.Item>
  </Menu>
)

function MyMenu() {
  return (
    <Space className='dropdown-demo'>
      <Dropdown droplist={dropList} position='bl'>
        <Button type='text'>
          Hover me <IconDown />
        </Button>
      </Dropdown>

      <Dropdown droplist={dropList} position='bl' disabled>
        <Button type='text'>
          Hover me <IconDown />
        </Button>
      </Dropdown>
    </Space>
  )
}

export default MyMenu
