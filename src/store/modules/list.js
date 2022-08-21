import axios from "axios"


export default {
        state: () => ({
            list: [{}],
        }),
    
        getters: {
            
            getList : (state) =>    (state.list)
        },
    
        mutations: {
            saveData(state , fetchedData){
                state.list = fetchedData;
            }
        },
    
        actions: {
                setList({commit,state}){
                       axios
                             .get('https://api.coingecko.com/api/v3/coins/list')
                             .then( response => {

                                                    commit('saveData' , response)
  
                                                })
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





