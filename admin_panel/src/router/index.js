import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import SurveyPage from '@/pages/SurveyPage.vue';
import ReportPage from '@/pages/ReportPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import InventoryCreatePage from '@/pages/Inventory/InventoryCreatePage.vue';
import InventoryListPage from '@/pages/Inventory/InventoryListPage.vue';
import InventoryOrderPage from '@/pages/Inventory/InventoryOrderPage.vue';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/survey',
      name: 'Survey',
      component: SurveyPage,
    },
    {
      path: '/report',
      name: 'Report',
      component: ReportPage,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/inventory-create-page',
      name: 'Inventory-Create-Page',
      component: InventoryCreatePage,
    },
    {
      path: '/inventory-list-page',
      name: 'Inventory-List-Page',
      component: InventoryListPage,
    },
    {
      path: '/inventory-order-page',
      name: 'Inventory-Order-Page',
      component: InventoryOrderPage,
    },
    
  ],
});
