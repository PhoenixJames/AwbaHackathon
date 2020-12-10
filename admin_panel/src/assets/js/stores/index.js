import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import SettingModule from './settings';

Vue.use(Vuex);

const Store = {
  modules: {
    setting: SettingModule,
  },

  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {

  },
};

export default new Vuex.Store({
  ...Store,
  plugins: [createPersistedState({
    paths: [
      'setting.isLogin',
      'setting.username',
    ],
  })],
});
