<template>
    <div class="header">
        <h2 style="width:200px">音乐播放器</h2>
        <div class="btns">
          <el-button style="padding: 0px" icon="el-icon-arrow-left" circle @click="back" ></el-button>
          <el-button style="padding: 0px" icon="el-icon-arrow-right" circle @click="go"></el-button>
        </div>
        <div class="search-input" @keyup.enter="searching">
            <el-input
                placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="searchInput"
                @focus="changeSearch"
                @blur="changeSearch"
                >
            </el-input>
        </div>
        <div class="float-search" v-show="this.isSearch">
          <span>热搜榜</span>
          <!-- <p v-for="(item,index) in searchWord" :key="index"></p> -->
          <p v-for="(item,index) in searchWord" :key="index">
            <span>{{index + 1}}</span>
            <span>{{item.searchWord}}</span>
            <span>{{item.score}}</span>
            <span v-if="item.iconUrl"><img :src=item.iconUrl></span>
          </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Top',
    data() {
        return{
            searchInput:'',
            isSearch:false,
            searchWord:[],
        }
    },
    methods:{
      go() {
        history.go(1);
      },
      back() {
        history.go(-1);
      },
      changeSearch() {
        this.isSearch = !this.isSearch
      },
      searching() {
        if(this.searchInput === '') {
          alert('输入不能为空哦！')
        }else{
          setTimeout(() => {
            this.$store.state.keyWord = this.searchInput
            this.$router.push({path: '/search',query:{keyword:this.searchInput}},()=>{},()=>{})
            this.searchInput = ''
          }, 1000);
        }

      }
    },
    mounted() {
      axios.get('http://localhost:3000/search/hot/detail').then(
          response => {
            console.log(response);
            this.searchWord = response.data.data
          },error => {
            alert(error)
      })
    }
}
</script>

<style scoped>
/* 头部的样式 */
.header{
    background-color: #ec4141;
    width: 100%;
    height: 80px;
    display: flex;
    line-height: 80px;
    text-align: center;
    color: #fff;
    position: fixed;
    z-index: 997;
  }
  .btns{
    width: 100px;
    /* background-color: aqua; */
  }
  .el-button{
    width: 40px;
    height: 40px;
    background-color: #ec4141;
    font-size: 20px;
    border: 0px;
    color: #fff;
  }
  .el-button:hover{
    background-color: #f27a7a;
  }
  .search-input{
    position: absolute;
    right: 100px;
    width: 200px;
    /* background-color: aqua; */
  }
  .search-input /deep/ .el-input__inner{
    width: 100%;
    height: 40px;
    border-radius: 30px;
    color: #fff;
    background-color: #be3434;
    border: 0px;
  }

  .float-search{
        width: 400px;
        height: 300px;
        background-color: #fff;
        position: fixed;
        top: 70px;
        right: 60px;
        z-index: 997;
        border-radius: 20px;
        box-shadow: 0 0 10px black;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }

    .float-search > span{
      /* background-color: orange; */
      width: 60px;
      height: 40px;
      color: #000;
      font-weight: 600;
      margin: 10px;
      /* float: left; */
      display: block;
      font-size: 16px;
      line-height: 40px;
    }

    .float-search p{
      /* background-color: #bfa; */
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #000;
      display: block;
      text-align: justify;
    }

    .float-search p:hover{
      background-color: #f0bebe;
    }

    .float-search p > span:nth-child(1){
      color: red;
      margin-left: 20px;
    }

    .float-search p > span{
      margin: 0 10px;
    }

    .float-search p > span img{
      width: 40px;
      height: 20px;
    }
  

</style>