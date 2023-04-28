import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider, App as AntdApp } from 'antd';
import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css';
import store from './store/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename='/view/'>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <AntdApp>
          <App />
        </AntdApp>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>,
)
