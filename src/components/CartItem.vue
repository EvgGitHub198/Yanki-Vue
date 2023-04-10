<template>
    <tr>
      <td>
        <router-link :to="'catalog'+item.product.get_absolute_url"
          ><img class="image-in-cart" :src="config.BACKEND_URL+item.product.main_image"
          >{{ item.product.name }}
        </router-link>
      </td>
      <td>{{ item.size }}</td>
      <td>
        <a @click="decrementQuantity(item)">-</a>
        {{ item.quantity }}
        <a @click="incrementQuantity(item)">+</a>
      </td>
      <td>{{ getItemTotal(item).toFixed(2) }} руб.</td>
      <td>
        <button class="delete-btn" @click="removeFromCart(item)"
          ><img src="@/assets/icons/Trash.svg" alt="remove"
        /></button>
      </td>
    </tr>
  </template>
  <script>
  import { BACKEND_URL } from '@/config.js';
  
  export default {
    name: 'CartItem',
    props: {
      initialItem: Object
    },
    data() {
      return {
        item: this.initialItem,
        config: {
          BACKEND_URL: BACKEND_URL
        }
      };
    },
    methods: {
      getItemTotal(item) {
        return item.quantity * item.product.price;
      },
      decrementQuantity(item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          this.$emit('removeFromCart', item);
        } else {
          // Обновляем localStorage
          this.updateCart();
        }
      },
      incrementQuantity(item) {
        // Находим товар в корзине
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartItemIndex = cart.items.findIndex(
          cartItem =>
            cartItem.product.id === item.product.id && cartItem.size === item.size
        );
  
        if (cartItemIndex > -1) {
          // Если товар уже есть в корзине, увеличиваем его количество на 1
          cart.items[cartItemIndex].quantity += 1;
        } else {
          // Если товара еще нет в корзине, добавляем его
          cart.items.push({
            product: item.product,
            size: item.size,
            quantity: 1
          });
        }
  
        // Обновляем localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCart();
      },
      updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify(cart));
      },
      removeFromCart(item) {
        // Находим товар в корзине
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartItemIndex = cart.items.findIndex(
          cartItem =>
            cartItem.product.id === item.product.id && cartItem.size === item.size
        );
        if (cartItemIndex !== -1) {
          // Удаляем товар из корзины
          cart.items.splice(cartItemIndex, 1);
        }
        // Обновляем localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCart();
      }
    }
  };
  </script>
  
<style lang="scss" scoped>
.delete-btn {
    border: none;
    background: none;
}
.image-in-cart{
    height: 110px;
    width: 95px;
}

</style>