<template>

    <div class="mt-5">

        <notifications group="auth" position="top center" :max="1" />

        <vue-topprogress ref="topProgress" />

        <form class="col-md-4 offset-md-4 login-form text-center"
              action="#"
              @submit.prevent="login">

            <h2>Login</h2>

            <div id="serverError">
                <div class="alert alert-danger" v-if="serverError">
                    <strong>{{ serverError }}</strong>
                </div>
            </div>

            <div class="form-group">
                <input type="text"
                       class="form-control"
                       id="username"
                       placeholder="Username or Email"
                       autofocus="autofocus"
                       v-model="username"
                       required="required" />

                <small v-if="errors.user" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.user }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <input type="password"
                       class="form-control"
                       name="password"
                       placeholder="Password"
                       v-model="password"
                       required="required" />

                <small v-if="errors.pass" class="text-danger fa-pull-left text-left">
                    <span class="clearfix">
                        {{ errors.pass }}
                    </span>
                </small>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span class="lds-ring-container" v-if="loading">
                        <span class="lds-ring">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </span>
                    Login
                </button>
            </div>

        </form>

    </div>
</template>

<script>

    const $ = require("jquery");

    export default {
        name: 'login',
        data() {
            return {
                errors: {},
                username: '',
                password: '',
                loading: false,
                serverError: '',
            }
        },
        methods: {
            login() {

                this.loading = true;
                this.serverError = "";
                $('#serverError').removeClass();
                this.$refs.topProgress.start();

                this.$store.dispatch('createAuthToken', {
                    username: this.username,
                    password: this.password,
                }).then(() => {

                    this.errors = {};
                    this.loading = false;
                    this.serverError = "";

                    this.$notify({
                        group: 'auth',
                        type: 'success',
                        text: "Login successfully! Please wait ...",
                        title: "Success",
                        duration: 2000,
                    });

                    setTimeout(() => {
                        this.$refs.topProgress.done();
                        this.$router.push({ name: 'dashboard' })
                    }, 1000);

                }).catch(error => {

                    $('#serverError')
                        .addClass('shake animated')
                        .one('webkitAnimationEnd' +
                            ' mozAnimationEnd ' +
                            'MSAnimationEnd ' +
                            'oanimationend ' +
                            'animationend', () => {
                                $(this).removeClass();
                            });

                    this.errors = {};
                    this.loading = false;

                    if (typeof error.response !== "undefined"){

                        if(error.response.status === 404) {
                            this.serverError = "User does not exists! Please enter your username or email correctly!";
                            this.password = '';
                        } else if(error.response.status === 401){
                            this.serverError = "Password does not match with user!";
                            this.password = '';
                        } else {
                            this.serverError = "Cannot connect to server, Please contact your server administrator!";
                            this.password = '';
                        }
                    }

                    this.$refs.topProgress.done();
                })
            }
        }
    }

</script>