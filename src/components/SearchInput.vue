<script setup lang="ts">
function onEnter() {
  if (searchRequest.length > 0) {
    emit("sendSearchRequest", searchRequest)
  }
}

// eslint-disable-next-line no-undef
const emit = defineEmits(["sendSearchRequest"]) 

let searchRequest = "";
</script>

<template>
  <div>
    <input class="search-input" v-model="searchRequest" placeholder="Я ищу" v-on:keyup.enter="onEnter">
  </div>
</template>

<style scoped>
.search-input {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid;
  font-size: 14px;
  margin-left: 10px;
  width: 800px;
  font-family: Nunito, sans-serif;
}
</style>