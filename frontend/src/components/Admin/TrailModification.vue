<template>
    <div id="trailsModificationContainer">
        <div v-if="!addPointClicked">
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light extraNavBtns">
                <button @click="save"
                        class="navbarBtn btn btnGreen">Salvesta rada</button>
                <button @click="$store.commit('setModifyModeActive',false)"
                        class="navbarBtn btn btn-danger">Katkesta</button>
            </nav>
            <br>
            <h5 class="card-title">Nimetus:</h5>
            <input v-model="trail.name" type="text" class="trailModificationInput form-control" aria-label="Name">
            <br>
            <h5 class="card-title">Kirjeldus:</h5>
            <textarea v-model="trail.description" class="trailModificationTextArea form-control" aria-label="Description"></textarea>
            <br>
            <h5 class="card-title">Punktide nimekiri:</h5>
            <input v-model="search" class="form-control" placeholder="Filtreeri punkte nimetuse või kirjelduse järgi...">
            <br>
            <button v-b-tooltip.hover
                    id="newPointBtn"
                    type="button"
                    class="btn btn-primary btn-sm pointBtn plusBtn"
                    title="Lisa punkt"
                    @click="[addPointClicked = true, $store.commit('setModifyTrailId', trailId)]"
            >
                Lisa punkt
                <i class="fas fa-plus"></i>
            </button>
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
                    <td><i class="editTrailBtn fas fa-edit" @click="editPoint(point.name, point.description)"></i></td>
                    <td><i class="deleteTrailBtn fas fa-trash-alt"></i></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div v-if="!enlargeMapBtnClicked">
                <nav class="adminNavbar navbar navbar-expand-lg navbar-light extraNavBtns">
                    <button @click="savePoint"
                            class="navbarBtn btn btnGreen">Salvesta punkt</button>
                    <button @click="cancel"
                            class="navbarBtn btn btn-danger">Katkesta</button>
                </nav>
                <h5 class="card-title">Nimetus:</h5>
                <input v-model="point.name" type="text" class="trailModificationInput form-control" aria-label="Name">
                <h5 class="card-title">Kirjeldus:</h5>
                <textarea v-model="point.description" class="trailModificationTextArea form-control" aria-label="Description"></textarea>
            </div>
            <h5>Punkti asukoht:</h5>
            <p>Punkti asukohta saad valida ja muuta klõpsates kaardile.</p>
            <!--<button type="button"-->
                    <!--class="btn btn-primary btn-sm pointBtn"-->
                    <!--@click="updateMap"-->
            <!--&gt;-->
                <!--<span v-if="!enlargeMapBtnClicked">Kuva suurem kaart </span>-->
                <!--<span v-else>Kuva väiksem kaart </span>-->
                <!--<i v-if="!enlargeMapBtnClicked" class="fas fa-chevron-up"></i>-->
                <!--<i v-else class="fas fa-chevron-down"></i>-->
            <!--</button>-->
            <AddPointMap />
        </div>
    </div>
</template>

<script>
    import {AXIOS} from './.././http-common'
    import AddPointMap from './AddPointMap';

    export default {
        name: "TrailModification",
        components: { AddPointMap },
        data() {
            return {
                newTrailMode: true,
                trailId: null,
                trail: {
                    name: '',
                    description: '',
                },
                point: {
                    name: '',
                    description: '',
                    lat: '',
                    long: '',
                },
                pointsListOriginal: [],
                pointsList: [],
                sortKey: '',
                reverse: false,
                search: '',
                addPointClicked: false,
                map: null,
                enlargeMapBtnClicked: false,
                coordinate: null,
            };
        },
        watch: {
            search: function (val) {
                this.pointsList = this.pointsListOriginal.filter(point => point.name.toLowerCase().includes(val.toLowerCase(),0) || point.description.toLowerCase().includes(val.toLowerCase(),0))
            },
        },
        methods: {
            editPoint(name, desc) {
                this.addPointClicked = true;
                this.$store.commit('setModifyTrailId', this.trailId);
                this.point.name = name;
                this.point.description = desc;
            },
            updateMap() {
                this.enlargeMapBtnClicked = !this.enlargeMapBtnClicked;
                // this.map = this.$store.state.map;
                // this.map.updateSize();
            },
            pointData(trail) {
                this.trail.name = trail.name;
                this.trail.description = trail.description;

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
            modifyTrail(trailId, boolean) {
                this.$store.commit('setModifyTrailId', trailId);
                this.$store.commit('setModifyModeActive', boolean);
            },
            save() {
                let success = true;
                if (this.trail.name === '') {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Raja nimi on sisestamata!'
                    });
                    success = false;
                } if (this.trail.description === '') {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Raja kirjeldus on sisestamata!'
                    });
                    success = false;
                }  if (this.pointsList.length < 2) {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Rajal peab olema vähemalt 2 (kaks) punkti!'
                    });
                    success = false;
                } if (success) {
                    if (this.newTrailMode) {
                        this.saveNewTrail();
                    } else this.updateTrail();

                    this.$notify({
                        group: 'foo',
                        title: 'Teavitus',
                        text: 'Rada salvestatud!'
                    });
                    this.$store.commit('setModifyModeActive',false);
                }
            },
            saveNewTrail() {
                AXIOS.post('/api/trails/',
                    {
                        name: this.trail.name,
                        description: this.trail.description
                    }, {
                        headers: {
                            Authorization: this.$store.state.loggedInToken,
                            'Content-Type': 'application/json',
                    }
                })
                    .then(request => {
                        const trailID = request.data;
                        for (let i in this.pointsListOriginal) {
                            const point = this.pointsListOriginal[i];
                            AXIOS.post('/api/points/',
                                {
                                    trailId: trailID,
                                    name: point.name,
                                    description: point.description,
                                    latitude: point.lat,
                                    longitude: point.long,
                                }, {
                                    headers: {
                                        Authorization: this.$store.state.loggedInToken,
                                        'Content-Type': 'application/json',
                                }
                            }).catch(error => {
                                console.log(error)
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            updateTrail() {

            },
            cancel() {
                this.addPointClicked = false;
                this.point = {
                    name: '',
                    description: '',
                    lat: '',
                    long: '',
                }

            },
            savePoint() {
                this.coordinate = this.$store.state.newPointLonLat;
                let success = true;
                if (this.point.name === '') {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Punkti nimi on sisestamata!'
                    });
                    success = false;
                } if (this.point.description === '') {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Punkti kirjeldus on sisestamata!'
                    });
                    success = false;
                }  if (!this.coordinate) {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Teavitus',
                        text: 'Punkti asukoht on määramata!'
                    });
                    success = false;
                } if (success) {
                    this.point.long = this.coordinate[0];
                    this.point.lat = this.coordinate[1];
                    this.pointsListOriginal.push(this.point);
                    this.pointsList.push(this.point);
                    this.$notify({
                        group: 'foo',
                        title: 'Teavitus',
                        text: 'Punkt salvestatud!'
                    });
                    this.addPointClicked = false;
                }
            },
        },
        mounted() {
            this.trailId = this.$store.state.modifyTrailId;
            if(this.trailId) {
                this.newTrailMode = false;
                AXIOS.get('/api/trails/' + this.trailId)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        const point = response.data;
                        this.pointData(point);
                    })
                    .catch(error => {
                        //eslint-disable-next-line
                        console.log(error)
                    });
            }
        },
        destroyed() {
            this.modifyTrail(null, false);
            this.$store.commit('setNewPointLonLat', null);
        }
    }
</script>

<style scoped>
    #trailsModificationContainer {
        text-align: left;
        padding-bottom: 2em;
        padding-left: 1em;
        margin-right: 1em;
    }

     .trailModificationInput {
         max-width: 20em;
     }

    .trailModificationTextArea {
        max-width: 30em;
        min-height: 3.5em;
        max-height: 10em;
    }

    .pointBtn {
        margin-right: 0.8em;
        margin-bottom: 1em;
        min-width: 2.2em;
        border-radius: 100px;
    }
</style>
