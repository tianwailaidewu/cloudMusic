<template>
    <div>
        <div class="ns-title"><h4>最新音乐</h4></div>
        <div class="ns-content">
            <div v-for="(item,index) in songs" :key="index" class="songs">
                <img :src=item.picUrl @click="sendSongId(index)">
                <div>
                    <span>{{item.name}}</span>
                    <span>{{item.song.artists[0].name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'NewSong',
    data() {
        return{
            songs:[]
        }
    },
    mounted() {
        axios.get('http://localhost:3000/personalized/newsong?limit=10').then(
          response => {
            // console.log(response);
            this.songs = response.data.result
          },error => {
            alert(error)
        })
    },
    methods:{
        sendSongId(index) {
            // console.log(this.$store.state.song.id);
            this.$store.state.song = this.songs[index]
            this.$store.state.artistsName = this.$store.state.song.song.artists[0].name
            this.$store.state.songPicUrl = this.$store.state.song.picUrl
            // 自动播放音乐
            this.$store.state.isPlay = true
            // console.log(this.$store.state);
            axios.get(`http://localhost:3000/lyric?id=${this.$store.state.song.id}`).then(response => {
                // console.log(response);
                // this.$store.state.lyric = response.data.lrc.lyric.split(/\[.*\]/)
                this.$store.state.lyric = response.data.lrc.lyric.split(/[(\r\n)\r\n]+/)
                // this.$store.state.lyricText = this.$store.state.lyric.split(']')
                // console.log(this.$store.state.lyric);
            },error => {
                console.log(error);
            })
        }
    },
}
</script>

<style>
    .ns-title{
        margin: 20px;
    }
    .ns-content{
        width: 98%;
        height: 560px;
        display: flex;
        flex-wrap: wrap;
        margin-left: 20px;
    }
    .ns-content .songs{
        width: 48%;
        height: 140px;
        /* border: 1px solid gray; */
        margin: 2px;
        /* background-color: gray; */
        display: flex;
    }

    .ns-content .songs img{
        width: 20%;
        height: 90%;
        margin: 8px;
    }

    .ns-content .songs div{
        display: flex;
        flex-direction: column;
        margin: 20px;
    }

    .ns-content div span{
        margin: 5px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .ns-content div span:nth-child(2) {
        font-size: 8px;
        color: gray;
    }

</style>