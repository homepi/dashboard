<template>

    <div class="accessories p-3">

        <vue-topprogress ref="topProgress" />

        <div class="all-accessories">

            <div class="titlebar pb-2 mb-3">
                <strong class="side-component-title">
                    <i class="fa fa-microchip text-primary mr-2"></i>
                    Accessories
                    <small class="border-left-title">
                        You can see and manage your accessories here.
                    </small>
                </strong>
            </div>

            <div v-show="!accessories.length">
                There's nothing here ...
            </div>

            <div class="card card-accessory text-white bg-darker mb-3"
                 v-for="accessory in accessories" @click="openTaskModal(accessory)">

                <div class="card-header">

                    <!-- Icon -->
                    <i class="select-icon" v-bind:class="accessory.icon"></i>

                    <!-- Title -->
                    <span class="fa-pull-left ml-2 mb-0">
                        {{ accessory.name }}
                    </span>

                    <strong class="mr-1 ml-1">|</strong>

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
            },
            getAccessories() {
                this.$refs.topProgress.start();
                this.$store.dispatch("getAccessories").then(response => {
                    this.accessories = response.data.result;
                    this.$refs.topProgress.done();
                }).catch(() => {
                    this.$refs.topProgress.done();
                })
            }
        },
        activated() {
            if (this.$route.params.reloard){
                this.getAccessories();
            }
        },
        mounted() {
            this.getAccessories();
        }
    }

</script>

<style>

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