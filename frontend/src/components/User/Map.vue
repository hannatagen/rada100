<template>
    <div>
        <div id="map" class="map">
        </div>
        <div id="popup" class="ol-popup">
            <div id="popup-content"></div>
        </div>
        <button id="track" type="button" class="btn trackBtn btn-dark"
                @click="initLocation">
            <i class="fas fa-crosshairs"></i>
        </button>
        <!--<button v-if="arrived">ava ülesannne</button>-->
        <div @click="hideTaskContainer()" id="taskContainer">
            Hello
        </div>
        <Info :map="map"></Info>
        <Footer :map=map></Footer>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import Map from '../../classes/Map';
    import Info from './Menu/Info';
    import Footer from './Menu/Footer';

    export default {
        name: 'Map',
        components: { Info, Footer },
        data() {
            return {
                map: null,
                geolocation: null,
                arrived: false,
                trailsList: [],
            };
        },
        watch: {
            geoLocation() {
                if (this.geoLocation) {
                    this.geolocation = this.map.geolocation;
                    this.arrive();
                }
            },
        },
        computed: {
            locationActive() {
                if (this.map) {
                    return this.map.trackingOn;
                }
                return false;
            },
            geoLocation() {
                if (this.map) {
                    return this.map.location;
                }
                return null;
            },
        },
        methods: {
            initTrailsPoints() {
                this.map.initTrailPoints(this.trailsList);
            },
            initLocation() {
                this.map.toggleLocation();
            },
            arrive() {
                if (this.$root.$data.playing) {
                    if (this.map.pointNearFeature(this.geolocation)) {
                        this.arrived = true;
                        document.getElementById('taskContainer').style.visibility = 'unset';
                    }
                }
            },
            hideTaskContainer() {
                document.getElementById('taskContainer').style.visibility = 'hidden';
            },
        },
        created() {
            this.map = new Map();
            this.initTrailsPoints();
            AXIOS.get(`/trail`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    console.log(response.data);
                    this.trailsList = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
    };
</script>

<style scoped>
    #map {
        z-index: 0;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 45px !important;
    }

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
    .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 8px;
        left: -88px;
        min-width: 180px;
    }
    .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 85px;
        margin-left: -10px;
    }
    .trackBtn {
        z-index: 1000;
        position: sticky;
        float: right;
        margin-right: 1em;
        margin-top: 1em;
    }

    .btn-dark {
        background-color: rgba(0, 0, 0, 0.4);
        border: none !important;
    }

    .btn-dark:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .fa-crosshairs {
        width: 1em;
        height: 1em;
        padding-top: 0.1em;
        font-size: 25px;
    }
</style>
