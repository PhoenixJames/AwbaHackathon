<template>
  <v-container class="pa-5 pb-0">
    <v-row>
      <v-spacer /><h3>My Cart</h3><v-spacer />
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
            <InventoryPurchaseListCard
              :inventory="inventory"
            />
          </div>
          <v-row>
            Total
            <v-spacer />
            {{ totalAmount }}
          </v-row>
          <v-row class="mt-5">
            <v-spacer />
            <v-btn
              color="primary"
              small
              @click="dialog=true"
            >
              Purchase
            </v-btn>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          Purchase
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Name"
                outlined=""
                v-model="order.customerName"
                maxlength="25"
                counter
              />
            </v-row>
            <v-row>
              <v-text-field
                label="Phone"
                outlined=""
                v-model="order.customerPhone"
                maxlength="25"
                counter
              />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer />
              <v-btn
                color="primary"
                @click="purchaseItems"
              >
                Confirm
              </v-btn>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <LoadingDialog :loading="loading" /> -->
  </v-container>
</template>

<script>
import InventoryPurchaseListCard from '@/components/Inventory/Cards/InventoryPurchaseListCard';
import axios from 'axios';

export default {
  components: {
    InventoryPurchaseListCard,
  },

  data: () => ({
    inventories: [],
    order: {
      customerName: '',
      customerPhone: '',
    },
    dialog: false,
    orders: [],
    refresh: false,
    receiveCode: null,
    confirmReceiveDialog: false,
    workerPanel: undefined,
  }),

  computed: {
    totalAmount () {
      const prices = this.inventories.map(e => parseInt(e.price * e.purchaseQty));
      return prices.reduce((a, b) => a + b, 0)
    },
  },

  async mounted() {
    await this.prepareData();
  },

  methods: {
    goto(routeName) {
      this.$router.push({ name: routeName });
    },
    async prepareData() {
      let orders = await this.findOrder();
      orders = orders.filter(e => e.status == 'addtocart')
      const orderInventoriesIds = orders.map(e => e.inventoryId)
      let inventories = await this.findInventory();
      inventories = inventories.map((e) => {
        if (orderInventoriesIds.includes(e.id)) {
          const order = orders.find(order => order.inventoryId == e.id);
          e.purchaseQty = order.qty;
          return e;
        }
        return null;
      })
      this.inventories = inventories.filter(e => e != null);
    },
    async purchaseItems() {
      await Promise.all(this.inventories.map((e) => {
        axios.post(`${process.env.API_URL}/api/order/purchaseitem`, {
          customerName: this.order.customerName,
          customerPhone: this.order.customerPhone,
          inventoryId: e.id,
        })
          .then((response) => {
            console.log('create response...', response);
          })
          .catch((error) => {
            console.log(error)
          });
      }));
      alert('purchase successful');
      await this.prepareData();
      this.dialog = false;
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
