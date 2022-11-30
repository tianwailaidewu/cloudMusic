<template>
  <div class="main">
    <div class="search-title">
        <span>{{keyWord}}</span>
        <span>共找到{{searchSong.length}}个结果</span>
    </div>
    <div class="search-content">
        <span>歌曲</span>
        <ul class="search-content-title">
            <li>音乐标题</li>
            <li>歌手</li>
            <li>专辑</li>
        </ul>
        <div class="search-content-song">
            <ul v-for="(item,index) in searchSong" :key="index">
                <li>{{index + 1}} {{item.name}}</li>
                <li>{{item.ar[0].name}}</li>
                <li>{{item.al.name}}</li>
            </ul>
        </div>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name:'Search',
    data() {
        return{
            searchSong:[]
        }
    },
    computed:{
        ...mapState(['keyWord']),
    },
    watch:{
        keyWord() {
            axios.get(`http://localhost:3000/cloudsearch?keywords=${this.$route.query.keyword}`).then(
                response => {
                    console.log(response);
                    this.searchSong = response.data.result.songs
                },error => {
                    alert(error)
            })
        }
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
        overflow: scroll;
    }

    .search-title{
        width: 100%;
        height: 40px;
        margin: 20px;
    }

    .search-title span{
        display: inline-block;
        margin-right: 10px;
    }

    .search-title span:nth-child(1){
        font-size: 30px;
        font-weight: 600;
    }

    .search-content{
        width: 96%;
        height: 500px;
        /* background-color: aqua; */
        margin: 20px;
    }

    .search-content span{
        display: block;
        margin: 10px;
    }

    .search-content-title{
        width: 100%;
        height: 80px;
        border-top: 1px solid rgb(184, 180, 180);
        /* background-color: blue; */
    }

    .search-content-title li{
        list-style: none;
        float: left;
        height: 80px;
        line-height: 90px;
        font-size: 14px;
        color: gray;
        font-weight: 800;
    }

    .search-content-title li:nth-child(1){
        text-align: center;
        width: 50%;
    }

    .search-content-title li:nth-child(2){
        width: 25%;
    }

    .search-content-title li:nth-child(3){
        width: 25%;
    }

    .search-content-song{
        width: 100%;
        height: 440px;
        border-top: 1px solid rgb(184, 180, 180);
        border-bottom: 1px solid rgb(184, 180, 180);
        /* background-color: orange; */
        overflow: auto;
    }

    .search-content-song ul{
        width: 100%;
        height: 80px;
    }

    .search-content-song li{
        list-style: none;
        float: left;
        height: 80px;
        line-height: 80px;
    }

    .search-content-song li:nth-child(1){
        width: 50%;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

    }

    .search-content-song li img{
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: 0px 30px;
        margin-bottom: -25px;
        border-top: 1px solid transparent;
        border-radius: 10px;
    }

    .search-content-song li:nth-child(2){
        width: 25%;
    }

    .search-content-song li:nth-child(3){
        width: 25%;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>