<script setup lang="ts">

import {reactive} from "vue";

let filters = reactive([
  [
    {
      name: 'size',
      value: 36,
      active: false,
    },
    {
      name: 'size',
      value: 37,
      active: false,
    },
    {
      name: 'size',
      value: 38,
      active: false,
    },
    {
      name: 'size',
      value: 39,
      active: false,
    },
    {
      name: 'size',
      value: 40,
      active: false,
    }
  ],
]);

function gridClick(filterIndex: number, index: number) {
  filters[filterIndex][index].active = !filters[filterIndex][index].active;
  emit('setFilters', filters[filterIndex].filter((value) => value.active))
}

// eslint-disable-next-line no-undef
const emit = defineEmits(['setFilters']);

</script>

<template>
  <div class="filters">
    <div class="filter">
      <div>
        <h4>Размер</h4>
      </div>
      <div v-for="(filter, filterIndex) in filters" :key="filterIndex">
        <div class="grid-container">
          <div v-for="(item, index) in filter" :key="index" class="grid-item"
               :class="{ 'grid-item-active': filters[filterIndex][index].active }"
               @click="gridClick(filterIndex, index)">{{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 50px);
  grid-gap: 8px;
  width: 300px;
}

.grid-item {
  font-size: 14px;
  text-align: center;
  outline: 1px solid;
  padding: 16px;
  cursor: pointer;
  border-color: var(--color-black);
}

.grid-item:not(.grid-item-active) {
  outline-color: var(--color-grey);
}

.grid-item-active {
  outline: 2px solid;
}

.filters {
  text-align: left;
}
</style>