import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Layout2 from "@/components/Layout2";
import Menu from "@/components/info/Menu";
import Role from "@/components/info/Role";
import Dept from "@/components/info/Dept";
import User from "@/components/info/User";
import {localGet} from "@/utils";
import Home from "@/components/info/Home";
import Locations from "@/components/info/Locations";
import Flow from "@/components/system/Flow";
import Declare from "@/components/Biding/Declare";
import WaitingTask from "@/components/task/WaitingTask";
import ProjectInfo from "@/components/Biding/ProjectInfo";
import CheckInfo from "@/components/check/CheckInfo";


const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },

            {
                path: '/register',
                name: 'Register',
                component: Register
            },


        ]
    },

    {
        path: '/layout2',
        name: 'Layout2',
        component: Layout2,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'Home',
                component: Home
            },
            {
                path: '/menu',
                name: 'Menu',
                component: Menu
            },
            {
                path: '/role',
                name: 'Role',
                component: Role
            },
            {
                path: '/dept',
                name: 'Dept',
                component: Dept
            },
            {
                path: '/user',
                name: 'User',
                component: User
            },
            {
                path: '/locations',
                name: 'Locations',
                component: Locations
            },
            {
                path: '/flow',
                name: 'Flow',
                component: Flow
            },
            {
                path: '/declare',
                name: 'Declare',
                component: Declare
            },
            {
                path: '/waitingTask',
                name: 'WaitingTask',
                component: WaitingTask
            },
            {
                path: '/projectInfo',
                name: 'ProjectInfo',
                component: ProjectInfo
            },
            {
                path: '/checkInfo',
                name: 'CheckInfo',
                component: CheckInfo
            },


        ]
    }


]


const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes
})

// 未登录则跳转到登录页
router.beforeEach((to, from, next) => {
    let token = localGet(`token`)
    let startTime = localGet('startTime');
    console.log(startTime)
    if (token === null || token.id === null) {
        if (to.path === '/login') {
            next();
        }
        else if(to.path === '/register'){
            next();
        }
        else {
            next({path: '/login'})
        }
    }
    if (token && token.id) {
        // 如果已登录，跳过登陆页
        if (to.path === '/login') {
            next({path: '/index'})
        }
        next();
    }
})
export default router

