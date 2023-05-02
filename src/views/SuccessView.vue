<template>
    <div class="success-page">
        <h1 class="success-header">Спaсибо за заказ!</h1>
        <h2>Номер вашего заказа: {{ lastOrderId }}</h2>

        <h2>Вы можете отслеживать статус вашего заказа в личном кабинете</h2>
    
    </div>
</template>


<script>
import axios from 'axios';


export default{
    name: "SuccessView",
    mounted(){
        this.getMyOrders();
    },
    data() {
        return {
        lastOrderId: null
        };
    },
    methods:{
        async getMyOrders() {
        try {
            const response = await axios.get('/api/v1/my-orders/');
            const orders = response.data;
            const lastOrder = orders[0]; // Получаем последний заказ из массива
            this.lastOrderId = lastOrder.id; // Сохраняем id последнего заказа в переменную lastOrderId
        } catch (error) {
            console.log(error);
        }
        }

    }
}
</script>

<style lang="scss" scoped>
.success-page {
    min-height: 100vh;
    margin-top: 100px;
    text-align: center;
}
.success-header{
    margin-top: 40vh;
}
</style>