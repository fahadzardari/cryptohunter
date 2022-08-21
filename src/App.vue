<template class="body">
  

  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen">
    <div class="flex flex-row container justify-between text-white ">
      <div class="text-yellow-400 ">CRYPTOHUNTER</div>
      <div>
        <select name="" id="" class="bg-[#2B2525]  rounded-md p-1">
          <optgroup class="bg-[#2B2525] ">
            <option value="">USD</option>
            <option value="">PKR</option>
          </optgroup>
        </select>
      </div>
    </div>


  <List/>

  </div>

</template>

<script>
import List from './components/List.vue'
export default {
  components: {
    List,
  },
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    //this.$store.dispatch('setList');
  },
}
</script>


<style>
select:focus {
  box-shadow: none;
  outline: none;
}
</style>