<template>
  <v-card width="400">
    <v-card-text
      class="pa-0"
      v-ripple
    >
      <v-card-text class="py-0">
        <v-card
          class="pa-2"
          flat
        >
          <v-img
            v-if="inventory.imageUrl"
            :src="inventory.imageUrl"
            max-height="100"
            contain
            alt="There has no image for inventory"
          />
        </v-card>
      </v-card-text>

      <v-divider />

      <v-card-title class="py-1 pb-0">
        <!-- 25 chars for 1 line -->
        {{ inventory.title }}
      </v-card-title>
      <v-card-title class="py-1 pb-0">
        <v-icon
          small
          left
        >
          mdi-cash
        </v-icon>{{ inventory.price }} {{ inventory.currency}}
      </v-card-title>
      <v-card-text class="text-primary pb-1">
        <span>
          <!-- 75 chars for 2 line -->
          {{ inventory.description}}
        </span>
      </v-card-text>
      <v-row
        justify="end"
        align="start"
        no-gutters
        class="pl-4"
      >
        <v-spacer />
        <v-text-field
          v-model="qty"
          style="width:10px;"
          type="number"
          @mousedown.stop
          @touchstart.stop
        />
        <v-btn
          class="mt-5"
          text
          @mousedown.stop
          @touchstart.stop
          @click.stop="addToCart(inventory)"
          small
        >
          <v-icon
            left
          >
            mdi-cart-plus
          </v-icon>
          Add To Cart
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
// import AddToCart from './components/AddToCart';
// import PaymentMethodsLabel from '@/components/Payments/Labels/PaymentMethodsLabel';

export default {
  components: {
    // ProductPaymentRateLabel,
    // AddToCart,
  },

  props: {
    inventory: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      saved: false,
      qty: 1,
    };
  },

  computed: {
  },

  methods: {
    addToCart() {
      const args = {
        qty: this.qty,
        inventoryId: this.inventory.id,
      };
      try {
        axios.post(`${process.env.API_URL}/api/order/addtocart`, args)
          .then((response) => {
            console.log('create response...', response);
            alert('add to cart successful');
          })
          .catch((error) => {
            console.log(error)
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.row >>> .col {
  padding: 2px 10px;
}
.container >>> .row {
  line-height: 1.2;
}
</style>
