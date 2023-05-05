<template >
  <template v-if="!isAdmin">
  
  <div class="account-page">
    <h1 class="title">Мой аккаунт</h1>
    <button @click="logout()" class="tab-btn add-btn">Выйти</button>
    <div class="box" v-if="orders.length">
      <h3>История заказов</h3>
      <div class="orders-table">
        <div class="order-rows" v-for="(order, index) in orders" :key="order.id">
          <div class="order-info">
            <div class="order-id"><strong>№{{ order.id }} от {{ formatDate(order.created_at) }}</strong></div>
            <div class="order-status">Статус:<br><strong>{{ order.status }}</strong></div>
            <div class="order-amount">Сумма заказа:<br> <strong>{{ order.paid_amount }} руб.</strong></div>
            <div class="show-more" @click="toggleOrderInfo(index)">
              <img src="@/assets/icons/arrow-down.svg" :class="{ 'rotated': orders[index].isRotated }" >
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
                <div class="order-detail"><strong>Способ доставки: </strong>later</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>У вас пока нет заказов.</p>
    </div>
  </div>
</template>

  <template v-else>
    <div class="admin-page">
      <div class="tabs">
      <button class="tab-btn" @click="activeTab = 'statistics'">Статистика</button>
      <button class="tab-btn" @click="activeTab = 'products'">Товары</button>
      <button class="tab-btn" @click="activeTab = 'categories'">Категории</button>
      <button class="tab-btn" @click="activeTab = 'active-orders'">Заказы</button>
      <button class="tab-btn" @click="logout()">Выйти</button>
    </div>
    <div class="tab-content">
      <div v-show="activeTab === 'statistics'">
        <h1>Статистика</h1>
        <div class="statistics-container">
            <div class="main-stat">
              <div class="main-stat_item"><p class="stat_item__text">ТОВАРЫ:</p><p class="stat_item__text stat_item__info">{{products.length}} позиций</p></div>
              <div class="main-stat_item"><p class="stat_item__text">КАТЕГОРИИ:</p><p class="stat_item__text stat_item__info">{{categories.length}} категорий</p></div>
              <div class="main-stat_item"><p class="stat_item__text">ЗАКАЗЫ:</p><p class="stat_item__text stat_item__info">{{ listorders.length }} позиций</p></div>
              <div class="main-stat_item"><p class="stat_item__text">ПОЛЬЗОВАТЕЛИ:</p><p class="stat_item__text stat_item__info">{{users.length}} клиентов</p></div>
              <div class="main-stat_item"><p class="stat_item__text">ПРОДАЖИ:</p><p class="stat_item__text stat_item__info">{{sumOfAllOrders}} руб.</p></div>
            </div>
            <div class="all-graphs">
              <div class="graphics-background first-graphic">
                <LineChart />
              </div>

              <div class="graphics-background second-graphic">
                <BarChart />
              </div>

              <div class="graphics-background third-graphic">
                <LineForecast />
              </div>
              
          </div>
        </div>
      </div>
      <div v-show="activeTab === 'products'">
        <h1>Товары</h1>
        <button class="tab-btn add-btn" @click="showAddProductModal">Добавить товар</button>
        <div class="admin-products-block">
            <div class="items-table_products">
              <div v-for="product in products" :key="product.id">
                <div class="items-row admin-rows" v-for="(size, index) in product.sizes" :key="index">
                  <div class="item-info"><img class="order-item-img" :src="product.main_image"></div>
                  <div class="item-info"><span style="color: #E0BEA2; font-size: 14px">арт.{{ product.id }}</span><br>{{ product.name }}</div>

                    <div class="item-info">
                      <div>Размер: {{ size.size }}</div>
                    </div>

                  <div class="item-info">Количество: {{ size.quantity }}</div>
                  <div class="item-info"><strong>{{ product.price }} руб.</strong></div>
                  <div class="product-icons"><button class="product-icons_btn"  @click="deleteSize(product.id, size.size)"><img src="@/assets/icons/red-trash.svg"></button></div>
                  <div class="product-icons"><button class="product-icons_btn" @click="ProductEditModal(product)"><img src="@/assets/icons/refactor.svg"></button></div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div v-show="activeTab === 'categories'">
        <h1>Категории</h1>
        <div class="admin-products-block">
          <button class="tab-btn add-btn" @click="showAddModal">Добавить категорию</button>
          <CreateCategory @add-category="addCategory" ref="addmodal"></CreateCategory>
          <div class="items-table">
              <div class="items-category-row admin-rows category-rows" v-for="category in categories" :key="category.id">
                
                <div><strong>{{ category.name }}</strong></div>
                <div>
                  <button class="category-btn" @click="deleteCategory(category.id)"><img src="@/assets/icons/red-trash.svg" alt="Del"></button>
                  
                  <button class="category-btn" @click="showEditModal(category)"><img src="@/assets/icons/refactor.svg" alt="Change"></button>                  
                </div>  
              </div>
            </div>
        </div>

      </div>
      <div v-show="activeTab === 'active-orders'">
        <h1>Активные заказы</h1>
        <button class="tab-btn" @click="activeTab = 'active-orders'">Активные</button>  <!-- Блок с переключениями по табам -->
        <button class="tab-btn" @click="activeTab = 'sent-orders'">Отправленные</button> <!-- Блок с переключениями по табам -->

        <div v-for="(order, index) in listorders" :key="order.id"  v-show="activeTab === 'active-orders'" >
          <div v-if="order.status === 'В сборке'" class="order-rows">
          <div class="order-info_header">
           <div><strong>Заказ №{{ order.id }} от {{ formatDate(order.created_at) }}</strong></div> 
           <div><button :disabled="isSending || order.sendButtonText === 'Отправлено'" @click="sendOrder(order.id)" class="info_header_send-btn">{{ isSending ? 'Отправка...' : order.sendButtonText || 'Отправить' }}</button>
                <button class="info_header_delete-btn" @click="deleteOrder(order.id)">Удалить</button></div>      
          </div>
          <div class="order-info__admin">
            <div class="break"></div> <!-- break -->
            <div class="order-info__item"><strong>Пользователь:</strong><br>{{ order.name}}</div>
            <div class="order-info__item"><strong>Адрес:</strong><br>{{ order.address}}<br>{{ order.zipcode}}</div>
            <div class="order-info__item"><strong>Телефон:</strong><br>{{ order.phone}}</div>
            <div class="order-info__item"><strong>Почта:</strong><br>{{ order.email}}</div>
            <div class="break"></div> <!-- break -->
            <div class="order-info__item"><strong>Товаров:</strong><br>{{ order.items.length }}</div>
            <div class="order-info__item"><strong>Итого:</strong><br>{{ order.paid_amount }} руб.</div>
            <div class="order-info__item_show-btn"><button class="show-btn" @click="toggleDetails(index)">Подробнее</button></div>
            <div class="break"></div> <!-- break -->
              <div class="orders-info-block__admin" v-show="showDetails[index]">
                <div>
                  <div class="items-row" v-for="(item, index) in order.items" :key="item.product.id">
                    <div class="order-info__item"><img class="order-item-img" :src="'http://127.0.0.1:8000'+item.product.main_image"></div>
                    <div class="order-info__item"><span style="color: #E0BEA2; font-size: 14px">арт.{{ item.product.id }}</span><br>{{ item.product.name }}</div>
                    <div class="order-info__item">Размер: {{ item.size }}</div>
                    <div class="order-info__item">Количество: {{ item.quantity }}</div>
                    <div class="order-info__item"><strong>{{ item.product.price*item.quantity }} руб.</strong></div>                                                           
                  </div>
                </div>          
              </div>
          </div>
          </div>
        </div>
      </div>
      <div v-show="activeTab === 'sent-orders'">
        <h1>Отправленные заказы</h1>
        <button class="tab-btn" @click="activeTab = 'active-orders'">Активные</button><!-- Блок с переключениями по табам -->
        <button class="tab-btn" @click="activeTab = 'sent-orders'">Отправленные</button><!-- Блок с переключениями по табам -->
        <div v-for="(order, index) in listorders" :key="order.id"  v-show="activeTab === 'sent-orders'" >
          <div v-if="order.status === 'Отправлен'" class="order-rows">
          <div class="order-info_header">
           <div><strong>Заказ №{{ order.id }} от {{ formatDate(order.created_at) }}</strong></div> 
           <div>
                <button class="info_header_delete-btn" @click="deleteOrder(order.id)">Удалить</button></div>
          </div>
          <div class="order-info__admin">
            <div class="break"></div> <!-- break -->
            <div class="order-info__item"><strong>Пользователь:</strong><br>{{ order.name}}</div>
            <div class="order-info__item"><strong>Адрес:</strong><br>{{ order.address}} {{ order.zipcode}}</div>
            <div class="order-info__item"><strong>Телефон:</strong><br>{{ order.phone}}</div>
            <div class="order-info__item"><strong>Почта:</strong><br>{{ order.email}}</div>
            <div class="break"></div> <!-- break -->
            <div class="order-info__item"><strong>Товаров:</strong><br>{{ order.items.length }}</div>
            <div class="order-info__item"><strong>Итого:</strong><br>{{ order.paid_amount }} руб.</div>
            <div class="order-info__item_show-btn"><button class="show-btn" @click="toggleDetails(index)">Подробнее</button></div>
            <div class="break"></div> <!-- break -->
              <div class="orders-info-block__admin" v-show="showDetails[index]">
                <div>
                  <div class="items-row" v-for="(item, index) in order.items" :key="item.product.id">
                    <div class="order-info__item"><img class="order-item-img" :src="'http://127.0.0.1:8000'+item.product.main_image"></div>
                    <div class="order-info__item"><span style="color: #E0BEA2; font-size: 14px">арт.{{ item.product.id }}</span><br>{{ item.product.name }}</div>
                    <div class="order-info__item">Размер: {{ item.size }}</div>
                    <div class="order-info__item">Количество: {{ item.quantity }}</div>
                    <div class="order-info__item"><strong>{{ item.product.price*item.quantity }} руб.</strong></div>                                   
                  </div>
                </div>          
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  <PutCategoryModal ref="putmodal" :category-data="editCategoryData"></PutCategoryModal>
  <CreateProduct ref="addproductmodal" @add-product="addProduct"></CreateProduct>
  <PutProduct ref="editproductmodal" :product-data="editProductData"  @edit-product="editProduct"></PutProduct>
</template>




<script>
import axios from 'axios';
import CreateCategory from '@/components/CreateCategoryModal.vue'
import PutCategoryModal from '@/components/PutCategoryModal.vue'
import CreateProduct from '@/components/CreateProductModal.vue'
import PutProduct from '@/components/PutProductModal.vue'
import BarChart from '@/components/SalesYear.vue'
import LineChart from '@/components/SalesMonth.vue'
import LineForecast from '@/components/SalesForecast.vue'

export default {
  name: 'AccountView',
  data() {
    return {
      isAdmin: false,
      orders: [],
      users: [],
      listorders: [],
      products: [],
      categories: [],
      date: new Date(),
      activeTab: 'statistics',
      editCategoryData: null,
      editProductData: null,
      showDetails: [],
      isSending: false,
      
      
    }
  },
  components: {
            CreateCategory,
            PutCategoryModal,
            CreateProduct,
            PutProduct,
            BarChart,
            LineChart,
            LineForecast
        },
  mounted() {
    
    document.title = 'My account | Yanki'
    this.checkIsAdmin()
    this.getMyOrders()
    this.getAllProducts()
    this.getAllCategories()
    this.getAllOrders()
    this.getUsers()
  },
  computed: {
    sumOfAllOrders() {
    let sum = 0;
    for (let i = 0; i < this.listorders.length; i++) {
      sum += parseFloat(this.listorders[i].paid_amount);
    }
    return sum;
  }
  },

  methods: {
    showAddModal: function () {
      this.$refs.addmodal.show = true
  },

    formatDate(value) {
    return new Intl.DateTimeFormat("ru").format(new Date(value));
  },
    toggleOrderInfo(index) {
      this.orders[index].showInfo = !this.orders[index].showInfo;
      this.orders[index].isRotated = !this.orders[index].isRotated;
    },
    toggleDetails(index) {
    this.showDetails[index] = !this.showDetails[index];
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
        }, 10);

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

async getAllOrders() {
    await axios
        .get('/api/v1/admin/orders/')
        .then(response => {
            this.listorders = response.data
        })
        .catch(error => {
            console.log(error)
        })
},

async getAllProducts() {
  await axios
  .get('/api/v1/admin/products/')
  .then(response => {
            this.products = response.data
            
        })
        
        .catch(error => {
            console.log(error)
        })
    },
    async getAllCategories() {
    await axios
      .get("/api/v1/admin/categories/")
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getUsers() {
  await axios
  .get('/api/v1/users/')
  .then(response => {
            this.users = response.data       
        })
    
        .catch(error => {
            console.log(error)
        })
    },
    async getAllCategories() {
    await axios
      .get("/api/v1/admin/categories/")
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

    async addCategory(data) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    const categoryImageInput = this.$refs.addmodal.$refs.categoryImageInput;
    if (categoryImageInput) {
      formData.append('category_image', categoryImageInput.files[0]);
    }
    try {
      const response = await axios.post('/api/v1/admin/categories/', formData,  {
      headers: {
        "Content-Type": "multipart/form-data",
      }
      });
      // Обработка успешного ответа от сервера.
      console.log('Категория успешно добавлена!');
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  },
  async deleteCategory(id) {
        try {
          const response = await axios.delete(`/api/v1/admin/categories/${id}/`);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      },
      showEditModal(category) {
      this.editCategoryData = category // сохраняем данные редактируемой категории 
      this.$refs.putmodal.show = true // вызываем модальное окно PutCategoryModal.vue
      this.$refs.putmodal.categoryName = category.name;
      this.$refs.putmodal.categorySlug = category.slug;
  },
  ProductEditModal(product) {
    this.$refs.editproductmodal.show = true
    this.editProductData = product
    this.$refs.editproductmodal.productName = product.name;
    this.$refs.editproductmodal.productSlug = product.slug;
    this.$refs.editproductmodal.productPrice = product.price;
    this.$refs.editproductmodal.categoryName = product.category;
    this.$refs.editproductmodal.productDescription = product.description;
    this.$refs.editproductmodal.productId = product.id;
    for (const size of product.sizes) {
    this.$refs.editproductmodal.selectedSizesQuantity[size.size] = size.quantity;
    this.$refs.editproductmodal.selectedSizes.push(size.size);
    }

    

  },
  showAddProductModal() {
    this.$refs.addproductmodal.show = true 
  },
  async deleteOrder(orderId) {
    axios.delete(`/api/v1/admin/orders/${orderId}/`)
      .then(response => {
        // удаляем заказ из списка
        this.listorders = this.listorders.filter(order => order.id !== orderId)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async sendOrder(orderId) {
    this.isSending = true;
    try {
      await axios.put(`/api/v1/admin/orders/${orderId}/`, {
        status: 'Отправлен',
      });
      
      // Обновляем состояние заказа на клиенте
      const updatedOrder = this.listorders.find((order) => order.id === orderId);
      updatedOrder.status = 'Отправлен';
      updatedOrder.sendButtonText = 'Отправлено';

      // Меняем текст кнопки
      const buttonIndex = this.listorders.findIndex((order) => order.id === orderId);
      this.$set(this.listorders[buttonIndex], 'sendButtonText', 'Отправлено');

    } catch (error) {
      console.error(error);
    } finally {
      this.isSending = false;
    }
  },
  async deleteSize(productId, size) {
      try {
        await axios.delete(`/api/v1/admin/products/${productId}/sizes/${size}/`);
        // Удалить элемент из списка на фронтенде
        const productIndex = this.products.findIndex(product => product.id === productId);
        const sizeIndex = this.products[productIndex].sizes.findIndex(s => s.size === size);
        this.products[productIndex].sizes.splice(sizeIndex, 1);
      } catch (error) {
        console.log(error);
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.rotated {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
.all-graphs {
 max-width: 1424px;
 margin: 0 auto;
}
.first-graphic {
  margin-bottom: 50px;
}
.second-graphic {
  margin-bottom: 50px;
}
.third-graphic {
  margin-bottom: 50px;
  margin-top: -150px;
  min-height: 710px;
}
.graphics-background {
  background-color: #f4f4f4;
}
.stat_item__text {
  margin: 12px;
  color: #888888;
}
.stat_item__info{
  color: black;
}

.main-stat {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
  
}
.main-stat_item {
  width: 200px;
  height: 70px;
  background-color: #F4F4F4;
  margin-right: 15px;
  text-align: left;
}

.order-info__item_show-btn{
  width: 50%;
  text-align: end;
}
.show-btn{
  width: 150px;
  height: 50px;
  background-color: #ddd;
  color: black;
  border: none;
  cursor: pointer;
}
.info_header_send-btn{
  width: 150px;
  height: 50px;
  background-color: #E0BEA2;
  color: white;
  border: none;
  margin-right: 10px;
  cursor: pointer;
}
.info_header_delete-btn{
  width: 150px;
  height: 50px;
  background-color: #ddd;
  color: red;
  border: none;
  cursor: pointer;
}
.order-info_header{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.break {
  flex-basis: 100%;
  height: 0;
  margin-top: 40px;
}


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
}


.admin-rows {
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

}

.tabs {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}

.order-info {
  display: flex;
  justify-content: space-between;

}
.order-info__admin {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
.order-info__item {
  width: 25%;
}

.order-info > * {
  width: calc(33% - 10px); /* учитываем отступ между блоками */
}
.admin-products-block{
  margin-top: 10px;
  margin-bottom: 10px;
}
.orders-info-block {
  display: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
.orders-info-block__admin{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.orders-info-block.show {
  display: block; /* добавляем стиль для показа блока */
}
.items-table_products {
  margin-top: 30px;
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

.items-category-row {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
}

.item-info {
  flex-basis: 20%;
  text-align: center;
}
.product-icons {
  flex-basis: 5%;
  text-align: center;
}
.product-icons_btn {
  border: none;
  background: none;
  cursor: pointer;
}

.category-icons{
  float: right;
  
}

.btn-logout{
  margin-top: 200px;
}

.account-page {
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 20px;
  min-height: 100vh;
  margin-bottom: 50px;
}
.admin-page {
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 20px;
  min-height: 100vh;
  margin-bottom: 50px;
}
.tab-btn {
  width: 200px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.tab-btn:hover {
  color: #6e81ff;
  background: #E0BEA2;
  transition: 0.7s;
  
}
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0BEA2;
  color: white;
}
.category-btn{
  background: none;
  border: none;
  cursor: pointer;
  margin: 5px;
}
</style>