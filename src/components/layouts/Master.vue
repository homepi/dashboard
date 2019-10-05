<template>
    <div class="application">
        <Titlebar />
        <div class="main-app">
            <transition name="router-animation"
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                        mode="out-in">
                <router-view name="main"
                             style="animation-duration: 0.3s !important;" />
            </transition>
        </div>
    </div>
</template>

<script>

    import "animate.css/animate.min.css";
    import Titlebar from "../models/Titlebar";

    export default {
        components: {
            Titlebar
        },
        computed: {
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        }
    }

</script>