<template>

  <head>
    <link rel="icon" href="./assets/logo3.png" type="image/png">
  </head>
  {{ currencies[77] }}
  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen">
    <div v-show="!detailsScreen && !newsScreen">
      <div class="flex flex-row container justify-between text-white ">
        <div class="flex gap-4">
          <div class="text-yellow-400 ">CRYPTOHUNTER</div>

          <div class="cursor-pointer " @click="showNewsScreen()">NEWS</div>
        </div>
        <div>
          <select v-model="currencyId" @change="changeCurrency()" class="bg-[#2B2525]  rounded-md p-1">
            <optgroup class="bg-[#2B2525]">
              <option v-for="(currency, index) in currencies" :key="index" :value="index">{{ currency.abbreviation }}
              </option>
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
            <h1>{{ list[n - 1].name }} <span
                :class="(list[n - 1].price_change_24h < 0) ? 'text-red-500' : 'text-green-500'">{{ list[n -
                    1].price_change_percentage_24h.toFixed(4)
                    * 10
                }}%</span></h1>
            <h1>{{ currencies[currencyId]['symbol'] }}{{ list[n - 1].current_price }}</h1>
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
                  <th class="px-[2rem] ">24h change (%)</th>
                  <th class="px-[2rem] rounded-r-md">Market Cap</th>
                </tr>
              </thead>
              <tbody class="text-white text-center ">
                <tr v-for="(crypto, index) in listToShow" :key="index" @click="goToDetails(crypto.id, 1, 'hourly')"
                  class="cursor-pointer ">
                  <td class="px-[2rem] flex items-center font-bold"><img :src="crypto.image"
                      class="w-[1rem] h-[1rem] mr-[0.1rem]" alt="">{{ crypto.name }}</td>
                  <td class="px-[2rem]">{{ currencies[currencyId]['symbol'] }} {{ crypto.current_price.toFixed(3) }}
                  </td>
                  <td class="px-[2rem]" :class="(crypto.price_change_24h < 0) ? 'text-red-500' : 'text-green-500'">
                    <span :class="(crypto.price_change_24h > 0) ? '' : 'hidden'">+</span>{{
                        (crypto.price_change_percentage_24h).toFixed(3)
                    }} %
                  </td>
                  <td class="px-[2rem]">{{ currencies[currencyId]['symbol'] }} {{ crypto.market_cap }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="buttons">
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
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div v-show="detailsScreen" class="">
      <p class="text-white cursor-pointer" @click="detailsScreen = false"><img src="./assets/barrow.png" alt=""></p>
      <div class="detailsScreen mt-[3rem] md:grid md:grid-cols-8">
        <div class="md:col-span-2  flex flex-col gap-4 items-center justify-center text-white  details">
          <img :src="currentCoinDetail.image['large']" class="h-[8rem] w-[8rem]">
          <p class="text-[1.8rem] uppercase">{{ currentCoinDetail.name }}</p>
          <p class="text-[1.2rem] uppercase">Rank:{{ currentCoinDetail.market_cap_rank }}</p>
          <p class="text-[1.2rem] uppercase">Price:{{ currencies[currencyId]['symbol'] }} </p>
          <p class="text-[1.2rem] uppercase">24h Change:<span class="text-green-700">1%</span></p>
          <p class="text-[1.2rem] uppercase">All-Time-High:$299999</p>
          <p class="text-[1.2rem] uppercase">All-Time-Low:$299999</p>
          <p class="text-[1.2rem] uppercase">Market-cap:88889999</p>
        </div>
        <div class="md:col-span-6  graph">
          <canvas id="myChart" class="bg-white"></canvas>
        </div>
      </div>

    </div>

    <div v-show="newsScreen" class="newsScreen">
      <p class="text-white cursor-pointer" @click="newsScreen = false"><img src="./assets/barrow.png" alt=""></p>

      <div class="container md:grid md:grid-cols-3 gap-2">
        <div href="https://somlink.com" class="bg-white rounded-md ">
          <img src="./assets/bg.jpg" class="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatum a nulla quasi? Fugit repellendus
            sit doloribus modi natus voluptatem odit accusantium, id molestiae in, consequatur nobis iusto itaque
            labore.
          </p>
        </div>
        <div href="https://somlink.com" class="bg-white">
          <img src="./assets/bg.jpg" class="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatum a nulla quasi? Fugit repellendus
            sit doloribus modi natus voluptatem odit accusantium, id molestiae in, consequatur nobis iusto itaque
            labore.
          </p>
        </div>
                <div href="https://somlink.com" class="bg-white">
          <img src="./assets/bg.jpg" class="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse voluptatum a nulla quasi? Fugit repellendus
            sit doloribus modi natus voluptatem odit accusantium, id molestiae in, consequatur nobis iusto itaque
            labore.
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import currencyImport from './assets/currencies.json';
import dummy from './assets/dummy.json';
export default {
  data() {
    return {
      list: [],
      currencies: currencyImport,
      currentList: [],
      listToShow: [],
      currencyToShowIn: null,
      searchTerm: "",
      currencyId: null,
      newsScreen: false,
      detailsScreen: false,
      currentCoinDetail: dummy,

    }
  },

  async created() {

    this.currentList = await this.getList();
    this.listToShow = this.currentList;
    this.list = await this.getFullList();
  },

  methods: {
    async getFullList() {
      this.currencyId = localStorage.getItem("currencyId") || 77;
      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc');
      return response.json();

    },
    async getList() {
      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc&per_page=8&page=1&sparkline=true');
      return response.json();
    },
    async changeCurrency() {
      localStorage.setItem("currencyId", this.currencyId);
      this.currencyToShowIn = this.currencies[this.currencyId].abbreviation.toLowerCase();
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
    goToDetails(coinName, days, interval) {
      let pricesToShow = [];
      let labelsToShow = [];
      fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '/market_chart?vs_currency=' + this.currencyToShowIn + '&days=' + days + '&interval=' + interval + '')
        .then(response => response.json())
        .then((data) => {
          console.log(data['prices'][0][1].toFixed(2))
          for (var i = 0; i < data['prices'].length; i++) {
            pricesToShow.push(data['prices'][i][1].toFixed(2));
            labelsToShow.push(data['prices'][i][0].toFixed(2));

          }
          console.log(pricesToShow);

        })
        .then(() => {
          fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '?vs_currency=' + this.currencyToShowIn + '')
            .then(response => response.json())
            .then((data) => this.currentCoinDetail = data)
            .then(() => console.log(this.currentCoinDetail.image['small']))

          let chartStatus = Chart.getChart("myChart"); // <canvas> id
          if (chartStatus != undefined) {
            chartStatus.destroy();
          }
          const ctx = document.getElementById('myChart');
          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labelsToShow,
              datasets: [{
                label: coinName,
                data: pricesToShow,
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: ['#9AB8F7', '#9A3BC7'],
                fill: 'start',
                tension: 0.5,
                pointRadius: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: false,
                  suggestedMin: Math.min(...pricesToShow) - Math.min(...pricesToShow) / 10,
                  suggestedMax: Math.max(...pricesToShow) + Math.max(...pricesToShow) / 10
                }
              }
            }
          });
        });
      this.detailsScreen = true;
      myChart;
      // this.coinDetail = await this.getCoinData(coin);
      // let priceToShow = await this.parseCoinData();

      // console.log(priceToShow)
    },
    showNewsScreen() {
      this.newsScreen = true;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9559933af2mshd6a255f7a35e6cep15b991jsnb5082386712c',
          'X-RapidAPI-Host': 'crypto-news15.p.rapidapi.com'
        }
      };

      fetch('https://crypto-news15.p.rapidapi.com/news/amb', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }

  }

}
</script>

<style>
body {
  font-family: "Times New Roman", Times, serif;
}

/* .details:after {
  content: "";
  background-color: white;
  position: absolute;
  width: 0.05rem;
  height: 80%;
  top: 3rem;
  left: 3rem;
  display: block;
} */
</style>