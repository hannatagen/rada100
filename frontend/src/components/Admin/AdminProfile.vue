<template>
    <div class="adminProfileContainer">
        <nav class="adminSubHeader">
            <p class="adminSubHeaderTitle">Minu konto</p>
        </nav>
        <div class="card adminCard">
            <div class="card-body">
                <strong class="card-title">Nimi: </strong>
                <div> Hanna Tagen{{ username }}</div>
                <br>
                <strong class="card-title">Email: </strong>
                <div> hanna.tagen@gmail.com{{ email }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminProfile"
    }
</script>

<style scoped>
    /*.adminCard {*/
        /*left: 50%;*/
        /*width: 30em;*/
    /*}*/

    .adminProfileContainer {
        text-align: center;
    }
</style>
