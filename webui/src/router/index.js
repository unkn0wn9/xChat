import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: import('../views/home.vue'),
            meta: {
                title: '首页',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: import('../views/login.vue'),
            meta: {
                title: '登录',
            },
        },
        {
            path: '/*',
            redirect: '/home',
        },
    ]
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