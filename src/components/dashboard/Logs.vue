<template>

    <div class="logs p-4">

        <vue-topprogress ref="topProgress" />

        <h5 class="mb-3">
            Logs
            <span class="clearfix"></span>
            <small>
                You can see and manage your logs here.
            </small>
        </h5>

        <div class="clearfix"></div>

        <table class="table table-hover table-dark" v-if="logs.length">
            <thead>
            <tr>
                <th>#</th>
                <th>User</th>
                <th>Event</th>
                <th>Accessory</th>
                <th>Created At</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(log, row) in logs">
                <td class="text-center" style="width:3%">
                    {{ row + 1 }}
                </td>
                <td>
                    <img class="left-side-avatar" :src="baseURL + '/avatars/' + log.user.user_hash + '/' + log.user.avatar">
                    {{ log.user.fullname }}
                </td>
                <td>{{ log.accessory.description }}</td>
                <td>
                    <div class="accessory-badge">
                        <i class="select-icon mr-2" :class="log.accessory.icon"></i>
                        {{ log.accessory.name }}
                    </div>
                </td>
                <td>
                    <i class="fa fa-clock-o"></i>
                    {{ log.created_at | moment('timezone', 'Asia/Tehran', 'dddd, MMMM Do, h:mm a') }}
                </td>
            </tr>

            </tbody>
        </table>

    </div>

</template>

<script>

    import 'moment-timezone';

    export default {
        name: 'Logs',
        data() {
            return {
                baseURL: null,
                logs: [],
            }
        },
        mounted() {

            this.$refs.topProgress.start();

            this.baseURL = this.$store.state.baseURL;

            this.$store.dispatch("getLogs").then(response => {
                this.logs = response.data.result.data;
                this.$refs.topProgress.done();
            }).catch(error => {
                console.log(error);
                this.$refs.topProgress.done();
            })
        }
    }
</script>