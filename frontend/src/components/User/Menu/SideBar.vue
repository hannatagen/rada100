<template>
    <nav id="sidebar">
        <div id="dismiss" @click="closeSidebar">
            <i class="fas fa-times"></i>
        </div>
        <router-link v-if="$route.name !== 'Main'" class="routerLink"
                     :to="{ name : 'Main'}">Tagasi...</router-link>
        <router-view/>
    </nav>
</template>

<script>
    export default {
        name: "Slide",
        methods: {
            closeSidebar() {
              document.getElementById('sidebar').style.visibility = 'hidden';
            },
        },
    };
</script>

<style scoped>
    .sidebarHeadline{
        padding-bottom: 1em;
    }

    .sidebarContainer {
        display: grid !important;
        color: black ;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        /* top layer */
        z-index: 9999;
        visibility: hidden;
    }

    #dismiss {
        width: 35px;
        height: 35px;
        position: absolute;
        /* top right corner of the sidebar */
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .fa-times {
        font-size: 2em;
    }
</style>
