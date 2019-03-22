<template>
    <div id="trailsModificationContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button @click="$store.commit('setModifyModeActive',false)"
                    class="navbarBtn btn btnGreen">Salvesta</button>
            <button class="navbarBtn btn btn-danger">Katkesta</button>
        </nav>
        <br>
        <h5 class="card-title">Nimetus:</h5>
        <input v-model="name" type="text" class="trailModificationInput form-control" aria-label="Name">
        <br>
        <h5 class="card-title">Kirjeldus:</h5>
        <textarea v-model="description" class="trailModificationTextArea form-control" aria-label="Description"></textarea>
        <br>
        <h5 class="card-title">Punktid:</h5>
        <input v-model="search" class="form-control" placeholder="Filtreeri punkte nimetuse või kirjelduse järgi...">
        <br>
        <table id="trailsTable" class="table table-hover sortable">
            <thead>
            <tr>
                <th>ID</th>
                <th>
                    <a class="tableColumnTitle" href="#" @click="sortByName">
                        Nimetus
                        <i class="fas fa-arrows-alt-v"></i>
                    </a>
                </th>
                <th>
                    <a class="tableColumnTitle" href="#" @click="sortByDesc">
                        Kirjeldus
                        <i class="fas fa-arrows-alt-v"></i>
                    </a>
                </th>
                <th>Muuda</th>
                <th>Kustuta</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="point in pointsList" :key="point.pointId">
                <td>{{ pointsList.indexOf(point) + 1 }}</td>
                <td>{{ point.name }}</td>
                <td>{{ point.description }}</td>
                <!--<td><i @click="modifyTrail(point.pointId)" class="editTrailBtn fas fa-edit"></i></td>-->
                <!--<td><i @click="deleteTrail(point)" class="deleteTrailBtn fas fa-trash-alt"></i></td>-->
                <td><i class="editTrailBtn fas fa-edit"></i></td>
                <td><i class="deleteTrailBtn fas fa-trash-alt"></i></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {AXIOS} from './.././http-common'

    export default {
        name: "TrailModification",
        data() {
            return {
                trailId: '',
                name: '',
                description: '',
                pointsListOriginal: [],
                pointsList: [],
                sortKey: '',
                reverse: false,
                search: ''
            };
        },
        watch: {
            search: function (val) {
                this.pointsList = this.pointsListOriginal.filter(trail => trail.name.toLowerCase().includes(val.toLowerCase(),0) || trail.description.toLowerCase().includes(val.toLowerCase(),0))
            }
        },
        methods: {
            trailData(trail) {
                this.name = trail.name;
                this.description = trail.description;

                AXIOS.get('/api/trails/' + this.trailId + '/points/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.pointsListOriginal = response.data;
                        this.pointsList = this.pointsListOriginal;

                    })
                    .catch(error => {
                        //eslint-disable-next-line
                        console.log(error)
                    }
                );
            },
            sortByName() {
                this.reverse = (this.sortKey === 'name') ? ! this.reverse : false;
                this.pointsList.sort(function (a,b) {
                    let pointA = a,
                        pointB = b;
                    if (pointA.name < pointB.name) return -1;
                    if (pointA.name > pointB.name) return 1;
                    return 0;
                });
                if (this.reverse) this.pointsList.reverse();
                this.sortKey = 'name';
            },
            sortByDesc() {
                this.reverse = (this.sortKey === 'description') ? ! this.reverse : false;
                this.pointsList.sort(function (a,b) {
                    let pointA = a,
                        pointB = b;
                    if (pointA.description < pointB.description) return -1;
                    if (pointA.description > pointB.description) return 1;
                    return 0;
                });
                if (this.reverse) this.pointsList.reverse();
                this.sortKey = 'description';
            },
        },
        mounted() {
            this.trailId = this.$store.state.modifyTrailId;

            AXIOS.get('/api/trails/' + this.trailId)
                .then(response => {
                    // JSON responses are automatically parsed.
                    const trail = response.data;
                    this.trailData(trail);
                })
                .catch(error => {
                    //eslint-disable-next-line
                    console.log(error)
                });
        }
    }
</script>

<style scoped>
    #trailsModificationContainer {
        text-align: left;
        padding-bottom: 2em;
    }

     .trailModificationInput {
         max-width: 20em;
     }

    .trailModificationTextArea {
        max-width: 30em;
        min-height: 3.5em;
        max-height: 10em;
    }
</style>
