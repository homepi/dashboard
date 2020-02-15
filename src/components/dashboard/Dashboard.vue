<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <Sidemenu :user="user" />

        <div class="main-container">
            <keep-alive>
                <router-view name="dashboard" />
            </keep-alive>
        </div>

    </div>

</template>

<script>

    import Sidemenu from './Sidemenu';

    export default {
        name: 'Dashboard',
        components: {
            Sidemenu,
        },
        data() {
            return {
                user: {},
            }
        },
        mounted() {
            this.$store.dispatch("getUser").then(response => {
                this.user = response.data.result;
            });
        }
    }

</script>