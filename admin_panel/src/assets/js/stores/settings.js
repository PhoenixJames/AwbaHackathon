
const SettingModule = {
  getters: {
    isLogin: state => state.isLogin,
    username: state => state.username,
  },

  mutations: {
    setIsLogin: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    setUserName: (state, value) => {
      // console.log('store username', value);
      state.username = value;
    },
  },

  actions: {
    setIsLogin: async (context, value) => {
      context.commit('setIsLogin', value);
    },
    setUserName: async (context, value) => {
      context.commit('setUserName', value);
    },
  },

  state: {
    isLogin: false,
    username: '',
  },
};

export default SettingModule;
