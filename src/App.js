import React,{lazy,Suspense}from 'react'
import {Route,Switch, Redirect, BrowserRouter} from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

const Login = lazy(() => import('./pages/login'))
const Container = lazy(()=>import('./pages/container'))
const PasswordConf =  lazy(()=>import('./pages/passwordConf'))

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
         <Switch>
        {/* 登陆页面 */}
        <Route path="/login" component={Login}/>
        {/* 首页路由 */}
        <Route path="/index" component={Container}/>
        {/* 忘记密码路由 */}
        <Route path="/forgotPassword"  component={PasswordConf}/>
        {/* 默认路由 */}
        <Redirect exact from="/" to="/index/search"/>
       </Switch>
       </Suspense>
      </Provider>
    </BrowserRouter>
  )
}

export default App
