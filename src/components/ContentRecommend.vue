<template>
    <div class="main">
        <div class="re-card" >
            <a class="re-card-img">
                <img :src=this.bestPlaylist.coverImgUrl>
            </a>
            <div class="re-card-content">
                <span>精品歌单</span>
                <div class="re-card-content-name">{{this.bestPlaylist.name}}</div>
                <div class="re-card-content-desc">{{this.bestPlaylist.description}}</div>
            </div>
        </div>
        <div class="re-card-bg" :style="{background: 'url(' + this.bestPlaylist.coverImgUrl + ')'}">

        </div>
        <div class="re-list">
            <span style="color: red">全部</span>
            <span v-for="item in catlist" :key="item.id">{{item.name}}</span>
        </div>
        <div class="re-content">
            <div v-for="item in playlist" :key="item.id">
              <router-link :to="{path:'/detailrecommend',query:{id:item.id}}">
                <img :src="item.coverImgUrl">
                <span class="mv-name">{{item.name}}</span>
              </router-link>
            </div>
        </div>
        <div class="re-bottom">
          <el-pagination
            :page-size="12"
            layout="prev, pager, next"
            :total="240">
          </el-pagination>
        </div>
        <!-- <div class="re-bottom">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'ContentRecommend',
    data() {
        return{
            bestPlaylist:'',
            playlist:[],
            catlist:[]
        }
    },
    mounted() {
      // 获取顶部精品歌单
        axios.get('http://localhost:3000/top/playlist/highquality').then(response => {
            // console.log(response);
            this.bestPlaylist = response.data.playlists[0];
        },error => {
            console.log(error);
        }),
        // 获取歌单分类
        axios.get('http://localhost:3000/playlist/hot').then(response => {
            // console.log(response);
            this.catlist = response.data.tags
        },error => {
            console.log(error);
        })
        // 获取歌单（10个）
        axios.get('http://localhost:3000/top/playlist?limit=10').then(response => {
            // console.log(response);
            this.playlist = response.data.playlists
        },error => {
            console.log(error);
        })
    }
}
</script>

<style scoped>
  .main{
    width: 85%;
    height: 82%;
    position: absolute;
    top: 80px;
    right: 0;
    overflow: auto;
}
  .re-card{
    margin:30px;
    width: 97%;
    height: 250px;
    /* background-color: gray; */
    border-radius: 20px;
    display: flex;
    position: relative;
    /* color: #fff; */
    /* filter: blur(30px);
    z-index: -1; */
  }

  .re-card-bg{
    width: 97%;
    height: 250px;
    border-radius: 20px;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: -1;
    filter: blur(15px) grayscale(50%);
  }

  .re-card .re-card-img{
    width: 200px;
    height: 200px;
    /* background-color: aqua; */
    margin: 25px;
  }

  .re-card .re-card-img img{
    width: 100%;
    height: 100%;

  }

  .re-card .re-card-content{
    width: 980px;
    height: 200px;
    margin-top: 25px;
    /* background-color: bisque; */
    position: relative;
    color: #fff;
    /* overflow: auto; */
    /* white-space: nowrap; */
  }

  .re-card .re-card-content span{
    display: inline-block;
    /* background-color: aquamarine; */
  }

  .re-card .re-card-content .re-card-content-name{
    width: 100%;
    height: 20px;
    /* background-color: orange; */
    position: absolute;
    top: 30px;
  }

  .re-card .re-card-content .re-card-content-desc{
    width: 100%;
    height: 150px;
    font-size: 13px;
    /* background-color: blue; */
    position: absolute;
    top: 55px;
    /* bottom: -10px; */
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
  }

  .re-list{
    float: right;
  }

  .re-list span{
    margin: 0 20px;
  }

  .re-content{
        width: 100%;
        height: 630px;
        display: flex;
        flex-wrap: wrap;
    }
    .re-content div{
        width: 16.5%;
        height: 46%;
        margin: 15px 20px;
        /* border: 1px solid gray; */
        /* background-color: gray; */
    }

    .re-content img{
      width: 100%;
      height: 90%;
    }

    .re-content span{
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .re-bottom{
        text-align: center;
        height: 50px;
    }
</style>