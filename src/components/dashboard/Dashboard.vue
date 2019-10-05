<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <Sidemenu :user="user" />

        <div class="main-container">
            <router-view name="dashboard" />
        </div>

        <!--<Health />-->

    </div>

</template>

<script>

    import Health from './Health';
    import Sidemenu from './Sidemenu';

    export default {
        name: 'Dashboard',
        components: {
            Sidemenu,
            Health
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