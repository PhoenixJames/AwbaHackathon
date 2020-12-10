// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import AppAuth from './AppAuth';
import AppNotAuth from './AppNotAuth';
import router from './router';
import store from './assets/js/stores/index';

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   vuetify,
//   template: '<App/>',
//   components: { App },
// });
// let defaultApp = AppNotAuth
// if(store.getters.isLogin) {
//   defaultApp = AppAuth
// }
let defaultApp = AppAuth
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(defaultApp),
}).$mount('#app');
