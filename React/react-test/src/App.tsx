import { Layout } from '@arco-design/web-react'
// import TodoList from './component/TodoList'
const Sider = Layout.Sider
const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer

export function App() {
  return (
    <Layout style={{ height: '100%' }}>
      <Header className={'flex-center gap-4 bg-slate-500 h-20 text-lg text-white'}>
        header
      </Header>
      <Layout>
        <Sider className={'h-[80vh] w-56'}>sider</Sider>
        <Content>content</Content>
      </Layout>
      <Footer className={'flex-center h-20 bg-slate-700 text-white'}>footer</Footer>
    </Layout>

  )
}

export default App
