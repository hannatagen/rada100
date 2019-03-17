<template>
    <div>
        <AdminSidebar v-if="$route.name !== 'AdminLogin'"></AdminSidebar>
        <router-view/>
    </div>
</template>

<script>
    import AdminSidebar from './Menu/AdminSidebar';

    export default {
        name: "AdminContent",
        components: { AdminSidebar }
    }
</script>

<style scoped>

</style>
