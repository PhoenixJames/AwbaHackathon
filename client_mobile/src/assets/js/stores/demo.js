
const SettingModule = {
  getters: {
    demoData: state => state.demoData,
  },

  mutations: {
    updateDemoData: (state, data) => {
      console.log('updatingDemoData...', data);
      state.demoData = data;
    },
  },

  actions: {
    updateDemoData: async (context, data) => {
      const demoData = state.demoData;
      const update = demoData.filter(e => e.id != data.id);
      update.push(data);
      console.log('filteredDemoData...', update);
      context.commit('updateDemoData', update);
    },
  },

  state: {
    demoData: [
      {
        id: '000001',
        townshipName: 'Yaesagyo',
        villageName: 'Ah Lel Kyaw',
        villageId: '188379',
        registerDate: new Date('06/11/2016'),
        beneficiaryName: 'Daw Myint Khaing',
        web: null,
        webDate: null,
        webComment: '',
        ppi: null,
        ppiDate: null,
        ppiComment: '',
        app: null,
        appDate: null,
        appComment: ''
      },
      {
        id: '000002',
        townshipName: 'Koke Ko Hla',
        villageName: 'Mei Za Li Tan',
        villageId: '187977',
        registerDate: new Date('06/11/2016'),
        beneficiaryName: 'Daw Htar Htar Nyein',
        web: false,
        webDate: null,
        webComment: '',
        ppi: false,
        ppiDate: null,
        ppiComment: '',
        app: false,
        appDate: null,
        appComment: ''
      },
    ],
  },
};

export default SettingModule;
