<script setup lang="ts">

import HeaderLogo from "@/components/HeaderLogo.vue";
import HeaderActions from "@/components/HeaderActions.vue";
</script>

<template>
  <header>
    <div class="header_content">
      <header-logo></header-logo>
      <header-actions></header-actions>
    </div>
    <hr>
  </header>
</template>

<style scoped>
header {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.header_content {
  display: flex;
  justify-content: center;
  margin: 0 100px 0 100px;
  align-items: center;
}
hr {
  color: var(--color-grey);
  margin-bottom: 0;
}
</style>