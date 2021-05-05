import Login from '@/views/Login'
import Home from '@/views/Home'
import Profile from '@/components/Home/Profile'
import UsersList from '@/components/User/UsersList'
import RightsList from '@/components/Rights/RightsList'
import RolesList from '@/components/Rights/RolesList'
import UserManage from '@/components/User/UserManage'
import RightsManage from '@/components/Rights/RightsManage'

// 登录
export const loginRouter = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
// 管理分支路由
const profile = {
  path: '/profile',
  meta: {
    title: '介绍',
    keepAlive: true
  },
  name: 'Profile',
  component: Profile
}
const usersList = {
  path: '/users-list',
  meta: {
    title: ' 用户列表',
    requiresAuth: true
  },
  name: 'UsersList',
  component: UsersList
}
const rolesList = {
  path: '/roles-list',
  meta: {
    title: '角色列表',
    requiresAuth: true
  },
  name: 'RolesList',
  component: RolesList
}
const rightsList = {
  path: '/rights-list',
  meta: {
    title: '权限列表',
    requiresAuth: true
  },
  name: 'RightsList',
  component: RightsList
}
// 管理主路由
const userManage = {
  path: '/user-manage',
  meta: {
    title: '用户管理',
    keepAlive: true
  },
  name: 'UserManage',
  component: UserManage,
  children: [
    usersList
  ]
}
const rightsManage = {
  path: '/rights-manage',
  meta: {
    title: '权限管理',
    keepAlive: true
  },
  name: 'RightsManage',
  component: RightsManage,
  children: [
    rolesList,
    rightsList
  ]
}

// 主路由
export const appRouter = [
  {
    path: '/',
    redirect: '/profile',
    name: 'Home',
    component: Home,
    children: [
      profile,
      userManage,
      rightsManage
    ]
  }
]

export const routes = [...loginRouter, ...appRouter]
