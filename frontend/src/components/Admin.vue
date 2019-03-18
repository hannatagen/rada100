<template>
    <div id="adminContainer">
        <!--<AdminHeader></AdminHeader>-->
        <AdminMain id="adminMainContainer"></AdminMain>
    </div>
</template>

<script>
    import AdminHeader from './Admin/Menu/AdminHeader';
    import AdminMain from "./Admin/AdminMain";

    export default {
        name: 'Admin',
        components: { AdminMain, AdminHeader },
    };
</script>

<style scoped>
    #adminContainer {
        max-width: 100vw !important;
    }
</style>
