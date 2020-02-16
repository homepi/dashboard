<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <Sidemenu />

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
        }
    }

</script>