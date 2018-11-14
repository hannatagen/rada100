<template>
    <nav id="sidebar">
        <router-link id="menuBack" v-if="$route.name !== 'Main'" class="routerLink"
                     :to="{ name : 'Main'}"><i class="fas fa-arrow-left"></i></router-link>
        <div id="dismiss" @click="closeSidebar">
            <i class="fas fa-times"></i>
        </div>
        <div class="sidebarContainer">
            <router-view/>
        </div>
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
        color: black;
        margin-top: 5em;
        margin-left: 0.5em;
        margin-right: 0.5em;
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
        top: 1em;
        right: 0.5em;
        cursor: pointer;
    }

    #dismiss:hover {
        color: darkgreen;
    }

    .fa-times, .fa-arrow-left {
        font-size: 2em;
    }

    #menuBack {
        position: absolute;
        top: 1em;
        left: 0.5em;
        width: 0;
        border: none !important;
    }
</style>
