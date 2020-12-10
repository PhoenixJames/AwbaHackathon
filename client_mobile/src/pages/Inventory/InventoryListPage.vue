<template>
  <v-container class="pa-5 pb-0">
    <v-row>
      <v-spacer /><h3>Inventories</h3><v-spacer />
    </v-row>
    <div
      class="py-5"
      style="overflow: auto; height: 75vh; overflow-x: hidden;"
    >
      <v-row no-gutters>
        <v-col             
          v-for="(inventory, i) in inventories"
          :key="i"
        >
          <InventoryListCard
            :inventory="inventory"
          />
        </v-col>
      </v-row>
    </div>
    <!-- <LoadingDialog :loading="loading" /> -->
  </v-container>
</template>

<script>
import InventoryListCard from '@/components/Inventory/Cards/InventoryListCard';
import axios from 'axios';

export default {
  components: {
    InventoryListCard,
  },

  data: () => ({
    inventoryCreateMenu: false,
    inventories: [],
    refresh: false,
    receiveCode: null,
    confirmReceiveDialog: false,
    workerPanel: undefined,
  }),

  computed: {
    organisation() {
      return this.$store.getters.currentOrganisation;
    },
  },

  async mounted() {
    this.inventories = await this.findInventory();
  },

  methods: {
    goto(routeName) {
      this.$router.push({ name: routeName });
    },
    async findInventory() {
      let res = await axios.get(`${process.env.API_URL}/api/inventory/find`);
      return res.data;
    },
  },
};
</script>
