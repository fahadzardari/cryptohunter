<template>

  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen">
    <div class="flex flex-row container justify-between text-white ">
      <div class="text-yellow-400 ">CRYPTOHUNTER</div>
      <div>
        <select v-model="currencyToShowIn" @change="changeCurrency()" class="bg-[#2B2525]  rounded-md p-1">
          <optgroup class="bg-[#2B2525] ">
            <option value="usd">USD</option>
            <option value="pkr">PKR</option>
          </optgroup>
        </select>
      </div>
    </div>


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
            placeholder="Search for a Cryptocurrency..." v-model="searchTerm" @keyup="search()">
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
              <tr v-for="(crypto, index) in listToShow" :key="index">
                <td class="px-[2rem] flex items-center"><img :src="crypto.image" class="w-[1rem] h-[1rem] mr-[0.1rem]"
                    alt="">{{ crypto.name }}</td>
                <td class="px-[2rem]">{{ crypto.current_price }}</td>
                <td class="px-[2rem]">{{ crypto.price_change_24h }}</td>
                <td class="px-[2rem]">{{ crypto.market_cap }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      list: [],
      currentList: [],
      listToShow: [],
      currencyToShowIn: null,
      searchTerm: ""
    }
  },

  async created() {
    this.currentList = await this.getList();
    this.listToShow = this.currentList;
    this.list = await this.getFullList();
  },
  methods: {
    async getFullList() {
      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc');
      return response.json();

    },
    async getList() {
      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc&per_page=20&page=1&sparkline=true');
      return response.json();
    },
    async changeCurrency() {
      //  alert(this.currencyToShowIn);
      localStorage.setItem("currencyToShowIn", this.currencyToShowIn);
      this.currentList = await this.getList();
      this.list = await this.getFullList();
      this.listToShow = this.currentList;
    },
    search() {
      //if(this.searchTerm)
      if (this.searchTerm == "") {
        this.listToShow = this.currentList;
      } else {
        this.listToShow = this.list.filter((crypto) => {
          return (
            crypto.name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          );
        });
      }
    },

  }
}
</script>

<style>
</style>