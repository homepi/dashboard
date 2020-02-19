import Vue from 'vue'
import routes from './routes'
import VTitle from 'v-title';
import VueRouter from 'vue-router'
import apiConfig from './store/api'
import { store } from './store/store'
import VueApexCharts from 'vue-apexcharts'
import Notifications from 'vue-notification'
import vueTopprogress from 'vue-top-progress'
import Master from './components/layouts/Master'

import 'v-title/lib/element-ui';

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/icofont.css";
import "animate.css/animate.min.css";

import "./assets/css/app.css";

import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

Vue.config.productionTip = false;

Vue.use(VTitle);
Vue.use(VueRouter);

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

Vue.use(Notifications);
Vue.use(vueTopprogress);
Vue.use(require('vue-jalali-moment'));

window.eventBus = new Vue();

const router = new VueRouter({
    routes,
    mode: 'history'
});

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

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            if (store.state.user == null){
                await store.dispatch("getUser").then(response => {
                    store.state.user = response.data.result;
                }).catch(err => {
                    if (err.response.status !== 401){
                        store.dispatch('logout').then(() => {
                            router.push({ name: 'login' }).then(() => {
                                Vue.notify({
                                    group: 'auth',
                                    type: 'error',
                                    text: "Login again.",
                                    title: "Failed",
                                    duration: 2000,
                                });
                            });
                        })
                    }
                });
            }
        }
    }
    next()
});

import "./axios";

Vue.mixin({
    data() {
        return {
            get baseURL() {
                return `${apiConfig.schema}://${apiConfig.baseURL}`;
            },
            get user() {
                return store.state.user;
            }
        }
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    components: { Master },
    template: '<Master />'
});