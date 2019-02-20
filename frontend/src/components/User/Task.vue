<template>
    <div id="taskContainer">
        <div v-if="!taskOpened" class="container subTaskContainer">
            <img src="./../../assets/star.png" alt="Palju õnne!"><br>
            <div v-if="!taskCompleted">
                <span class="taskText" v-if="!$store.state.finishedTrail">Jõudsid punkti kohale! <br> Saad ühe punkti.</span>
                <span class="taskText" v-if="$store.state.finishedTrail">Said raja läbitud!</span>
                <br><br>
                <p>Soovi korral saad lisaks lahendada ülesande ja teenida boonuspunkti klikkides nupule "Ülesanne" või jätkata mängu
                    klikkides nupule "Jätka mängu".</p>
                <button @click="taskOpened = !taskOpened" class="btn btn-primary">Ülesanne</button>
            </div>
            <div v-else>
                <span class="taskText">Teenisid punkti jõudmise ja ülesande lahendamise eest kokku kaks punkti!</span>
                <br><br>
                <p>Jätka mängu ja otsi üles järgmine punkt.</p>
            </div>
            <br><br>
            <button @click="hideTaskContainer()" class="btn contGameBtn">Jätka mängu</button>
            <br><br>
        </div>
        <div v-else class="container subTaskContainer">
            <div class="card">
                <div class="card-header taskCardHeader">
                    <h5>
                        Punkti nimi
                    </h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item taskCardListItem">
                        <h6 class="card-title">Ülesanne:</h6>
                    </li>
                    <li class="list-group-item taskCardListItem">
                        <h6 class="card-title">Lahendus:</h6>
                    </li>
                </ul>
            </div>
            <br><br>
            <button @click="completeTask()" class="btn contGameBtn">Saada</button>
        </div>
    </div>
</template>

<script>
    import { serverBus } from '../../main';

    export default {
        name: 'Task',
        data() {
            return {
                taskOpened: false,
                taskCompleted: false,
            };
        },
        methods: {
            hideTaskContainer() {
                document.getElementById('taskContainer').style.visibility = 'hidden';
                serverBus.$emit('arrived',false);
            },
            completeTask() {
                this.taskCompleted = !this.taskCompleted;
                this.taskOpened = !this.taskOpened;
            }
        },
    }
</script>

<style scoped>
    #taskContainer {
        top: 60px !important;
        /*bottom: 45px !important;*/
        background-color: white;
        height: 84% !important;
        width: 100% !important;
        z-index: 1010;
        position: fixed;
        overflow: scroll !important;
        visibility: hidden;
    }

    .subTaskContainer {
        width: 50%;
        min-width: 20em;
        margin-top: 3vh !important;
        text-align: center;
    }

    .taskText {
        font-size: x-large;
    }

    .contGameBtn {
        background-color: darkgreen;
        color: white;
    }

    .taskCardListItem {
        text-align: left;
    }

    .taskCardHeader {
        background-color: darkgreen;
        color: white;
    }

</style>
