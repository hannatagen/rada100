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
        playingTrail: null, // TODO remember what trail was the user palaying -- in what form?
    },
    mutations: {
        changePlaying(state, boolean) {
            state.playing = boolean;
        },
    },
    plugins: [vuexLocal.plugin]
});
