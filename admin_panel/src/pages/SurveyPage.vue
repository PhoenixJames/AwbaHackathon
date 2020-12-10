<template>
  <v-container fluid>
    <!-- <v-row
      align="center"
      class="ma-3"
    >
      <v-select
        :items="ageGroups"
        v-model="ageGroup"
        outlined
        :label="$t('whatIsYourAgeGroup')"
      />
    </v-row> -->
    <v-row
      align="center"
      class="ma-3"
      dense
    >
      <v-col>
        <v-text-field
          v-model="searchId"
          outlined
          label="Enter the Id"
        />
      </v-col>
      <v-col class="pb-6 ma-0">
        <v-btn
          color="primary"
          @click="searchById"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="surveyData.townshipName"
        disabled
        outlined
        label="Township Name"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="surveyData.villageName"
        disabled
        outlined
        label="Village Name"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="surveyData.villageTract"
        disabled
        outlined
        label="Village Tract"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="registerDate"
        disabled
        outlined
        label="Register Date"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="surveyData.beneficiaryEngName"
        disabled
        outlined
        label="Beneficiary Name"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      Web1 :
      <TreeStepCheckbox
        :status="web"
        @changeStatus="changeWebStatus"
      />
      <v-select
        v-if="webCommentTrigger == true"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
        v-model="webComment"
        outlined
        label="Comment"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      Web2 :
      <TreeStepCheckbox
        :status="web2"
        @changeStatus="changeWebStatus2"
      />
      <v-select
        v-if="webCommentTrigger2 == true"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
        v-model="webComment2"
        outlined
        label="Comment"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      App :
      <TreeStepCheckbox
        :status="app"
        @changeStatus="changeAppStatus"
      />
      <v-select
        v-if="appCommentTrigger == true"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
        v-model="appComment"
        outlined
        label="Comment"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      PPI :
      <TreeStepCheckbox
        :status="ppi"
        @changeStatus="changePPIStatus"
      />
      <v-select
        v-if="ppiCommentTrigger == true"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
        v-model="ppiComment"
        outlined
        label="Comment"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="nrc"
        disabled
        outlined
        label="Nrc"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
        <NrcInput
          @setNrcNumber="setNrcNumber"
        />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-text-field
        v-model="phone"
        outlined
        label="Phone"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-spacer />
      <v-btn
        color="primary"
        @click="submitData"
      >
        Submit
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import TreeStepCheckbox from '@/components/Commons/Checkboxes/TreeStepCheckbox'
import NrcInput from '@/components/Commons/Inputs/NrcInput';
import MMNRC from 'myanmar-nrc-x';

export default {
  name: 'Login',

  components: {
    TreeStepCheckbox,
    NrcInput,
  },

  props: {

  },

  data() {
    return {
      moment,
      code: '',
      searchId: '',
      registerDate: null,
      surveyData: {},
      web: null,
      webDate: null,
      webComment: null,
      web2: null,
      webDate2: null,
      webComment2: null,
      ppi: null,
      ppiDate: null,
      ppiComment: null,
      app: null,
      appDate: null,
      appComment: null,
      webCommentTrigger: false,
      webCommentTrigger2: false,
      ppiCommentTrigger: false,
      appCommentTrigger: false,
      nrc: '',
      phone: '',
    };
  },

  computed: {
  },

  watch: {
  },

  mounted() {
    console.log('store...', this.$store);
  },

  methods: {
    setNrcNumber(nrcNumber) {
      try {
        const nrc = MMNRC(nrcNumber);
        this.nrc = nrc.getFormat();
      } catch (e) {
        this.nrc = nrcNumber;
      }
      // this.worker.identification = nrcNumber;
    },
    changeWebStatus(status) {
      this.web = status;
      if (status == true) {
        this.webDate = new Date();
        this.webComment = null;
        this.webCommentTrigger = false
      } else if (status == false) {
        this.webDate = new Date();
        this.webCommentTrigger = true
      } else {
        this.webDate = null;
        this.webComment = null;
        this.webCommentTrigger = false;
      }
    },
    changeWebStatus2(status) {
      this.web2 = status;
      if (status == true) {
        this.webDate2 = new Date();
        this.webComment2 = null;
        this.webCommentTrigger2 = false
      } else if (status == false) {
        this.webDate2 = new Date();
        this.webCommentTrigger2 = true
      } else {
        this.webDate2 = null;
        this.webComment2 = null;
        this.webCommentTrigger2 = false;
      }
    },
    changeAppStatus(status) {
      this.app = status;
      if (status == true) {
        this.appDate = new Date();
        this.appComment = null;
        this.appCommentTrigger = false
      } else if (status == false) {
        this.appDate = new Date();
        this.appCommentTrigger = true
      } else {
        this.appDate = null;
        this.appComment = null;
        this.appCommentTrigger = false;
      }
    },
    changePPIStatus(status) {
      this.ppi = status;
      if (status == true) {
        this.ppiDate = new Date();
        this.ppiCommentTrigger = false;
        this.ppiComment = null;
      } else if (status == false) {
        this.ppiDate = new Date();
        this.ppiCommentTrigger = true
      } else {
        this.ppiDate = null;
        this.ppiCommentTrigger = false;
        this.ppiComment = null;
      }
    },
    async searchById() {
      let surveyData= [];
      let res = await axios.get(`${process.env.API_URL}/api/survey/get/${this.searchId}`);
      surveyData= res.data;
      console.log('surveyData', surveyData);
      // const data = surveyData.find(e => e.code === parseInt(this.searchId, 10));
      this.surveyData = surveyData;
      this.web = surveyData.web;
      this.webDate = surveyData.webDate;
      this.webComment = surveyData.webComment;
      if (this.web === false) this.webCommentTrigger = true;
      else this.webCommentTrigger = false;
      this.web2 = surveyData.web2;
      this.webDate2 = surveyData.webDate2;
      this.webComment2 = parseInt(surveyData.webComment2, 5);
      if (this.web2 === false) this.webCommentTrigger2 = true;
      else this.webCommentTrigger2 = false;
      this.app = surveyData.app;
      this.appDate = surveyData.appDate;
      this.appComment = parseInt(surveyData.appComment, 5);
      if (this.app === false) this.appCommentTrigger = true;
      else this.appCommentTrigger = false;
      this.ppi = surveyData.ppi;
      this.ppiDate = surveyData.ppiDate;
      this.ppiComment = parseInt(surveyData.ppiComment, 5);
      if (this.ppi === false) this.ppiCommentTrigger = true;
      else this.ppiCommentTrigger = false;
      this.registerDate = surveyData.registrationDate;
      this.nrc = surveyData.nrc;
      this.phone = surveyData.phone;
    },
    submitData() {
      axios.post(`${process.env.API_URL}/api/survey/update`, {
        code: this.searchId,
        web: this.web,
        webDate: this.webDate,
        webComment: this.webComment,
        web2: this.web2,
        webDate2: this.webDate2,
        webComment2: this.webComment2,
        ppi: this.ppi,
        ppiDate: this.ppiDate,
        ppiComment: this.ppiComment,
        app: this.app,
        appDate: this.appDate,
        appComment: this.appComment,
        username: this.$store.getters.username,
        nrc: this.nrc,
        phone: this.phone,
      })
        .then(function (response) {
          console.log('update response...', response);
          alert('submit successful');
        })
        .catch(function (error) {
          console.log(error)
        });
      // this.$store.dispatch('updateDemoData', this.surveyData);
    }
  },

};
</script>
