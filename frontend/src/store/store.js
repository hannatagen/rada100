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
        loggedInToken: null //TODO, välja logida kui leht kinni pannakse, aga mitte refreshil?
    },
    mutations: {
        changePlaying(state, boolean) {
            state.playing = boolean;
            Map.pausePlaying();
        },
        setPlayingId(state, trailID) {
            state.playingTrail = trailID;
        },
        setUserTokenID(state, token) {
            state.loggedInToken = token;
        }
    },
    plugins: [vuexLocal.plugin]
});
