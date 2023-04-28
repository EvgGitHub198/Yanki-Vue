<template>
  <div class="container">
    <span>ПРОДАЖИ НА ТЕКУЩИЙ ГОД</span>  
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>



<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import moment from 'moment'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
  }),
  async mounted() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/orders/chart/')
      const data = await response.json()
      
      // Создаем объект для хранения суммы за каждый месяц
      const monthlyData = {}

      // Итерируемся по данным и суммируем значения для каждого месяца текущего года
      data.forEach(item => {
        const date = moment(item.date)
        if (date.year() === moment().year()) {
          const monthName = date.format('MMMM')
          if (!monthlyData[monthName]) {
            monthlyData[monthName] = 0
          }
          monthlyData[monthName] += item.value
        }
      })

      // Создаем массив объектов с месяцем и суммой для каждого месяца текущего года
      const chartData = moment.months().map(monthName => ({
        x: monthName,
        y: monthlyData[monthName] || 0
      }))

      // Передаем данные в формате, подходящем для библиотеки Chart.js
      this.chartData = {
        labels: chartData.map(item => item.x),
        datasets: [{
          label: 'Сумма (руб.)',
          data: chartData.map(item => item.y),
          backgroundColor: 'blue'
        }]
      }
      this.loaded = true
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
      chartOptions() {
        return {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Месяц'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Сумма (руб.)'
              }
            }
          }
        }
      }
    }
}
</script>


<style lang="scss" scoped>
span {
 display: flex;
 height: 40px;
 align-items: center;
 margin-left: 15px;
 font-weight: bold;
 font-size: 16px;


}
.container{
  margin-bottom: 200px;
}

</style>