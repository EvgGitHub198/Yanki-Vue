<template>
  <div class="cart-page">
    <h2 align="left">Ваш заказ</h2>
    <table class="cart-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(item, index) in cartItems" :key="index" class="table-rows">
        <td><router-link :to="'/catalog' + item.product.get_absolute_url"><img class="cart-img" :src="config.BACKEND_URL+item.product.main_image" alt="product image"></router-link></td>
        <td><router-link class="link-product" :to="'/catalog' + item.product.get_absolute_url"><p>арт. {{ item.product.id}}</p>{{ item.product.name }}</router-link></td>
        <td><p style="color: #E0BEA2;">{{ item.size }}</p></td>
        <td><button class="counter" @click="decrementItem(index)" :disabled="item.quantity === 1">-</button>
          {{ item.quantity }}
          <button class="counter" @click="incrementItem(index)">+</button>
        </td>
        <td><strong>{{ item.quantity * item.product.price }} руб.</strong></td>
        <td><button class="delete-btn" @click="removeItem(index)"><img src="@/assets/icons/Trash.svg" alt="Удалить"></button></td>
      </tr>
        <tr v-if="cartItems.length === 0">
          <td colspan="5" class="cart-empty">Ваша корзина пуста…</td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      К оплате: <strong>{{ totalCartPrice }} руб.</strong>
    </div>
    <h2 align="left">Оформление заказа</h2>
    <!-- блок checkout -->
<div class="checkout">

  <div class="left-info">
    <div class="personal-info">
  <h3 align="left">Персональные данные</h3>
  <div class="form-group">
    <div class="name-email-grid">
      <input type="text" id="name" placeholder="Ваше ФИО*">
      <input type="email" id="email" placeholder="Ваша почта*">
    </div>
  </div>
  <div class="form-group">
    <div class="phone-grid">
      <input type="tel" id="phone" placeholder="Ваш номер телефона*">
    </div>
  </div>
</div>
    <div class="shipping-method">
      <h3 align="left">Способ доставки</h3>
      <h4 align="left">по России:</h4>
      <div class="selection">
        <input class="radio" type="radio" id="pickup" name="shipping" value="pickup" checked>
        <label for="pickup">Самовывоз - вул. Большая Васильковская 14 (м. Льва Толстого)</label>
      </div>
      <div class="selection">
        <input class="radio" type="radio" id="mail" name="shipping" value="mail">
        <label for="mail">Новая почта</label>
      </div>
    </div>
    <h4 align="left">Адрес доставки:</h4>
    <div class="form-group">
    <div class="grid-inputs">
      <input class="city-grid" type="text" id="name" placeholder="Город*">
      <input type="tel" id="phone" placeholder="Отделение почты*">
    </div>
  </div>


    <div class="payment-method">
      <h3 align="left">Тип оплаты</h3>
      <div class="selection">
        <input class="radio" type="radio" id="on-delivery" name="payment" value="on-delivery" checked>
        <label for="on-delivery">Наложенным платежом в отделении Новой Почты</label>
      </div>
    </div>
  </div>
  <div class="right-info">
    <div class="shipping-info">
      <p><router-link to="/login">Войти в личный кабинет</router-link></p>
        <p><router-link to="/delivery">Условия доставки</router-link></p>
        <p><router-link to="/return">Условия обмена и возврата</router-link></p>
        <p><router-link to="/payment">Информаия об оплате</router-link></p>
        <table>
        <thead>
            <tr>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Доставка:</td>
                <td>по тарифам перевозчика</td>
            </tr>
            <tr>
              <td>ИТОГО:</td>
              <td>{{totalCartPrice}} руб.</td>
            </tr>
        </tbody>
      </table>

      <button class="checkout-btn">Оформить заказ</button>
    </div>
  </div>

</div>


  </div>
</template>
<script>
import { BACKEND_URL } from '@/config.js';

export default {
  data() {
        return {
            config: {
             BACKEND_URL: BACKEND_URL
            }
        }
    },
  computed: {
  cartItems() {
    return this.$store.state.cart.items;
  },
  totalCartPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    }
},
mounted() {
  this.$store.commit('initializeStore');
},
methods: {
removeItem(index) {
  this.$store.commit('removeItem', index);
},
incrementItem(index) {
    this.$store.commit('incrementItem', index);
  },
decrementItem(index) {
    this.$store.commit('decrementItem', index);
  },
}
};
</script>


<style lang="scss" scoped>
.selection{
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.city-grid {
  margin-right: 10px;
}
.grid-inputs {
  margin-bottom: 10px;
}

  .name-email-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  .phone-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  .left-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}


.shipping-info {
  width: 100%;
}

.right-info {
  width: 100%;
  display: flex;
  margin-left: 10px;

}

.checkout {
  margin-top: 20px;
  display: flex;
  margin-bottom: 50px;

}


.checkout-btn {
margin-top: 20px;
padding: 10px 20px;
background-color: #0066cc;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
}

.checkout-btn:hover {
background-color: rebeccapurple;
}

.input-label {
display: block;
margin-bottom: 5px;
font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
width: 350px;
height: 50px;
padding: 7px;
border: 1px solid #000;
box-sizing: border-box;
margin-bottom: 5px;
font-size: 16px;
}

input[type="radio"],
input[type="checkbox"] {
margin-right: 10px;
}

.form-group {
margin-bottom: 20px;
margin-left: 0;
}

.form-group:last-child {
margin-bottom: 0;
}

.cart-view{
  margin-top: 50px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  
}
.cart-table th, td {
  padding: 5px;
  border-bottom: 1px solid #ddd;
  width: 20%;
}

.delete-btn {
  width: 25px;
  height: 25px;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
}
.cart-img{
  width: 95px;
  height: 110px;
}
.cart-page{
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 70px;
  min-height: 100vh;
}
.total {
  text-align: right;
  margin-top: 10px;
}
.counter {
  background: none;
  border: none;
  color: #E0BEA2;
  cursor: pointer;
  font-size: 20px;
  
}
.cart-empty {
  text-align: center;
}
.link-product {
  text-decoration: none;
  color: #000;
}

</style>
  