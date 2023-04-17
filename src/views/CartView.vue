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
          <tr v-for="(item, index) in cartItems" :key="index">
        <td><router-link :to="'/catalog' + item.product.get_absolute_url"><img class="cart-img" :src="config.BACKEND_URL+item.product.main_image" alt="product image"></router-link></td>
        <td><router-link class="link-product" :to="'/catalog' + item.product.get_absolute_url"><p class="article">арт. {{ item.product.id}}</p><p class="prod-name">{{ item.product.name }}</p></router-link></td>
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

<div class="checkout">
  <div class="left-info">
    <div class="personal-info">
  <h3 align="left">Персональные данные</h3>
  <div class="form-group">
    <div class="name-email-grid">
      <input type="text" id="name" placeholder="Ваше ФИО*"  v-model="name">
      <input type="email" id="email" placeholder="Ваша почта*" v-model="email">
    </div>
  </div>
  <div class="form-group">
    <div class="phone-grid">
      <input type="tel" id="phone" placeholder="Ваш номер телефона*" v-model="phone">
    </div>
  </div>
</div>
    <div class="shipping-method">
      <h3 align="left">Способ доставки</h3>
      <h4 align="left">по России:</h4>
      <div class="selection">
        <input class="radio" type="radio" id="pickup" name="shipping" value="pickup" checked v-model="selectedShipping">
        <label for="pickup">Самовывоз - вул. Большая Васильковская 14 (м. Льва Толстого)</label>
      </div>
      <div class="selection">
        <input class="radio" type="radio" id="mail" name="shipping" value="mail" v-model="selectedShipping">
        <label for="mail">Новая почта</label>
      </div>
    </div>
    <div class="if-deliviry" v-if="showAddress">
      <h4 align="left">Адрес доставки:</h4>
        <div class="form-group">
        <div class="grid-inputs">
        <input class="city-grid" type="text" id="name" placeholder="Город*" v-model="address">
        <input type="tel" placeholder="Отделение почты*" v-model="zipcode">
        </div>
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
      <div class="links">


        <template v-if="$store.state.isAuthenticated">
          <p><router-link class="login-link"  to="/account">Личный кабинет</router-link></p>
        </template>

        <template v-else>
          <p><router-link class="login-link"  to="/login">Войти в личный кабинет</router-link></p>
        </template>

        <p><router-link class="delivery-links" to="/delivery">УСЛОВИЯ ДОСТАВКИ</router-link></p>
        <p><router-link class="delivery-links" to="/return">УСЛОВИЯ ОБМЕНА И ВОЗВРАТА</router-link></p>
        <p><router-link class="delivery-links" to="/payment">ИНФОРМАЦИЯ ОБ ОПЛАТЕ</router-link></p>
      </div>
        <table class="checkout-table" >
        <thead>
            <tr>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-info-left-column">ДОСТАВКА:</td>
                <td class="table-info-right-column"><strong>По тарифам перевозчика</strong></td>
            </tr>
            <tr>
              <td class="table-info-left-column">ИТОГО:</td>
              <td class="table-info-right-column"><strong>{{totalCartPrice}} руб.</strong></td>
            </tr>
        </tbody>
      </table>
      <button class="checkout-btn" @click="submitOrder()">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import axios from 'axios';
import { BACKEND_URL } from '@/config.js';
import { useToast } from 'vue-toastification';


export default {
  setup() {
      const toast = useToast();
      return { toast }
    },
  data() {
        return {
            selectedShipping: 'pickup',
            showAddress: false,
            config: {
             BACKEND_URL: BACKEND_URL
            },
            name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            errors: [],
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
  this.showAddress = this.selectedShipping === 'mail';
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
  submitOrder() {

            this.errors = []
            if (this.name === '') {
                this.errors.push('The name field is missing!')
           
            }
            if (this.email === '') {
                this.errors.push('The email field is missing!')
                
            }
            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
                
            }
            if (!this.errors.length) {
                this.Checkout()
            }
            else {
              this.toast.error('Все поля обязательны!');
            }

        },
        async Checkout() {
            const items = []
            for (let i = 0; i < this.$store.state.cart.items.length; i++) {
                const item = this.$store.state.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    size: item.size,
                    price: item.product.price * item.quantity
                }
                items.push(obj)
            }
            const data = {

                'name': this.name,
                'email': this.email,
				        'phone': this.phone,
                'address': this.address,
                'zipcode': this.zipcode,
                'items': items,

            }
            await axios
                .post('/api/v1/checkout/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })
                
        }
},
watch: {
  selectedShipping() {
    if (this.selectedShipping === 'mail') {
      this.showAddress = true;
    } else {
      this.showAddress = false;
    }
  },
},

};
</script>


<style lang="scss" scoped>

.article{
  color: #E0BEA2;
  font-style: light;
  font-size: 14px;
}
.login-link{
  color: #E0BEA2;
  text-decoration: underline;
}
.delivery-links{
  text-decoration: underline;
  color: #000;
}

.links, .table-info-left-column {
  text-align: left;
}
.table-info-right-column{
  text-align: right;
}
.checkout-table{
  border: none;
  width: 10%;
  white-space: nowrap;
  margin-left: -6px;


}
.checkout-table td,
.checkout-table th {
  border: none;
}
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
  margin-left: 30px;


}

.checkout {
  margin-top: 20px;
  display: flex;
  margin-bottom: 50px;

}


.checkout-btn {
  float: left;
  margin-top: 20px;
  background-color: #E0BEA2;
  color: #fff;
  border: none;
  width: 300px;
  height: 50px;
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
border: 1px solid #252525;
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
  