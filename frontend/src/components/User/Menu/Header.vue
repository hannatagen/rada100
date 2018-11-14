<template>
    <nav class="navbar headerDiv sticky-top navbar-dark bg-light">
        <div id="headerMenuButton" @click="openSidebar"><i class="fas fa-bars"></i></div>
        <router-link id="nameDiv" class="routerLink" :to="{ name : 'Main'}">
            <h3>SadaRada</h3>
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
    }

    #nameDiv {
        margin-top: 1em;
        margin-left: 4em;
        border: none !important;
    }
    .fa-bars {
        font-size: 2.5em;
    }

    #headerMenuButton {
        cursor: pointer;
    }
</style>
