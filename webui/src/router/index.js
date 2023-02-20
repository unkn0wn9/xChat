import { createRouter, createWebHashHistory } from 'vue-router'

import home from '@/views/home.vue'
import login from '@/views/login.vue'

import { site_name } from '@/api/config.js'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: `对话 | ${site_name}`,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: `登录 | ${site_name}`,
        },
    },
    {
        path: '/*',
        redirect: '/home',
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    // console.log('from:', from, 'to:', to)
    if (to.meta.title) {
        document.title = `${to.meta.title}`;
    }
    let token = localStorage.getItem("token");
    // 校验登录状态
    if (!token && to.path != '/login') {
        next('/login')
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    // console.log(to, from)
})

export default router