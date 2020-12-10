<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title><v-row class="mx-5">{{ inventory.title }}</v-row></v-list-item-title>
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
            @click="confirmItems"
          >
            Confirm
          </v-chip>
        </v-row>
      </v-list-item-actions>
    </v-list-item>
    <v-divider />
  </v-container>
</template>
<script>
import axios from 'axios';
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
    async confirmItems() {
      axios.post(`${process.env.API_URL}/api/order/confirmpurchase`, {
        inventoryId: this.inventory.id,
      })
        .then((response) => {
          console.log('create response...', response);
        })
        .catch((error) => {
          console.log(error)
        });

      alert('confirm successful');
      this.$emit('reloadOrderList')
      this.dialog = false;
    },
  },
};
</script>
