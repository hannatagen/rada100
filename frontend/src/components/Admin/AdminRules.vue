<template>
    <div class="container">
        <h1>Reeglite ja tutvustuse muutmine</h1>
        <VueTrix v-model="rules"/>
    </div>
</template>

<script>
    import VueTrix from 'vue-trix';
    import AdminHeader from './Menu/AdminHeader';

    export default {
        name: 'AdminRules',
        components: {
            AdminHeader,
            VueTrix,
        },
        data() {
            return {
                rules: '',
            };
        },
    };
</script>

<style scoped>

</style>