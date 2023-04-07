<template>
    <div class="catalog">
      <Header />
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
      <h1>{{ category_name }}</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id">
          <router-link :to="'/product/' + product.slug">
            <div class="product-card">
              <div class="product-image">
                <img :src="'http://127.0.0.1:8000'+product.main_image" :alt="product.name" />
              </div>
              <div class="product-details">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-price">{{ product.price }}</div>
                <div class="product-sizes">{{ product.sizes.join(", ") }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import axios from "axios";
  export default {
    name: "CategoryView",
    data() {
      return {
        category_name: "",
        categories: [],
        products: [],
      };
    },
    components: {
      Header,
      Footer,
    },
    mounted() {
      this.loadCategory();
      this.loadCategories();
    },
    methods: {
      loadCategory() {
        const category_slug = this.$route.params.category_slug;
        axios
          .get(`/api/v1/products/${category_slug}/`)
          .then((response) => {
            this.category_name = response.data.name;
            this.products = response.data.products;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      loadCategories() {
  axios
    .get('/api/v1/categories/')
    .then(response => {
      this.categories = response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

    },
    watch: {
      "$route.params.category_slug": function() {
        this.loadCategory();
      },
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
    margin: 0;
    font-size: 16px;
    color: #888;
  }
  .catalog {
    margin-top: 30px;
  }
  </style>
  