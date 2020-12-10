<template>
  <v-container>
    <v-row class="ma-5">
      <v-radio-group v-model="reportType" row @change="onRadioChange">
        <v-radio label="All" value=all></v-radio>
        <v-radio label="Completed" value=completed></v-radio>
      </v-radio-group>
      <v-spacer />
      <v-btn
        color="primary"
        small
        :loading="exportLoading"
        @click="exportCsv"
      >
        Export
      </v-btn>
    </v-row>
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="surveys"
      :items-per-page="5"
      class="elevation-1 ma-5"
    />
    <div v-else> loading... </div>
  </v-container>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { Parser } from 'json2csv';

export default {
  name: 'Login',

  components: {
  },

  props: {

  },

  data() {
    return {
      loading: false,
      reportType: 'completed',
      headers: [
        {
          text: 'Township Name',
          align: 'start',
          sortable: true,
          value: 'townshipName',
        },
        { text: 'Village Tract', value: 'villageTract' },
        { text: 'Village Name', value: 'villageName' },
        { text: 'Registration Date', value: 'registrationDate' },
        { text: 'Beneficiary Name', value: 'beneficiaryEngName' },
        { text: 'Web', value: 'web' },
        // { text: 'Web Date', value: 'webDate' },
        { text: 'Web Comment', value: 'webComment' },
        { text: 'Web2', value: 'web2' },
        // { text: 'Web2 Date', value: 'webDate2' },
        { text: 'Web2 Comment', value: 'webComment2' },
        { text: 'App', value: 'app' },
        // { text: 'App Date', value: 'appDate' },
        { text: 'App Comment', value: 'appComment' },
        { text: 'PPI', value: 'ppi' },
        // { text: 'PPI Date', value: 'ppiDate' },
        { text: 'PPI Comment', value: 'ppiComment' },

      ],
      surveys: [],
      exportLoading: false,
    };
  },

  computed: {
  },

  watch: {
  },

  async mounted() {
    this.surveys = await this.getFilled();
    console.log('surveys...', this.surveys);
  },

  methods: {
    async onRadioChange() {
      if(this.reportType == 'all') {
        this.surveys = await this.getAll();
      } else {
        this.surveys = await this.getFilled();
      }
    },
    async getFilled() {
      this.loading = true;
      let res = await axios.get(`${process.env.API_URL}/api/survey/getAllFilled`);
      this.loading = false;
      return res.data;
    },
    async getAll() {
      this.loading = true;
      let res = await axios.get(`${process.env.API_URL}/api/survey/getAll`);
      this.loading = false;
      return res.data;
    },
    async exportCsv() {
      this.exportLoading = true;
      const exportData = await this.surveys.map((e) => {
        return {
          ID: e.code,
          'Township Name': e.townshipName,
          'Village Tract': e.villageTract,
          'Village Name': e.villageName,
          'Village ID': e.villageId,
          'MCCT date of registration': e.registrationDate,
          // 'Beneficiary Name_Myn': e.beneficiaryMmName,
          'Beneficiary Name_Eng': e.beneficiaryEngName,
          'web': e.web,
          'web applied date': e.webDate != null ? moment(e.webDate).format('DD/MM/YYYY') : '',
          'web comment': e.webComment,
          'web2': e.web2,
          'web2 applied date': e.webDate2 != null ? moment(e.webDate2).format('DD/MM/YYYY'): '',
          'web2 comment': e.webComment2,
          'ppi': e.ppi,
          'ppi applied date': e.ppiDate != null ? moment(e.ppiDate).format('DD/MM/YYYY'): '',
          'ppi comment': e.ppiComment,
          'app': e.app,
          'app applied date': e.appDate != null ? moment(e.appDate).format('DD/MM/YYYY'): '',
          'app comment': e.appComment,
          'Username': e.username,
        }
      });
      const year = await moment().format('YYYY');
      const month = await moment().format('MM');
      const day = await moment().format('DD');
      const json2csvParser = await new Parser({ header: true, quote: '' });
      const result = await json2csvParser.parse(exportData);
      const csvContent = await `data:text/csv;charset=utf-8,\uFEFF${result}`;
      const link = await document.createElement('a');
      link.href = await encodeURI(csvContent);
      link.download = await `surveys_${year}${month}${day}.csv`;
      await document.body.appendChild(link); // Required for FF
      await link.click();
      await document.body.removeChild(link); // Required for FF
      this.exportLoading = false;
    },
  },

};
</script>
