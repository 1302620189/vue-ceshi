<template>
    <div class="wrapper">
        <header class="header">

        </header>
        <main class="main">
            <div class="todo" ref="cls">
                <span><b>福<i></i></b></span>
                <span><b>禄<i></i></b></span>
                <span><b>寿<i></i></b></span>
                <span><b>喜<i></i></b></span>
                <span><b>财<i></i></b></span>
            </div>
            <div class="box" v-if="list.length" ref="cont">
                <h3 class="tit">{{list[car].tit}}</h3>
                <p v-for="(item,index) in list[car].da" :key="index" 
                    @click="judge(index)"
                    :class="[{active:index == tobay},{ctive:index == cby}]"
                >{{item[0]}}.{{item[1]}}</p>
            </div>
        </main>
        <footer class="footer">

        </footer>
    </div>
</template>
<script>
import  axios  from "axios"
import {mapMutations,mapGetters} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            list : [],
            car:0,
            tobay : Number,
            cby : Number,
        }
    },
    computed:{
        ...mapGetters(["buyList"])
    },
    methods:{
        ...mapMutations(["add"]),
        judge(ind) {
            let cls = []
            Array.from(this.$refs.cls.children).forEach(item => {
                Array.from(item.children).forEach(val => {
                    cls.push(val.children[0])
                })
            })
            
            let jud = ""
            if(this.list[this.car].zda == ind){
                this.tobay = ind
                cls[this.car].classList.add('ycls')
                jud = true
         
            }else{
                this.tobay = this.list[this.car].zda
                this.cby = ind
                cls[this.car].classList.add('ncls')
                jud = false
            }
            this.add(jud)

                setTimeout(() => {
                    if(this.car >= this.list.length-1){
                        let len = this.buyList.filter(item => item).length
       
                        this.$refs.cont.innerHTML = `<h2 style=" margin: 3rem 2rem;">
                            您共答对${len}道题！
                        </h2>`

                    }else{
                         this.car++
                            this.tobay = Number
                            this.cby = Number
                    }
                  
                }, 1000);
        }
    },
    created(){
        axios.get("/api")
            .then(res => this.list = res.data)
    },
    mounted(){

    }
}
</script>
<style scoped lang="">
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgb(243, 19, 19);
    }
    .header{
        width: 100%;
        height: 5rem;
        background: url("../../static/素材/2.png");
    }
    .main{
        flex: 1;
    }
    .box{
        width:80%;
        height: 80%;
        margin: 0 auto;
        background: url("../../static/素材/9.png");
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-top: 3.5rem;
    }
    .todo{
        width: 100%;
        height: 2rem;
        display: flex;
        margin-top: 2rem;
        text-align: center;
        line-height: 2rem;
        justify-content: space-around;
    }
    .todo span{
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border: 2px solid gold;
        box-sizing: border-box;
        transform: rotate(45deg);
        position: relative;
        /* background: #fff; */
        /* overflow: hidden; */
    }
    .todo span b{
        display: inline-block;
        transform: rotate(-45deg);
        color: gold
    }
    .footer{
        width: 100%;
        height: 5rem;
        background: url("../../static/素材/1.png");
    }
    .tit{
        line-height: 3rem;
        text-indent: 2em;
        color: red
    }
    p{
        line-height: 2rem;
        text-indent: 3em;
        color: rgb(247, 93, 93)
    }
    i{
        display: inline-block;
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background: #cccccc;
        left: 40%;
        bottom: -15%;
        z-index: 99
    }
    .active{
        color: blue;
    }
    .ctive{
        color: green;
    }
    .ycls{
        background: blue;
    }
    .ncls{
        background: green;
    }
    h2{
    }
</style>