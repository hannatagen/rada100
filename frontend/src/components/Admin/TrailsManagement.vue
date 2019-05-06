<template>
    <div>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Radade ja punktide haldus</span>
        </nav>
        <nav    v-if="!$store.state.modifyTrailModeActive"
                class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button @click="[$store.commit('setModifyModeActive',false), $store.commit('setModifyTrailId', null)]"
                    class="navbarBtn btn btn-dark">Radade nimekiri</button>
            <button @click="addTrailBtnClickEvent"
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
    import { serverBus } from '../../main';

    export default {
        name: "TrailsManagement",
        components: { TrailModification, AdminTrailsList },
        methods: {
          addTrailBtnClickEvent() {
              this.$store.commit('setModifyModeActive',true);
              serverBus.$emit('trailSelected', null);
          }
        },
    }
</script>

<style scoped>

</style>
