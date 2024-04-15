<script setup lang="ts">

import HeaderActionsCategories from "@/components/HeaderActionsCategories.vue";
</script>

<template>
  <div class="header_logo_div">
    <router-link to="/"><img src="@/assets/logo.svg" alt="logo" class="main_logo"></router-link>
    <header-actions-categories></header-actions-categories>
  </div>
</template>

<style scoped>
.main_logo {
  width: 70px;
}

.header_logo_div {
  display: flex;
  align-items: center;
}
</style>