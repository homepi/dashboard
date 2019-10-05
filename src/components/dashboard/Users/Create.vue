<template>
    <div class="create_theater p-4">

        <vue-topprogress ref="topProgress" />

        <h5 class="mb-3">
            <strong>Create a new user</strong>
            <span class="clearfix"></span>
            <small>You can create a new user here.</small>
        </h5>

        <div class="clearfix"></div>

        <form action="#" class="form-dark mt-4" @submit.prevent="submit">

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
                       v-model="fullname"
                       autocomplete="off" />
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
                       v-model="username"
                       autocomplete="off" />
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
                       v-model="email"
                       autocomplete="off" />
            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Password is required!
                </div>

                <div class="clearfix"></div>

                <label for="password">
                    Password
                </label>

                <input type="text"
                       class="form-control"
                       id="password"
                       placeholder="Enter user's password here"
                       v-model="password"
                       autocomplete="off" />

                <input type="text"
                       class="form-control mt-2"
                       id="password_confirmation"
                       placeholder="Re-enter the password here"
                       v-model="password_confirmation"
                       autocomplete="off" />

            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Role is required!
                </div>

                <div class="clearfix"></div>

                <label for="role">
                    Select a role for user
                </label>

                <select v-model="role_id" id="role" class="form-control dark-select">
                    <option value="2" selected="selected">User</option>
                    <option value="1">Admin</option>
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
                baseURL: null,
                fullname: null,
                username: null,
                email: null,
                password: null,
                password_confirmation: null,
                role_id: 2,
            }
        },
        mounted() {
            this.baseURL = this.$store.state.baseURL;
        }
    }

</script>