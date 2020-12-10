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
          <span class="display-1">Create Inventory</span>
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
              Basic Information
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
                      v-model="inventory.title"
                      maxlength="25"
                      counter
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      label="Please provide a company name"
                      outlined=""
                      v-model="inventory.companyName"
                      maxlength="25"
                      counter
                    />
                  </v-row>

                  <v-row>
                    <v-text-field
                      outlined
                      v-model="inventory.price"
                      color="purple darken-2"
                      label="Price"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="inventory.currency"
                      color="purple darken-2"
                      label="Currency"
                    />
                  </v-row>
                  <v-row class="pa-1">
                    <!-- <ImageUploader
                      @upload-complete="setImageUrl"
                      width="100%"
                      height="200px"
                      class="mb-11"
                    /> -->
                    <input
                      type="file"
                      ref="file"
                      @change="selectFile"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="inventory.qty"
                      color="purple darken-2"
                      label="qty"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                      outlined
                      v-model="inventory.description"
                      color="purple darken-2"
                      label="Description"
                    />
                  </v-row>
                  <!-- <v-row>
                    <ImageUploader @upload-complete="setImageUrl" />
                    <v-text-field
                      outlined
                      v-model="product.productMetadata.image"
                      color="purple darken-2"
                      label="Image"
                    />
                  </v-row> -->
                </v-container>
              </v-form>
              <v-btn @click="cancelInventoryCreate">
                Cancel
              </v-btn>
              <!-- <v-btn
                color="primary"
                @click.native="step = 2"
              >
                Continue
              </v-btn> -->
              <v-btn
                color="primary"
                :disabled="!valid"
                @click.prevent="createInventory"
              >
                Create Inventory
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
import axios from 'axios';
import ImageUploader from '@/components/Commons/Uploaders/ImageUploader';

export default {
  name: 'CreateInventory',

  components: {
    ImageUploader,
  },

  props: {
    organisation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      file: null,
      valid: false,
      step: 1,
      inventory: {
        title: '',
        companyName: '',
        price: '',
        currency: '',
        qty: 0,
        imageUrl: '',
        description: '',
      },
      attribute: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    setImageUrl () {

    },
    // showAlertDialog(message);
    cancelInventoryCreate() {
       this.$router.push({ name: 'view-inventories' });
    },
    async createInventory() {
      const args = {
        title: this.inventory.title,
        companyName: this.inventory.companyName,
        price: this.inventory.price,
        currency: this.inventory.currency,
        qty: this.inventory.qty,
        imageUrl: this.inventory.imageUrl,
        description: this.inventory.description,
      };
      try {
        axios.post(`http://localhost:3000/api/inventory/add`, args)
          .then((response) => {
            console.log('create response...', response);
            alert('create successful');
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
