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
        

        <div class="filters">

            <img src="@/assets/icons/filter.svg" class="filter-img">
            <div class="filter size-filtered">

              <div class="size-filter" @click="toggleSizeFilter">
                Размер<span class="drop-arrow"><img src="@/assets/icons/arrow-down.svg"></span>
              </div>


              <div class="size-filter-list" v-show="showSizeFilter">
                <div v-for="size in sizes" :key="size" class="size-filter-item" :class="{ active: filters.sizes.includes(size) }" @click="toggleSize(size)">
                  {{ size }}
                </div>
              </div>
            </div>


          <div class="filter amount-filtered">
            <div for="price-filter" @click="togglePriceFilter">Цена<span class="drop-arrow"><img src="@/assets/icons/arrow-down.svg"></span></div>
            <div v-if="showPriceFilter" class="price-filtered">
              <input class="price-filter__input" type="number" id="price-filter-min" v-model.number="filters.price.min" placeholder="От" @blur="setFilterPrice">
              <input class="price-filter__input" type="number" id="price-filter-max" v-model.number="filters.price.max" placeholder="До" @blur="setFilterPrice" @input="resetPriceInput">
              </div>
            </div>


          <div class="sort">
            <div for="price-sort" @click="togglePriceSort">Cортировать по<span class="drop-arrow"><img src="@/assets/icons/arrow-down.svg"></span></div>
            <div v-if="showPriceSort" class="price-sorted">
              <span @click="sort.field = 'price'; sort.order = sort.order === 'asc' ? 'desc' : 'asc'">
                Цене
                <span v-if="sort.field === 'price'">
                  {{ sort.order === 'asc' ? '▲' : '▼' }}
                </span>
              </span>
            </div>
          </div>

        </div>



      <h2>{{ category_name }}</h2>
      <div class="product-list">
        <div class="product" v-for="product in paginatedProducts" :key="product.id">
          <div class="product-wish">
            <a class="add-to-wish" @click="addToWish(product)">
              <img :src="isProductInWishlist(product) ? require('@/assets/icons/wish-delete.svg') : require('@/assets/icons/add-to-wish.svg')">
            </a>
          </div>
          <router-link :to="'/catalog'+product.get_absolute_url" class="product-items">
            <div class="product-card">
              <div class="product-image">
                <img :src="config.BACKEND_URL+product.main_image" :alt="product.name" class="product-img" />
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
  import { useToast } from 'vue-toastification';

  export default {
    name: "CategoryView",
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
      return {
        category_name: "",
        categories: [],
        products: [],
        currentPage: 0,
        perPage: 6,
        showSizeFilter: false,
        showPriceFilter: false,
        showPriceSort : false,
        filters: {
          price: {
            min: null,
            max: null
          },
          sizes: []
        },
        sort: {
          field: 'price',
          order: 'asc'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        config: {
        BACKEND_URL: BACKEND_URL
      }
      };
    },
    mounted() {
      this.updatePerPage();
      window.addEventListener("resize", this.updatePerPage);
      window.addEventListener('wishlistChanged', () => {
      this.$forceUpdate();
      });
      this.loadCategory();
      this.loadCategories();
      
    },
    computed: {
      filteredProducts() {
        let products = this.products;

        // Фильтрация по цене
        if (this.filters.price.min !== null) {
          products = products.filter(product => product.price >= this.filters.price.min);
        }
        if (this.filters.price.max !== null) {
          products = products.filter(product => product.price <= this.filters.price.max);
        }

        // Фильтрация по размеру
        if (this.filters.sizes.length > 0) {
          products = products.filter(product => {
            const sizes = product.sizes.map(size => size.size);
            return sizes.some(size => this.filters.sizes.includes(size));
          });
        }
  
        // Сортировка
        if (this.sort.field === 'price') {
          products.sort((a, b) => {
            const diff = a.price - b.price;
            return this.sort.order === 'asc' ? diff : -diff;
          });
        }
        this.currentPage = 0; 
        return products;
        
      },

      paginatedProducts() {
      const start = this.currentPage * this.perPage;
      const end = (this.currentPage + 1) * this.perPage;
      return this.filteredProducts.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
  },
    methods: {
      isProductInWishlist(product) {
      const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
      return wishes.some(item => item.id === product.id);
      
    },
      addToWish(product) {
      if (!product.id) {
        return;
      }
      
      const wishItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        main_image: product.main_image,
        url: product.get_absolute_url
      };
      const index = this.$store.state.wishes.findIndex(item => item.id === wishItem.id);
      if (index > -1) {
        this.$store.commit('removeFromWishList', index);
        this.toast.info('Товар удален из избранного');
      } else {
        this.$store.commit('addToWishList', wishItem);
        this.toast.info('Товар добавлен в избранное');
      }
      window.dispatchEvent(new Event('wishlistChanged'));
    },
      resetPriceInput() {
      if (!this.filters.price.max) {
        this.filters.price.max = null;
      }
      },
      togglePriceSort() {
        this.showPriceSort= !this.showPriceSort;
      },
      togglePriceFilter() {
        this.showPriceFilter= !this.showPriceFilter;
      },
      toggleSizeFilter() {
        this.showSizeFilter = !this.showSizeFilter;
      },
      toggleSize(size) {
        const index = this.filters.sizes.indexOf(size);
        if (index > -1) {
          this.filters.sizes.splice(index, 1);
        } else {
          this.filters.sizes.push(size);
        }
        this.filteredProducts; // обновление списка продуктов
      },
      paginate(pageNumber) {
      this.currentPage = pageNumber;
      this.scrollToTop();
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
.product-img {
  width: 310px;
  height: 360px;
  object-fit: cover;
}
.product-wish {
  position: relative;
  display: flex;
  justify-content: end;
}

.add-to-wish {
  position: absolute;
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
}
.add-to-wish:hover {
  filter: brightness(115%);
  transition: all 0.4s ease-in-out;

}
.filter-img {
  margin-right: -25px;
}
.drop-arrow {
  position: absolute;
}
.price-sorted {
  display: flex;
  gap: 5px;
  cursor: pointer;
  
  margin-top: 5px;
  position: absolute;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  border: #9f9f9f 1px solid;
  border-radius: 7px;
  padding: 5px;
  background-color: #f1f1f1;

}
.sort {
  cursor: pointer;

}
.amount-filtered{
  width: 80px;
  cursor: pointer;
}
.price-filter__input{
  border-radius: 5px;
  border: 1px solid rgb(157, 157, 157);
  
}
.price-filtered {
  display: flex;
  flex-direction: column;
  width: 90px;
  gap: 5px;
  cursor: pointer;
  margin-top: 5px;
  position: absolute;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  border: #9f9f9f 1px solid;
  border-radius: 7px;
  padding: 5px;
  background-color: #f1f1f1;

}
.size-filtered {
  width: 75px;
  cursor: pointer;
  border-radius: 7px;
}

.size-filter-list {
  position: absolute;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  width: 65px;
  border: #9f9f9f 1px solid;
  border-radius: 7px;
  padding: 5px;
  background-color: #f1f1f1;
}

.size-filter-item {
  background-color: white;
  color: black;
  cursor: pointer;
  border-top: 1px solid #e3cbb6;
  border-radius: 5px;
}

.size-filter-item.active {
  background-color: #e3cbb6;
}
.filters {
  gap: 30px;
  display: flex;
}
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
  margin-top: 48px;
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
  margin-top: 30px;

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
