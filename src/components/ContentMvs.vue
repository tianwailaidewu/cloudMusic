<template>
  <div class="main">
    <div class="filter-list-wrap">
      <div class="mv-list">
          <span>地区：</span>
          <span class="active">全部</span>
          <span>内地</span>
          <span>港台</span>
          <span>欧美</span>
          <span>日本</span>
          <span>韩国</span>
      </div>
      <div class="mv-list">
          <span>类型：</span>
          <span class="active">全部</span>
          <span>官方版</span>
          <span>原声</span>
          <span>现场版</span>
          <span>网易出品</span>
      </div>
      <div class="mv-list">
          <span>排序：</span>
          <span class="active">上升最快</span>
          <span>最热</span>
          <span>最新</span>
      </div>
    </div>
    <div class="mv-wrap">
      <div class="mv-content">
        <div v-for="item in mvs" :key="item.id">
          <router-link :to="{path:'/detailmv',query:{id:item.id,artistId:item.artistId}}">
            <img :src="item.cover">
          </router-link>
            <span class="mv-name">{{item.name}}</span>
            <span class="mv-artistname">{{item.artistName}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="mv-bottom">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
    </div> -->
    <div class="mv-bottom">
      <el-pagination
        :page-size="12"
        layout="prev, pager, next"
        :total="240">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'ContentMvs',
    data() {
      return{
        mvs:[]
      }
    },
    mounted() {
      axios.get('http://localhost:3000/mv/first?limit=12').then(
          response => {
            // this.images = response.data.playlist
            this.mvs = response.data.data
            // console.log(response);
          },error => {
            alert(error)
      })
    }
}
</script>

<style scoped>
  .main{
    width: 85%;
    height: 82%;
    overflow: scroll;
    position: absolute;
    top: 80px;
    right: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

  .filter-list-wrap{
    margin: 0px 20px;
  }
  .mv-list{
    margin: 30px 0px;
  }
  span{
    margin-right: 20px;
  }

  .mv-wrap{
    height: 800px;
  }

  .mv-content{
        width: 99%;
        height: 80%;
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
    }
    .mv-content div{
        width: 23%;
        height: 40%;
        margin: 5px 10px;
        display: flex;
        flex-direction: column;
        /* border: 1px solid gray; */
        /* background-color: gray; */
    }

    .mv-content div a{
      width: 100%;
      height: 85%;
      /* background-color: aqua; */
    }

    .mv-content div a img{
      width: 100%;
      height: 100%;
    }
    .mv-content div span{
      display: block;
    }

    .mv-content div .mv-artistname{
      font-size: 8px;
      color: gray;
    }

    .mv-bottom{
        text-align: center;
        height: 50px;
        margin: 20px;
    }

    .active{
      color: red;
    }
</style>