import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import { Map } from '../classes/Map';


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

// TODO kui välja logitakse nt, siis muuta playing false
export default new Vuex.Store({
    state: {
        playing: false, // TODO seda andmebaasist küsida, kas hetkel sisselogitud mängija mängib v mitte
        playingTrail: null,
        loggedInToken: false,
        adminLoggedInToken: false,
        finishedTrail: false,
        modifyTrailId: null,
        modifyTrailModeActive: false,
        newPointLonLat: null,
    },
    mutations: {
        setNewPointLonLat(state, obj) {
            state.newPointLonLat = obj;
        },
        changePlaying(state, boolean) {
            state.playing = boolean;
        },
        setPlayingId(state, trailID) {
            state.playingTrail = trailID;
        },
        setUserTokenID(state, token) {
            state.loggedInToken = token;
        },
        setAdminTokenID(state, token) {
            state.adminLoggedInToken = token;
        },
        setFinishTrail(state, boolean) {
            state.finishedTrail = boolean;
        },
        setModifyTrailId(state, id) {
            state.modifyTrailId = id;
        },
        setModifyModeActive(state, boolean) {
            state.modifyTrailModeActive = boolean
        }
    },
    plugins: [vuexLocal.plugin]
});
