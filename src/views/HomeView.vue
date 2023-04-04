<template>
<div class="home">
    <Header />
    <div class="hero">
      <!-- Фотография на фоне -->
    </div>

    <h2>Категории</h2>
    <swiper
    :slides-per-view="3"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
   
  </swiper>

    <h2>Узнайте  первым о новинках</h2>
    <div class="subscribe">
      <input type="email" class="sub" placeholder="e-mail">
      <button class="sub-btn">ПОДПИСАТЬСЯ</button>
      <p>Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с условиями конфиденциальности.</p>
    </div>
    <Footer />
  </div>

</template>


<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';



</script>

<style lang="scss" scoped>

.hero {
  /* Стили для блока с фотографией на фоне */
  height: calc(100vh + 30px); /* высота блока будет равна 100vh минус высота шапки */
}
.home {
  background-image: url('@/assets/img/home-background.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
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
  margin: 20px;
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
}
.scroll-arrow {
  /* Стили для стрелочки прокрутки */
  margin-top: 20px;
}

.subscribe {
  margin-top: 30px;
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
</style>