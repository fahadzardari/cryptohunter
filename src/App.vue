<template class="body">
  

<!-- <LineChart/> -->
  <List/>


</template>

<script>
import List from './components/List.vue'
import LineChart from './components/LineChart.vue'
export default {
  components: {
    List,
    LineChart
  },
  data() {
    return {
      currency:null,
    }
  },
  mounted() {
    this.currency = window.localStorage.getItem("currencyToShowIn") || "pkr";
    
  },
  methods: {

  },
}
</script>


<style>
select:focus {
  box-shadow: none;
  outline: none;
}
</style>