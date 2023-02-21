import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@arco-design/web-react/dist/css/arco.css'
import './index.css' // 导入taiwind

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
