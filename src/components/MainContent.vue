<script setup lang="ts">

import XFilters from "@/components/XFilters.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import {ref} from "vue";

const filters = ref([]);

const setFilters = (new_filters: never[]) => {
  filters.value = [...new_filters];
}

</script>

<template>
  <div class="container">
    <x-filters @set-filters="setFilters"></x-filters>
    <product-grid :filters="filters" :key="filters.length"></product-grid>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  margin: 0 100px 0 100px;
  padding-top: 100px;
  justify-content: center;
}
</style>