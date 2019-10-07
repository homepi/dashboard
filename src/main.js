import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import { store } from './store/store'
import VueApexCharts from 'vue-apexcharts'
import Notifications from 'vue-notification'
import vueTopprogress from 'vue-top-progress'
import Master from './components/layouts/Master'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueApexCharts);
Vue.use(Notifications);
Vue.use(vueTopprogress);
Vue.use(require('vue-jalali-moment'));

Vue.component('apexchart', VueApexCharts);

window.eventBus = new Vue();

const router = new VueRouter({
    routes,
    mode: 'history'
});

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "animate.css/animate.min.css";
import "./assets/css/app.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import axios from "axios/index";

Vue.component('loader', VueLoaders.component);

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({ name: 'dashboard' })
        } else {
            next()
        }
    } else {
        next()
    }
});

axios.interceptors.request.use(async config => {

    if (store.getters.loggedIn && config.__isRetryRequest && store.getters.token !== null) {

        await store.dispatch('refreshTokenAndGetUser').then(token => {

            config.headers['Authorization'] = 'Bearer ' + token;
            config.__isRetryRequest = false;

        }).catch(err => {
            console.log("error refresh : ", err)
        });

    } else {
        config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }

    return config

});

axios.interceptors.response.use(config => { return config }, async error => {

    if (!store.getters.loggedIn) {
        return Promise.reject(error)
    }

    if (error.request !== undefined && error.request.responseURL.includes('auth')) {
        return Promise.reject(error)
    }

    if (error.request !== undefined && store.getters.token !== null) {
        if (store.getters.loggedIn && error.request.status === 401){

            error.config.__isRetryRequest = true;
            return axios.request(error.config);
        }

        return Promise.reject(error)
    } else {
        store.dispatch("logout").then(() => {
            router.push({name: 'login'});
        }).catch(console.log)
    }

    return Promise.reject(error)

});

new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { Master },
    created() {
        this.$router.push('/');
    },
    template: '<Master />'
});