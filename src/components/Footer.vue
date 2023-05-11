<template>
  <footer class="footer">
    <div class="footer-column">
      <h3>КОМПАНИЯ</h3>
      <ul>
        <li><router-link to="/about">О нас</router-link></li>
        <li><router-link to="/contacts">Контакты</router-link></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>ПОЛЕЗНОЕ</h3>
      <ul>
        <li><a href="#">Оплата и доставка</a></li>
        <li><router-link to="/return-rules">Обмен и возврат</router-link></li>
        <li><a href="#">Бонусная система</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>ПОКУПАТЕЛЮ</h3>
      <ul>
        <li><router-link to="/wish">Избранное</router-link></li>
        <li><a href="#">Публичная оферта</a></li>
        <li><a href="#">Политика конфиденциальности</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>КОНТАКТЫ</h3>
      <ul>
        <li><a href="#"><img src="@/assets/icons/tg.svg"></a>
            <a href="#"><img src="@/assets/icons/inst.svg"></a>
        </li>
        <li>+7(912)-312-31-23</li>
        <li>ex@example.com</li>
      </ul>
    </div>
    <div class="notification">
    <p class="rights">©️ 2023 Yanki. All rights reserved</p>
  </div>
  </footer>
    

</template>


<style lang="scss">

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1920px;
  margin: 0 auto;

}
.footer-column li {
  height: 10px;

}
.footer-column {
  width: 25%;

}

.footer-column h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.footer-column ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.footer-column li {
  margin-bottom: 15px;
}

.footer-column a {
  text-decoration: none;
  color: #333;
}

.footer-column a:hover {
  color: #E0BEA2;
}
.notification {
  margin-top: 8px;
  margin: 0 auto;

}
.rights {
  font-size: 12px;
  text-align: center;
}
</style>