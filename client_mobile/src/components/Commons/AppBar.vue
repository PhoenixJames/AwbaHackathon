<template>
  <v-app-bar
    height="45"
    color="grey lighten-3"
    absolute
  >
    <v-btn
      v-if="back"
      icon
      @click.stop="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn
      v-else
      icon
      @click.stop="toggleDrawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>


    <v-spacer />

    <slot>
      <v-btn
        icon
        @click="$EventBus.$emit('help-dialog')"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </slot>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    back: Boolean,
    fixed: { // deprecated
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    isDrawerOpen: false,
  }),

  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      this.$root.$emit('toggle-drawer', this.isDrawerOpen);
    },
  },

  mounted() {
    this.$root.$on('drawer-closed', () => {
      this.isDrawerOpen = false;
      this.$emit('drawer-toggled', this.isDrawerOpen);
    });
  },
};
</script>
