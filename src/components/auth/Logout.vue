<template>
    <div>
        Hang on a second...
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({ name: 'login' }).then(() => {
                    this.$notify({
                        group: 'auth',
                        type: 'success',
                        text: "Logout successfully!",
                        title: "Success",
                        duration: 2000,
                    });
                });
            })
        }
    }
</script>