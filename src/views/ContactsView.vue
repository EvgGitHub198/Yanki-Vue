<template>
    <div class="about-page">
        <h2 class="info">Связаться с нами</h2>
        <div class="all-blocks">
            <div class="block">
                <span>В социальных сетях</span>
                <span><img src="@/assets/icons/tg.svg"> <img src="@/assets/icons/inst.svg"></span>
            </div>
            <div class="block">
                <span>По телефону</span>
                <span>+38(067) 158 82 66</span>
                <span>+38(073) 226 39 81</span>
            </div>
            <div class="block">
                <span>По почте</span>
                <span>example@gmail.com</span>
            </div>
            <div class="block">
                <span>Наш офис</span>
                <span>г. Киев, улица Батумская, 18</span>
            </div>
        </div>
            
    <div class="subscribe">
        <h2 class="sub-header">Узнайте первыми о новинках</h2>
        <input type="email" class="sub" placeholder="e-mail" v-model="email" :class="{ 'is-invalid': emailError }">
        <div v-if="emailError" class="error-message">{{ emailError }}</div>
        <button class="sub-btn" @click="subscribe">ПОДПИСАТЬСЯ</button>
        <p>Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с условиями конфиденциальности.</p>
    </div>

    </div>


    
</template>
<script>
import axios from 'axios';






export default {
  name: 'ContactView',
  data() {
    return {
      email: '',
      emailError: ''
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Пожалуйста, введите адрес электронной почты.';
      } else if (!emailPattern.test(this.email)) {
        this.emailError = 'Пожалуйста, введите корректный адрес электронной почты.';
      } else {
        this.emailError = '';
      }
    },
    subscribe() {
      this.validateEmail();

      if (!this.emailError) {
        const requestData = {
          email: this.email
        };

        axios.post('/api/v1/subscribe/', requestData)
          .then(response => {
            // Обработка успешного ответа от бэкенда
            console.log(response.data);
          })
          .catch(error => {
            // Обработка ошибки
            console.log(error);
          });
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
.subscribe {
  padding-top: 10px;
  /* Стили для блока подписки на email-рассылку */
  margin: 20px auto;
  width: 600px;
  height: 270px;

}
.sub-header {
font-style: normal;
font-weight: 300;
font-size: 36px;
line-height: 42px;
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
  cursor: pointer;
}
.sub{
  width: 592px;
  height: 50px;
  text-align: center;
}
.block span {
    margin: 8px;
}
.block{
    display: flex;
    flex-direction: column;
}

.all-blocks{
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    max-width: 1640px;
    margin: 0 auto;


}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.is-invalid {
  border-color: red;
}
.info {
    text-align: left;
}
.about-page{
    height: 65vh;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: 7%;
    margin-left: 7%;
}
</style>