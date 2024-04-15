<script setup lang="ts">

</script>

<template>
  <div class="header_action_icons">
    <span class="material-symbols-outlined header_action_icon">search</span>
    <span class="material-symbols-outlined header_action_icon">account_circle</span>
    <span class="material-symbols-outlined header_action_icon">shopping_bag</span>
  </div>
</template>

<style scoped>
.header_action_icons {
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.header_action_icon {
  cursor: pointer;
  font-size: 30px;
  color: var(--color-grey);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>