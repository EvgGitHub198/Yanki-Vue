<template>
    <div class="product-page">
      <div class="images-container">
        <div class="extra-images">
        <div class="image-column" v-for="(image, index) in images.slice(1)" :key="index">
            <img :src="config.BACKEND_URL + image" width="100" height="100" @click="changeMainImage(index + 1)" />
        </div>
        </div>
        <div class="main-image">
          <div class="image-controls">
            <button @click="changeMainImagePrev" class="prev-image-button">&#8249;</button>
            <img :src="config.BACKEND_URL + currentImage" width="450" height="540" v-if="currentImage" />
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
          <option v-for="size in product.sizes" :value="size">{{ size }}</option>
        </select>
      </div>

        <div class="product-buttons">
          <button class="button1" @click="addToCart">В корзину</button>
          <button class="button2"><img src="@/assets/icons/in-wish-list.svg"> В избранное</button>
      </div>
      <div class="product-description">
    <p class="product-description" @click="showDescription = !showDescription">
      Подробности 
      <span class="arrow" :class="{ 'arrow-down': !showDescription, 'arrow-up': showDescription }"></span>
    </p>
    <pre class="product-description" v-if="showDescription">{{ product.description }}</pre>
  </div>
    </div>
    </div>
  </template>


<script>
import axios from 'axios';
import { BACKEND_URL } from '@/config.js';
import { mapState } from 'vuex';

export default{
  name: 'ProductView',

  data() {
    return {
      product: {},
      quantity: 1,
      showDescription: true,
      config: {
        BACKEND_URL: BACKEND_URL
      },
      currentIndex: 0,
      selectedSize: undefined,
      props: {
        product: Object,
      },
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
  },

  mounted() {
    this.getProduct();
  },

  methods: {
    async getProduct() {
      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;
      await axios
        .get(`api/v1/products/${category_slug}/${product_slug}`)
        .then(response => {
          this.product = response.data;
          document.title = 'Yanki | ' + this.product.name;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      // check if product with selected size is already in the cart
      let cartItems = [];
const storedCartItems = localStorage.getItem('cartItems');

if (storedCartItems) {
  cartItems = JSON.parse(storedCartItems);
}




      const existingCartItemIndex = cartItems.findIndex(
        i => i.product.id === this.product.id && i.size === this.selectedSize
      );

      if (existingCartItemIndex > -1) {
        // increment quantity if product with selected size already in cart
        cartItems[existingCartItemIndex].quantity += this.quantity;
      } else {
        // add new item if product with selected size not in cart
        const newItem = {
          product: this.product,
          size: this.selectedSize,
          quantity: this.quantity
        };
        cartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

  watch: {
    currentIndex() {
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
    },
  },
};
</script>


<style lang="scss" scoped>


.images-container {
  margin-left: 80px;
display: flex;
flex-direction: row;
float: left;
}
  
  .extra-images img{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
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
    margin-top: 100px;
    height: 150vh;
    
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
  margin-right: 100px;
  text-align: left;
  float: right;
  
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
  padding-right: 20px; /* добавляем небольшой отступ для стрелочки */
  background-image: url('@/assets/icons/arrow-down.svg'); /* здесь задаем свой собственный фон для стрелочки */
  background-repeat: no-repeat;
  background-position: right center; /* задаем положение стрелочки */
  background-position-x: calc(100% - 20px); /* сдвигаем стрелочку на 20 пикселей влево */
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
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.button2 {
  background-color: white;
  color: #000;
  border: 2px;
  border-style: ridge;

}
.product-description{
  font-size: 18px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}

p.product-description:hover {
  color: #E0BEA2;
  cursor: pointer;
}
.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 5px; /* добавляем небольшой отступ перед стрелочкой */
  background-image: url('@/assets/icons/arrow-down.svg'); /* здесь задаем свой собственный фон для стрелочки */
  background-repeat: no-repeat;
  background-position: center; /* выравниваем изображение по центру элемента */
  transform: translateY(2px); /* сдвигаем стрелочку на 2 пикселя вниз */
  transition: transform 0.2s ease-in-out; /* добавляем плавную анимацию для перехода */
}

.arrow-up {
  transform: rotate(180deg) translateY(-2px); /* поворачиваем стрелочку на 180 градусов и сдвигаем на 2 пикселя вверх */
}



  </style>
  