<template>

    <div class="profile p-4">

        <h5 class="title-border-bottom">
            Profile
            <span class="clearfix"></span>
            <small>
                You can see and edit your profile here.
            </small>
        </h5>

        <div class="clearfix"></div>

        <form action="#" class="form-dark mt-4" @submit.prevent="submit">

            <div class="form-group">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Enter your fullname here
                </div>

                <div class="clearfix"></div>

                <label for="fullname">Fullname</label>

                <input type="text"
                       class="form-control"
                       id="fullname"
                       placeholder="Enter your fullname here"
                       v-model="user.fullname"
                       autocomplete="off" />
            </div>

            <div class="form-group">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Enter your username here
                </div>

                <div class="clearfix"></div>
                <label for="username">Username</label>

                <input type="text"
                       class="form-control"
                       id="username"
                       placeholder="Enter your username here"
                       v-model="user.username"
                       autocomplete="off" />

            </div>

            <div class="form-group">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Enter your email here
                </div>

                <div class="clearfix"></div>
                <label for="email">Email</label>

                <input type="text"
                       class="form-control"
                       id="email"
                       placeholder="Enter your username here"
                       v-model="user.email"
                       autocomplete="off" />

            </div>

        </form>

    </div>

</template>

<script>
    export default {
        name: 'Profile',
        data() {
            return {
                user: {},
            }
        },
        mounted() {
            this.user = this.$store.state.user;
        }
    }
</script>