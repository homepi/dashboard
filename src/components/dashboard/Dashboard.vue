<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />

        <Sidemenu />

        <div class="main-container">
            <keep-alive>
                <router-view name="dashboard" />
            </keep-alive>
        </div>

        <ContextMenu ref="menu">

            <template slot-scope="{ type, contextData }">

                <div class="accessory-menu" v-show="type === 'accessory-menu'">

                    <ContextMenuItem @click.native="">
                        <i class="icofont-edit mr-1"></i>
                        Edit
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="">
                        <i class="icofont-ban mr-1"></i>
                        Disable
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="">
                        <i class="icofont-trash mr-1"></i>
                        Remove
                    </ContextMenuItem>

                </div>

                <div class="users-menu" v-show="type === 'users-menu'">

                    <ContextMenuItem @click.native="">
                        <i class="icofont-edit mr-1"></i>
                        Edit
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="">
                        <i class="icofont-ban mr-1"></i>
                        Block
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="">
                        <i class="icofont-trash mr-1"></i>
                        Remove
                    </ContextMenuItem>

                </div>

                <div class="friend-menu" v-show="type === 'usermenu-actions'">

                    <ContextMenuItem @click.native="redirect('settings')">
                        <i class="icofont-gears mr-1"></i>
                        Settings
                    </ContextMenuItem>

                    <ContextMenuItem @click.native="openLogoutModal()">
                        <i class="icofont-logout mr-1"></i>
                        Logout
                    </ContextMenuItem>

                </div>

            </template>

        </ContextMenu>

        <div class="modal modal-dark fade" id="logoutModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body pb-0">
                        <h5>
                            Are you sure you want to logout from this account?
                        </h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
                            No, im gonna stay!
                        </button>
                        <button type="button" class="btn btn-outline-success" @click="redirectWithModal('logout')">
                            Yeah, get me out!
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import $ from "jquery";
    import Sidemenu from './Sidemenu';
    import ContextMenu from './../models/context-menu/ContextMenu';
    import ContextMenuItem from './../models/context-menu/ContextMenuItem';

    export default {
        name: 'dashboard',
        components: {
            Sidemenu,
            ContextMenu,
            ContextMenuItem,
        },
        data() {
            return {
                clickedAccessory: null,
            }
        },
        methods: {
            redirect(route_name){
                this.$refs.menu.close();
                this.$router.push({ name: route_name });
            },
            openLogoutModal() {
                this.$refs.menu.close();
                $("#logoutModal").modal();
            },
            redirectWithModal(route_name){
                this.$router.push({ name: route_name }).then(() => {
                    $("#logoutModal").modal('hide');
                });
            },
        },
    }

</script>