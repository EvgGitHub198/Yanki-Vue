<template>
  <footer class="footer">
    <div class="footer-column">
      <h3>Компания</h3>
      <ul>
        <li><a href="#">О нас</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Полезное</h3>
      <ul>
        <li><a href="#">Оплата и доставка</a></li>
        <li><a href="#">Условия возврата</a></li>
        <li><a href="#">Бонусная система</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Покупателю</h3>
      <ul>
        <li><a href="#">Избранное</a></li>
        <li><a href="#">Публичная оферта</a></li>
        <li><a href="#">Политика конфиденциальности</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Контакты</h3>
      <ul>
        <li>+79123123123</li>
        <li>ex@example.com</li>
      </ul>
    </div>
    </footer>

</template>


<style lang="scss">

// это алиас означающий указ на src/


.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 30px;
}

.footer-column {
  width: 23%;
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
  margin-bottom: 10px;
}

.footer-column a {
  text-decoration: none;
  color: #333;
}

.footer-column a:hover {
  color: #e31b6d;
}

</style>