
<template>
  <!-- <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
  <canvas id="myChart"></canvas>
</template>

  <script setup>
import { ref } from 'vue';
import Chart from 'chart.js/auto';
defineProps({
  //msg: String
})
  //const count = ref(0),

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

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
