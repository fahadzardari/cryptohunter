<template>
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
              <tbody class="text-white text-center">
                  <tr>
                    <td class="px-[2rem]">dummy</td>
                    <td class="px-[2rem]">dummy</td>
                    <td class="px-[2rem]">dummy</td>
                    <td class="px-[2rem]">dummy</td>
                  </tr>
              </tbody>
          </table>

        </div>
      </div>

    </div>

  </div>

</template>

<script>
import Home from "./components/Home.vue"
export default {
  components: {
    Home,
  },
}
</script>

<style>
select:focus {
  box-shadow: none;
  outline: none;
}
</style>