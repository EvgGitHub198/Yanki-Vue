<template>
  <div class="home">
    <div class="hero">
      <div class="new-collection">
        <h1>Новая коллекция</h1>
        <hr>
        <router-link class="look-new" to="/catalog/new">СМОТРЕТЬ НОВИНКИ <img class="arrow-right" src="@/assets/icons/arrow-right.svg"></router-link>
      </div>
    </div>
    <div class="list-categories">

    <div class="swiper-container">
      <h2 align="left">Категории</h2>
    <swiper
    :slides-per-view="4"
    :space-between="15"
    @swiper="onSwiper"
    @slideChange="onSlideChange">
      <swiper-slide v-for="category in categories" :key="category.id">
        <router-link :to="'/catalog/' + category.slug">
          <div class="category-card">
            <img :src="category.category_image">
            <div class="category-name">{{ category.name }}</div>
          </div>
        </router-link>
      </swiper-slide>
  </swiper>
    </div>
  </div>
    
    <div class="subscribe">
      <h2>Узнайте  первым о новинках</h2>
      <input type="email" class="sub" placeholder="e-mail">
      <button class="sub-btn">ПОДПИСАТЬСЯ</button>
      <p>Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с условиями конфиденциальности.</p>
    </div>

  </div>

</template>

<script>

import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper.css';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
    axios.get('/api/v1/categories/')
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      categories: [],

    }
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },

  },
}
</script>


<style lang="scss" scoped>


.hero {
  /* Стили для блока с фотографией на фоне */
  height: calc(100vh + 30px); /* высота блока будет равна 100vh минус высота шапки */
  background-image: url('@/assets/img/home-background.png');
}
.home {
  background-size: cover;
  background-position: center;
  margin: 0; 
}
.categories {
  /* Стили для контейнера категорий */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.category-card {
  /* Стили для каждой карточки категории */
  width: 275px;
  height: 450px;
  position: relative;
}

.category-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #E0BEA2;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  color: white;
}
.scroll-arrow {
  /* Стили для стрелочки прокрутки */
  margin-top: 20px;
}

.subscribe {
  padding-top: 30px;
  /* Стили для блока подписки на email-рассылку */
  margin: 40px auto;
  width: 600px;
  height: 270px;
}
.sub{
  width: 600px;
  height: 50px;
  
}
.sub-btn{
  margin-top: 20px;
  width: 600px;
  height: 50px;
  background-color: #E0BEA2;
  border: 0;
}
.swiper-container{
  margin-left: 150px;
  margin-right: 150px;
}
.new-collection {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.look-new{
  text-decoration: none;
  color: white;
  font-size: 16px;

}

.look-new:hover{
  color: red;
  font-size: 17px;
  transition-duration: 0.25s;
}
.arrow-right{
  height: 13px;
  width: 15px;
}
</style>