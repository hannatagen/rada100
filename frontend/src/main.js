import Vuex from 'vuex';
import Vue from 'vue';
import 'vue-trix';
import App from './App.vue';
import router from './router/index';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'ol/ol.css';
import store from './store/store';
import Notifications from 'vue-notification'

// Bootstrap
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.config.productionTip = false;

export const serverBus = new Vue();

new Vue({
    store,
    router,
    components: { App },
    template: '<App/>',
}).$mount('#app');

console.log(store.state.playing);
console.log(store.state.loggedInToken);
