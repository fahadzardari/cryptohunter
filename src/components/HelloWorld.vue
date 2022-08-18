
<template>
  <div class="w-3/4">
    <h1 class="text-7xl">Hello World</h1>
    <canvas id="myChart"></canvas>
  </div>

</template>

  <script setup>
import Chart from 'chart.js/auto';

</script>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];

    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {}
    };
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
    myChart;
  },

}
</script>
