<template>
  <div>
    <x-header></x-header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');html {
  text-align: center;
  font-family: Nunito, sans-serif;
}

:root {
  --color-grey: grey;
  --color-black: #0a0a0a;
  --color-sale: #f56827;
}
</style>
<script setup lang="ts">
import XHeader from "@/components/XHeader.vue";
import MainContent from "@/components/MainContent.vue";
import XCart from "@/components/XCart.vue";

</script>