<template></template>

<script>
    export default {
        created() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({ name: 'login' })
            })
        }
    }
</script>