<template>
    <nav class="navbar headerDiv sticky-top navbar-dark bg-light">
        <router-link id="nameDiv" class="routerLink" :to="{ name : 'Main'}">
            <h3>SadaRada</h3>
        </router-link>
    </nav>
</template>

<script>

    export default {
        name: 'Header',
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
    }
</style>
