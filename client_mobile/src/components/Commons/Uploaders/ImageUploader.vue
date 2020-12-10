<template>
  <div
    class="row-style"
    :style="{position: 'relative', 'height': height, 'max-width': width}"
  >
    <v-img
      v-if="value && !uploading"
      :src="value"
      max-height="100%"
      max-width="100%"
    />
    <v-file-input
      v-if="!uploading"
      accept="image/*"
      outlined
      v-model="image"
      prepend-icon="mdi-camera"
      @change="onUpload"
      :style="{position: 'absolute', opacity: uploaderOpacity}"
    />
    <v-container
      v-else
      class="fill-height"
      :style="{position: 'absolute', height: '100%', width: '100%'}"
    >
      <v-row
        no-gutters
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          sm="12"
        >
          <v-row
            no-gutters
            justify="center"
            class="mb-2"
          >
            Uploading Image
          </v-row>
          <v-row
            no-gutters
            justify="center"
          >
            <v-progress-linear
              style="max-width: 200px;"
              color="primary"
              indeterminate
              rounded
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  props: {
    value: String,
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100px',
    },
  },
  data() {
    return {
      image: null,
      uploadValue: 0,
      uploading: false,
    };
  },
  computed: {
    uploaderOpacity() {
      return this.value ? 0 : 1;
    },
  },
  methods: {
    onUpload() {
      this.$log.debug('Start uploading...');
      console.log(image);
    },
  },
};
</script>

<style scoped>
.row-style {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
.v-input >>> .v-input__control {
  display: none !important;
}
.v-input >>> .v-icon {
  font-size: 55px;
}
.v-input >>> div
  {
  margin: 0 !important;
  height: 100% !important;
  width: 100% !important;
}

.v-input >>> button
  {
  margin: 0 !important;
  height: 100% !important;
  width: 100% !important;
}
/* .v-input, .v-input__prepend-outer, .v-icon {
  height: 100% !important;
  width: 100% !important;
} */
.v-input {
  height: 100% !important;
  width: 100% !important;
}
</style>
