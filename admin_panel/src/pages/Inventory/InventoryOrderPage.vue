<template>
  <v-container class="pa-5 pb-0">
    <v-row>
      <v-spacer /><h3>Orders</h3><v-spacer />
    </v-row>
    <div
      class="py-5"
      style="overflow: auto; height: 75vh; overflow-x: hidden;"
    >
      <v-row no-gutters>
        <v-spacer />
        <v-col    
          cols="6"         
        >
          <div
            v-for="(inventory, i) in inventories"
            :key="i"
          >
            <InventoryOrderListCard
              :inventory="inventory"
              @reloadOrderList="reloadOrderList"
            />
          </div>
        </v-col>
        <v-spacer />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import InventoryOrderListCard from '@/components/Inventory/Cards/InventoryOrderListCard';
import axios from 'axios';

export default {
  components: {
    InventoryOrderListCard,
  },

  data: () => ({
    inventories: [],
    orders: [],
    refresh: false,
    receiveCode: null,
    confirmReceiveDialog: false,
    workerPanel: undefined,
  }),

  computed: {
  },

  async mounted() {
    await this.prepareData();
  },

  methods: {
    async reloadOrderList() {
      await this.prepareData();
    },
    goto(routeName) {
      this.$router.push({ name: routeName });
    },
    async prepareData() {
      let orders = await this.findOrder();
      orders = orders.filter(e => e.status == 'purchased')
      const orderInventoriesIds = orders.map(e => e.inventoryId)
      let inventories = await this.findInventory();
      inventories = inventories.filter((e) => {
        if (orderInventoriesIds.includes(e.id)) {
          return true;
        }
        return false;
      })
      this.inventories = inventories.filter(e => e != null);
    },
    async findInventory() {
      let res = await axios.get(`${process.env.API_URL}/api/inventory/find`);
      return res.data;
    },
    async findOrder() {
      let res = await axios.get(`${process.env.API_URL}/api/order/find`);
      return res.data;
    },
  },
};
</script>
