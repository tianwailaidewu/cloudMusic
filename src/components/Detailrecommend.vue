<template>
    <div class="main">
        <!-- {{this.playlistdetail.id}} -->
        <div class="playlist-top">
            <img :src=this.playlistdetail.coverImgUrl class="playlist-top-img">
            <div class="playlis-top-content">
                <div>
                    <span>歌单</span>
                    <h2>{{this.playlistdetail.name}}</h2>
                </div>
                <div class="creator-msg">
                    <img :src=this.creator.avatarUrl class="creator-img">
                    <span>{{this.creator.nickname}}</span>
                    <span>{{this.createTime}}       创建</span>
                    <span>共{{this.playlistdetail.trackCount}}首</span>
                </div>
                <div><button>播放全部</button></div>
                <div class="playlist-top-tag" v-if="algTags">标签：<span v-for="(item,index) in algTags" :key="index">{{item}}</span></div>
                <div class="playlist-top-desc">简介：{{this.playlistdetail.description}}</div>
            </div>
        </div>
        <div class="playlist-content">
            <ul class="playlist-content-title">
                <li>音乐标题</li>
                <li>歌手</li>
                <li>专辑</li>
            </ul>
            <div class="playlist-content-song">
                <ul v-for="(item,index) in songs" :key="index">
                    <li>{{index + 1}} <img :src=item.al.picUrl @click="sendSongId(index)"> {{item.name}}</li>
                    <li>{{item.ar[0].name}}</li>
                    <li>{{item.al.name}}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
    name:'Detailrecommend',
    data() {
        return{
            playlistdetail:'',
            creator:'',
            createTime:'',
            algTags:[],
            songs:[],

        }
    },
    mounted() {
        axios.get(`http://localhost:3000/playlist/detail?id=${this.$route.query.id}`).then(
          response => {
            // console.log(response);
            this.playlistdetail = response.data.playlist
            this.creator = this.playlistdetail.creator
            this.createTime = dayjs(this.playlistdetail.createTime).format('YYYY-MM-DD')
            this.algTags = this.playlistdetail.algTags
          },error => {
            alert(error)
        }),
        axios.get(`http://localhost:3000/playlist/track/all?id=${this.$route.query.id}`).then(
            response => {
            console.log(response);
            this.songs = response.data.songs
            },error => {
            alert(error)
        })
    },
    methods:{
        sendSongId(index) {
            // console.log(this.$store.state.song.id);
            this.$store.state.song = this.songs[index]
            this.$store.state.artistsName = this.$store.state.song.ar[0].name
            this.$store.state.songPicUrl = this.$store.state.song.al.picUrl
            // 自动播放音乐
            this.$store.state.isPlay = true
            // console.log(this.$store.state);
            axios.get(`http://localhost:3000/lyric?id=${this.$store.state.song.id}`).then(response => {
                // console.log(response);
                // let millSec = this.lyricList.lyric.match(/\d{2,3}(?=])/gm);
                this.$store.state.lyric = response.data.lrc.lyric.split(/[(\r\n)\r\n]+/)
            },error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
  .main{
    width: 85%;
    height: 80%;
    position: absolute;
    top: 80px;
    right: 0;
    overflow: auto;
}

    .playlist-top{
        width: 96%;
        height: 35%;
        /* background-color: aqua; */
        margin: 20px;
        display: flex;
    }

    .playlist-top .playlist-top-img{
        width: 200px;
        height: 100%;
    }

    .playlist-top-content div{
        display: flex;
        flex-direction: row;
    }

    .playlist-top span{
        font-size: 20px;
        margin: 10px;
    }

    .playlist-top h2{
        margin-top: 6px;
        margin-left: 10px;
        display: inline-block;
    }
    .playlist-top .creator-img{
        width: 30px;
        height: 30px;
        border-radius: 30px;
        margin: 10px;
        display: inline-block;
    }
    .creator-msg{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
    }

    .creator-msg span{
        font-size: 14px;
        padding-top: 5px;
    }

    button{
        margin: 5px;
        margin-left: 10px;
    }

    .playlist-top-tag{
        margin: 5px;
        margin-left: 10px;
    }

    .playlist-top-tag span{
        font-size: 15px;
    }

    .playlist-top-desc{
        font-size: 13px;
        margin: 10px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .playlist-content{
        width: 96%;
        height: 500px;
        /* background-color: aqua; */
        margin: 20px;
    }

    .playlist-content-title{
        width: 100%;
        height: 80px;
        border-top: 1px solid rgb(184, 180, 180);
        /* background-color: blue; */
    }

    .playlist-content-title li{
        list-style: none;
        float: left;
        height: 80px;
        line-height: 90px;
        font-size: 14px;
        color: gray;
        font-weight: 800;
    }

    .playlist-content-title li:nth-child(1){
        text-align: center;
        width: 50%;
    }

    .playlist-content-title li:nth-child(2){
        width: 25%;
    }

    .playlist-content-title li:nth-child(3){
        width: 25%;
    }

    .playlist-content-song{
        width: 100%;
        height: 420px;
        border-top: 1px solid rgb(184, 180, 180);
        border-bottom: 1px solid rgb(184, 180, 180);
        /* background-color: orange; */
        overflow: auto;
    }

    .playlist-content-song ul{
        width: 100%;
        height: 80px;
    }

    .playlist-content-song li{
        list-style: none;
        float: left;
        height: 80px;
        line-height: 80px;
    }

    .playlist-content-song li:nth-child(1){
        width: 50%;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

    }

    .playlist-content-song li img{
        width: 50px;
        height: 50px;
        display: inline-block;
        margin: 0px 30px;
        margin-bottom: -25px;
        border-top: 1px solid transparent;
        border-radius: 10px;
    }

    .playlist-content-song li:nth-child(2){
        width: 25%;
    }

    .playlist-content-song li:nth-child(3){
        width: 25%;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>