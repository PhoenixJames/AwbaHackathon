<template>
  <v-container class="pa-5 pb-0">
    <v-row>
      <v-spacer />
      <span class="display-1">Inventories</span>
      <v-spacer />
      <v-menu
        v-model="inventoryCreateMenu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        max-width="170"
        open-on-hover
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="mr-6 ml-2"
            color="primary"
            v-on="on"
            depressed
            width="170"
          >
            Create Inventory
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item
              @click="goto('Inventory-Create-Page')"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Create Inventory
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
    <div
      style="overflow: auto; height: 75vh; overflow-x: hidden;"
    >
      <v-row no-gutters>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="inventories"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
          <!-- <div
            v-for="(inventory, i) in inventories"
            :key="i"
          >
            <InventoryListCard
              :inventory="inventory"
            />

          </div> -->
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
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'Price', value: 'price' },
      { text: 'Currency', value: 'currency' },
      { text: 'Description', value: 'description' },
      { text: 'Image Url', value: 'imageUrl' },
    ],
    inventoryCreateMenu: false,
    inventories: [],
    refresh: false,
    receiveCode: null,
    confirmReceiveDialog: false,
    workerPanel: undefined,
  }),

  computed: {
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
