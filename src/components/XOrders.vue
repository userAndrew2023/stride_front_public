<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import ordersStatuses from '../constants'

async function fetchData() {
  let url = 'http://192.168.0.102:80/orders/'
  console.log(url);
   await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function (response) {
    orders.value = response.data['orders'];
  });
}

async function checkout(orderId: number) {
    const json = JSON.stringify({
      order_id: orderId
    });
    checkOrderActive.value = false;
    axios.post('http://192.168.0.102:80/payments/', json, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      window.location.href = response.data['confirmation']['confirmation_url'];
    })
}

const orders = ref([]);
const checkOrderActive = ref(true);

fetchData();

</script>

<template>
  <div v-if="orders.length > 0" >
    <div v-for="(item, index) in orders" :key="index">
      <div class="order-cart" style="margin-top: 100px">
        <div style="margin-top: 30px">
          <div>Заказ #{{ item.id }}</div>
          <h2>{{ ordersStatuses[item.status] }}</h2>
          <div>
            Создан: {{ item.created_at }}
          </div>
          <div>
            Оплачен: {{ item.payment_status ? 'Да' : 'Нет' }}
          </div>
          <h3>Товары</h3>
          <div v-for="(stuff, index) in item.stuff" :key="index">
            <h4>Название: {{ stuff.name }}</h4>
            <div>Цена: {{ stuff.price }} ₽</div>
            <div>Статус: {{ ordersStatuses[item.status] }}</div>
            <hr>
          </div>
        </div>
        <div style="text-align: right; margin-top: 30px">
          <div v-if="!item.payment_status" :class="[checkOrderActive ? 'check_order' : 'disabled_checkout']" @click="checkOrderActive ? checkout(item.id) : null">
            Оплатить заказ
          </div>
          <div v-else class="disabled_checkout">
            Оплачено
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <img src="@/assets/orders-empty.png" style="margin-top: 200px">
    <h1>ТУТ НИЧЕГО НЕТ...</h1>
  </div>
</template>

<style scoped>
.container {
  margin: 0 100px 0 100px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
}

.order-cart {
  display: flex;
  justify-content: space-between;
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
.order-cart {
  text-align: left;
  margin-left: 400px;
  margin-right: 400px
}
</style>