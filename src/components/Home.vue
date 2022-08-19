<template>
  {{list}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {

  data() {
    return {
      //list:null
    }
  },
  props: {
    
  },

      computed: {
        ...mapActions(['setList']),
        ...mapGetters({list:'getList'}),
       // ...mapActions(['logList'])
      },
  created() {
    //axios
    //.get('https://api.coingecko.com/api/v3/coins/list')
    //.then(response => (this.list = response))
    //.then(() => (this.data_fetched = true) )
    //.then(alert(this.list));
    //alert(this.data_fetched)
  },
  mounted() {
    console.log(this.list);
    //this.list = this.temp;
    //alert(this.list)
    //   axios
    //     .get('https://api.coingecko.com/api/v3/coins/list')
    //     .then(response => (this.list = response))
    //     .then(() => console.log(this.list) );

  }
}
</script>

<style>

</style>