<template>
    <div id="routerContainer">
        <router-link class="routerLink" :to="{ name : 'TrailsList'}">Radade nimekiri</router-link>
        <router-link v-if="$store.state.loggedInToken" class="routerLink" :to="{ name : 'Profile'}">Profiil</router-link>
        <router-link class="routerLink" :to="{ name : 'Rules'}">Mängust ja reeglid</router-link>
        <router-link class="routerLink" :to="{ name : 'Contact'}">Kontakt</router-link>
        <router-link class="routerLink" :to="{ name : 'KKK'}">KKK</router-link>
        <router-link v-if="!$store.state.loggedInToken" class="routerLink" :to="{ name : 'Login'}">
            Logi sisse</router-link>
        <a class="routerLink" v-else @click="logout">Logi välja</a>
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
        methods: {
            logout() {
                this.$store.commit('setUserTokenID', null);
                this.$router.push('/');
                this.$store.commit('changePlaying', false);
                this.$store.commit('setFinishTrail', false);
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                document.getElementById('taskContainer').style.visibility = 'hidden'; // closes the task icon if in point radius
            },
        },
    };
</script>

<style scoped>
    #routerContainer {
        display: grid;
        margin-left: -0.7em;
    }
</style>
