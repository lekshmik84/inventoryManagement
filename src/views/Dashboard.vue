<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import CategoriesList from "./components/CategoriesList.vue";

import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";

const inventoryMetrics = {
  totalItems: {
    title: "Total Items",
    value: "3,500",
    description: "<span class='text-sm font-weight-bolder text-success'>+15%</span> since last month",
    icon: {
      component: 'ni ni-archive-2',
      background: 'bg-gradient-primary',
      shape: 'rounded-circle',
    }
  },
  lowStockAlerts: {
    title: "Low Stock Alerts",
    value: "150",
    description: "<span class='text-sm font-weight-bolder text-danger'>-10%</span> from last week",
    icon: {
      component: 'ni ni-bell-55',
      background: 'bg-gradient-danger',
      shape: 'rounded-circle',
    }
  },
  pendingOrders: {
    title: "Pending Orders",
    value: "25",
    description: "<span class='text-sm font-weight-bolder text-success'>+20%</span> since yesterday",
    icon: {
      component: 'ni ni-cart',
      background: 'bg-gradient-warning',
      shape: 'rounded-circle',
    }
  },
  revenue: {
    title: "Revenue",
    value: "$85,600",
    description: "<span class='text-sm font-weight-bolder text-success'>+8%</span> than last quarter",
    icon: {
      component: 'ni ni-money-coins',
      background: 'bg-gradient-info',
      shape: 'rounded-circle',
    }
  }
};

const categories = [
  {
    icon: {
      component: 'ni ni-mobile-button',
      background: 'dark',
    },
    label: 'Electronics',
    description: '250 in stock <strong>346+ sold</strong>',
  },
  {
    icon: {
      component: 'ni ni-tag',
      background: 'dark',
    },
    label: 'Clothing',
    description: '123 closed <strong>15 open</strong>',
  },
  {
    icon: { component: 'ni ni-box-2', background: 'dark' },
    label: 'Accessories',
    description: '1 is active <strong>40 closed</strong>',
  },
  {
    icon: { component: 'ni ni-satisfied', background: 'dark' },
    label: 'Footwear',
    description: '+ 430',
  },
];

const sales = {
  us: {
    country: "United States",
    quantity: 2500,
    value: "$230,900",
    location: "East Coast",
    flag: US,
  },
  germany: {
    country: "Germany",
    quantity: 3900,
    value: "$440,000",
    location: "Berlin",
    flag: DE,
  },
  britain: {
    country: "Great Britain",
    quantity: 1400,
    value: "$190,700",
    location: "London",
    flag: GB,
  },
  brasil: {
    country: "Brasil",
    quantity: 562,
    value: "$143,960",
    location: "Sao Paulo",
    flag: BR,
  },
};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div v-for="(metric, index) in inventoryMetrics" :key="index" class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              :title="metric.title"
              :value="metric.value"
              :description="metric.description"
              :icon="metric.icon"
            />
          </div>
        </div>
        <div class="row lineChart">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart
                id="chart-line"
                title="Inventory Trends"
                description="<i class='fa fa-arrow-up text-success'></i> <span class='font-weight-bold'>5% growth</span> in stock"
                :chart="{
                  labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'Total Items',
                      data: [2000, 2200, 2500, 2800, 3200, 3500, 3700, 3800, 4000, 4200, 4300, 4500],
                    },
                  ],
                }"
              />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Inventory by Location</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">
                              Country:
                            </p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Quantity:</p>
                          <h6 class="mb-0 text-sm">{{ sale.quantity }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Location:</p>
                          <h6 class="mb-0 text-sm">{{ sale.location }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-list :categories="categories" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .lineChart {
    justify-content: center;
  }
  .bgColor{
    background-color: (310deg, #bf1eb3 0%, #2dcecc 100%);
  }
</style>
