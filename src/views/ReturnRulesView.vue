<template>
    <div class="about-page">
        <h2 class="info">Обмен и возврат</h2>
        <div class="info">
            <p>Если вам не подошел заказ, мы с удовольствием вам его обменяем или примем возврат</p>
            <p>Обмен и возврат возможен в случае :</p>
        </div>
        <div class="all-blocks">
            <div class="block"><img src="@/assets/icons/return-1.svg"><span>если заказ не был использован и сохранил товарный вид(в том числе не нарушены бирки, ярлыки, упаковочные материалы)</span></div>
            <div class="block"><img src="@/assets/icons/return-2.svg"><span>возврат и обмен осуществляется в течение двух дней с момента получения заказа</span></div>
            <div class="block"><img src="@/assets/icons/return-3.svg"><span>возврат и обмен товара возможен только при отправке по Украине</span></div>
            <div class="block"><img src="@/assets/icons/return-4.svg"><span>бланк возврата присутствует в каждой посылке</span></div>
            <div class="block"><img src="@/assets/icons/return-5.svg"><span>все расходы по обмену и возврату товара несет покупатель</span></div>
            <div class="block"><img src="@/assets/icons/return-6.svg"><span>после получения возврата мы делаем перевод денежных средств на карту клиента</span></div>

        </div>
    </div>


    
</template>
<script>
export default{
    name: 'ReturnView',
}
</script>

<style lang="scss" scoped>
.block{
    max-width: 200px;
    display: flex;
    flex-direction: column;
}
.block img {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    margin-bottom: 10px;

}
.all-blocks{
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 50px;
}
.info {
    text-align: left;
}
.about-page{
    height: 60vh;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: 7%;
    margin-left: 7%;
}
</style>