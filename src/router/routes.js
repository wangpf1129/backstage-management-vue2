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
    name: 'Home',
    component: Home,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      }
    ]
  }
]
export const routes = [...loginRouter, ...appRouter]
