<template>

    <div class="sidemenu">

        <router-link :to="{ name: 'chart' }">
            <i class="logo"></i>
        </router-link>

        <ul class="menu">
            <li>
                <router-link :to="{ name: 'chart' }">
                    <i class="fa fa-dashboard"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'accessories' }">
                    <i class="fa fa-microchip"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'logs' }">
                    <i class="fa fa-sticky-note"></i>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'users' }">
                    <i class="fa fa-users"></i>
                </router-link>
            </li>
        </ul>

        <ul class="menu">

            <li class="custom-btn-menu">
                <router-link class="bg-primary" :to="{ name: 'create_accessory' }">
                    <i class="fa fa-plus"></i>
                </router-link>
            </li>

            <li class="custom-btn-menu">
                <a class="bg-danger">
                    <i class="fa fa-heartbeat"></i>
                </a>
            </li>

        </ul>

        <div class="footer">
            <router-link :to="{ name: 'profile' }">
                <img :src="baseURL + '/avatars/' + user.user_hash + '/' + user.avatar"
                     v-if="user.avatar"
                     class="avatar"
                     :alt="user.fullname" />
            </router-link>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'Sidemenu',
        data() {
            return {
                baseURL: null,
            }
        },
        created() {
            this.baseURL = this.$store.state.baseURL;
        },
        props: ['user'],
    }

</script>

<style>

    .bg-primary.router-link-exact-active {
        color: #FFFFFF !important;
        background: #0b58ab!important;
    }

    li.custom-btn-menu {
        margin: 10px 0 !important;
    }

    li.custom-btn-menu > a {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #FFFFFF;
        border: 0;
        margin: 5px;
        cursor: pointer;
    }

    li.custom-btn-menu > a > i {
        font-size: 20px;
        margin: 0 auto;
    }

    .footer {
        bottom: 0;
        position: absolute;
        width: 100%;
        left: 0;
    }

    img.avatar {
        width: 40px;
        border: 0;
        margin: 10px auto;
    }

    ul.menu {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul.menu > li {
        margin: 15px 0;
    }

    ul.menu > li > a {
        font-size: 20px;
        color: #ffffff;
    }

    ul.menu > li > a.router-link-exact-active {
        color: #007bff;
    }

    .sidemenu {
        padding: 10px;
        background-size: contain;
        top: 0;
        z-index: 1;
        height: 100vh;
        width: 65px;
        transition: width .25s ease-in-out 0s;
        left: 0;
        position: fixed;
        background: #181818;
        text-align: center;
        -webkit-app-region: drag;
    }

</style>