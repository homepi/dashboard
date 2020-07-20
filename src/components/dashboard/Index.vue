<template>

    <div class="accessories p-3">

        <Health />

        <vue-topprogress ref="topProgress" />

        <div class="all-accessories">

            <div class="titlebar pb-2 mb-3">
                <strong class="side-component-title">
                    <i class="icofont-micro-chip text-primary mr-2"></i>
                    Accessories
                    <small class="border-left-title">
                        You can see and manage your accessories here.
                    </small>
                    <i class="icofont-refresh pull-right refresh-btn"
                       @click="getAccessories()"></i>
                </strong>
            </div>

            <div v-show="!accessories.length">
                There's nothing here ...
            </div>

            <div class="card card-accessory text-white bg-darker mb-3"
                 v-for="accessory in accessories"
                 @contextmenu.prevent="$parent.$refs.menu.open($event, 'accessory-menu', accessory)"
                 @click.prevent.stop="openTaskModal(accessory)">

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

    </div>

</template>

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

    .all-accessories {
        margin-right: 300px;
    }

</style>

<script>

    import "@/assets/css/accessories.css";

    import $ from "jquery";
    import Health from "./Health";

    export default {
        name: 'Index',
        components: {
            Health,
        },
        data() {
            return {
                accessories: [],
                clickedAccessory: {}
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

                    let message = error.response.data.message;

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
                this.accessories = [];
                this.$refs.topProgress.start();
                this.$store.dispatch("getAccessories").then(response => {
                    this.accessories = response.data.result.data;
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