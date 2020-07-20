import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from './api'

Vue.use(Vuex);

let baseURL = `${config.schema}://${config.baseURL}/${config.version}`;
axios.defaults.baseURL = baseURL;

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        refreshed_token: localStorage.getItem('refreshed_token') || null,
        user: null,
        baseURL: baseURL,
    },
    getters: {
        loggedIn: (state, getters) => {
            return getters.token !== null
        },
        token: state => {
            if (state.token === "null" || state.token === null || state.token === ""){
                return null
            }
            return state.token
        },
        user: state => state.user,
        baseURL: state => state.baseURL,
    },
    mutations: {
        retrieveToken: (state, {token, refreshed_token}) => {
            state.token = token;
            state.refreshed_token = refreshed_token;
        },
        destroyToken: (state) => {
            state.token = null;
            state.refreshed_token = null;
            state.user = {};
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refreshed_token");
        },
        addUserData: (state, data) => {
            state.user = data;
            localStorage.setItem('user', JSON.stringify(data));
        }
    },
    actions: {
        logout(context) {
            return new Promise((resolve) => {
                context.commit("destroyToken");
                resolve();
            })
        },
        getHealth(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/sys/@health')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getAccessories(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@accessories')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getWeeklyChart(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/charts/@week')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getLogs(context, limit) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            if (limit === undefined){
                limit = 15;
            }

            return new Promise((resolve, reject) => {
                axios.get('/user/@logs?limit=' + limit)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getUsers(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/users/@all')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        createUser(context, user) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            const params = new URLSearchParams();
            params.append('fullname', user.fullname);
            params.append('username', user.username);
            params.append('email', user.email);
            params.append('password', user.password);
            params.append('password_confirmation', user.password_confirmation);
            params.append('role', user.role);

            return new Promise((resolve, reject) => {
                axios.post('/user/@create', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve).catch(reject)
            })
        },
        getUser(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@me')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        runAccessory(context, accessory_id) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/accessories/' + accessory_id + '/@run')
                    .then(resolve)
                    .catch(reject)
            })
        },
        getPins(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/@pins')
                    .then(resolve)
                    .catch(reject)
            })
        },
        refreshToken(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.refreshed_token;

            return new Promise((resolve, reject) => {
                axios.post('/auth/@refresh').then(response => {

                    const {token, refreshed_token} = response.data.result;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);

                    context.commit('retrieveToken', response.data.result);

                    resolve({token, refreshed_token})

                }).catch(reject)
            })
        },
        searchUser(context, data) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();
                params.append('query', data.query);

                axios.post('/users/@search', params,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve).catch(reject)
            })
        },
        createAccessory(context, data) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();
                params.append('name', data.name);
                params.append('description', data.description);
                params.append('task', data.task);
                params.append('is_public', data.is_public);
                params.append('pin_id', data.pin_id);
                params.append('pin_type', data.pin_type);

                if (!data.is_public){
                    for (let i in data.accessory_users) {
                        let user = data.accessory_users[i];
                        params.append('users', user);
                    }
                }

                axios.post('/accessories/@create', params,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error.response.data)
                })
            })
        },
        createAuthToken(context, credentials) {

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();

                params.append('user', credentials.username);
                params.append('pass', credentials.password);

                axios.post('/auth/@create', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {

                    const {token, refreshed_token} = response.data.result;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);

                    context.commit('retrieveToken', response.data.result);

                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                });
            })
        }
    }
});