<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from './SearchInput.vue';

const showDropdown = ref(false);

const navigate = (option: string) => {
  console.log(`Navigating to ${option}`);
};
</script>

<template>
  <div class="header_action_icons">
    <span class="material-symbols-outlined header_action_icon" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">account_circle</span>
    <div v-if="showDropdown" class="dropdown-menu" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
      <span class="dropdown-item" @click="$router.push('profile')">Профиль</span>
      <span class="dropdown-item" @click="$router.push('orders')">Заказы</span>
    </div>
    <div>
      <span class="material-symbols-outlined header_action_icon shopping_cart">
        <router-link class="link" to="/cart">shopping_bag</router-link>
      </span>
    </div>
  </div>
</template>

<style scoped>
.link {
  color: grey;
  text-decoration: none;
}
.header_action_icons {
  margin-left: auto; /* Align to the right */
  margin-left: 375px;
  display: grid;
  grid-template-columns: repeat(3, 50px);
  position: relative; /* Set position relative for the container */
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
  transition: 0.3s;
}

.header_action_icon:hover {
  color: var(--color-black);
}
.dropdown-menu {
  text-align: left;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1; /* Ensure the dropdown is above other elements */
  left: 20px; /* Place it at 50% of the parent container */
  transform: translateX(-50%); /* Translate it back by half of its own width */
}

.dropdown-item {
  cursor: pointer;
  display: block;
  padding: 8px 12px;
  font-size: 16px;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>