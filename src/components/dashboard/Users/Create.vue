<template>
    <div class="create_theater p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2 mb-3">

            <strong class="side-component-title">
                <i class="fa fa-user text-primary mr-2"></i>
                Create a new user
                <small class="border-left-title">
                    You can create a new user here.
                </small>
            </strong>

        </div>

        <div class="clearfix"></div>

        <form action="#" class="form-dark mt-4" @submit.prevent="createUser">

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Fullname is required!
                </div>

                <div class="clearfix"></div>

                <label for="fullname">
                    Fullname
                </label>

                <input type="text"
                       class="form-control"
                       id="fullname"
                       name="fullname"
                       placeholder="Enter user's fullname here"
                       v-model="user.fullname"
                       autocomplete="off"
                       required />
            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Username is required!
                </div>

                <div class="clearfix"></div>

                <label for="username">
                    Username
                </label>

                <input type="text"
                       class="form-control"
                       id="username"
                       name="username"
                       placeholder="Enter user's username here"
                       v-model="user.username"
                       autocomplete="off"
                       required />
            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Email is required!
                </div>

                <div class="clearfix"></div>

                <label for="email">
                    Email
                </label>

                <input type="text"
                       class="form-control"
                       id="email"
                       placeholder="Enter user's email here"
                       v-model="user.email"
                       autocomplete="off"
                       required />
            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Password is required!
                </div>

                <div class="clearfix"></div>

                <label for="password">
                    Password
                </label>

                <input type="password"
                       class="form-control"
                       id="password"
                       placeholder="Enter user's password here"
                       v-model="user.password"
                       autocomplete="off"
                       required />

                <input type="password"
                       class="form-control mt-2"
                       id="password_confirmation"
                       placeholder="Re-enter the password here"
                       v-model="user.password_confirmation"
                       autocomplete="off"
                       required />

            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Role is required!
                </div>

                <div class="clearfix"></div>

                <label for="role">
                    Select a role for user
                </label>

                <select v-model="user.role" id="role" class="form-control dark-select">
                    <option value="user" selected="selected">User</option>
                    <option value="admin">Admin</option>
                </select>

            </div>

            <button class="btn btn-primary">
                Submit
            </button>

        </form>

    </div>
</template>

<script>

    export default {
        name: 'CreateUser',
        data() {
            return {
                user: {
                    fullname: null,
                    username: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                    role: "user",
                }
            }
        },
        methods: {
            createUser() {

                this.$refs.topProgress.start();

                this.$store.dispatch("createUser", this.user).then(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "User created successfully!",
                        title: "Success",
                        duration: 5000,
                    });

                    this.$refs.topProgress.done();

                    this.$router.push({
                        name: 'users',
                        params: {
                            reloard: true,
                        },
                    });

                }).catch(() => {
                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Could not create user, please try again!",
                        duration: 5000,
                    });

                    this.$refs.topProgress.done();
                })
            }
        }
    }

</script>