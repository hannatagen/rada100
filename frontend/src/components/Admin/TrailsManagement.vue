<template>
    <div>
        <div>
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand">Radade ja punktide haldus</span>
            </nav>
        </div>
        <div id="addTrailForm">
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
                        @click="addToDatabase()" :disabled="points.length === 0 || trail.name === '' || trail.description === ''">Salvesta
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
                            @click="cancel()">Tagasi/Katkesta
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
        beforeCreate() {
            if(!this.$store.state.adminLoggedInToken){
                this.$router.replace('/admin')
            }
        },
        methods: {
            addPoint() {
                this.addPointArea = !this.addPointArea;
                const sliced = this.point.link.split('@')[1].split(',');
                this.point.lat = sliced[0];
                this.point.lon = sliced[1];
                this.points.push(this.point);
                this.point = {
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
                const trail = this.trail;
                const points = this.points;
                this.trail =  {
                    name: '',
                        description: '',
                };
                this.points = [];
                AXIOS.post('/api/trails/', {name: trail.name, description: trail.description}, {
                    headers: {
                        Authorization: this.$store.state.loggedInToken,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(request => {
                        const trailID = request.data;
                        for (let i in points) {
                            const point = points[i];
                            console.log('point',point);
                            AXIOS.post('/api/points/', {trailId: trailID, name: point.name, description: point.description, latitude: point.lat, longitude: point.lon, link: point.link}, {
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
            cancel() {
                this.addPointArea = !this.addPointArea;
                this.point = {
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
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*bottom: 0;*/
        /*right: 0;*/
        /*width: 100vw;*/
        display: flex;
        overflow-y: hidden;
        flex-direction: column;
        /*background-color: #ffffff;*/
        flex: 1;
        overflow-x: auto;
    }

    .btn {
        width: 200px;
    }

    #addTrailForm {
        /*width: 90%;*/
        padding: 1em;
    }

</style>
