<template>
    <div class="container">
      <span>ПРОГНОЗ ПРОДАЖ</span>
      <button class="day-btn" :class="{'selected': isMonthSelected}" @click="updateChartDataForMonth">Месяц</button>
      <button class="day-btn" :class="{'selected': !isMonthSelected}" @click="updateChartDataForYear">Год</button>
      <div>
        <button v-if="!showChart" class="generate-btn" @click="showChart = true">СФОРМИРОВАТЬ</button>
      </div>
      <Line v-if="showChart && loaded" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import moment from 'moment'
  
  export default {
    name: 'LineForecast',
    components: { Line },
    data: () => ({
      loaded: false,
      chartData: null,
      isMonthSelected: true,
      showChart: false // добавляем новое свойство showChart со значением false по умолчанию
    }),
    async mounted() {
      await this.updateChartDataForMonth()
    },
    methods: {
      async updateChartDataForYear() {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/admin/orders/year-forecast/')
          const data = await response.json()
  
          const chartData = {
            labels: data.map(item => moment(item.date).format('MMMM')),
            datasets: [{
              label: 'Сумма (руб.)',
              data: data.map(item => item.value),
              borderColor: 'blue',
              pointBackgroundColor: 'blue'
            }]
          }
  
          this.chartData = chartData
          this.loaded = true
          this.isMonthSelected = false // устанавливаем значение isMonthSelected в false
        } catch (error) {
          console.error(error)
        }
      },
  
      async updateChartDataForMonth() {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/v1/admin/orders/month-forecast/')
          const data = await response.json()
  
          const chartData = {
            labels: data.map(item => moment(item.date).format('D MMMM')),
            datasets: [{
              label: 'Сумма (руб.)',
              data: data.map(item => item.value),
              borderColor: 'blue',
              pointBackgroundColor: 'blue'
            }]
          }
  
          this.chartData = chartData
          this.loaded = true
          this.isMonthSelected = true 
        } catch (error) {
          console.error(error)
        }
      }
    },
    computed: {
      chartOptions() {
        return {
          scales: {
            x: {
              title: {
                display: true,
                text: 'День месяца'
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
    .month-btn {
      background: none;
      border: none;
      border-radius: 30px;
      height: 27px;
      width: 50px;
      cursor: pointer;
    }
    
    .selected {
      background-color: #E0BEA2;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    .day-btn {
        margin-bottom: 10px;
        background: none;
        border: none;
        cursor: pointer;
    
    
    }
    .day-btn.selected {
      background-color: #E0BEA2;
      color: white;
      font-weight: bold;
      cursor: pointer;
      border-radius: 30px;    
    }
    .generate-btn{
        margin-top: 284px;
        width: 300px;
        height: 50px;
        background-color: #E0BEA2;
        color: white;
        border: none;
        cursor: pointer;
    }
    .generate-btn:hover{
        background-color: rgba(48, 48, 255, 0.92);
        transition: all 0.5s ease-out;;

    }
    </style>
    