<template>
    <div>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Radade ja punktide haldus</span>
        </nav>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button @click="[trailsListBtnClicked = true, addTrailBtnClicked = false]"
                    :disabled="trailsListBtnClicked"
                    class="navbarBtn btn btn-dark">Radade nimekiri</button>
            <button @click="[trailsListBtnClicked = false, addTrailBtnClicked = true]"
                    :disabled="addTrailBtnClicked"
                    class="navbarBtn btn btn-dark">Lisa rada</button>
        </nav>
        <AddTrail v-if="addTrailBtnClicked"></AddTrail>
        <AdminTrailsList v-if="trailsListBtnClicked"></AdminTrailsList>
    </div>
</template>

<script>
    import AddTrail from './AddTrail';
    import AdminTrailsList from './AdminTrailsList';

    export default {
        name: "TrailsManagement",
        components: { AddTrail, AdminTrailsList },
        data() {
            return {
                trailsListBtnClicked: true,
                addTrailBtnClicked: false,
            }
        },
    }
</script>

<style scoped>

</style>
