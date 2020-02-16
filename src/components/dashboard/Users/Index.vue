<template>

    <div class="logs p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2 mb-3">

            <strong class="side-component-title pull-left">
                <i class="fa fa-sticky-note text-primary mr-2"></i>
                Users
                <small class="border-left-title">
                    You can manage all the users here.
                </small>
            </strong>

            <router-link class="btn btn-primary pull-right" :to="{ name: 'create_user' }">
                Create a new user
                <i class="fa fa-plus-circle ml-1"></i>
            </router-link>

            <div class="clearfix"></div>

        </div>

        <div class="clearfix"></div>

        <div class="mt-4" v-show="!users.length">
            There's nothing here ...
        </div>

        <div class="clearfix"></div>

        <div class="users mt-3">
            
            <div class="user-card pull-left col-md-2" v-for="user in users">

                <div class="user-details">

                    <img :src="baseURL + '/uploads/avatars/' + user.avatar + '.png'"
                         class="avatar-card pull-left" />

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
                baseURL: null,
                users: [],
            }
        },
        mounted() {

            this.$refs.topProgress.start();
            this.baseURL = this.$store.state.baseURL;

            this.$store.dispatch("getUsers").then(response => {
                this.users = response.data.result;
                this.$refs.topProgress.done();
            }).catch(() => {
                this.$refs.topProgress.done();
            })
        }
    }
</script>