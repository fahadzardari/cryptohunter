<template>
{{currencyToShowIn}}
  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen">
    <div class="flex flex-row container justify-between text-white ">
      <div class="text-yellow-400 ">CRYPTOHUNTER</div>
      <div>
        <select v-model="currencyId" @change="changeCurrency()" class="bg-[#2B2525]  rounded-md p-1">
          <optgroup class="bg-[#2B2525]" >
            <option  v-for="(currency,index) in currencies" :key="index" :value="index">{{currency.abbreviation}}</option>
          </optgroup>
        </select>
      </div>
    </div>
    <!-- <img src="../assets/bg.jpg" alt=""> -->

    <div
      class="title bg-gradient-to-b from-gray-900 to-gray-600 p-4 text-center text-white w-full h-full flex flex-col justify-center items-center">
      <h1 class="text-2xl">CRYPTOHUNTER</h1>
      <h3>Get all the info regarding your favorite Cryptocurrency</h3>

      <div class="grid grid-cols-4 flex-row justify-between gap-4">
        <div v-for="n in 4" :key="n" class="card rounded-md flex flex-col p-2 items-center ">
          <img :src="list[n - 1].image" alt="{{list[n-1].id}}" class="h-[2rem] w-[2rem]">
          <h1>{{ list[n - 1].name }}</h1>
          <h1>${{ list[n - 1].current_price }}</h1>

        </div>
      </div>
    </div>

    <div class="home container mt-[2rem]">
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
                <td class="px-[2rem]" :class="(crypto.price_change_24h < 0) ? 'text-red-500' : 'text-green-500'">
                  <span :v-if="crypto.price_change_24h > 0">+</span>{{ crypto.price_change_24h }}</td>
                <td class="px-[2rem]">{{ crypto.market_cap }}</td>
              </tr>
            </tbody>
          </table>
          <div class="buttons">
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('1')">1</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('2')">2</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('3')">3</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('4')">4</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('5')">5</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('6')">6</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('7')">7</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('8')">8</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('9')">9</button>
            <button class="border border-white rounded-2xl px-[0.4rem] text-white font-extrabold"
              @click="changeList('10')">10</button>


          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import currenciesImport from '../assets/currencies.json';
export default {
  data() {
    return {
      list: [],
      currentList: [],
      listToShow: [],
      currencies:currenciesImport,
      currencyToShowIn: null,
      searchTerm: "",
      currencyId:null
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
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc&per_page=10&page=1&sparkline=true');
      return response.json();
    },
    async changeCurrency() {
      //  alert(this.currencyToShowIn);
      localStorage.setItem("currencyId" , this.currencyId);
      //alert(this.currencies[this.currencyId].abbreviation.toLowerCase());
      this.currencyToShowIn = this.currencies[this.currencyId].abbreviation.toLowerCase();
      localStorage.setItem("currencyToShowIn", this.currencyToShowIn);
      alert(this.currencyToShowIn);
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