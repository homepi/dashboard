<template>

    <div>

        <div class="sidemenu">

            <router-link :to="{ name: 'dashboard' }">
                <i class="logo"></i>
            </router-link>

            <ul class="menu">
                <li>
                    <router-link :to="{ name: 'dashboard' }">
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

            </ul>

            <div class="footer">
                <a class="user-avatar-button">

                    <img :src="baseURL + '/avatars/' + user.user_hash + '/' + user.avatar"
                         v-if="user.avatar"
                         class="avatar"
                         :alt="user.fullname" />

                    <ul class="user-menu-hover">
                        <li>
                            <button @click="redirect('profile')">
                                <i class="fa fa-edit"></i>
                                Edit profile
                            </button>
                        </li>
                        <li>
                            <button class="bg-danger" @click="openLogoutModal()">
                                <i class="fa fa-power-off"></i>
                                Logout
                            </button>
                        </li>
                    </ul>

                </a>
            </div>

        </div>

        <div class="modal modal-dark fade" id="logoutModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-0">
                        <h5>
                            Are you sure you want to logout from this account?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, im gonna stay!
                        </button>
                        <button type="button" class="btn btn-outline-success" @click="redirect('logout')">
                            Yeah, get me out!
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import $ from "jquery";

    export default {
        name: 'Sidemenu',
        data() {
            return {
                baseURL: null,
            }
        },
        methods: {
            redirect(name){
                this.$router.push(name).then(() => {
                    $("#logoutModal").modal('hide');
                });
            },
            openLogoutModal() {
                $("#logoutModal").modal();
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

    .user-avatar-button {
        cursor: pointer;
    }

    .user-avatar-button:hover > .user-menu-hover {
        display: block;
    }

    .user-menu-hover {
        display: none;
        position: absolute;
        left: 65px;
        bottom: 10px;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 150px;
    }

    .user-menu-hover > li {
        padding: 0;
        text-align: left;
        margin: 5px 0;
    }

    .user-menu-hover > li > a, .user-menu-hover > li > button {
        text-decoration: none;
        background: #181818;
        padding: 5px 10px;
        text-align: left;
        color: #eeeeee;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        border: none;
    }

    .user-menu-hover > li > a:hover, .user-menu-hover > li > button:hover {
        background: #333333;
    }

</style>