<template>
  <v-container
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
      justify-center
      align-center
    >
      <v-flex
        align-center
        xs12
        sm10
      >
        <v-row>
          <v-spacer />
          <span class="display-1">Update a Product</span>
          <v-spacer />
        </v-row>

        <v-stepper
          v-model="step"
          style="overflow: auto; height: 80vh"
          vertical
        >
          <v-stepper-header
            class="headerst"
            color="blue"
          >
            <v-stepper-step
              step="1"
              :complete="step > 1"
            >
              Basic Product Information
            </v-stepper-step>
            <!-- <v-divider />
            <v-stepper-step
              step="2"
              :complete="step > 2"
            >
              Experience
            </v-stepper-step>
            <v-divider />
            <v-stepper-step step="3">
              More Info
            </v-stepper-step> -->
          </v-stepper-header>
          <v-stepper-items class="my-5">
            <v-stepper-content step="1">
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-container>
                  <v-row>
                    <v-text-field
                      label="Please provide a product title"
                      outlined=""
                      v-model="product.title"
                    />
                  </v-row>

                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.price"
                      color="purple darken-2"
                      label="Price"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.fee"
                      color="purple darken-2"
                      label="Fee"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.lumpSum"
                      color="purple darken-2"
                      label="Lump Sum"
                    />
                  </v-row>
                  <v-row>
                    <PaymentMethodSelect
                      region="mm"
                      :is-multiple="true"
                    />
                    <!-- <PaymentMethodsCombo
                      :payment-methods="paymentMethods"
                      :organisation="organisation"
                      @paymentMethodsUpdated="setPaymentMethods"
                      style="width:600px"
                    /> -->
                  </v-row>
                  <v-row v-if="product.itemAttributes.length > 0">
                    <v-chip
                      v-for="(attr, i) in product.itemAttributes"
                      :key="i"
                      class="ma-2"
                      color="gray"
                      dark
                      label
                    >
                      {{ attr }}
                    </v-chip>
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="attribute"
                      color="purple darken-2"
                      label="Attributes"
                    />
                    <v-btn
                      dark
                      @click="addItemAttribute"
                    >
                      Add
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.description"
                      color="purple darken-2"
                      label="Description"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.productMetadata.image"
                      color="purple darken-2"
                      label="Image"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.productMetadata.productUrl"
                      color="purple darken-2"
                      label="Image"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.productMetadata.availableQuantity"
                      color="purple darken-2"
                      label="Quantity"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.pickupInstructions"
                      color="purple darken-2"
                      label="Pickup Instructions"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="product.pickupContact"
                      color="purple darken-2"
                      label="Pickup Contact"
                    />
                  </v-row>
                </v-container>
              </v-form>
              <v-btn
                @click="cancelProductUpdate"
              >
                Cancel
              </v-btn>
              <!-- <v-btn
                color="primary"
                @click.native="step = 2"
              >
                Continue
              </v-btn> -->
              <v-btn
                class="jobdoh"
                dark
                :disabled="!valid"
                @click.prevent="updateProduct"
              >
                Update Product
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import PaymentMethodSelect from '@/components/Common/Selects/PaymentMethodSelect';

export default {
  name: 'UpdateProduct',

  components: {
    // PaymentMethodsCombo,
    PaymentMethodSelect,
  },

  props: {
    organisation: {
      type: Object,
      default: () => {},
    },
    productData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      valid: false,
      step: 1,
      paymentMethods: [],
      product: {
        title: '',
        description: '',
        deposit: 0,
        price: 0,
        fee: 0,
        listingStartDate: null,
        listingEndDate: null,
        lumpSum: 0,
        productMetadata: {
          image: null,
          productUrl: null,
          availableQuantity: null,
        },
        itemAttributes: [],
        pickupInstructions: null,
        pickupContact: null,
      },
      attribute: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    this.product = this.productData;
  },

  methods: {
    setPaymentMethods(paymentMethods) {
      this.paymentMethods = paymentMethods;
    },
    cancelProductUpdate() {
      this.$router.push({ name: 'view-products' });
      this.$destroy();
    },
    addItemAttribute() {
      if (this.attribute != null) {
        this.product.itemAttributes.push(this.attribute);
      }
    },
    // showAlertDialog(message);
    async updateProduct() {
      const args = {
        id: this.product.id,
        lumpSum: parseInt(this.product.lumpSum, 5),
        organisationId: this.$store.getters.currentOrganisationId,
        title: this.product.title,
        description: this.product.description,
        price: parseFloat(this.product.price),
        fee: parseFloat(this.product.fee),
        listingStartDate: moment().toDate(),
        listingEndDate: moment('2022-01-01').toDate(),
        productMetadata: this.product.productMetadata,
        itemAttributes: this.product.itemAttributes,
        pickupInstructions: this.product.pickupInstructions,
        pickupContact: this.product.pickupContact,
      };
      try {
        const { data } = await this.$ProductService.updateProduct(args)
          .catch((err) => {
            this.$eventHub.$emit('show-alert', {
              alert: true,
              type: 'error',
              message: err,
            });
          });
        if (data.updateProduct.id) {
          this.$eventHub.$emit('show-alert', {
            alert: true,
            type: 'success',
            message: 'This product create is successful!.',
          });
          await this.$eventHub.$emit('refetch-product-list');
          this.$router.push({ name: 'view-products' });
          this.$destroy();
        }
      } catch (err) {
        this.$log.error(err);
      }
    },
  },
};
</script>
