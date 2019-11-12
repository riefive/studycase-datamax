import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        meta: { layout: 'admin' },
        component: () => import ('../views/Home.vue')
    },
    {
        path: '/users',
        name: 'user',
        meta: { layout: 'admin' },
        component: () => import ('../views/User.vue')
    },
    {
        path: '/products',
        name: 'product',
        meta: { layout: 'admin' },
        component: () => import ('../views/Product.vue')
    },
    {
        path: '/config',
        name: 'config',
        meta: { layout: 'default' },
        component: () => import ('../views/Config.vue')
    },
    {
        path: '/forgot',
        name: 'forgot',
        meta: { layout: 'default' },
        component: () => import ('../views/Forgot.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'default' },
        component: () => import ('../views/Login.vue')
    },
    {
        path: '/logout',
        name: 'logout',
        meta: { layout: 'admin' },
        component: () => import ('../views/Logout.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'default' },
        component: () => import ('../views/Register.vue')
    },
    {
        path: '/reset',
        name: 'reset',
        meta: { layout: 'admin' },
        component: () => import ('../views/Reset.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
