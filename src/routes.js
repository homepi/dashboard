// Main components
// import LandingPage from './components/LandingPage'

// Auth components
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard'

// Dashboard children components
import Profile from './components/dashboard/Profile'
import Logs from './components/dashboard/Logs'

// Dashboard theater components
import Chart from './components/dashboard/Chart'

import Accessories from './components/dashboard/Accessories/Index'
import CreateAccessory from './components/dashboard/Accessories/Create'

import Users from './components/dashboard/Users/Index'
import CreateUser from './components/dashboard/Users/Create'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: "dashboard",
    },
    {
        path: '/login',
        name: 'login',
        components: {
            main: Login,
        },
        props: true,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        components: {
            main: Logout,
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/chart',
        components: {
            main: Dashboard,
        },
        children: [
            {
                path: 'chart',
                name: 'chart',
                components: {
                    dashboard: Chart,
                },
            },
            {
                path: 'accessories',
                name: 'accessories',
                components: {
                    dashboard: Accessories,
                },
            },
            {
                path: 'accessories/add',
                name: 'create_accessory',
                components: {
                    dashboard: CreateAccessory
                },
            },
            {
                path: 'profile',
                name: 'profile',
                components: {
                    dashboard: Profile,
                },
            },
            {
                path: 'logs',
                name: 'logs',
                components: {
                    dashboard: Logs,
                },
            },
            {
                path: 'users',
                name: 'users',
                components: {
                    dashboard: Users,
                },
            },
            {
                path: 'users/create',
                name: 'create_user',
                components: {
                    dashboard: CreateUser
                },
            },
        ],
        props: true,
        meta: {
            requiresAuth: true,
        }
    },
];

export default routes