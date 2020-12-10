<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-row class="mx-5">
          {{ inventory.title }}
          <v-spacer />
          <span class="pt-5">{{inventory.purchaseQty}}</span>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-row class="mx-5">
            <v-icon
              small
              left
            >
              mdi-cash
            </v-icon>{{ inventory.price }}
          </v-row>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-actions>
        <v-row>
          <v-chip
            class="mx-1"
            outlined
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-chip>
        </v-row>
      </v-list-item-actions>
    </v-list-item>
    <v-divider />
  </v-container>
</template>
<script>
export default {
  props: {
    inventory: {
      type: Object,
      default: () => {},
    },
  },
  components: {
  },
  data: () => ({
  }),

  async mounted() {
  },

  computed: {
  },

  methods: {
  },
};
</script>
