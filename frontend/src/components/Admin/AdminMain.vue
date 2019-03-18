<template>
    <div>
        <AdminSidebar v-if="$route.name !== 'AdminLogin'"></AdminSidebar>
        <div id="contentContainer">
            <div id="greetingDiv" v-if="$route.name === 'AdminMain'">
                <h1>Tere tulemast!</h1>
                <h4>Alustamiseks vali vasakult menüüst sobiv tegevus.</h4>
            </div>
            <router-view v-else/>
        </div>
    </div>
</template>

<script>
    import AdminSidebar from './Menu/AdminSidebar';

    export default {
        name: "AdminContent",
        components: { AdminSidebar }
    }
</script>

<style scoped>
    #contentContainer {
        position: fixed;
        top: 4em;
        left: 200px;
        margin-right: 0 !important;
        text-align: center;
        width: 100vw;
        height: 100vh;
    }

    @media only screen and (min-width: 700px) {
        #contentContainer {
            top: 4em;
            padding-right: 12em;
            left: 200px;
            width: 100vw;
        }
    }

    @media only screen and (max-width: 700px) {
        #contentContainer {
            top: 0;
            padding-right: 1em;
            padding-left: 0.5em;
            left: 60px;
        }
    }
    @media only screen and (max-width: 700px) {
        #contentContainer {
            width: auto;
        }
    }

    #greetingDiv {
        margin-top: 25vh;
    }
</style>
