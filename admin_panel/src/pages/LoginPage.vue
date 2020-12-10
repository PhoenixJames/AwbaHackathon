<template>
  <v-container fluid>
    <v-row
      align="center"
      class="ma-3"
      dense
    >
      <v-text-field
        v-model="username"
        outlined
        label="Enter Username"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
      dense
    >
      <v-text-field
        v-model="password"
        type="password"
        outlined
        label="Enter Password"
      />
    </v-row>
    <v-row
      align="center"
      class="ma-3"
    >
      <v-spacer />
      <v-btn
        color="primary"
        @click="login"
      >
        Login
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import TreeStepCheckbox from '@/components/Commons/Checkboxes/TreeStepCheckbox'

export default {
  name: 'Login',

  components: {
    TreeStepCheckbox,
  },

  props: {

  },

  data() {
    return {
      username: '',
      password: '',
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
    login() {
      const _this = this;
      axios.post(`${process.env.API_URL}/api/user/login`, {
        username: this.username,
        password: this.password,
      })
        .then(async function (response) {
          console.log('update response...', response);
          if(response.data != null && Object.keys(response.data).length > 0) {
            await _this.$store.dispatch('setIsLogin', true);
            await _this.$store.dispatch('setUserName', response.data.username);
            // _this.$router.push('Survey');
            location.reload();
          } else {
            alert('username or password is not correct!')
          }
        })
        .catch(function (error) {
          console.log(error)
        });
      // this.$store.dispatch('updateDemoData', this.surveyData);
    }
  },

};
</script>
