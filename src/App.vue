<template>
  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen pb-8">
    <div v-show="!detailsScreen && !newsScreen && !aboutPage">
      <!-- <div></div>
      div -->
      <div class="flex flex-row container items-center justify-between text-white ">
        <div class="flex flex-row items-center gap-4">
          <img src="./assets/logo3.svg" class="h-[5rem] w-[5rem] cursor-pointer"
            @click="detailsScreen = false, newsScreen = false, aboutPage = false" alt="">

          <div class="cursor-pointer hover:text-yellow-500" @click="showNewsScreen()">NEWS</div>
          <div class="cursor-pointer hover:text-yellow-500" @click="aboutPage = true">ABOUT</div>

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
      <div
        class="title bg-gradient-to-b from-gray-900 to-gray-600 p-4 text-center text-white w-full h-full flex flex-col justify-center items-center">
        <h1 class="text-2xl">CRYPTOHUNTER</h1>
        <h3>Get all the info regarding your favorite Cryptocurrency</h3>
        <div class="grid grid-cols-3  flex-row justify-between gap-4" v-if="list.length > 0">
          <div v-for="n in 3" :key="n" class="card rounded-md flex flex-col p-2 items-center ">
            <img :src="list.length > 0 ? list[n - 1].image : ''" alt="{{list[n-1].id}}" class="h-[2rem] w-[2rem]">
            <h1>{{ list.length > 0 ? list[n - 1].name : '' }} <span
                :class="(list[n - 1].price_change_24h < 0) ? 'text-red-500' : 'text-green-500'">{{
                list.length > 0 ? list[n - 1].price_change_percentage_24h.toFixed(4)* 10 : " "
                }}%</span></h1>
            <h1>{{ currencies.length > 0 ? currencies[currencyId].symbol : " " }}{{ list[n - 1].current_price }}</h1>
          </div>
        </div>
      </div>
      <div class="home  mt-[2rem]">
        <section class="text-center text-white">
          <h1>Cryptocurrency Prices by Market Cap</h1>
        </section>
        <div class="container flex justify-center items-center w-full mt-[1rem]">
          <div class="w-full flex flex-col items-center justify-center">
            <input type="text" class="w-full md:w-2/3 border border-white rounded-md bg-transparent text-white p-1"
              placeholder="Search for a Cryptocurrency..." v-model="searchTerm" @keyup="search()">
            <table class="list mt-2 text-[1rem] w-0 md:w-2/3">
              <thead class="">
                <tr class="bg-yellow-500 ">
                  <th class="px-[2rem] rounded-l-md">Coin</th>
                  <th class="px-[2rem] ">Price</th>
                  <th class="px-[2rem] ">24h change (%)</th>
                  <th class="px-[2rem] rounded-r-md">Market Cap</th>
                </tr>
              </thead>
              <tbody class="text-white text-center ">
                <tr v-for="(crypto, index) in listToShow" :key="index"
                  @click="goToDetails(crypto.id, 1, 'hourly', index)" class="cursor-pointer ">
                  <td class="px-[2rem] flex  items-center font-bold">
                    <img :src="crypto.image" class="w-[1rem] h-[1rem] mr-[0.1rem]" alt="">
                    {{ crypto.name }}
                  </td>
                  <td class="px-[2rem]">{{ currencies[currencyId]['symbol'] }} {{ crypto.current_price.toFixed(3) }}
                  </td>
                  <td class="px-[2rem]" :class="(crypto.price_change_24h < 0) ? 'text-red-500' : 'text-green-500'">
                    <span :class="(crypto.price_change_24h > 0) ? '' : 'hidden'">+</span>{{
                    (crypto.price_change_percentage_24h).toFixed(3)
                    }} %
                  </td>
                  <td class="px-[2rem]">{{ currencies[currencyId].symbol }} {{ crypto.market_cap }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

    <div v-show="detailsScreen" class="">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row items-center justify-center ">
          <img class="text-white cursor-pointer mx-4" @click="detailsScreen = false" src="./assets/barrow.png" alt="">
          <img src="./assets/logo3.svg" class="h-[5rem] w-[5rem] cursor-pointer"
            @click="detailsScreen = false, newsScreen = false, aboutPage = false" alt="">
        </div>

        <select class="bg-[#2B2525] text-white rounded-md p-0" v-model="chartTimePeriod"
          @change="goToDetails(cryptoId, chartTimePeriod, 'hourly')">
          <optgroup class="bg-[#2B2525]">
            <option value="1">24h</option>
            <option value="7">1 Week</option>
            <option value="30">1 Month</option>
          </optgroup>
        </select>

      </div>
      <div class="detailsScreen mt-[3rem] md:grid md:grid-cols-8">
        <div class="md:col-span-2  flex flex-col gap-4 items-center justify-center text-white  details">
          <img :src="currentCoinDetail.image['large']" class="h-[8rem] w-[8rem]">
          <p class="text-[1.8rem] uppercase">{{ currentCoinDetail.name }}</p>
          <p class="text-[1.2rem] uppercase">Rank:{{ currentCoinDetail.market_cap_rank }}</p>
          <p class="text-[1.2rem] uppercase">Price:{{ currencies[currencyId]['symbol'] }}{{
          currentCoinDetail.market_data.current_price[currencies[currencyId]['abbreviation'].toLowerCase()]
          }} </p>
          <p class="text-[1.2rem] uppercase">24h Change:<span
              :class="(currentCoinDetail.price_change_percentage_24h > 0) ? 'text-green-700' : 'text-red-500'">{{
              (currentCoinDetail.market_data.price_change_percentage_24h * 10).toFixed(2)
              }}%</span>
          </p>
          <p class="text-[1.2rem] uppercase">All-Time-High:{{ currencies[currencyId]['symbol']
          }}{{ currentCoinDetail.market_data.ath[currencies[currencyId]['abbreviation'].toLowerCase()] }}</p>
          <p class="text-[1.2rem] uppercase">All-Time-Low:{{ currencies[currencyId]['symbol']
          }}{{ currentCoinDetail.market_data.atl[currencies[currencyId]['abbreviation'].toLowerCase()] }}</p>
          <p class="text-[1.2rem] uppercase">Market-cap:{{ currencies[currencyId]['symbol']
          }}{{ currentCoinDetail.market_data.market_cap[currencies[currencyId]['abbreviation'].toLowerCase()] }}</p>
        </div>
        <div class="md:col-span-6  graph">
          <canvas id="myChart" class=""></canvas>
        </div>
      </div>

    </div>

    <div v-show="newsScreen" class="newsScreen">

      <div class="flex flex-col items-start">
        <div class="flex flex-row items-center justify-center ">
          <p class="text-white cursor-pointer" @click="newsScreen = false"><img src="./assets/barrow.png" alt=""></p>
          <img src="./assets/logo3.svg" class="h-[5rem] w-[5rem] cursor-pointer"
            @click="detailsScreen = false, newsScreen = false, aboutPage = false" alt="">

        </div>
      </div>
      <div class="container grid grid-cols-2 md:grid-cols-4 auto-cols-max ">

        <div class="bg-white overflow-hidden  border-b-4 border-blue-500 w-11/12 mt-4"
          v-for="news in newsCards.articles" :key="news.title">
          <!-- <img :src="news.image" alt="People" class="w-full object-cover h-32 sm:h-48 md:h-64"> -->
          <div class="p-4 md:p-6">
            <p class="text-blue-500 font-semibold text-xs mb-1 leading-none">News</p>
            <h3 class="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{{ news.title }}</h3>
            <div class="text-sm flex items-center">
              <svg class="opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1" id="Capa_1" x="0px" y="0px" width="12" height="12" viewBox="0 0 97.16 97.16"
                style="enable-background:new 0 0 97.16 97.16;" xml:space="preserve">
                <path
                  d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
                <path
                  d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
              </svg>
              <p class="leading-none">{{ news.publishedAt }}</p>
            </div>
          </div>
        </div>


      </div>
    </div>


    <div v-show="aboutPage" class="about">

      <div class="flex flex-col items-start">
        <div class="flex flex-row items-center justify-center ">
          <p class="text-white cursor-pointer" @click="aboutPage = false"><img src="./assets/barrow.png" alt=""></p>

          <img src="./assets/logo3.svg" class="h-[5rem] w-[5rem] cursor-pointer"
            @click="detailsScreen = false, newsScreen = false, aboutPage = false" alt="">

        </div>
      </div>
      <div class="main aboutUsPage mx-[5rem] text-white text-center">
        <h1 class="text-4xl mb-8">About Us</h1>
        <div class="about text-lg">
          <h3 class="text-xl mb-8">Welcome To Cryptohunter</h3>
          <p><span id="W_Name2">Cryptohunter</span> is a Professional <span id="W_Type1">Cryptocurrency</span> Platform.
            Here we will provide you only interesting content, which you will like very much. We're dedicated to
            providing you the best of <span id="W_Type2">Cryptocurrency</span>, with a focus on dependability and <span
              id="W_Spec">Bitcoin prices and news</span>. We're working to turn our passion for <span
              id="W_Type3">Cryptocurrency</span> into a booming <a
              href="https://www.blogearns.com/2021/05/free-about-us-page-generator.html" rel="do-follow"
              style="color: inherit; text-decoration: none;">online website</a>. We hope you enjoy our <span
              id="W_Type4">Cryptocurrency</span> as much as we enjoy offering them to you.</p>
          <p>I will keep posting more important posts on my Website for all of you. Please give your support and love.
          </p>
          <div class="grid md:grid-cols-3 mb-4">


            <div
              class="bg-white overflow-hidden flex flex-col items-center justify-center  border-b-4 border-blue-500 w-11/12 mt-4">
              <img src="./assets/fahad.jpg" alt="People" class="h-50 w-50 md:h-64 md:w-64 object-cover rounded-full">
              <div class="p-4 md:p-6 text-black">
                <h3 class="mb-2 text-3xl text-black ">Fahad Zardari</h3>
                <p>Developer</p>
                <div class="text-lg text-black flex items-center">
                </div>
              </div>
            </div>
            <div
              class="bg-white overflow-hidden flex flex-col items-center justify-center  border-b-4 border-blue-500 w-11/12 mt-4">
              <img src="./assets/usama.png" alt="People" class="w-64 object-cover  rounded-full">
              <div class="p-4 md:p-6 text-black">
                <h3 class="mb-2 text-3xl text-black ">Muhammed Usama</h3>
                <p>Designer</p>
                <div class="text-lg text-black flex items-center">
                </div>
              </div>
            </div>
            <div
              class="bg-white overflow-hidden flex flex-col items-center justify-center  border-b-4 border-blue-500 w-11/12 mt-4">
              <img src="./assets/arayan.png" alt="People" class="w-64 object-cover rounded-full">
              <div class="p-4 md:p-6 text-black">
                <h3 class="mb-2 text-3xl text-black ">Muhammad Arayan</h3>
                <p>Developer</p>
                <div class="text-lg text-black flex items-center">
                </div>
              </div>
            </div>

          </div>
          <p style="font-weight: bold; text-align: center;">Thanks For Visiting Our Site<br><br>
            <span class="text-yellow-500">Have a nice day!</span>
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
import news from './assets/news.json';
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
      cryptoId: null,
      chartTimePeriod: 1,
      newsCards: news,
      cryptoIndex: 0,
      aboutPage: false

    }
  },

  async created() {
    this.currencyId = localStorage.getItem("currencyId") || 4;


    this.currentList = await this.getList();
    this.listToShow = this.currentList;
    this.list = await this.getFullList();

  },


  methods: {
    async getFullList() {
      // this.currencyId =  4;
      //this.currencyId =  4;
      this.currencyId = localStorage.getItem("currencyId") || 4;

      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      // this.currencyToShowIn =  "pkr";

      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc');
      this.currencies = currencyImport;
      return response.json();

    },
    async getList() {
      this.currencyToShowIn = localStorage.getItem("currencyToShowIn") || "pkr";
      let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currencyToShowIn + '&order=market_cap_desc&per_page=20&page=1&sparkline=true');
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
      if (this.searchTerm)
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
    goToDetails(coinName, days, interval, index) {
      this.cryptoIndex = index;
      let pricesToShow = [];
      let labelsToShow = [];
      this.cryptoId = coinName;
      fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '/market_chart?vs_currency=' + this.currencyToShowIn + '&days=' + days + '&interval=' + interval + '')
        .then(response => response.json())
        .then((data) => {
          console.log(data['prices'][0][1].toFixed(2))
          for (var i = 0; i < data['prices'].length; i++) {
            pricesToShow.push(data['prices'][i][1].toFixed(2));
            labelsToShow.push(" ");

          }
          console.log(pricesToShow);

        })
        .then(() => {
          fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false')
            .then((response) => response.json())
            .then((data) => {
              this.currentCoinDetail = data;
            })
          let chartStatus = Chart.getChart("myChart"); // <canvas> id
          if (chartStatus != undefined) {
            chartStatus.destroy();
          }
          const colors = {
            purple: {
              default: "rgba(234 , 179 , 8, 1)",
              half: "rgba(122,175,34,93)",
              quarter: "rgba(234 , 179 , 8, 0.5)",
              zero: "rgba(234 , 179 , 8, 0.25)"
            }

          };

          const ctx = document.getElementById('myChart').getContext('2d');

          const gradient = ctx.createLinearGradient(0, 25, 0, 300);
          gradient.addColorStop(0, colors.purple.default);
          gradient.addColorStop(0.55, colors.purple.half);
          gradient.addColorStop(1, colors.purple.zero);
          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labelsToShow,
              datasets: [{
                label: coinName,
                data: pricesToShow,
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: gradient,
                fill: true,
                tension: 0.5,
                pointRadius: 1,
                grid: false
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: false,
                  suggestedMin: Math.min(...pricesToShow) - Math.min(...pricesToShow) / 10,
                  suggestedMax: Math.max(...pricesToShow) + Math.max(...pricesToShow) / 10,

                  grid: {
                    display: false
                  }

                },
                x: {
                  display: false,
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
        });
      this.detailsScreen = true;
      myChart;
    },
    showNewsScreen() {
      this.newsScreen = true;

    }

  }

}
</script>

<style>
body {
  font-family: "Times New Roman", Times, serif;
}

.aboutUsPage {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>