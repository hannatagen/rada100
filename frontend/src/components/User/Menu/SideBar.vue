<template>
    <Reveal>
        <router-link v-if="$route.name !== 'Main'" class="routerLink"
                     :to="{ name : 'Main'}">Tagasi...</router-link>
        <router-view/>
    </Reveal>
</template>

<script>
    import { Reveal } from 'vue-burger-menu';

    export default {
        name: 'SideBar',
        components: {
            Reveal,
        },
        created() {
            // eslint-disable-next-line

            this.document.removeEventListener('click', Reveal.documentClick());
        },
    };
</script>

<style>
    .routerLink {
        text-decoration: none !important;
        font-weight: bolder;
        color: black;
        padding-left: 1.5em;
        margin-bottom: 0.4em;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
    }
    .routerLink:hover {
        color: darkgreen;
    }
    .sidebarHeadline{
        padding-bottom: 1em;
    }

    .sidebarContainer {
        display: grid !important;
        color: black ;
    }
</style>
