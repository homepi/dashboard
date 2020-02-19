<template>

    <div class="users p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2">

            <strong class="side-component-title pull-left mt-2">
                <i class="icofont-users text-primary mr-2"></i>
                Users
                <small class="border-left-title">
                    You can manage all the users here.
                </small>
            </strong>

            <router-link class="btn btn-primary pull-right" :to="{ name: 'create_user' }">
                Create a new user
                <i class="icofont-plus ml-1"></i>
            </router-link>

            <i class="icofont-refresh pull-right refresh-btn mr-3 mt-2"
               @click="getUsers()"></i>

            <div class="clearfix"></div>

        </div>

        <div class="clearfix"></div>

        <div class="mt-4" v-show="!users.length">
            There's nothing here ...
        </div>

        <div class="clearfix"></div>

        <div class="users mt-3">
            
            <div class="user-card pull-left col-md-2" v-for="user in users"
                 @click.prevent.stop="$parent.$refs.menu.open($event, 'users-menu', user)">

                <div class="user-details">

                    <img :src="baseURL + '/uploads/avatars/' + user.avatar + '.png'"
                         class="avatar-card pull-left"
                         :alt="user.fullname" />

                    <span class="user-name-list">
                        {{ user.fullname }}
                    </span>

                </div>

            </div>
            
        </div>
        
    </div>

</template>

<script>
    export default {
        name: 'Users',
        data() {
            return {
                users: [],
            }
        },
        methods: {
            getUsers() {
                this.users = [];
                this.$refs.topProgress.start();
                this.$store.dispatch("getUsers").then(response => {
                    this.users = response.data.result;
                    this.$refs.topProgress.done();
                }).catch(() => {
                    this.$refs.topProgress.done();
                })
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>