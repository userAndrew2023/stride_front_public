<script setup lang="ts">
import router from '@/router';
import SearchInput from './SearchInput.vue';

function sendSearchRequest(searchRequest: string) {
  console.log(searchRequest);
  router.push("/search?query=" + searchRequest)
}

</script>

<template>
  <div class="header_categories">
    <div class="header_category">
      <div class="search_wrapper">
        <SearchInput @send-search-request="sendSearchRequest"/>
      </div>
    </div>
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
  display: flex;
  align-items: center;
  transition: 0.3s;
}
</style>