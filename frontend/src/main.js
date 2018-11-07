import Vuex from 'vuex';
import Vue from 'vue';
import 'vue-trix';
import App from './App.vue';
import router from './router/index';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'ol/ol.css';

// Bootstrap
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
    router,
    data: {
        playing: false,
    },
    components: { App },
    template: '<App/>',
}).$mount('#app');
