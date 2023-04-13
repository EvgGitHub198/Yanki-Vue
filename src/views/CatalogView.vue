<template>
    <div class="catalog">
      <div class="container">
        <div class="categories">
          <h2 align="left">Каталог</h2>
          <ul>
            <li v-for="category in categories" :key="category.slug">
              <router-link :to="'/catalog/' + category.slug">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="products">
          <h2>Товары</h2>
          <div class="product-list">
            <div class="product" v-for="product in products" :key="product.id">
              <router-link :to="'/catalog'+product.url" class="product-items">
                <img :src="product.image" :alt="product.name" />
                <div class="product-details">
                  <p class="name">{{ product.name }}</p>
                  <p class="price">{{ product.price }} руб.</p>
                  <p class="sizes">{{ product.sizes.join(" ") }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>

import axios from 'axios';
  
  export default {
    name: 'CatalogView',

    data() {
      return {
        categories: [],
        products: [],
      };
    },
    mounted() {
      axios
        .get('api/v1/categories')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  
      axios
        .get('api/v1/products/')
        .then((response) => {
          this.products = response.data.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.main_image,
            slug: product.slug,
            sizes: product.sizes,
            url: product.get_absolute_url
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
  </script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  padding: 50px 0;
}

.categories {
  width: 15%;
  margin-left: 100px;
  margin-right: auto;
}

.categories ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.categories li {
  margin-bottom: 20px;
  text-align: left;
}

.categories li a {
  
  color: #333;
  text-decoration: none;
}

.products {
  width: 70%;
  margin-right: 100px;
}

.products h2 {
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product {
  width: 310px;
  height: 461px;
  margin-bottom: 20px;

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
}
.catalog {
  margin-top: 30px;
}
.price{
  font-weight: bold;
  color: #000;
}
.name{
  font-size: 16px;
}
</style>
