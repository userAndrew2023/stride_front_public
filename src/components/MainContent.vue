<script setup lang="ts">

import ProductGrid from "@/components/ProductGrid.vue";
import {ref} from "vue";
import { useRoute } from "vue-router";

const filters = ref([]);

let search = useRoute().query.query ?? "";

</script>

<template>
  <div class="container">
    <product-grid :filters="filters" :key="filters.length" :search="search"></product-grid>
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