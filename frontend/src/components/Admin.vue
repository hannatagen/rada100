<template>
    <div>
        <AdminHeader></AdminHeader>
        <AdminMain></AdminMain>
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

</style>
