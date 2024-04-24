<script setup lang="ts">

import {reactive, ref} from "vue";
import axios from "axios";

let products = ref([]);
let loading = ref(true);

function prettyPrice(price: number | string) {
  const priceStr: string = typeof price === 'number' ? price.toString() : price;

  const parts: string[] = priceStr.split('.');
  const integerPart: string = parts[0];
  const decimalPart: string = parts[1] ? `.${parts[1]}` : '';

  const formattedIntegerPart: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return formattedIntegerPart + decimalPart;
}


function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(filters: object[], search?: string) {
  let url = 'http://192.168.0.102:80/products/?public=true'
  if (search) {
    url += "&q=" + search;
  }
  console.log(url);
   await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function (response) {
    products.value = response.data['products'];
  });
  loading.value = false;
}

function addToCart(index: number) {
  const json = JSON.stringify({
    product_id: products.value[index].id,
    user_id: 1
  });
  axios.post('http://192.168.0.102:80/cart-stuff/', json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    console.log(response)
    products.value[index].cart_stuff_id = response.data['stuff_id']
    products.value[index].in_cart += 1
  })
}

function addMoreToCart(index: number) {
  const json = JSON.stringify({
    quantity: products.value[index].in_cart + 1
  });
  axios.put('http://192.168.0.102:80/cart-stuff/' + products.value[index].cart_stuff_id.toString(), json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
  products.value[index].in_cart++;
}

function deleteMoreFromCart(index: number) {
  console.log(products.value[index].in_cart)
  const json = JSON.stringify({
    quantity: products.value[index].in_cart - 1
  });
  axios.put('http://192.168.0.102:80/cart-stuff/' + products.value[index].cart_stuff_id.toString(), json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
  products.value[index].in_cart--;
}

// eslint-disable-next-line no-undef
let props = defineProps(['filters', 'search']);
fetchData(props.filters, props.search);

</script>

<template>
  <div class="grid_wrapper">
    <h1 class="main_title">КРОССОВКИ</h1>
    <div class="product_count">{{ products.length }} products</div>
    <div class="grid_container" v-if="!loading">
      <div v-for="(product, index) in products" :key="index" class="grid_item">
        <img width="100%" :src="product.photo" alt="">
        <div class="product_title">{{ product.name }}</div>
        <div class="price_container">
          <div class="price">{{ prettyPrice(product.price) }} ₽</div>
          <div class="old_price"><s>{{ prettyPrice(product.old_price) }} ₽</s></div>
        </div>
        <div class="add_to_cart" v-if="products[index].in_cart == 0" @click="addToCart(index)">В корзину</div>
        <div class="in_cart" v-else>
          <div class="add_remove_cart" @click="deleteMoreFromCart(index)">
            <span>-</span>
          </div>
          <div>
            {{ product.in_cart }}
          </div>
          <div class="add_remove_cart" @click="addMoreToCart(index)">
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading_products" v-else>
      <img class="loading_image" src="@/assets/loading.svg" width="100" alt="loading"/>
    </div>
  </div>
</template>

<style scoped>
.grid_wrapper {
  padding-left: 5px;
  text-align: left;
}

.main_title {
  font-weight: 600;
  font-size: 24px;
}

.product_count {
  color: var(--color-grey);
}

.grid_container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 245px);
  grid-gap: 15px;
}

.grid_item {
  text-align: left;
  margin-bottom: 30px;
}

.product_title {
  font-size: 17px;
  font-weight: 300;
}

.price_container {
  margin-top: 7px;
  display: flex;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: 700;
  margin-right: 10px;
  color: var(--color-sale);
}

.old_price {
  font-size: 14px;
}

.add_to_cart {
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  background: var(--color-black);
  color: white;
  border-radius: 10px;
  transition: .2s;
}

.add_to_cart:active {
  scale: 0.95;
}

.in_cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  outline: var(--color-black) solid 1px;
  transition: 0.1s;
}

.add_remove_cart {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.loading_products {
  display: flex;
  justify-content: center;
  width: 1025px;
}

.loading_image {
  margin-top: 10%;
}
</style>