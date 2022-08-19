import axios from "axios"


export default {
        state: () => ({
            list: [
                

            ],
        }),
    
        getters: {
            
            getList : (state) =>    (state.list)
        },
    
        mutations: {

        },
    
        actions: {
                setList(state){
                        axios
                             .get('https://api.coingecko.com/api/v3/coins/list')
                             .then(response => (state.list = response))
                }
        },
    }



// export default {
//         store: () => ({
//                 list:[
//                         {
//                                 id: "btc",
//                                 symbol:"sdfs",
//                                 name:"bitcoin"
//                         },
//                         {
//                                 id: "btc2",
//                                 symbol:"sdfs2",
//                                 name:"bitcoin2"
//                         },
//                         {
//                                 id: "btc3",
//                                 symbol:"sdfs3",
//                                 name:"bitcoin3"
//                         }
//                 ]
//         }),
//         getters:{
//                 getList : (state) =>    (state.list)
                
//         },
//         mutations:{},
//         actions:{
//                 logList : (state) => (console.log(state.list))
//         }
        
// }





