<script setup lang="ts">

</script>

<template>
  <div class="header_categories">
    <div class="header_category"><router-link class="link" to="/sneakers">КРОССОВКИ</router-link></div>
    <div class="header_category"><router-link class="link" to="/accessories">АКСЕССУАРЫ</router-link></div>
    <div class="header_category"><router-link class="link" to="/sales">АКЦИИ %</router-link></div>
    <div class="header_category"><router-link class="link" to="/info">ИНФОРМАЦИЯ</router-link></div>
  </div>
</template>

<style scoped>
.header_categories {
  display: flex;
  width: 600px;
  font-size: 17px;
  align-items: center;
  justify-content: space-between;
  margin-left: 70px;
  margin-right: 70px;
}

.link {
  color: black;
  text-decoration: none;
}

.header_category {
  transition: 0.3s;
}
</style>