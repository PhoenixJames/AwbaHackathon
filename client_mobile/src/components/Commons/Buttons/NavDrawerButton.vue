<template>
  <v-list-item
    active-class="jobdoh"
    @click="$emit('click')"
  >
    <v-list-item-icon>
      <v-icon> {{ icon }} </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="label" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-icon',
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
