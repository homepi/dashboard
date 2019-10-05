<template>
    <div class="titlebar">
        <span>SmartHome</span>
        <i class="fa fa-refresh refresh-page-btn"></i>
    </div>
</template>

<style>

    .refresh-page-btn {
        float: right;
        display: block;
        position: absolute;
        right: 5px;
        top: 4px;
    }

    .titlebar {
        -webkit-app-region: drag;
        background: #181818 !important;
        height: 22px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        align-content: center;
        display: grid;
        position: fixed;
        right: 0;
        top: 0;
    }
</style>