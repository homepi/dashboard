<template>

    <div class="accessories p-4">

        <vue-topprogress ref="topProgress" />

        <div class="all-accessories">

            <h5 class="mb-3">
                Accessories
                <span class="clearfix"></span>
                <small>
                    You can see and manage your accessories here.
                </small>
            </h5>

            <div v-show="!accessories.length">
                There's nothing here ...
            </div>

            <div class="card card-accessory text-white bg-darker mb-3"
                 v-for="accessory in accessories" @click="openTaskModal(accessory)">

                <div class="card-header">

                    <!-- Icon -->
                    <i class="select-icon" v-bind:class="accessory.icon"></i>

                    <!-- Title -->
                    <span class="fa-pull-left mr-1 ml-2 mb-0">
                        {{ accessory.name }}
                    </span>

                    <strong>|</strong>

                    <!-- Description -->
                    <small>{{ accessory.description }}</small>

                    <!-- Status -->
                    <span class="badge badge-success ml-2" v-show="accessory.is_active">
                        Active
                    </span>

                    <span class="badge badge-danger ml-2" v-show="!accessory.is_active">
                        Deactive
                    </span>

                    <!--<div class="actions pull-right">-->
                        <!--<i class="fa fa-trash"></i>-->
                    <!--</div>-->

                </div>
            </div>

        </div>

        <div class="modal modal-dark fade" id="taskModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-0">
                        <h5>
                            Are you sure you want to run {{ clickedAccessory.name }} accessory?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, never mind!
                        </button>
                        <button type="button" class="btn btn-outline-success" @click="runClickedAccessory">
                            Yeah, run it!
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import $ from 'jquery';
    import "@/assets/css/accessories.css";

    export default {
        name: 'Index',
        data() {
            return {
                accessories: [],
                clickedAccessory: {},
            }
        },
        methods: {
            openTaskModal(accessory) {
                this.clickedAccessory = accessory;
                $("#taskModal").modal();
            },
            runClickedAccessory() {

                this.$refs.topProgress.start();

                this.$store.dispatch("runAccessory", this.clickedAccessory.id).then(() => {

                    $("#taskModal").modal('hide');

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "Task ran successfully!",
                        title: "Success",
                        duration: 5000,
                    });

                    this.$refs.topProgress.done();

                }).catch(error => {

                    console.log(error.response.data);

                    let message = error.response.data.result.message;

                    $("#taskModal").modal('hide');

                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Could not run accessory, please try again later!",
                        title: message,
                        duration: 5000,
                    });

                    this.$refs.topProgress.done();

                })
            }
        },
        mounted() {

            this.$refs.topProgress.start();

            this.$store.dispatch("getAccessories").then(response => {
                this.accessories = response.data.result.data;
                this.$refs.topProgress.done();
            }).catch(() => {
                this.$refs.topProgress.done();
            })
        }
    }

</script>

<style>

    .modal-dark .modal-body {
        margin-top: 10px;
        text-align: center;
    }

    .modal-dark .modal-footer {
        border: none;
        display: block;
        margin: 0 auto;
    }

    .modal-dark .modal-content {
        background-color: #181818 !important;
    }

    .card-accessory {
        border: 0;
        cursor: pointer;
    }

    .card-accessory:hover {
        background: #007bff !important;
    }

    .bg-darker {
        background: #181818 !important;
    }

</style>