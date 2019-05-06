<template>
    <div>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Radade ja punktide haldus</span>
        </nav>
        <nav    v-if="!$store.state.modifyTrailModeActive"
                class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button @click="[$store.commit('setModifyModeActive',false), $store.commit('setModifyTrailId', null)]"
                    class="navbarBtn btn btn-dark">Radade nimekiri</button>
            <button @click="[$store.commit('setModifyModeActive',true), $store.commit('setModifyTrailId', null)]"
                    class="navbarBtn btn btn-dark">Lisa rada</button>
        </nav>
        <TrailModification v-if="$store.state.modifyTrailModeActive"></TrailModification>
        <AdminTrailsList v-else></AdminTrailsList>
    </div>
</template>

<script>
    import AddTrail from './AddTrail';
    import TrailModification from './TrailModification';
    import AdminTrailsList from './AdminTrailsList';

    export default {
        name: "TrailsManagement",
        components: { TrailModification, AdminTrailsList },
    }
</script>

<style scoped>

</style>
