<template>
    <div>
        <h1>Halduskeskkond</h1>
        <div class="container" id="addTrailForm">
            <h2>Uue raja lisamine</h2>
            <div class="form-group">
                <label for="trailName">Raja nimi</label>
                <input v-model="trail.name" type="text" class="form-control" id="trailName"
                       placeholder="Sisesta raja nimi...">
            </div>
            <div class="form-group">
                <label for="trailName">Kirjeldus</label>
                <textarea v-model="trail.description" class="form-control" id="trailDescription"
                          placeholder="Sisesta rajale kirjeldus..."></textarea>
            </div>
            <div class="addedPoints form-group">
                <ul class="list-group">
                    <li class="list-group-item"
                        v-for="point in points">
                        {{point.name}}
                        <i class="fas fa-times float-right removeErrorCodes"
                           @click="removePoint(points.indexOf(point))"></i>
                    </li>
                </ul>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary"
                        @click="addPointArea = !addPointArea">Lisa punkte
                </button>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-primary"
                        @click="addToDatabase()" :disabled="points.length === 0 || trail.name === '' || trail.description === ''">Lisa rada
                </button>
            </div>
        </div>
        <div class="addPointForm" v-if="addPointArea">
            <div class="container">
                <h2>Uue punkti lisamine</h2>
                <div class="form-group">
                    <label for="pointName">Punkti nimi</label>
                    <input v-model="point.name" type="text" class="form-control" id="pointName"
                           placeholder="Sisesta punkti nimi...">
                </div>
                <div class="form-group">
                    <label for="pointDescription">Punkti kirjeldus</label>
                    <textarea v-model="point.description" class="form-control" id="pointDescription"
                              placeholder="Sisesta punkti kirjeldus..."></textarea>
                </div>
                <div class="form-group">
                    <label for="googleMapsLink">Google Mapsi link</label>
                    <input v-model="point.link" type="text" class="form-control" id="googleMapsLink"
                           placeholder="Sisesta google mapsi link, millel on sees @ märk ja selle järel koordinaatide numbrid...">
                </div>
                <div class="form-group">
                    <button type="button" :disabled="point.name === '' || point.description === '' || !point.link.includes('@')"
                            class="btn btn-primary"
                            @click="addPoint()">Lisa punkt
                    </button>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary"
                            @click="cancel()">Katkesta
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import AdminHeader from './Menu/AdminHeader';

    export default {
        name: 'AdminMain',
        components: { AdminHeader },
        data() {
            return {
                addPointArea: false,
                trail: {
                    name: '',
                    description: '',
                },
                points: [],
                point: {
                    trail_id:'',
                    name: '',
                    description: '',
                    lat: '',
                    lon: '',
                    link: '',
                }
            }
        },
        methods: {
            addPoint() {
                this.addPointArea = !this.addPointArea;
                const sliced = this.point.link.split('@')[1].split(',');
                this.point.lat = sliced[0];
                this.point.lon = sliced[1];
                console.log(this.point);
                this.points.push(this.point);
                this.point = {
                    trail_id:'',
                    name: '',
                    description: '',
                    lat: '',
                    lon: '',
                    link: '',
                };
            },
            removePoint(pointId) {
                this.points.splice(pointId, 1);
            },
            addToDatabase() {
                console.log(this.points)
                // TODO check if actually works in server
                AXIOS.post('/api/trails/', {name: this.trail.name, description: this.trail.description}, {
                    headers: {
                        Authorization: this.$store.state.loggedInToken,
                        'Conent-Type': 'application/json',
                    }
                })
                    .then(request => {
                        const trailID = request;
                        console.log('trailID', trailID);
                        console.log(this.points);
                        for (let point in this.points) {
                            console.log(point);
                            AXIOS.post('/api/points/', {trailId: trailID, name: point.name, description: point.description, latitude: point.latitude, longitude: point.longitude, link: point.link}, {
                                headers: {
                                    Authorization: this.$store.state.loggedInToken,
                                    'Conent-Type': 'application/json',
                                }
                            })
                                .then(request => {
                                    console.log('pointspost', request);

                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            cancel() {
                this.addPointArea = !this.addPointArea;
                this.point = {
                    trail_id:'',
                    name: '',
                    description: '',
                    lat: '',
                    lon: '',
                    link: '',
                };
            }
        }
    };
</script>

<style scoped>
    .addPointForm {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100vw;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        background-color: #ffffff;
        flex: 1;
        overflow-x: auto;
    }

    .btn {
        width: 200px;
    }

</style>
