import Vue from 'vue'
import router from './router'
import store from './store';
import BootstrapVue from "bootstrap-vue"
import VeeValidate from 'vee-validate';
import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  fieldsBagName: 'vee-fields',
});
Vue.use(BootstrapVue);

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
