
const routes = [
  {
    path: '/',
    component: () => import('layouts/Menu.vue'),
    children: [
      { path: '/Login', component: () => import('pages/Login.vue') },
      { path: '/amigos', component: () => import('pages/amigos.vue') },
      { path: '/registro', component: () => import('pages/Registrarse.vue') },
      { path: '/', component: () => import('pages/index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
