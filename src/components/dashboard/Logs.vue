<template>

    <div class="logs p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2 mb-3">
            <strong class="side-component-title">
                <i class="fa fa-sticky-note text-primary mr-2"></i>
                Logs
                <small class="border-left-title">
                    You can see and manage your logs here.
                </small>
            </strong>
        </div>

        <div v-show="!logs.length">
            There's nothing here ...
        </div>

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
                    <img class="left-side-avatar" :src="baseURL + '/uploads/avatars/' + log.user.avatar + '.png'">
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
                    {{ log.created_at.seconds | moment('timezone', 'Asia/Tehran', 'dddd, MMMM Do, h:mm a') }}
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
                this.logs = response.data.result;
                this.$refs.topProgress.done();
            }).catch(error => {
                console.log(error);
                this.$refs.topProgress.done();
            })
        }
    }

</script>