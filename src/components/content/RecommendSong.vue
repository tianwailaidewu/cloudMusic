<template>
    <div>
        <div class="rs-title"><h4>推荐音乐</h4></div>
        <div class="rs-content">
            <div v-for="(item,index) in this.playlists" :key="index">
                <router-link :to="{path:'/detailrecommend',query:{id:item.id}}">
                    <img :src="item.picUrl">
                    <span>{{item.name}}</span>
                </router-link>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    name:'RecommendSong',
    data() {
        return{
            playlists:[]
        }
    },
    mounted(){
        axios.get('http://localhost:3000/personalized?limit=10').then(
          response => {
            // console.log(response);
            this.playlists = response.data.result
          },error => {
            alert(error)
          })
    }
}
</script>

<style scoped>
    .rs-title{
        margin: 20px;
    }
    .rs-content{
        width: 100%;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
    }
    .rs-content div{
        width: 16.5%;
        height: 46%;
        margin: 5px 20px;
        /* border: 1px solid gray; */
        /* background-color: gray; */

    }

    .rs-content img{
      width: 100%;
      height: 90%;
    }

    .rs-content span{
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
</style>