<template>
  <div class="home">
    <div class="hero">
      <div class="new-collection">
        <h1 class="new-header">Новая коллекция</h1>
        <hr class="new-line">
        <router-link class="look-new" to="/catalog/new">СМОТРЕТЬ НОВИНКИ <img class="arrow-right" src="@/assets/icons/arrow-right.svg"></router-link>
      </div>
    </div>
    <div class="list-categories containercontainer">
      <div class="swiper-container ">
        <h2 class="category-header">Категории</h2>
        <swiper style="max-width: 1140px;"
          parallax
          grabCursor
          class="parallax-slider"
          :space-between="10"
          :slides-per-view="4"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :navigation="{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }">
            <swiper-slide v-for="category in categories" :key="category.id">
                <router-link :to="'/catalog/' + category.slug">
                  <div class="category-card">
                    <img :src="category.category_image">
                    <div class="category-name">{{ category.name }}</div>
                  </div>
                </router-link>
              </swiper-slide>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
        </swiper>
      </div>
  </div>
    
    <div class="subscribe">
      <h2 class="sub-header">Узнайте  первым о новинках</h2>
      <input type="email" class="sub" placeholder="e-mail">
      <button class="sub-btn">ПОДПИСАТЬСЯ</button>
      <p>Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с условиями конфиденциальности.</p>
    </div>

  </div>

</template>

<script>
import axios from 'axios';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);


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
  
}
</script>


<style lang="scss" scoped>

.swiper-button-next, .swiper-button-prev {
  color: black;

}

.new-line{
  width: 33%;
  z-index: 1;

}
.container {
  margin: 0 auto;
  max-width: 1920px;

}
.new-header{
  font-style: normal;
  font-weight: 300;
  font-size: 46px;
  line-height: 54px;
  margin-bottom: 10px;
}
.category-header{
  text-align: center;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 42px;
}

.list-categories {
  margin-top: 50px;
}
.hero {
  height: calc(100vh + 30px);
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
  width: 274px;
  height: 450px;
  position: relative;
}

.category-name  {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  opacity: 0.92;
  background-color: #E0BEA2;
  text-align: center;
  font-size: 20px;
  font-style: light;
  line-height: 40px;
  color: white;
}

.subscribe {
  padding-top: 30px;
  /* Стили для блока подписки на email-рассылку */
  margin: 20px auto;
  width: 600px;
  height: 270px;
  margin-bottom: 50px;
}
.sub{
  width: 592px;
  height: 50px;
  text-align: center;
  
}
.sub-header {
font-style: normal;
font-weight: 300;
font-size: 36px;
line-height: 42px;
}
.sub-btn{
  margin-top: 20px;
  width: 600px;
  height: 50px;
  background-color: #E0BEA2;
  border: 0;
  color: white;
}
.swiper-container{
  margin-left: 10%;
  margin-right: 10%;
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
  margin-top: 10px;

}

.look-new:hover{
  color: #E0BEA2;
  transition-duration: 0.35s;

}
.arrow-right{
  height: 13px;
  width: 15px;
}
</style>