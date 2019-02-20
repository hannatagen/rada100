<template>
    <div>
        <AdminHeader></AdminHeader>
        <router-view/>
    </div>
</template>

<script>
    import AdminHeader from './Admin/Menu/AdminHeader';
    import AdminMain from "./Admin/AdminMain";

    export default {
        name: 'Admin',
        components: {AdminMain, AdminHeader },
    };
</script>

<style scoped>

</style>
