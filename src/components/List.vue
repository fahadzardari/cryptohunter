<template>

      <div class="title bg-blue-300 text-center text-white w-full h-full flex flex-col justify-center items-center">
      <h1 class="text-2xl">CRYPTOHUNTER</h1>
      <h3>Get all the info regarding your favorite Cryptocurrency</h3>
    </div>

    <div class="home mt-[2rem]">
      <section class="text-center text-white">
        <h1>Cryptocurrency Prices by Market Cap</h1>
      </section>
      <div class="container flex justify-center items-center w-full mt-[1rem]">
        <div class="w-full flex flex-col items-center justify-center">

          <input type="text" class="w-2/3 border border-white rounded-md bg-transparent text-white p-1"
            placeholder="Search for a Cryptocurrency...">
                    <table class="list mt-2 w-2/3 ">
                      <thead class="">
              <tr class="bg-yellow-500 ">
                <th class="px-[2rem] rounded-l-md">Coin</th>
                <th class="px-[2rem] ">Price</th>
                <th class="px-[2rem] ">24h change</th>
                <th class="px-[2rem] rounded-r-md">Market Cap</th>
              </tr>
            </thead>
            <tbody class="text-white text-center ">
              <tr v-for="(crypto, index) in list" :key="index">
                <td class="px-[2rem] flex items-center"><img :src="crypto.image" class="w-[1rem] h-[1rem] mr-[0.1rem]" alt="">{{ crypto.name }}</td>
                <td class="px-[2rem]">{{ crypto.current_price }}</td>
                <td class="px-[2rem]">{{crypto.price_change_24h}}</td>
                <td class="px-[2rem]">{{crypto.market_cap}}</td>
              </tr>
            </tbody>
                            </table>
        </div>
      </div>

    </div>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      list: []
    }
  },

  async created(){
      this.list = await this.getList();
  },
  methods: {
    async getList() {
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true'); 
        return response.json();
    }
  },

}
</script>

<style>
</style>