<template>
    <nav class="navbar headerDiv sticky-top navbar-dark bg-light">
        <div id="headerMenuButton" @click="openSidebar"><i class="fas fa-bars"></i></div>
        <router-link id="nameDiv" class="routerLink" :to="{ name : 'Main'}">
            <h3>PärimusRajad</h3>
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'Header',
        methods: {
          openSidebar() {
              document.getElementById('sidebar').style.visibility = 'unset';
          }
        },
    };
</script>

<style scoped>
    .headerDiv {
        text-align: left;
        height: 4em;
        display: flex;
    }

    #nameDiv {
        /*margin-top: 1em;*/
        margin-left: 4em;
        border: none !important;
        margin-top: 0.2em;
    }
    .fa-bars {
        font-size: 2.5em;
    }

    #headerMenuButton {
        cursor: pointer;
        position: absolute;
        margin-top: 0.2em;
    }
</style>
