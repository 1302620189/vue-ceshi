import vue from "vue"
import Vuex from "vuex"

vue.use(Vuex)

export default new Vuex.Store({
    state:{
        buyList :[]
    },
    mutations : {
        add(state,data) {
            state.buyList.push(data)
        }
    },
    actions :{

    },
    getters :{
        buyList(state) {
            return state.buyList
        }
    }
})