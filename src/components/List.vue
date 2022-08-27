<template>
  {{ currencies[77] }}
  <div class="body px-4 pt-2 md:px-16 md:pt-6 bg-[#2B2525] min-h-screen">
    <div v-show="!detailsScreen && !newsScreen">
      <div class="flex flex-row container justify-between text-white ">
        <div class="flex gap-4">
          <div class="text-yellow-400 ">CRYPTOHUNTER</div>

          <div class="cursor-pointer " @click="newsScreen = true">NEWS</div>
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
                <tr v-for="(crypto, index) in listToShow" :key="index" @click="goToDetails(crypto.id)"
                  class="cursor-pointer ">
                  <td class="px-[2rem] flex items-center font-bold"><img :src="crypto.image"
                      class="w-[1rem] h-[1rem] mr-[0.1rem]" alt="">{{ crypto.name }}</td>
                  <td class="px-[2rem]">{{ currencies[currencyId]['symbol'] }} {{ crypto.current_price.toFixed(3) }}</td>
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
      <p class="text-white cursor-pointer" @click="detailsScreen = false"><img src="../assets/barrow.png" alt=""></p>
      <div class="detailsScreen mt-[3rem] md:grid md:grid-cols-8">
        <div class="md:col-span-2  flex flex-col gap-4 items-center justify-center text-white  details">
          <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" class="h-[8rem] w-[8rem]">
          <p class="text-[1.8rem] uppercase">Bitcoin</p>
          <p class="text-[1.2rem] uppercase">Rank:1</p>
          <p class="text-[1.2rem] uppercase">Price:$299999</p>
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
      <p class="text-white cursor-pointer" @click="newsScreen = false"><img src="../assets/barrow.png" alt=""></p>

      <div class="container">

      </div>
    </div>

  </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      currencies: [
        {
          "currency": "Argentina Peso",
          "abbreviation": "ARS",
          "symbol": "$"
        },
        {
          "currency": "Australia Dollar",
          "abbreviation": "AUD",
          "symbol": "$"
        },
        {
          "currency": "Bermuda Dollar",
          "abbreviation": "BMD",
          "symbol": "$"
        },
        {
          "currency": "Canada Dollar",
          "abbreviation": "CAD",
          "symbol": "$"
        },
        {
          "currency": "Chile Peso",
          "abbreviation": "CLP",
          "symbol": "$"
        },
        {
          "currency": "China Yuan Renminbi",
          "abbreviation": "CNY",
          "symbol": "¥"
        },
        {
          "currency": "Czech Republic Koruna",
          "abbreviation": "CZK",
          "symbol": "Kč"
        },
        {
          "currency": "Denmark Krone",
          "abbreviation": "DKK",
          "symbol": "kr"
        },
        {
          "currency": "Euro Member Countries",
          "abbreviation": "EUR",
          "symbol": "€"
        },
        {
          "currency": "Hong Kong Dollar",
          "abbreviation": "HKD",
          "symbol": "$"
        },
        {
          "currency": "Hungary Forint",
          "abbreviation": "HUF",
          "symbol": "Ft"
        },
        {
          "currency": "India Rupee",
          "abbreviation": "INR",
          "symbol": "₹"
        },
        {
          "currency": "Indonesia Rupiah",
          "abbreviation": "IDR",
          "symbol": "Rp"
        },
        {
          "currency": "Israel Shekel",
          "abbreviation": "ILS",
          "symbol": "₪"
        },
        {
          "currency": "Japan Yen",
          "abbreviation": "JPY",
          "symbol": "¥"
        },
        {
          "currency": "Korea (South) Won",
          "abbreviation": "KRW",
          "symbol": "₩"
        },
        {
          "currency": "Malaysia Ringgit",
          "abbreviation": "MYR",
          "symbol": "RM"
        },
        {
          "currency": "Mexico Peso",
          "abbreviation": "MXN",
          "symbol": "$"
        },
        {
          "currency": "New Zealand Dollar",
          "abbreviation": "NZD",
          "symbol": "$"
        },
        {
          "currency": "Nigeria Naira",
          "abbreviation": "NGN",
          "symbol": "₦"
        },
        {
          "currency": "Norway Krone",
          "abbreviation": "NOK",
          "symbol": "kr"
        },
        {
          "currency": "Pakistan Rupee",
          "abbreviation": "PKR",
          "symbol": "₨"
        },
        {
          "currency": "Philippines Peso",
          "abbreviation": "PHP",
          "symbol": "₱"
        },
        {
          "currency": "Poland Zloty",
          "abbreviation": "PLN",
          "symbol": "zł"
        },
        {
          "currency": "Saudi Arabia Riyal",
          "abbreviation": "SAR",
          "symbol": "﷼"
        },
        {
          "currency": "Singapore Dollar",
          "abbreviation": "SGD",
          "symbol": "$"
        },
        {
          "currency": "South Africa Rand",
          "abbreviation": "ZAR",
          "symbol": "R"
        },
        {
          "currency": "Sri Lanka Rupee",
          "abbreviation": "LKR",
          "symbol": "₨"
        },
        {
          "currency": "Sweden Krona",
          "abbreviation": "SEK",
          "symbol": "kr"
        },
        {
          "currency": "Switzerland Franc",
          "abbreviation": "CHF",
          "symbol": "CHF"
        },
        {
          "currency": "Taiwan New Dollar",
          "abbreviation": "TWD",
          "symbol": "NT$"
        },
        {
          "currency": "Thailand Baht",
          "abbreviation": "THB",
          "symbol": "฿"
        },
        {
          "currency": "Turkey Lira",
          "abbreviation": "TRY",
          "symbol": "₤"
        },
        {
          "currency": "United Kingdom Pound",
          "abbreviation": "GBP",
          "symbol": "£"
        },
        {
          "currency": "United States Dollar",
          "abbreviation": "USD",
          "symbol": "$"
        },
        {
          "currency": "Venezuela Bolivar",
          "abbreviation": "VEF",
          "symbol": "Bs"
        },
        {
          "currency": "Viet Nam Dong",
          "abbreviation": "VND",
          "symbol": "₫"
        }
      ],
      list: [],
      currentList: [],
      listToShow: [],
      currencyToShowIn: null,
      searchTerm: "",
      currencyId: null,
      newsScreen: false,
      detailsScreen: false,
      coinDetail: [],

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
    goToDetails(coinName) {
      let pricesToShow = [];
      let labelsToShow = [];
      fetch('https://api.coingecko.com/api/v3/coins/' + coinName + '/market_chart?vs_currency=' + this.currencyToShowIn + '&days=1&interval=hourly')
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
                  beginAtZero: false
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