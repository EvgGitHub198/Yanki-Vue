<template>
  <div class="product-page">
    <div class="images-container">

      <div class="extra-images">
      <div class="image-column" v-for="(image, index) in images" :key="index">
        <img :src="config.BACKEND_URL + image" width="100" height="100" @click="changeMainImage(index)" 
        :class="{ selected: index === currentIndex }" />
      </div>
      </div>
      <div class="main-image">
        <div class="image-controls">
          <button @click="changeMainImagePrev" class="prev-image-button">&#8249;</button>
          <img :src="config.BACKEND_URL + currentImage" width="500" height="650" class="main-img" v-if="currentImage" />
          <button @click="changeMainImageNext" class="next-image-button">&#8250;</button>
        </div>
      </div>

    </div>
    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>
      <h2 class="product-price">{{ product.price }} руб.</h2>
      <div class="size-select">
      <select v-model="selectedSize" required>
        <option disabled value="undefined">Выберите размер</option>
        <option v-for="size in product.sizes" :value="size.size">{{ size.size }}</option>

      </select>
    </div>
      <div class="product-buttons">
        <button class="button1" @click="addToCart">В КОРЗИНУ</button>
        <button class="button2" @click="addToWish"><img src="@/assets/icons/in-wish-list.svg"> {{ wishButtonText }}</button>
    </div>
    <div class="product-description">
  <p class="product-description" @click="showDescription = !showDescription">
    Подробности
    <span class="arrow" :class="{ 'arrow-down': !showDescription, 'arrow-up': showDescription }"></span>
  </p>
  <pre class="product-description" v-if="showDescription">{{ product.description }}</pre>
</div>

  </div>

  <div class="extra-block">
    <h2>Дополните образ</h2>
      <div class="additional">  
        <div v-for="(random_product, index) in random_products" :key="random_product.id">
            <router-link :to="'/catalog'+random_product.get_absolute_url" class="product-items" >
              <img :src="config.BACKEND_URL+random_product.main_image" class="additional-img">
              <div class="product-details">
                <p class="name">{{ random_product.name }}</p>
                <p class="price">{{ random_product.price }} руб.</p>
                <p class="sizes">
                  {{ random_product.sizes.map(size => `${size.size}`).join(" ") }}
                </p>
              </div>
            </router-link>
        </div>
      </div>
  </div>


  <div class="extra-block" v-if="recentProducts.length>0">
    <h2>Недавно смотрели</h2>
      <div class="additional">  
        <div v-for="(product, index) in recentProducts" :key="product.id">
            <router-link :to="'/catalog'+product.get_absolute_url" class="product-items" >
              <img :src="product.main_image" class="additional-img">
              <div class="product-details">
                <p class="name">{{ product.name }}</p>
                <p class="price">{{ product.price }} руб.</p>
                <p class="sizes">
                  {{ product.sizes.map(size => `${size.size}`).join(" ") }}
                </p>
              </div>
            </router-link>
        </div>
      </div>
  </div>




  </div>
</template>

<script>


import axios from 'axios';
import { BACKEND_URL } from '@/config.js';
import { useToast } from 'vue-toastification';


export default{
name: 'ProductView',
setup() {
      const toast = useToast();
      return { toast }
    },

data() {
  return {
  product: {},
  quantity: 1,
  random_products: [],
  recentProducts: [],
  showDescription: true,
  config: {
      BACKEND_URL: BACKEND_URL
  },
  currentIndex: 0,
  props: {
    product: Object,
},
  selectedSize: undefined
  };
 
},
computed: {
  images() {
  if (this.product.extra_images) {
      return [this.product.main_image, ...this.product.extra_images.map(image => image.image)];
  } else {
      return [this.product.main_image];
  }
  },
  currentImage() {
  return this.images[this.currentIndex];
  },
  wishButtonText() {
    const index = this.$store.state.wishes.findIndex(item => item.id === this.product.id);
    return index > -1 ? 'УДАЛИТЬ' : 'В ИЗБРАННОЕ';
  },
},
mounted() {
  this.getProduct()
  this.getRandomProducts()
  this.loadRecentProducts();
},
watch: {
  $route(to, from) {
    this.getProduct();
  }
},

methods: {
  async loadRecentProducts() {
      const recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
      const promises = recentProducts.map(productId => axios.get(`/api/v1/products_id/${productId}/`));
      const responses = await Promise.all(promises);
      this.recentProducts = responses.map(response => response.data);
    },
  saveRecentProduct(productId) {
      let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
      // Проверяем, есть ли уже такой товар в списке недавно просмотренных
      if (!recentProducts.includes(productId)) {
        // Если товаров больше 4, удаляем самый старый
        if (recentProducts.length >= 4) {
          recentProducts.shift();
        }
        recentProducts.push(productId);
        localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
      }
    },
  
  async getRandomProducts() {
        await axios
            .get('api/v1/random-products/')
            .then(response => {
                this.random_products = response.data   
            })
            
            .catch(error => {
                console.log(error)
            })
    },
  async getProduct() {
  const category_slug = this.$route.params.category_slug;
  const product_slug = this.$route.params.product_slug;
  await axios
      .get(`api/v1/products/${category_slug}/${product_slug}/`)
      .then(response => {
      this.product = response.data;
      this.saveRecentProduct(this.product.id);
      })
      .catch(error => {
      console.log(error);
      });
  },
  addToCart() {
    if (!this.selectedSize || !this.product.id) {
      this.toast.error('Вы должны выбрать размер');
      return;
    }
    const cartItem = {
      quantity: 1,
      size: this.selectedSize,
      product: this.product,
    };
    const cartItems = this.$store.state.cart.items;
    const existingItem = cartItems.find(item => item.size === cartItem.size && item.product.id === cartItem.product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push(cartItem);
    }
    this.$store.commit('updateCart', cartItems);
    this.toast.success('Товар добавлен в корзину');
    },
    addToWish() {
    if (!this.product.id) {
      return;
    }
    const wishItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      main_image: this.product.main_image,
      url: this.product.get_absolute_url,
    };
    const index = this.$store.state.wishes.findIndex(item => item.id === wishItem.id);
    if (index > -1) {
      this.$store.commit('removeFromWishList', index);
      this.toast.info('Товар удален из избранного');
    } else {
      this.$store.commit('addToWishList', wishItem);
      this.toast.info('Товар добавлен в избранное');
    }
  },

  changeMainImage(index) {
  this.currentIndex = index;
  },
  changeMainImagePrev() {
  if (this.currentIndex > 0) {
      this.currentIndex--;
  } else {
      this.currentIndex = this.images.length - 1;
  }
  },
  changeMainImageNext() {
  if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
  } else {
      this.currentIndex = 0;
  }
  },
},
};
</script>


<style lang="scss" scoped>
.extra-images .image-column .selected {
  border: 1.5px solid #E0BEA2;
  box-sizing: border-box;
}
.additional-img{
  object-fit: cover;
  width: 310px;
  height: 360px;

}
.main-img{
  object-fit: cover;
}
.product-details p {
  line-height: 0.5;
}

.sizes{
  color: #888;
  font-style: light;
  
}
.extra-block {
  margin-top: 40px;
  
}

.extra-block h2 {
  text-align: left;
  text-decoration: none;
}
.additional {
  display: flex;
  flex-direction: row; /* added to display the products in a single row */
  justify-content: space-between; /* added to distribute the products evenly */
  align-items: center;

}
.product-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 275px;
  margin-right: 20px;
  text-align: center;
  text-decoration: none;
  color: #000;
}
.product-items img {
  width: 275px;
  height: 320px;
  object-fit: cover;


}
.product-details {
  text-align: center;
}
.product-details p {
  font-size: 16px;
  font-style: light;


}
.product-details .price {
  font-weight: bold;
}




.images-container {
  display: flex;
  flex-direction: row;
  margin-right: 30px;
  }
  
.extra-images img{
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  object-fit: cover;
}

.image-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.image-column {
  margin-right: 10px;
  margin-bottom: 5px;
}
  
.product-page {
  min-height: 100vh;
  display: flex;
  max-width: 1920px;
  margin: 50px auto;
  margin-left: 7%;
  margin-right: 7%;  
  justify-content: center;
  flex-wrap: wrap;
}

.image-controls {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.prev-image-button,
.next-image-button {
  margin: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border: none;
  background: none;
  color: black;
  font-size: 25px;
  cursor: pointer;
}

.prev-image-button {
  left: 0;
}

.next-image-button {
  right: 0;
}

.product-info {
  margin-top: -25px;
  text-align: left;


  
}

.product-name {
  font-size: 25px;
  margin-bottom: 20px;
}

.product-price {
  font-size: 24px;
  margin-bottom: 20px;
}

.size-select select {
  height: 50px;
  width: 530px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid gray;
  margin-bottom: 15px;
}
select {
  appearance: none;
  padding-right: 20px; 
  background-image: url('@/assets/icons/arrow-down.svg'); 
  background-repeat: no-repeat;
  background-position: right center; 
  background-position-x: calc(100% - 20px); 
}



.product-buttons {
  margin-bottom: 20px;
}

.button1, .button2 {
  display: inline-block;
  width: 255px;
  height: 50px;
  margin-right: 20px;
  border: none;
  background-color: #E0BEA2;
  color: white;
  font-size: 16px;
  font-style: light;
  cursor: pointer;
}

.button2 {
  background-color: white;
  color: #000;
  border: 2px;
  border-style: ridge;

}
.product-description{
  font-size: 17px;
  font-family: 'Raleway', sans-serif;
  max-width: 550px;
  word-break: break-all;
  white-space: pre-wrap;

}
p.product-description:hover {
  color: #E0BEA2;
  cursor: pointer;
}
.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 5px; 
  background-image: url('@/assets/icons/arrow-down.svg'); 
  background-repeat: no-repeat;
  background-position: center; 
  transform: translateY(2px);
  transition: transform 0.2s ease-in-out; 
}

.arrow-up {
  transform: rotate(180deg) translateY(-2px);
}

  </style>
  