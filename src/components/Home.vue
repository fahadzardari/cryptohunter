<template>

{{list.data[5].symbol}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
computed: {
  ...mapGetters({list:'getList'})
},
props: {
 
},       

}
</script>

<style>

</style>