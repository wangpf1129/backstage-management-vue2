// 登录
export const loginRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
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
  component: () => import('@/components/Home/Profile')
}
const usersList = {
  path: '/users-list',
  meta: {
    title: ' 用户列表',
    requiresAuth: true
  },
  name: 'UsersList',
  component: () => import('@/components/User/UsersList')
}
const rolesList = {
  path: '/roles-list',
  meta: {
    title: '角色列表',
    requiresAuth: true
  },
  name: 'RolesList',
  component: () => import('@/components/Rights/RolesList')
}
const rightsList = {
  path: '/rights-list',
  meta: {
    title: '权限列表',
    requiresAuth: true
  },
  name: 'RightsList',
  component: () => import('@/components/Rights/RightsList')
}
const goodsCate = {
  path: '/categories-list',
  meta: {
    title: '商品分类',
    requiresAuth: true
  },
  name: 'GoodsCate',
  component: () => import('@/components/Goods/GoodsCate')
}
const goodsParams = {
  path: '/params-list',
  meta: {
    title: '商品分类',
    requiresAuth: true
  },
  name: 'GoodsParams',
  component: () => import('@/components/Goods/GoodsParams')
}
const goodsList = {
  path: '/goods-list',
  meta: {
    title: '商品列表',
    requiresAuth: true
  },
  name: 'GoodsList',
  component: () => import('@/components/Goods/GoodsList')
}
const goodsAdd = {
  path: '/goods-list/add',
  meta: {
    title: '添加商品',
    requiresAuth: true
  },
  name: 'GoodsAdd',
  component: () => import('@/components/Goods/GoodsAdd')
}
const ordersList = {
  path: '/orders-list',
  meta: {
    title: '订单列表',
    requiresAuth: true
  },
  name: 'OrdersList',
  component: () => import('@/components/Orders/OrdersList')
}
const report = {
  path: '/reports-list',
  meta: {
    title: '数据报表',
    requiresAuth: true
  },
  name: 'report',
  component: () => import('@/components/Report/Report')
}

// 管理主路由
const userManage = {
  path: '/user',
  meta: {
    title: '用户管理',
    keepAlive: true
  },
  name: 'UserManage',
  component: () => import('@/components/User/UserManage'),
  children: [
    usersList
  ]
}
const rightsManage = {
  path: '/rights',
  meta: {
    title: '权限管理',
    keepAlive: true
  },
  name: 'RightsManage',
  component: () => import('@/components/Rights/RightsManage'),
  children: [
    rolesList,
    rightsList
  ]
}
const goodsManage = {
  path: '/goods',
  meta: {
    title: '商品管理',
    keepAlive: true
  },
  name: 'GoodsManage',
  component: () => import('@/components/Goods/GoodsManage'),
  children: [
    goodsCate,
    goodsParams,
    goodsList,
    goodsAdd
  ]
}
const ordersManage = {
  path: '/orders',
  meta: {
    title: '订单管理',
    keepAlive: true
  },
  name: 'OrdersManage',
  component: () => import('@/components/Orders/OrdersManage'),
  children: [ordersList]
}
const reportManage = {
  path: '/report',
  meta: {
    title: '数据统计',
    keepAlive: true
  },
  name: 'ReportManage',
  component: () => import('@/components/Report/ReportManage'),
  children: [report]
}

// 主路由
export const appRouter = [
  {
    path: '/',
    redirect: '/profile',
    name: 'Home',
    component: () => import('@/views/Home'),
    children: [
      profile,
      userManage,
      rightsManage,
      goodsManage,
      ordersManage,
      reportManage
    ]
  }
]

export const routes = [...loginRouter, ...appRouter]
