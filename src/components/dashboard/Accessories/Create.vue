<template>
    <div class="create_theater p-3">

        <vue-topprogress ref="topProgress" />

        <div class="titlebar pb-2 mb-3">

            <strong class="side-component-title">
                <i class="fa fa-microchip text-primary mr-2"></i>
                Add a new accessory
                <small class="border-left-title">
                    You can add a new accessory here.
                </small>
            </strong>

        </div>

        <div class="clearfix"></div>

        <form action="#" class="form-dark mt-4" @submit.prevent="submit">

            <div class="form-group accessory_name_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Enter your accessory name!
                </div>

                <div class="clearfix"></div>

                <label for="accessory_name">
                    Accessory name
                </label>

                <input type="text"
                       class="form-control"
                       id="accessory_name"
                       name="accessory_name"
                       placeholder="Enter your accessory name here"
                       v-model="accessory_name"
                       autocomplete="off" />
            </div>

            <div class="form-group accessory_desc_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Enter your accessory description!
                </div>

                <div class="clearfix"></div>

                <label for="accessory_description">
                    Accessory description
                </label>

                <input type="text"
                       class="form-control"
                       id="accessory_description"
                       name="accessory_description"
                       placeholder="Enter your accessory description here"
                       v-model="accessory_description"
                       autocomplete="off" />
            </div>

            <div class="form-group accessory_actions_container">

                <div class="badge badge-danger mb-3" style="display: none;">
                    Choose an action!
                </div>

                <div class="clearfix"></div>

                <label>Accessory task</label>
                <div class="clearfix"></div>

                <div class="accessory_actions">

                    <div class="card card-body bg-dark accessory_action"
                         v-on:click="onActionClicked($event, '1')">

                        <img src="../../../assets/icons/doorbell.svg" />
                        <span class="title mt-1">Door</span>
                    </div>

                    <div class="card card-body bg-dark accessory_action"
                         v-on:click="onActionClicked($event, '2')">

                        <img src="../../../assets/icons/lamp-on.svg" />
                        <span class="title mt-1">Lamp</span>
                    </div>

                    <div class="card card-body bg-dark accessory_action"
                         v-on:click="onActionClicked($event, '3')">

                        <img src="../../../assets/icons/switch-on.svg" />
                        <span class="title mt-1">Toggle</span>
                    </div>

                </div>

                <div class="clearfix"></div>

            </div>

            <div class="form-group">
                <div class="custom-control custom-switch">

                    <input type="checkbox"
                           class="custom-control-input"
                           id="trust_switch"
                           v-model="trust_switch"
                           name="trust_switch"
                           checked />

                    <label class="custom-control-label" for="trust_switch">
                        Everybody has access to this accessory!
                    </label>

                </div>

                <Multiselect v-show="!trust_switch"
                             class="mt-3"
                             id="ajax"
                             v-model="selectedUsers"
                             :multiple="true"
                             :preserve-search="true"
                             placeholder="Search for a user to grant access"
                             :option-height="104"
                             :searchable="true"
                             :loading="isLoading"
                             :internal-search="false"
                             :hide-selected="true"
                             :clearOnSelect="true"
                             label="fullname"
                             track-by="id"
                             @search-change="findUser"
                             :options="users">

                    <template slot="option" slot-scope="props">

                        <img class="option__image"
                             :src="baseURL +  '/avatars/' + props.option.user_hash + '/' + props.option.avatar"
                             :alt="props.option.fullname">

                        <div class="option__desc">
                            <span class="option__title">
                                {{ props.option.fullname }}
                            </span>
                        </div>

                    </template>

                </Multiselect>

            </div>

            <div class="form-group p-0 bg-transparent">
                <GpioPins v-on:accessory-pin="updateAccessoryPin"
                          v-on:accessory-pin-type="updateAccessoryPinType" />
            </div>

            <button class="btn btn-primary">
                Submit
            </button>

        </form>

    </div>
</template>

<script>

    import $ from "jquery";

    import GpioPins from "../../models/GpioPins";

    import Multiselect from 'vue-multiselect'
    import '../../../assets/css/vue-multiselect.css';

    export default {
        name: 'CreateAccessory',
        components: {
            GpioPins,
            Multiselect,
        },
        data() {
            return {
                baseURL: null,
                users: [],
                isLoading: false,
                selectedUsers: [],
                action: null,
                trust_switch: true,
                accessory_name: "",
                accessory_description: "",
                gpioError: {
                    type: null,
                    message: null,
                },
                formErrors: {},
                pin: null,
                pinType: null,
                accessory_action: {
                    element: null,
                    name: null,
                },
            }
        },
        methods: {
            searchItemsLabel({ fullname, username }) {
                return `${username} – ${fullname}`
            },
            findUser(query) {
                this.users = [];
                this.isLoading = true;
                this.$store.dispatch('searchUser', {
                    query: query,
                }).then(response => {
                    this.users = response.data.result;
                    this.isLoading = false
                }).catch((error) => {
                    this.isLoading = false;
                })
            },
            clearAll () {
                this.selectedUsers = []
            },
            onChildClick() {
                this.gpioError = {
                    type: "badge-danger",
                    message: "Choose a pin",
                }
            },
            onActionClicked(event, name) {

                if (this.accessory_action.element != null){
                    $(this.accessory_action.element).removeClass("selected");
                }

                let element = $(event.target).closest("div.accessory_action");
                element.addClass("selected");

                this.accessory_action.element = element;
                this.accessory_action.name = name;

                $(".accessory_actions_container").removeClass("has-error");
                $(".accessory_actions_container > .badge").hide();
            },
            submit() {

                if (this.accessory_name === ""){
                    this.formErrors["accessory_name"] =
                        "accessory_name is required!";
                    $(".accessory_name_container").addClass("has-error");
                    $(".accessory_name_container > .badge").show();
                } else {
                    delete this.formErrors["accessory_name"];
                    $(".accessory_name_container").removeClass("has-error");
                    $(".accessory_name_container > .badge").hide();
                }

                if (this.accessory_description === ""){
                    this.formErrors["accessory_description"] =
                        "accessory_description is required!";
                    $(".accessory_desc_container").addClass("has-error");
                    $(".accessory_desc_container > .badge").show();
                } else {
                    delete this.formErrors["accessory_description"];
                    $(".accessory_desc_container").removeClass("has-error");
                    $(".accessory_desc_container > .badge").hide();
                }

                if (this.accessory_action.name == null){
                    this.formErrors["accessory_action"] =
                        "accessory_action.name is required!";
                    $(".accessory_actions_container").addClass("has-error");
                    $(".accessory_actions_container > .badge").show();
                } else {
                    delete this.formErrors["accessory_action"];
                }

                let $gpio_err = $("#gpio_err");

                if (this.pin == null || this.pin.disable || this.pin.used){

                    this.formErrors["pin"] = "pin is required!";

                    $gpio_err.addClass('badge-danger');
                    $gpio_err.find("span").text("Choose a pin!");
                    $gpio_err.show();

                    $(".rasp-board").addClass("has-error");
                } else {

                    delete this.formErrors["pin"];
                    $(".rasp-board").removeClass("has-error");
                }

                if (Object.keys(this.formErrors).length === 0){

                    let accessory = {
                        name: this.accessory_name,
                        description: this.accessory_description,
                        task: this.accessory_action.name,
                        is_public: this.trust_switch,
                        pin_id: this.pin.id,
                        pin_type: "0",
                        accessory_users: [],
                    };

                    if(this.pinType === "bcm") {
                        accessory.pin_type = "2";
                    } else if(this.pinType === "board") {
                        accessory.pin_type = "1";
                    }

                    if (!accessory.is_public){
                        if(this.selectedUsers.length !== 0){
                            for (let i in this.selectedUsers) {
                                let user = this.selectedUsers[i];
                                accessory.accessory_users.push(user.id)
                            }
                        }
                    }

                    this.$refs.topProgress.start();

                    this.$store.dispatch('createAccessory', accessory).then(() => {

                        this.$notify({
                            group: 'dashboard',
                            type: 'success',
                            text: "Accessory created successfully!",
                            title: "Success",
                            duration: 5000,
                        });

                        this.$refs.topProgress.done();

                        this.$router.push({
                            name: 'accessories',
                            params: {
                                reloard: true,
                            },
                        });

                    }).catch(() => {

                        this.$notify({
                            group: 'dashboard',
                            type: 'error',
                            text: "Could not create accessory, please try again later!",
                            duration: 5000,
                        });

                        this.$refs.topProgress.done();

                    })
                }
            },
            updateAccessoryPin(pin) {
                this.pin = pin;
            },
            updateAccessoryPinType(pinType) {
                this.pinType = pinType;
            }
        },
        created() {
            this.baseURL = this.$store.state.baseURL;
        }
    }

</script>

<style>

    .accessory_action {
        margin-right: 10px;
        float: left;
        cursor: pointer;
        width: 95px;
        text-align: center;
    }

    .accessory_action:hover, .accessory_action.selected {
        background: #007bff !important;
    }

    .accessory_action > span {
        margin: 0;
        padding: 0;
    }

    .accessory_action > img {
        width: 30px;
        margin: 0 auto;
    }

    .rasp-board.has-error {
        background: rgba(255, 0, 24, 0.08) !important;
    }

</style>