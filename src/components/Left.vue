<template>
  <div class="aside">
    <div  :class="currentIndex === 1 ? active : ''" @click="getClassName(1)">
      <Find/>
    </div>
    <div  :class="currentIndex === 2 ? active : ''" @click="getClassName(2)">
      <Recommend/>
    </div>
    <div  :class="currentIndex === 3 ? active : ''" @click="getClassName(3)">
      <Mvs/>
    </div>
  </div>
</template>

<script>
import Find from './Find.vue'
import Recommend from './Recommend.vue'
import Mvs from './Mvs.vue'

export default {
    name:'Left',
    components:{Find,Recommend,Mvs},
    data(){
      return{
        currentIndex: 1,
        active:'active'
      }
    },
    methods:{
      getClassName(index) {
        // console.log(index);
        this.currentIndex = index
      }
    }
}
</script>

<style>
  /* 导航栏样式 */
  .aside{
    width: 15%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-right: 1px solid rgb(231, 226, 226);
    position: fixed;
    top: 80px;
  }

  a{
    display: block;
  }

  h3{
    width: 200px;
    height: 60px;
    line-height: 60px;
    color: black;
    display: inline;
    font-size: 23px;
    padding-left: 10px;
  }

  .aside > div:hover{
    background-color: #ededed;
  }

  /* .aside > a:active{
    background-color: #ededed;
  } */

  .active{
    background-color: #ededed;
    /* color: #ec4141; */
  }
</style>