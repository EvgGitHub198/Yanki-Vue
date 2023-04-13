<template>
    <div class="wish-page">
      <h2 align="left">Избранное</h2>
      <div v-if="wishes.length">
        <div v-for="(wish, index) in wishes" :key="index" class="wish-card">
          <img :src="'http://127.0.0.1:8000'+wish.image" class="wish-image" />
          <div class="wish-details">
            <h2>{{ wish.name }}</h2>
            <p>{{ wish.price }} руб.</p>
          </div>
          <button @click="removeFromWishes(index)">Удалить</button>
        </div>
      </div>
      <div v-else>
        <p>Нет добавленных продуктов в избранное.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';

  export default {
    name: 'WishListView',
    computed: {
        wishes() {
            const storedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
            return storedWishes;
        }
    },
    methods: {
        removeFromWishes(item) {
    const index = this.wishes.indexOf(item);
    if (index !== -1) {
      this.$store.dispatch('removeFromWishes', index);
    }
  },

    },
  };
  </script>
  
  <style lang="scss">
  .wish-page {
    margin-top: 80px;
    min-height: 100vh;
    margin-left: 10%;
    margin-right: 10%;
    width: 100%;
  }
  
  .wish-card {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
  
  .wish-image {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  
  .wish-details {
    display: flex;
    flex-direction: column;
  }
  </style>
  