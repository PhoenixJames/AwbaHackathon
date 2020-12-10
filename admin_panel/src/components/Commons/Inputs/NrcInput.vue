<template>
  <v-container class="ma-0 pa-0">
    <v-col
      cols="24"
      class="ma-0 pa-0"
    >
      <v-row
        no-gutters
        dense
      >
        <v-col cols="3">
          <v-select
            dense
            full-width
            single-line
            outlined
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
            v-model="regionCode"
            @change="setNrcNumber"
          />
        </v-col>
        <v-col cols="3">
          <!-- <v-text-field
            dense
            full-width
            single-line
            outlined
            v-model="townshipCode"
            @input="setNrcNumber"
          /> -->
          <v-select
            dense
            full-width
            single-line
            outlined
            :items="nrcTownships"
            v-model="townshipCode"
            @change="setNrcNumber"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            dense
            full-width
            single-line
            outlined
            :items="['N', 'P', 'E']"
            v-model="nationalCode"
            @change="setNrcNumber"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            full-width
            single-line
            outlined
            v-model="nrcValue"
            @change="setFullNrcNumber"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import townships from '@/assets/js/nrc_townships';

export default {
  components: {
  },

  props: {
  },

  data: () => ({
    regionCode: 1,
    townshipCode: '',
    nationalCode: '',
    nrcValue: '',
  }),

  computed: {
    nrcTownships() {
      if (this.regionCode != null) {
        return townships[this.regionCode];
      }
      return [];
    },
  },

  methods: {
    setNrcNumber() {
      const fullNrcNumber = `${this.regionCode}/${this.townshipCode}(${this.nationalCode})${this.nrcValue}`;
      this.$emit('setNrcNumber', fullNrcNumber);
    },
    setFullNrcNumber() {
      const fullNrcNumber = `${this.regionCode}/${this.townshipCode}(${this.nationalCode})${this.nrcValue}`;
      this.$emit('setNrcNumber', fullNrcNumber);
      this.regionCode = 1;
      this.townshipCode = '';
      this.nationalCode = '';
      this.nrcValue = '';
    },
  },
};
</script>
