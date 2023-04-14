<template>
    <div class="search-page">
        <form class="search-form" @submit.prevent="search">
            <input class="search-input" type="text" v-model="query" placeholder="Введите ваш запрос..." @input="search">
        </form>
        <div class="products">
            <div class="product-list">
                <div v-for="product in products" :key="product.id">
                    <router-link :to="'/catalog'+product.get_absolute_url" class="product-items">
                        <div class="product-card">
                            <div class="product-image">
                                <img :src="config.BACKEND_URL+product.main_image" />
                            </div>
                            <div class="product-details">
                                <p class="name">{{ product.name }}</p>
                                <p class="price">{{ product.price }} руб.</p>
                                <p class="sizes">{{ product.sizes.join(" ") }}</p>
                            </div>
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
 export default {
    name: 'SearchView',
    data() {
        return {
            query: '',
            products: [],
            config: {
             BACKEND_URL: BACKEND_URL
            }
        }
    },
    methods: {
        async search() {
        if (this.query !== '') {
            await axios
            .post('/api/v1/products/search/', { query: this.query })
            .then(response => {
                this.products = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            this.products = [];
        }
        }
    }
 }
 </script>
 
<style lang="scss" scoped>
.search-page {
    margin-top: 100px;
    min-height: 100vh;
    margin-left: 10%;
    margin-right: 10%;
}
.search-form {
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  margin-top: 20px;
}
.search-input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 1px solid black;
  border-radius: 25px;
  outline: none;
  color: #9E9C9C;
}

.products h2 {
  margin-bottom: 20px;
}

.products {
  width: 100%;
}

.product {
  width: 30%;
  margin-bottom: 20px;
  margin-right: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
}
.product-items{
  text-decoration: none;
  color: #000;
}
.product img {
  width: 100%;
}

.product-details {
  margin-top: 10px;

}

.product-details h3 {
  margin: 0;
  font-size: 18px;
}

.product-details p {
  margin: 2px;
  font-size: 16px;
}
.sizes {
  color: #888;
  margin-bottom: 10px;
}

.price{
  font-weight: bold;
  color: #000;
}
.name{
  font-size: 16px;
}

</style>