<template>
<div class="container">
    <span>ПРОДАЖИ</span>
    <button class="day-btn" :class="{'selected': isDaySelected}" @click="selectDay">День</button>
    <div>
    <button class="month-btn" v-for="month in months" :key="month" 
            :class="{'selected': month === selectedMonth}" @click="selectMonth(month)">
            {{ month.substring(0, 3) }}
    </button>
    </div>
    <Line v-if="loaded" :data="chartData" :options="isDaySelected ? chartOptionsForDay : chartOptions" />
</div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import moment from 'moment'

ChartJS.register(Title, Tooltip, Legend, LineController, CategoryScale, LinearScale, PointElement, LineElement)

export default {
name: 'LineChart',
components: { Line },
data: () => ({
    loaded: false,
    chartData: null,
    selectedMonth: moment().format('MMMM'),
    months: moment.months(),
    isDaySelected: false
}),
async mounted() {
    await this.updateChartData()
},
methods: {
selectDay() {
    this.updateChartDataForDay()
},
async updateChartDataForDay() {
    this.isDaySelected = true
    this.selectedMonth = null
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/admin/orders/chart/')
        const data = await response.json()
        console.log(data)
        const todayData = {}
        data.forEach(item => {
        const date = moment(item.date)
        if (date.isSame(moment(), 'day')) {
            const hour = date.hour()
            if (!todayData[hour]) {
            todayData[hour] = 0
            }
            todayData[hour] += item.value
        }
        })

        const chartData = Object.keys(todayData).map(hour => ({
        x: parseInt(hour),
        y: todayData[hour]
        }))
        

        this.chartData = {
        labels: chartData.map(item => item.x),
        datasets: [{
            label: 'Сумма (руб.)',
            data: chartData.map(item => item.y),
            borderColor: 'blue',
            pointBackgroundColor: 'blue'
        }]
        }
        this.loaded = true
    } catch (error) {
        console.error(error)
    }
    },


    async updateChartData() {
        this.isDaySelected = false
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/admin/orders/chart/')
        const data = await response.json()

        const monthlyData = {}
        data.forEach(item => {
        const date = moment(item.date)
        if (date.format('MMMM') === this.selectedMonth && date.year() === moment().year()) {
            if (!monthlyData[date.date()]) {
            monthlyData[date.date()] = 0
            }
            monthlyData[date.date()] += item.value
        }
        })

        const chartData = Object.keys(monthlyData).map(day => ({
        x: parseInt(day),
        y: monthlyData[day]
        }))

        this.chartData = {
        labels: chartData.map(item => item.x),
        datasets: [{
            label: 'Сумма (руб.)',
            data: chartData.map(item => item.y),
            borderColor: 'blue',
            pointBackgroundColor: 'blue'
        }]
        }
        this.loaded = true
    } catch (error) {
        console.error(error)
    }
    },
    selectMonth(month) {
    this.selectedMonth = month
    this.updateChartData()
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
    },
    chartOptionsForDay() {
    return {
        scales: {
        x: {
            title: {
            display: true,
            text: 'Часы'
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
</style>
