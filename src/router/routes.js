import Login from '@/views/Login'
import Home from '@/views/Home'

// 登录
export const loginRouter = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

// 主路由
export const appRouter = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]
export const routes = [...loginRouter, ...appRouter]
