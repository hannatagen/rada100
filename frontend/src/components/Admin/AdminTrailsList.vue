<template>
    <div class="container">
        <input v-model="search" class="form-control" placeholder="Filtreeri radasid nimetuse või kirjelduse järgi...">
        <table id="trailsTable"
                v-if="!$store.state.modifyTrailModeActive" class="table table-hover sortable">
            <thead>
                <tr>
                    <!--<th v-for="column in columns">-->
                        <!--<a class="tableColumnTitle" href="#" @click="sortBy(column)" :class="{active: sortKey === column}">-->
                            <!--{{ column }}-->
                        <!--</a>-->
                    <!--</th>-->
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
                    <!--<th>Punkte</th>-->
                    <th>Muuda</th>
                    <th>Kustuta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trail in trailsList" :key="trail.trailId">
                    <td>{{ trailsList.indexOf(trail) + 1 }}</td>
                    <td>{{ trail.name }}</td>
                    <td>{{ trail.description }}</td>
                    <!--<th>{{ pointsToTrail[trail.trailId] }}</th>-->
                    <td><i @click="modifyTrail(trail.trailId)" class="editTrailBtn fas fa-edit"></i></td>
                    <td><i @click="deleteTrail(trail)" class="deleteTrailBtn fas fa-trash-alt"></i></td>
                </tr>
            </tbody>
        </table>
        <TrailModification v-else></TrailModification>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import TrailModification from './TrailModification';

    export default {
        name: "AdminTrailsList",
        components: {
            TrailModification
        },
        data() {
            return {
                // modifyModeActive: false,
                trailsListOriginal: [],
                trailsList: [],
                pointsToTrail: [],
                sortKey: '',
                reverse: false,
                search: ''
            };
        },
        watch: {
            search: function (val) {
                this.trailsList = this.trailsListOriginal.filter(trail => trail.name.toLowerCase().includes(val.toLowerCase(),0) || trail.description.toLowerCase().includes(val.toLowerCase(),0))
            }
        },
        methods: {
            sortByName() {
                this.reverse = (this.sortKey === 'name') ? ! this.reverse : false;
                this.trailsList.sort(function (a,b) {
                    let trailA = a,
                        trailB = b;
                    if (trailA.name < trailB.name) return -1;
                    if (trailA.name > trailB.name) return 1;
                    return 0;
                });
                if (this.reverse) this.trailsList.reverse();
                this.sortKey = 'name';
            },
            sortByDesc() {
                this.reverse = (this.sortKey === 'description') ? ! this.reverse : false;
                this.trailsList.sort(function (a,b) {
                    let trailA = a,
                        trailB = b;
                    if (trailA.description < trailB.description) return -1;
                    if (trailA.description > trailB.description) return 1;
                    return 0;
                });
                if (this.reverse) this.trailsList.reverse();
                this.sortKey = 'description';
            },
            trailsData(trails) {
                this.trailsList = trails;
                this.trailsListOriginal = trails;
            },
            modifyTrail(trailId) {
                this.$store.commit('setModifyTrailId', trailId);
                this.$store.commit('setModifyModeActive', true);
            },
            deleteTrail(trail) {
                AXIOS.delete('/api/trails/' + trail.trailId + '/points/', {
                    headers: {
                        Authorization: this.$store.state.loggedInToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                AXIOS.delete('/api/trails/' + trail.trailId, {
                    headers: {
                        Authorization: this.$store.state.loggedInToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                this.trailsListOriginal = this.trailsListOriginal.filter(item => item !== trail);
                this.trailsList = this.trailsListOriginal
            },
            getPointsDict() {
                return this.pointsToTrail;
            },
            points2Dict(trailId, points) {
                this.pointsToTrail[trailId] = points;
            },
            trailsPoints(trailId) {
                AXIOS.get('/api/trails/' + trailId + '/points/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        const points = response.data;
                        // console.log(points);
                        this.points2Dict(trailId,points.length);
                        // this.pointsToTrail[trailId] = points.length;
                    })
                    .catch(error => {
                        //eslint-disable-next-line
                        console.log(error)
                    });
                // let points = this.getPointsDict();
                // return points[trailId];
            }
        },
        mounted() {
            AXIOS.get('/api/trails/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const trails = response.data;
                    this.trailsData(trails);
                })
                .catch(error => {
                    //eslint-disable-next-line
                    console.log(error)
                });
            // console.log(this.trailsList);
            // for (let trail in this.trailsList) {
            //     AXIOS.get('/api/trails/' + trail.trailId + '/points/')
            //         .then(response => {
            //             // JSON responses are automatically parsed.
            //             const points = response.data;
            //             // console.log(points);
            //             this.points2Dict(trail.trailId,points.length);
            //             // this.pointsToTrail[trailId] = points.length;
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         });
            // }
        },
    }
</script>

<style scoped>
     .deleteTrailBtn {
         color: #a40000;
         cursor: pointer;
     }

    .editTrailBtn {
        color: darkgreen;
        cursor: pointer;
    }

    .table {
        text-align: left;
    }

    .tableColumnTitle {
        color: black;
    }

</style>
