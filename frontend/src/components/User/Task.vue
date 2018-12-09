<template>
    <div id="taskContainer" class="">
        <div class="container">
            <img src="./../../assets/notification.png" alt="Palju õnne!"><br>
            <span class="taskText" v-if="!$store.state.finishedTrail">Jõudsid punkti kohale! <br> Saad ühe punkti.</span>
            <span class="taskText" v-if="$store.state.finishedTrail">Said raja läbitud!</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Task'
    }
</script>

<style scoped>
    #taskContainer {
        top: 60px !important;
        bottom: 45px !important;
        background-color: white;
        height: 100% !important;
        width: 100% !important;
        z-index: 1010;
        position: fixed;
        visibility: hidden;
    }

    .container {
        margin-top: 20vh !important;
        text-align: center;
    }

    .taskText {
        font-size: x-large;
    }

</style>
