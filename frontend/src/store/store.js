import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        playing: false,
        playingTrail: null,
    },
    mutations: {
        changePlaying(state, boolean) {
            state.playing = boolean;
        },
        setPlayingId(state, trailID) {
            state.playingTrail = trailID;
        }
    },
    plugins: [vuexLocal.plugin]
});
