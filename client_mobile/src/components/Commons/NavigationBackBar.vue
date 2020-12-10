<template>
  <v-app-bar
    color="grey lighten-3"
    height="45"
  >
    <v-btn
      icon
      @click.stop="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
};
</script>
