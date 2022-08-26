<template>
  <div class="h-[60%] w-[60%]">
    <canvas id="myChart"></canvas>

  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      coin: null
    }
  // },
  // async mounted() {
  //   const now = new Date();

  //   // 👇️ all days of the current month
  //   console.log(this.getAllDaysInMonth(now.getFullYear(), now.getMonth()));

  //   const date = new Date('2022-03-24');

  //   // 👇️ All days in March of 2022
  //   console.log(getAllDaysInMonth(date.getFullYear(), date.getMonth()));
  //   const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=hour')
  //   this.coin = await response.json()
  //   console.log(this.coin)
  

  // methods: {
  //   getAllDaysInMonth(year, month) {

  //     return dates;
  //   }
  },
};
</script>

