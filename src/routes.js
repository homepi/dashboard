// Auth components
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/dashboard/Profile'
import Logs from './components/dashboard/Logs'

import Accessories from './components/dashboard/Index'
import CreateAccessory from './components/dashboard/Accessories/Create'

import Users from './components/dashboard/Users/Index'
import CreateUser from './components/dashboard/Users/Create'

const routes = [
    {
        path: '/login',
        name: 'login',
        components: {
            main: Login,
        },
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
        path: '/',
        components: {
            main: Dashboard,
        },
        children: [
            {
                path: '',
                name: 'dashboard',
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
                path: 'settings',
                name: 'settings',
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
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "*",
        name: 'notfound',
        redirect: "/",
    },
];

export default routes