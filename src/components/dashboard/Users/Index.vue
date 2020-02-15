<template>

    <div class="logs p-4">

        <vue-topprogress ref="topProgress" />

        <h5 class="mb-3">

            <span class="pull-left">
                Users
                <span class="clearfix"></span>
                <small>You can manage all the users here.</small>
            </span>

            <router-link class="btn btn-primary pull-right"
                         :to="{ name: 'create_user' }">
                Create a new user
            </router-link>

        </h5>

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