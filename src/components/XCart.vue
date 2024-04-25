<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import axios from "axios";
import XSuggest from "./XSuggest.vue";
import XCheckbox from "./XCheckbox.vue";
import { response } from "express";

let cartStuff = ref([]);
let deliveryAddress = ref("");
let comment = ref("");
let checkOrderActive = ref(true);
const lastPickedAddress = ref("");
const promoText = ref("");
const orderPromo = ref("")
const promoNotValid = ref(false);
const promoPercent = ref(0)

async function checkout() {
  let stuff: object[] = []
  cartStuff.value.forEach(element => {
    stuff.push({
      product_id: element.product.id,
      quantity: element.quantity
    })
  });
  let jsonObject = {
    user_id: 1,
    delivery_address: deliveryAddress.value,
    comment: comment.value.length > 0 ? comment.value : null,
    stuff: stuff,
  }
  if (orderPromo.value.length > 0) {
    jsonObject['promo_code'] = orderPromo.value;
  }
  const json = JSON.stringify(jsonObject);
  await axios.post('http://192.168.0.102:80/orders/', json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => {
    let order = response.data['order'];
    const json = JSON.stringify({
      order_id: order.id,
    });
    checkOrderActive.value = false;
    axios.post('http://192.168.0.102:80/payments/', json, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      window.location.href = response.data['confirmation']['confirmation_url']
    })
  })
}

async function fetchData() {
   await axios.get('http://192.168.0.102:80/cart-stuff/', {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function (response) {
    cartStuff.value = response.data['cart_stuff'];
  });
}

function prettyPrice(price: number | string) {
  const priceStr: string = typeof price === 'number' ? price.toString() : price;

  const parts: string[] = priceStr.split('.');
  const integerPart: string = parts[0];
  const decimalPart: string = parts[1] ? `.${parts[1]}` : '';

  const formattedIntegerPart: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return formattedIntegerPart + decimalPart;
}

function getSum() {
  let sum = 0;
  cartStuff.value.forEach(element => {
    sum += element.quantity * element.product.price
  });
  return promoPercent.value > 0 ? sum - subtractPercentage(sum, promoPercent.value) : sum;
}

function getSumWithoutPromo() {
  let sum = 0;
  cartStuff.value.forEach(element => {
    sum += element.quantity * element.product.price
  });
  return sum;
}

function getSumArray(array: number[]) {
  let sum = 0;
  for (const num of array) {
    sum += num;
  }
  return sum;
}


function addMoreToCart(index: number) {
  const json = JSON.stringify({
    quantity: cartStuff.value[index].quantity + 1
  });
  axios.put('http://192.168.0.102:80/cart-stuff/' + cartStuff.value[index].id.toString(), json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    fetchData()
  });
}

function deleteAllFromCart(index: number) {
  axios.delete('http://192.168.0.102:80/cart-stuff/' + cartStuff.value[index].id.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    fetchData()
  });
}

function deleteMoreFromCart(index: number) {
  const json = JSON.stringify({
    quantity: cartStuff.value[index].quantity - 1
  });
  axios.put('http://192.168.0.102:80/cart-stuff/' + cartStuff.value[index].id.toString(), json, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => {
    fetchData();
  });
}

function suggestClick(text: any) {
  deliveryAddress.value = text;
  lastPickedAddress.value = deliveryAddress.value;
}

async function promoConfirm() {
  if (promoText.value.length > 0) {
    await axios.get('http://192.168.0.102:80/promo-codes/' + promoText.value, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      if (response.status == 200 && response.data.percent) {
        orderPromo.value = promoText.value;
        promoPercent.value = response.data.percent;
        promoNotValid.value = false;
      } else {
        promoNotValid.value = true;
      }
    })
  }
}

function subtractPercentage(number: number, percentage: number) {
    return number - (number * percentage / 100);
}

fetchData();

</script>

<template>
  <div>
    <div v-if="cartStuff.length > 0" class="container">
      <div class="cart_items">
        <div class="cart_title"><h1>Корзина</h1></div>
        <div class="all_stuff_actions">
        </div>
        <div>
          <hr>
          <div class="all_stuff" v-for="(item, index) in cartStuff" :key="index">
            <div class="stuff_info">
              <img class="stuff_image" height=100 :src="item.product.photo">
              <div>
                <div class="product_vendor_code">Артикул: {{ item.product.id }}</div>
                <div class="product_name">{{ item.product.name }}</div>
                <div class="product_available">
                  <div class="product_available_status"></div>
                  <div>Доступно</div>
                </div>
              </div>
            </div>
            <div class="stuff_price">
              <div class="stuff_all_price">{{ prettyPrice(item.product.price * item.quantity) }} ₽</div>
              <div class="stuff_one_price">{{ prettyPrice(item.product.price) }} ₽ / шт.</div>
              <div class="delete_item">
                <span class="material-symbols-outlined" @click="deleteAllFromCart(index)">
                  delete
                </span>
                <span class="material-symbols-outlined" @click="deleteMoreFromCart(index)">
                  remove
                </span>
                <span class="material-symbols-outlined" @click="addMoreToCart(index)">
                  add
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart_sum">
        <div :class="[deliveryAddress.length > 0 && checkOrderActive ? 'check_order' : 'disabled_checkout']" @click="deliveryAddress.length > 0 ? checkout() : null">
          Оплатить заказ
        </div>
        <div class="main_params">
          <div class="main_sum">Итого:</div>
          <div class="main_sum">{{ getSum() }} ₽</div>
        </div>
        <div class="params">
          <div class="main_sum">Товары</div>
          <div class="main_sum">{{ getSumArray(cartStuff.map((item) => item.quantity)) }} шт.</div>
        </div>
        <div class="params" :v-if="orderPromo.length > 0">
          <div class="main_sum">Скидка по промокоду</div>
          <div class="main_sum">{{ subtractPercentage(getSumWithoutPromo(), promoPercent) }} ₽</div>
        </div>
        <div class="params">
          <input id="input" placeholder="Адрес доставки" v-model="deliveryAddress">
        </div>
        <x-suggest :text="deliveryAddress" :last="lastPickedAddress" :key="deliveryAddress" @click-suggestion="suggestClick"></x-suggest>
        <div class="params">
          <input id="input" placeholder="Комментарий к заказу" v-model="comment">
        </div>
        <div class="params">
          <input id="input" placeholder="Промокод" v-model="promoText">
          <div class="promo_confirm" @click="promoConfirm()">
            Подтвердить
          </div>
        </div>
        <div class="promo_not_found">{{ promoNotValid ? 'Промокод не найден' : '\n'}}</div>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/cart-empty.png" style="margin-top: 200px">
      <h1>В КОРЗИНЕ НИЧЕГО НЕТ</h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 100px 0 100px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
}
.cart_title {
  text-align: left;
}
.all_stuff_actions {
  display: flex;
  justify-content: space-between;
  width: 750px;
}
hr {
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--color-grey)
}
.delete_all {
  color: red;
  text-decoration: none;
}
.all_stuff {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.stuff_info {
  display: flex;
  text-align: left;
}
.product_available {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.product_available_status {
  width: 10px;
  height: 10px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background: green;
  margin-right: 5px;
}
.product_vendor_code {
  font-size: 14px;
  color: grey;
}
.product_name {
  font-size: 18px;
}
.stuff_image {
  margin-right: 15px;
}
.stuff_price {
  text-align: right;
}
.stuff_all_price {
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: 700;
  font-size: 20px;
}
.stuff_one_price {
  color: grey;
}
.delete_item {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-top: 20px;
  cursor: pointer;
  color: grey;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
}
.check_order {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background-color: var(--color-black);
  transition: .2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
.check_order:active {
  scale: 0.95;
}
.cart_sum {
  
  height: 100%;
  width: 400px;
  margin-left: 120px;
  border: 2px solid;
  padding: 20px;
  border-radius: 10px;
}
.main_params {
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
}
.params {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
#input {
  border-radius: 10px;
  padding: 10px;
  font-family: Nunito, sans-serif;
  width: 100%;
  border: 2px solid;
}
.disabled_checkout {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 18px;
  border-radius: 10px;
  color: white;
  background-color: #4d4d4d;
  transition: .2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
.promo_confirm {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--color-black);
  color: white;
  margin-left: 5px;
  cursor: pointer;
  font-size: 12px;
  transition: .2s;
}
.promo_confirm:active {
  scale:Confirm 0.95;
}
.promo_not_found {
  font-size: 12px;
  color: red;
  margin-top: 5px;
}
</style>