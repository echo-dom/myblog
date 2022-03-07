import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/views/Home.vue'
import Index from '@/views/index.vue'
import Login from '@/components/admin/login.vue'
import Register from '@/components/admin/register.vue'
import Admin from '@/components/admin/admin.vue'
import Welcome from '@/components/admin/Welcome.vue'
import Users from '@/components/admin/users/userslist.vue'
import UsersInfo from '@/components/admin/users/userinfo.vue'
import Essaylist from '@/components/admin/essay/essaylist.vue'
import EditEssay from '@/components/admin/essay/editEssay.vue'
import ShowEssay from '@/components/admin/essay/showEssay.vue'
import ErrorPage from '@/components/error/error.vue'
import Test from '@/components/tools/test.vue'

// 页面加载进度条
import Nprogress from 'nprogress'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        // redirect: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/index',
        // redirect: '/home',
        name: 'Index',
        component: Index
    },

    {
        path: '/showEssay',
        name: 'ShowEssay',
        // redirect: '/home',
        component: ShowEssay
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }, {
        path: '/errorpage',
        name: 'ErrorPage',
        component: ErrorPage,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/userslist', component: Users },
            { path: '/test', component: Test },
            { path: '/userInfo', component: UsersInfo },
            { path: '/essaylist', component: Essaylist },
            { path: '/editEssay', component: EditEssay },
        ]
    }
]

const router = new VueRouter({
    routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
    Nprogress.start()
    // 如果用户访问的登录页面，则直接访问
    if (to.path === '/login') return next()
    if (to.path === '/register') return next()
    // 从sessionStorage 获取保存的token值
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
router.afterEach(() => {
    Nprogress.done();
})

export default router