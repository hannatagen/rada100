<template>
    <nav class="footer navbar navbar-light bg-light">
        <div v-if="$store.state.playing">
            <!--TODO 0 ja 2 asendada andmebaasi requestist tulenevalt kas on läbitud v mitte-->
            <span class="slash leftSlash">{{ userScore }}</span>
            <span class="slash">/</span>
            <span class="slash rightSlash">{{totalScorePoints}}</span>
            <div id="pauseButton"
                 @click="pausePlaying()">Paus <i class="fas fa-pause"></i></div>
        </div>
        <div @click="openGoogleMapsLink()" class="googleMapsButton"><i class="fas fa-car"></i></div>
    </nav>
</template>

<script>
    export default {
        name: 'Footer',
        props: ['map'],
        data() {
            return {
                userScore: 0,
            };
        },
        methods: {
            openGoogleMapsLink() {
                // TODO
                // eslint-disable-next-line no-console
                console.log('selle info peab saama andmebaasist');
            },
            pausePlaying() {
                this.$store.commit('changePlaying', false);
                document.getElementById('map').style.bottom = '45px';
                document.getElementById('infoWindow').style.visibility = 'hidden';
                document.getElementById('taskContainer').style.visibility = 'hidden'; // closes the task icon if in point radius
                this.map.pausePlaying();
            },
        },
        watch: {
            scoredPoints() {
                if (this.scoredPoints) {
                    this.map.getUserCurrentPoints();
                    this.userScore = this.map.visitedPointsObject.visited.length;
                    if (this.totalScorePoints == this.userScore) {
                        this.pausePlaying();
                    }
                }
            },
        },
        computed: {
            totalScorePoints() {
                return this.map.getAllPossiblePoints();
            },
            scoredPoints() {
                if (this.$store.state.playing) {
                    if (this.map) {
                        return this.map.visitedPointsObject.visited;
                    }
                }
                return null;
            }
        },
    };
</script>

<style scoped>
    .footer {
        height: 45px !important;
        position: absolute !important;
        bottom: 0 !important;
        margin-bottom: 0 !important;
        z-index: 1020 !important;
        width: 100%;
    }

    .googleMapsButton {
        /*margin-top: 20px;*/
        margin-right: 1em !important;
        right: 0 !important;
        font-size: 30px;
        cursor: pointer;
        float: right;
        position: fixed;
    }

    .slash {
        font-size: 25px;
        font-weight: 900;
    }

    .leftSlash {
        color: green;
    }
    .rightSlash {
        color: red;
    }

    #pauseButton {
        cursor: pointer;
        bottom: 0 !important;
        margin-bottom: 0.5em;
        margin-left: 4.5em !important;
        position: fixed;
    }
</style>
