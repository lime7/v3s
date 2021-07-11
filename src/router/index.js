import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase'
import store from '@/store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'DefaultLayout', auth: true }
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: { layout: 'AuthLayout' },
    // route level code-splitting
    // this generates a separate chunk (registration.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "registration" */ '../views/Registration.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'AuthLayout' },
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/reset',
    name: 'Reset',
    meta: { layout: 'AuthLayout' },
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Reset.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !authenticatedUser) {
    if (!store.state.isAuthentificated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
