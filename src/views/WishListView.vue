<template>
    <div class="wish-page">
      <h2 align="left">Избранное</h2>
      <div v-if="wishes.length" class="wish-card-container">
        <div v-for="(wish, index) in wishes" :key="wish.id" class="wish-card">
          <router-link class="product-link" :to="'catalog'+wish.url">
            <div class="wish-image-container">
            <img class="wish-image" :src="'http://127.0.0.1:8000'+wish.main_image" />
            <a class="delete-image" @click.prevent="removeFromWish(index)">
                <img src="@/assets/icons/wish-delete.svg" alt="Delete">
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
        <p>Нет добавленных продуктов в избранное.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
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
    margin-top: 80px;
    margin-left: 10%;
    margin-right: 10%;

  }
  
  .wish-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: -10px;
  }
  
  .wish-card {

    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .wish-image {
    width: 350px;
    height: 400px;
  }
  
.wish-image-container {
  position: relative;
}
.delete-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.delete-image :hover{
    color: red;
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
  