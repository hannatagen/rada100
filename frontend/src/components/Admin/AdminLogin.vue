<template>
    <div>
        <h1>Admin logi sisse</h1>
        <button><router-link :to="{ name : 'AdminMain'}">Logi sisse</router-link></button>
    </div>
</template>

<script>
    export default {
        name: 'AdminLogin',
    };
</script>

<style scoped>

</style>
