<template>
    <div>
        <nav id="infoWindow" class="navbar infoWindow navbar-light bg-light">
            <div v-if="!$store.state.playing" class="infoTextContainer">
                <div><strong>Valitud rada:</strong></div><span id="trailName"></span>
                <div><strong>Punkte rajal:</strong></div><span id="totalPoints"></span>
            </div>
            <div v-else class="infoTextContainer">
                <div><strong>Valitud punkt:</strong></div><span id="pointName"></span>
                <div><strong>Punkti kirjeldus:</strong></div><span id="pointDescription"></span>
            </div>
            <div v-if="!$store.state.playing" class="footerButtonDiv">
                <div id="closeInfo" class="closeInfo"
                     @click="closeFooter()">Kõik rajad <i class="fas fa-map"></i></div>
                <div id="playButton" class="playButton"
                     @click="startPlaying()">Mängima <i class="fas fa-play"></i></div>
            </div>
            <div v-else class="footerButtonDiv">
                <div id="closeInfoGame" class="closeInfo"
                     @click="closeGameFooter()">Sulge info <i class="fas fa-times"></i></div>
                <div id="pausButton" class="playButton"
                     @click="pausePlaying()">Paus <i class="fas fa-pause"></i></div> </div>
        </nav>
    </div>
</template>

<script>

    export default {
        name: 'Info',
        props: ['map'],
        methods: {
            closeFooter() {
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                this.map.closeFooter();
            },
            startPlaying() {
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                this.map.startPlaying();
            },
            pausePlaying() {
                this.$store.commit('changePlaying', false);
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                this.map.pausePlaying();
            },
            closeGameFooter() {
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                this.map.closeGameFooter();
            },
        },
    };
</script>

<style scoped>
    #infoWindow {
        visibility: hidden;
        margin-bottom: 45px;
    }
    .infoWindow {
        position: fixed !important;
        bottom: 0 !important;
        z-index: 1020 !important;
        width: 100%;
        max-height: 150px;
        overflow-y: scroll;
    }

    .footerButtonDiv {
        /*margin-bottom: -50px;*/
        margin-right: 10px !important;
        min-width: 5em !important;
        float: right;
    }

    .playButton {
        cursor: pointer;
        margin-top: 40px;
        margin-right: 2em;
        right: 0 !important;
        position: fixed;
    }

    .closeInfo {
        position: fixed;
        cursor: pointer;
        width: 6em;
        text-align: right;
        margin-top: -60px;
    }

    .infoTextContainer {
        max-width: 65% !important;
        height: 140px;
    }
</style>
