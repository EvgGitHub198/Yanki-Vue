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
        <td><router-link :to="'/catalog' + item.product.get_absolute_url"><img class="cart-img" :src="'http://127.0.0.1:8000'+item.product.main_image" alt="product image"></router-link></td>
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
  </div>
</template>
 <script>
export default {
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


  <style>
  .cart-view{
    margin-top: 50px;
  }
  /* add some styles for the cart table */
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
  