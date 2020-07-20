<template>

    <div class="rasp-board rasp-board-dark full-width">

        <div class="clearfix"></div>

        <div class="pull-left m-2">

            <label>Accessory pin</label>

            <div class="clearfix"></div>
            <span>Choose your accessory gpio pin.</span>

        </div>

        <span id="gpio_err" class="badge text-center pull-right m-2 p-1"
              v-show="error.message"
              v-bind:class="[error.type]">
            <span></span>
            {{ error.message }}
        </span>

        <div class="clearfix"></div>

        <div class="pins pins-dark">

            <div v-bind:data-id="pin.id"
                 v-for="pin in pins.top"
                 v-bind:class="{ pin, pin_enable: !pin.disable, pin_used: pin.used }"
                 v-on:click="onPinClicked(pin)">

                <span v-if="pin.id === 0">
                    <i class="fa fa-circle-o-notch"></i>
                </span>
                <span v-else>{{ pin.id }}</span>

            </div>

            <div class="clearfix"></div>

            <div v-bind:data-id="pin.id"
                 v-for="pin in pins.bottom"
                 v-bind:class="{ pin, pin_enable: !pin.disable, pin_used: pin.used }"
                 v-on:click="onPinClicked(pin)">

                <span v-if="pin.id === 0">
                    <i class="fa fa-circle-o-notch"></i>
                </span>
                <span v-else>{{ pin.id }}</span>

            </div>

            <loader v-show="loading"
                    class="pull-right"
                    name="ball-clip-rotate-multiple"
                    color="white"
                    scale="1" />

        </div>

    </div>

</template>

<script>

    import $ from "jquery";

    export default {
        name: "GpioPins",
        data() {
            return {
                loading: true,
                selectedPin: {
                    element: null,
                    id: null,
                },
                error: {
                    type: null,
                    message: null,
                },
                pins: {
                    top: null,
                    bottom: null,
                },
            }
        },
        methods: {
            onPinClicked(pin) {

                this.$emit("accessory-pin", pin);

                if (this.selectedPin.element != null) {
                    this.selectedPin.element.removeClass("pin_selected");
                }

                if (pin.disable || pin.used){
                    if (pin.id !== 0){

                        let message = "Pin " + pin.id + " is not available!";

                        if (pin.used){
                            message = "Pin " + pin.id + " is busy!";
                        }

                        this.error = {
                            type: "badge-danger",
                            message: message
                        };

                        $(".rasp-board").addClass("has-error");
                        $("#gpio_err > span").text("");

                    } else {
                        this.error = {
                            type: "badge-danger",
                            message: "Pin is not available!",
                        };

                        $(".rasp-board").addClass("has-error");
                        $("#gpio_err > span").text("");
                    }
                } else {

                    this.selectedPin.element = $('div[data-id="' + pin.id + '"]');
                    this.selectedPin.element.addClass("pin_selected");

                    this.selectedPin.id = pin.id;

                    this.error = {
                        type: "badge-primary",
                        message: "Pin " + pin.id + " selected!",
                    };

                    $(".rasp-board").removeClass("has-error");
                    $("#gpio_err > span").text("");
                }
            },
            loadPins() {

                this.loading = true;

                this.$store.dispatch("getPins").then(response => {
                    this.pins = response.data.result;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        title: error.message,
                        text: "Please check your network connection!",
                        duration: 5000,
                    });
                });
            }
        },
        created() {
            this.loadPins();
        }
    }
</script>

<style>

    .badge > label {
        margin: 5px;
    }

    select#pins_type {
        background: transparent;
        border: 0;
        padding: 0;
        float: right;
        font-weight: bold;
        text-decoration: underline;
        margin: 2px 0 0;
    }

</style>