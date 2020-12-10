<template>
  <span>
    <v-btn
      icon
      v-if="status == null"
      large
      @click="changeStatus(true)"
    >
      <v-icon>mdi-checkbox-blank-outline</v-icon>
    </v-btn>
    <v-btn
      icon
      color="green"
      large
      v-if="status == true"
      @click="changeStatus(false)"
    >
      <v-icon>mdi-checkbox-marked-outline</v-icon>
    </v-btn>
    <v-btn
      icon
      color="red"
      large
      v-if="status == false"
      @click="changeStatus(null)"
    >
      <v-icon>mdi-close-box-outline</v-icon>
    </v-btn>
  </span>
</template>
<script>
export default {
  props: {
    status: { // deprecated
      type: Boolean,
      default: null,
    },
  },
  data: () => ({
    // status: null,
  }),
  mounted() {
  },
  methods: {
    changeStatus(status) {
      this.status = status;
      this.$emit('changeStatus', status);
    },
  },

};
</script>
