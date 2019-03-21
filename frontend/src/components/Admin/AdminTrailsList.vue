<template>
    <div class="container">
        <table id="trailsTable"
                v-if="!$store.state.modifyTrailModeActive" class="table table-hover sortable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nimetus</th>
                    <th>Kirjeldus</th>
                    <!--<th>Punkte</th>-->
                    <th>Muuda</th>
                    <th>Kustuta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trail in trailsList" :key="trail.trailId">
                    <th>{{ trailsList.indexOf(trail) + 1 }}</th>
                    <th>{{ trail.name }}</th>
                    <th>{{ trail.description }}</th>
                    <!--<th>{{ pointsToTrail[trail.trailId] }}</th>-->
                    <th><i @click="modifyTrail(trail.trailId)" class="editTrailBtn fas fa-edit"></i></th>
                    <th><i @click="deleteTrail(trail)" class="deleteTrailBtn fas fa-trash-alt"></i></th>
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
                trailsList: [],
                pointsToTrail: [],
            };
        },
        methods: {
            trailsData(trails) {
                this.trailsList = trails;
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
                this.trailsList = this.trailsList.filter(item => item !== trail);
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
</style>
