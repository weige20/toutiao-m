
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
    path: '/article_detail',
    component: () => import('@/views/ArticleDetail')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/search/:keywords',
    component: () => import('@/views/Search/SearchResult.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/user_editor',
    component: () => import('@/views/User/UserEdit.vue')
  }
]

export default routes
