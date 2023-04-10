<template>
    <div class="cart-page">
      <div class="cart-table">
        <table class="table" v-if="cartTotalLength">
          <thead>
            <tr>
              <th>Вещь</th>
              <th>Размер</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <CartItem
              v-for="(item, index) in cart.items"
              :key="index"
              :initialItem="item"
              @removeFromCart="removeFromCart(index)"
            />
          </tbody>
        </table>
  
        <p v-else>Ваша Корзина пуста…</p>
      </div>
      <div class="total-amont">
        <h2 class="subtitle">К оплате:</h2>
        <br>{{ cartTotalPrice.toFixed(2) }}₽
        <hr>
      </div>
    </div>
  </template>
  
  <script>
  import CartItem from '@/components/CartItem.vue';
  
  export default {
  name: 'CartView',
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.updateCart();
  },
  methods: {
    updateCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    },
    removeFromCart(index) {
      this.cart.items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCart();
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
    },
  },
};

  </script>
  
  
  <style lang="scss" scoped>
  .cart-page {
    margin-top: 150px;
    height: 300vh;
  }
  .table{
    width: 1200px;
  }
  </style>