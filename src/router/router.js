
const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/User')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
]

export default routes
