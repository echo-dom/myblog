<template>
    <div id="app">
        <!-- 路由占位符 -->
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    html,
    body {
        height: 100%;
        width: 100%;
    }

    html {
        font-size: 12px;
    }
</style>