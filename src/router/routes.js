import Login from '@/views/Login'
import Home from '@/views/Home'
import Profile from '@/components/Home/Profile'
import Users from '@/components/User/Users'

// 登录
export const loginRouter = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 主路由
export const appRouter = [
  {
    path: '/home',
    redirect: '/profile',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/profile',
        meta: {
          title: '介绍',
          keepAlive: true
        },
        name: 'Profile',
        component: Profile
      },
      {
        path: '/users',
        meta: {
          title: '用户管理 / 用户列表',
          requiresAuth: true
        },
        name: 'Users',
        component: Users
      }
    ]
  }
]
export const routes = [...loginRouter, ...appRouter]
