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
      <h2>{{ category_name }}</h2>
      <div class="product-list">
        <div v-for="product in products" :key="product.id">
          <router-link :to="'/catalog'+product.get_absolute_url" class="product-items">
            <div class="product-card">
              <div class="product-image">
                <img :src="config.BACKEND_URL+product.main_image" :alt="product.name" />
              </div>
              <div class="product-details">
                <p class="name">{{ product.name }}</p>
                <p class="price">{{ product.price }} руб.</p>               
                <p class="sizes">
                    {{ product.sizes.map(size => `${size.size}`).join(" ") }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="paginatin-block">
          <ul class="pagination">
            <li v-for="pageNumber in totalPages"
             :key="pageNumber" 
             @click="paginate(pageNumber - 1); scrollToTop()"
             :class="{ 'active': pageNumber - 1 === currentPage }">
              {{ pageNumber }}
            </li>
          </ul>
        </div>
    </div>
    </div>

    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { BACKEND_URL } from '@/config.js';

  export default {
    name: "CategoryView",
    data() {
      return {
        category_name: "",
        categories: [],
        products: [],
        currentPage: 0,
        perPage: 6,
        config: {
        BACKEND_URL: BACKEND_URL
      }
      };
    },
    mounted() {
      this.updatePerPage();
      window.addEventListener("resize", this.updatePerPage);
      this.loadCategory();
      this.loadCategories();
      
    },
    computed: {
    paginatedProducts() {
      const start = this.currentPage * this.perPage;
      const end = (this.currentPage + 1) * this.perPage;
      return this.products.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
  },
    methods: {
      paginate(pageNumber) {
        this.currentPage = pageNumber;
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      updatePerPage() {
        const width = window.innerWidth;
        if (width > 2175) {
          this.perPage = 15;
        } else if (width > 1382) {
          this.perPage = 12;
        } else {
          this.perPage = 6;
        }
      },
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
    beforeUnmount() {
    window.removeEventListener("resize", this.updatePerPage);
  },
    
  };
  </script>
  

  
<style lang="scss" scoped>
.paginatin-block {
  float: left;
  margin-bottom: 50px;
}
ul.pagination {
  display: inline-block;
  padding: 0;
  margin: 0;
}

ul.pagination li  {
    display: inline;
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 10px;
    margin: 1px;
    background-color: #dfdfdf;
}
ul.pagination li.active {
    background-color: #E0BEA2;
    color: white;
}
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;

}

.categories {
  min-width: 200px;
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
  max-width: 1700px;
  min-width: 1024px;

}

.products h2 {
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  gap: 30px;
  
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
  margin-top: 70px;
  min-height: 100vh;
  margin-left: 7%;
  margin-right: 7%;
  display: flex;

}
.price{
  font-weight: bold;
  color: #000;
}
.name{
  font-size: 16px;
}
</style>
