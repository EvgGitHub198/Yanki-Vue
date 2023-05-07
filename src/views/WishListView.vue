<template>
    <div class="wish-page">
      <h2 align="left">Избранное</h2>
      <div v-if="wishes.length" class="wish-card-container">
        <div v-for="(wish, index) in wishes" :key="wish.id" class="wish-card">
          <router-link class="product-link" :to="'catalog'+wish.url">
            <div class="wish-image-container">
            <img class="wish-image" :src="config.BACKEND_URL+wish.main_image" />
            <a class="delete-image" @click.prevent="removeFromWish(index)">
                <img src="@/assets/icons/wish-delete.svg" alt="Del">
            </a>
            </div>
            <div class="wish-details">
              <p class="wish-name">{{ wish.name }}</p>
              <p class="wish-price">{{ wish.price }} руб.</p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <h3>Нет добавленных продуктов в избранное</h3>
      </div>
    </div>
  </template>
  
  <script>
  import { BACKEND_URL } from '@/config.js';
  export default {
    data() {
        return {
            config: {
             BACKEND_URL: BACKEND_URL
            }
        }
    },
    name: 'WishListView',
    computed: {
      wishes() {
        return this.$store.getters.wishes;
      },
    },
    methods: {
        removeFromWish(index) {
    this.$store.commit('removeFromWishList', index);
  }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .wish-page {
    margin-left: 7%;
    margin-right: 7%;
    min-height: 100vh;
    margin-bottom: 20px;
  }
  
  .wish-card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: -5px;
    height: auto;
}

.wish-card {
  width: calc(33.33% - 10px);
  margin: 5px;
  box-sizing: border-box;
  position: relative; 
  
}

  
  .wish-image {
  box-sizing: content-box;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px;
  }
.wish-image-container {
  position: relative;
}

.delete-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  object-fit: cover;
  z-index: 1;
  margin-top: 10px;
  margin-right: 20px;

}
.delete-image :hover{
  filter: brightness(115%);
  transition: all 0.4s ease-in-out;

}
.product-link{
    text-decoration: none;
    color: #000;
}
  
  .wish-details {
    margin: 10px 0;
  }
  
  .wish-name {

    font-weight: bold;
    margin: 5px 0;
  }
  
  .wish-price {
    margin: 5px 0;
  }
  </style>
  