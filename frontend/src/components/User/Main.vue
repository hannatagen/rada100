<template>
    <div id="routerContainer">
        <router-link class="routerLink" :to="{ name : 'TrailsList'}">Radade nimekiri</router-link>
        <router-link class="routerLink" :to="{ name : 'Profile'}">Profiil</router-link>
        <router-link class="routerLink" :to="{ name : 'Rules'}">Mängust ja reeglid</router-link>
        <router-link class="routerLink" :to="{ name : 'Contact'}">Kontakt</router-link>
        <router-link class="routerLink" :to="{ name : 'KKK'}">KKK</router-link>
        <router-link class="routerLink" :to="{ name : 'Login'}">
            <template v-if="$store.state.loggedInToken">Logi sisse</template>
            <template v-else>Logi välja</template>
        </router-link>
    </div>
</template>

<script>

    export default {
        name: 'Main',
        components: {
        },
        data() {
            return {
            };
        },
    };
</script>

<style scoped>
    #routerContainer {
        display: grid;
        margin-left: -0.7em;
        width: 120% !important;
    }
</style>
