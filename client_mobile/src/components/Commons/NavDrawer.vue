<template>
  <v-navigation-drawer
    v-model="isDrawerOpen"
    absolute
    temporary
    style="position: fixed"
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >

        <nav-drawer-button
          label="Inventory"
          icon="mdi-arrow-right"
          @click="go('Inventory-List-Page')"
        />
        <nav-drawer-button
          label="My Cart"
          icon="mdi-arrow-right"
          @click="go('Inventory-Purchase-Page')"
        />
        <!-- <VersionLabelButton style="position: fixed; bottom: 5px;" /> -->
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import VersionLabelButton from '@/components/Commons/Buttons/VersionLabelButton';
import NavDrawerButton from '@/components/Commons/Buttons/NavDrawerButton';

export default {
  components: {
    // VersionLabelButton,
    NavDrawerButton,
  },

  data: () => ({
    group: null,
    isDrawerOpen: false,
    worker: {},
    enabelM: '',
  }),

  methods: {
    go(name) {
      this.$router.push({
        name,
      });
    },
    logout() {
      this.$store.dispatch('setIsLogin', false);
      location.reload();
    },
  },

  watch: {
    isDrawerOpen() {
      if (!this.isDrawerOpen) {
        this.$root.$emit('drawer-closed');
      }
    },
  },

  mounted() {
    this.$root.$on('toggle-drawer', (isDrawerOpen) => {
      this.isDrawerOpen = isDrawerOpen;
    });
    // this.$root.$on('profile-data', (worker) => {
    //   this.worker = worker;
    // });
  },
};
</script>
