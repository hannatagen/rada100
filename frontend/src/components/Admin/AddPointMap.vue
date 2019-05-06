<template>
    <div id="adminMapContainer">
        <div id="adminMap" class="map">
        </div>
        <button id="track" type="button" class="btn trackBtn btn-dark"
                @click="initLocation">
            <i class="fas fa-crosshairs"></i>
        </button>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import AdminMap from '../../classes/AdminMap';
    import { serverBus } from '../../main';

    export default {
        name: 'AdminMap',
        data() {
            return {
                map: null,
                geolocation: null,
                trailId: null,
            };
        },
        watch: {
            geoLocation() {
                if (this.geoLocation) {
                    this.geolocation = this.map.geolocation;
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
        },
        methods: {
            initTrailsPoints(pointsList) {
                this.map.initTrailPoints(pointsList, this.$store.state.playing);
            },
            initLocation() {
                this.map.toggleLocation();
            },
        },
        mounted() {
            this.map = new AdminMap();
            // this.$store.commit('setAdminMap',this.map);
            this.trailId = this.$store.state.modifyTrailId;
        },
    };
</script>

<style scoped>
    /*#adminMap {*/
        /*margin-left: -1em;*/
        /*z-index: 0;*/
        /*bottom: 0;*/
        /*position: fixed;*/
        /*width: 83%; */
    /*}*/

    #adminMap {
        z-index: 0;
        position: absolute;
        /*top: 60px;/*/
        left: 0;
        width: 85vw;
        height: 31vh;
        /*right: 0;*/
        /*bottom: 45px !important;*/
    }

    .trackBtn {
        z-index: 1000;
        position: fixed;
        /*margin-left: 1em;*/
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
