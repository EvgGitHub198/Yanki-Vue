<template>
  <div class="account-page">
    <h1 class="title">My account</h1>
    <p v-if="isAdmin">Вы администратор</p>
    <p v-else>Вы пользователь</p>
    <div class="box" v-if="orders.length">
      <h3>История заказов</h3>
      <div class="orders-table">
        <div class="order-rows" v-for="(order, index) in orders" :key="order.id">
          <div class="order-info">
            <div class="order-id"><strong>№{{ order.id }} от {{ formatDate(order.created_at) }}</strong></div>
            <div class="order-status">Статус:<br><strong>Выполнен</strong></div>
            <div class="order-amount">Сумма заказа:<br> <strong>{{ order.paid_amount }} руб.</strong></div>
            <div class="show-more" @click="toggleOrderInfo(index)">
              <img src="@/assets/icons/arrow-down.svg">
            </div>
       
          </div>
          
          <div v-if="order.showInfo" class="orders-info-block"  v-bind:class="{ show: order.showInfo }">
                <div class="items-table">
                  <div class="items-row" v-for="(item, index) in order.items" :key="item.product.id">
                    <div class="item-info"><img class="order-item-img" :src="'http://127.0.0.1:8000'+item.product.main_image"></div>
                    <div class="item-info"><span style="color: #E0BEA2; font-size: 14px">арт.{{ item.product.id }}</span><br>{{ item.product.name }}</div>
                    <div class="item-info">Размер: {{ item.size }}</div>
                    <div class="item-info">Количество: {{ item.quantity }}</div>
                    <div class="item-info"><strong>{{ item.product.price*item.quantity }} руб.</strong></div>
                  </div>
                </div>
            </div>
            <div class="order-details" v-if="order.showInfo">

              <div class="column">
                <div class="order-detail"><strong>ФИО: </strong>{{ order.name }}</div>
                <div class="order-detail"><strong>Email: </strong>{{ order.email }}</div>
                <div class="order-detail"><strong>Телефон: </strong>{{ order.phone }}</div>
              </div>
              <div class="column">
                <div class="order-detail"><strong>Адрес: </strong>{{ order.address }}</div>
                <div class="order-detail"><strong>Индекс: </strong>{{ order.zipcode }}</div>
                <div class="order-detail"><strong>Способ доставки: </strong>доделать</div>
              </div>
            </div>

        </div>
      </div>
    </div>
    <div v-else>
      <p>У вас пока нет заказов.</p>
    </div>
    <button @click="logout()" class="btn-logout">Выйти</button>
  </div>
</template>




<script>
import axios from 'axios';


export default {
  name: 'AccountView',
  data() {
    return {
      isAdmin: false,
      orders: [],
      date: new Date(),
    }
  },
  mounted() {
    document.title = 'My account | Yanki'
    this.checkIsAdmin()
    this.getMyOrders()
  },
  methods: {
    formatDate(value) {
    return new Intl.DateTimeFormat("ru").format(new Date(value));
  },
  toggleOrderInfo(index) {
      this.orders[index].showInfo = !this.orders[index].showInfo;
    },
      logout() {
  axios.post('/api/v1/token/logout/')
  .then(response => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('isAdmin') 
    this.$store.commit('removeToken')
    this.$router.push('/')
    setTimeout(function() {
      location.reload();
    }, 300);

  })
  .catch(error => {
    console.log(error)
  })
  },
checkIsAdmin() {
  const isAdmin = localStorage.getItem('isAdmin')
  if (isAdmin !== null) {
    this.isAdmin = JSON.parse(isAdmin)
  } else {
    axios.get('/api/v1/is_admin/')
      .then(response => {
        this.isAdmin = response.data.is_admin
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin))
      })
      .catch(error => {
        console.log(error)
      })
  }
},

async getMyOrders() {
        await axios
            .get('/api/v1/my-orders/')
            .then(response => {
                this.orders = response.data
               
            })
            
            .catch(error => {
                console.log(error)
            })
    },
  }
}
</script>

<style lang="scss" scoped>
.order-details {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  text-align: left;

}
.order-detail{
  margin-bottom: 10px;
}
.column {
  width: 50%;
  margin-left: 6%;
}
.show-more{
  cursor: pointer;
  text-align: right;
  max-width: 10px;
  margin-right: 100px;
}
.order-item-img{
  max-width: 95px;
  max-height: 110px;
}
.orders-table {
  margin-top: 10px;
  margin-bottom: 10px;
}

.order-rows {
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}


.order-info {
  display: flex;
  justify-content: space-between;
  
}

.order-info > * {
  width: calc(33% - 10px); /* учитываем отступ между блоками */
}

.orders-info-block {
  display: none;
  margin-top: 10px;
  margin-bottom: 10px;
}

.orders-info-block.show {
  display: block; /* добавляем стиль для показа блока */
}

.items-table {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}

.items-row {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: center; /* выравнивание по горизонтали по центру */
  align-items: center; 
}

.item-info {
  flex-basis: 20%;
  text-align: center;

}

.btn-logout{
  margin-top: 200px;
}

.account-page {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 100px;
  min-height: 100vh;
}
</style>