<template>
    <div id="app">
        <Header></Header>
        <SideBar></SideBar>
    </div>
</template>

<script>
    import SideBar from './User/Menu/SideBar';
    import Header from './User/Menu/Header';
    import Info from './User/Menu/Info';

    export default {
        name: 'User',
        components: { Header, SideBar, Info },
    };
</script>

<style scoped>
</style>
