<template>

    <div class="logs p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2 mb-3">
            <strong class="side-component-title">
                <i class="icofont-notebook text-primary mr-2"></i>
                Logs
                <small class="border-left-title">
                    You can see and manage your logs here.
                </small>
                <i class="icofont-refresh pull-right refresh-btn"
                   @click="getLogs()"></i>
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
                <th>Ran by</th>
                <th>Accessory</th>
                <th>Event</th>
                <th>Logged At</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(log, row) in logs">
                <td class="text-center" style="width:3%">
                    {{ row + 1 }}
                </td>

                <td>

                    <!-- User preview -->
                    <div v-if="log.type === 1">
                        <img class="left-side-avatar"
                             :src="baseURL + '/uploads/avatars/' + log.user.avatar + '.png'"
                             :alt="log.user.fullname" />
                        <strong class="pl-1">{{ log.user.fullname }}</strong>
                    </div>

                    <!-- Webhook preview -->
                    <div v-if="log.type === 2">
                        <i class="webhook-icon icofont-link"></i>
                        <strong class="webhook-title">Webhook</strong>
                    </div>

                </td>

                <td>
                    <div class="accessory-badge">
                        <i class="select-icon mr-2" :class="log.accessory.icon"></i>
                        {{ log.accessory.name }}
                    </div>
                </td>

                <td>{{ log.accessory.description }}</td>

                <td>
                    <i class="fa fa-clock-o"></i>
                    {{ log.created_at | moment('timezone', 'Asia/Tehran', 'dddd, MMMM Do, h:mm a') }}
                </td>

            </tr>

            </tbody>
        </table>

    </div>

</template>

<style>

    .webhook-title {
        display: inline-block;
        margin-left: 10px;
        color: #316cff;
    }

    .webhook-icon {
        font-size: 20px;
        float: left;
        color: #316cff;
    }

</style>

<script>

    import 'moment-timezone';

    export default {
        name: 'Logs',
        data() {
            return {
                logs: [],
            }
        },
        methods: {
            getLogs() {
                this.logs = [];
                this.$refs.topProgress.start();
                this.$store.dispatch("getLogs").then(response => {
                    this.logs = response.data.result.data;
                    this.$refs.topProgress.done();
                }).catch(() => {
                    this.$refs.topProgress.done();
                })
            }
        },
        mounted() {
            this.getLogs();
        }
    }

</script>