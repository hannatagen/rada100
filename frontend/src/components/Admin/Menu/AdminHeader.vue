<template>
    <div>
        <ul>
            <li><router-link :to="{ name : 'AdminRules'}">Tutvustus ja reegild</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'AdminHeader',
    };
</script>

<style scoped>

</style>
