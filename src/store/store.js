import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let baseURL =  'http://10.1.1.110:9002';
axios.defaults.baseURL = baseURL + '/api/v1';

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        user: {},
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
            context.commit("destroyToken");
        },
        refreshTokenAndGetUser(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.post('/auth/@refresh').then(response => {

                    let {token, refreshed_token} = response.data.result;

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('refreshed_token', refreshed_token);
                    context.commit('retrieveToken', response.data.result);

                    let user = response.data.result;
                    context.commit('addUserData', user);

                    resolve(token)
                }).catch(error => {
                    reject(error)
                })
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
        getRecentLogs(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@recent_logs')
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
        getLogs(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/user/@logs')
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
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getPins(context, pins_type) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/pins/@' + pins_type)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        refreshToken(context) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.post('/auth/@refresh')
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        searchUser(context, data) {

            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {

                const params = new URLSearchParams();
                params.append('q', data.query);

                axios.post('/users/@search', params,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
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