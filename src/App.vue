<template class="body">
  




  <List/>


</template>

<script>
import List from './components/List.vue'
export default {
  components: {
    List,
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