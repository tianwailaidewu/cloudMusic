<template>
  <transition 
    name="animate__animated animate__bounce" 
    appear
    enter-active-class="animate__fadeInUpBig"
    leave-active-class="animate__fadeOutDownBig"
  > 
  <div v-if='this.$store.state.songIsShow'>
    <div class="bgimg"><img :src=this.$store.state.songPicUrl ></div>
    <div class="song-wrap" >
      <el-button style="padding: 0px" icon="el-icon-arrow-down" circle @click="showSong"></el-button>
      <div class="cd">
        <div class="cd-top">
          <div class="needle-wrap" :class="this.$store.state.isPlay === true ? active : normal">
            <img src="../assets/needle-ab.png">
          </div>
        </div>
        <div class="cd-ball">
          <div>
            <img :src=this.$store.state.songPicUrl class="cd-ball-img" :class="this.$store.state.isPlay === true ? run : stop">
          </div>
        </div>
      </div>
      <div class="song-msg-wrap">
        <div class="song-msg">
          <span class="song-name">{{this.$store.state.song.name}}</span>
          <span class="song-artist">{{this.$store.state.artistsName}}</span>
        </div>
        <div class="song-lyric" ref="lyric">
          <!-- {{this.$store.state.lyric}} -->
          <span v-for="(item,index) in songLyric" :key="index" :class="(currentTime >= item.time && currentTime < item.next) ? big : ''">{{item.item.split(']')[1]}}</span>
        </div>
      </div>
    </div>
  </div>
  
  </transition>  
  
</template>

<script>
import {mapState} from 'vuex'
import 'animate.css'
export default {
    name:'Song',
    data() {
        return {
            // isShow:false
            active:'needle-wrap-active',
            normal:'needle-wrap',
            run:'cd-ball-run',
            stop:'cd-ball-stop',
            song:[],
            big:'big'
      }
    },
    methods:{
      showSong() {
          this.$store.state.songIsShow = !this.$store.state.songIsShow
      }
    },
    computed:{
      ...mapState(['lyric','minute','currentTime']),
      songLyric() {
        let arr = [];
        if(this.lyric) {
          arr = this.lyric.map((item,i,arr) => {
            // console.log(item[1]);
            // console.log(parseInt(item[1] + item[2]));
            let min = parseInt(item[1] + item[2])
            let sec = parseInt(item[4] + item[5])
            let time = min*60 + sec


            // item.time = time
            // arrnew.push(Object.assign(item,{time:min*60 + sec}))
            return {min,sec,time,item}
            // return item
          })
          arr.forEach((item,i) => {
            // console.log(item,i);
            if(i===arr.length-1) {
              item.next = 0
            }else{
              item.next = arr[i+1].time
            }
          });
          // console.log(arr);
          return arr
        }
      }
    },
    watch:{
      currentTime(){
        let span = document.querySelector('span.big')
        if(span === null) {
          return
        }else{
          if(span.offsetTop > 200 && span !== null) {
            this.$refs.lyric.scrollTop = span.offsetTop - 300
          }
        }

      }
    }
}
</script>

<style scoped>
    .song-wrap{
        width: 100%;
        height: 100%;
        /* background-color: rgb(18, 19, 18); */
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .bgimg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 997;
      overflow: hidden;
    }
    
    .bgimg img{
      width: 200%;
      height: 200%;
      position: absolute;
      top: -30%;
      left: -30%;
      filter: blur(90px) grayscale(100%) contrast(50%);
    }

    .el-button{
      width: 50px;
      height: 50px;
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 30px;
      background-color: transparent;
      border: 1px solid transparent;
      color: #fff;
    }

    .cd{
      width: 400px;
      height: 500px;
      /* background-color: brown; */
      position: absolute;
      top: 15%;
      left: 15%;
    }

    .cd-top{
      width: 100%;
      height: 100px;
    }

    .needle-wrap{
      position: absolute;
      z-index: 99;
      width: 305px;
      height: 400px;
      /* background-color: orange; */
      top: -150px;
      left: 20px;
      transform: rotateZ(-45deg);
      transition: 1s;
    }

    .needle-wrap-active{
      position: absolute;
      z-index: 99;
      width: 305px;
      height: 400px;
      /* background-color: orange; */
      top: -150px;
      left: 20px;
      transform: rotateZ(-10deg);
      transition: 1s;
    }

    .cd-top img{
      position: absolute;
      z-index: 99;
      width: 125px;
      height: 200px;
      top: 180px;
      left: 160px;
      /* background-color: #000; */
    }

    .cd-ball{
      height: 400px;
      width: 100%;
      background-color: gray;
      border-radius: 400px;
    }

    .cd-ball > div{
      height: 360px;
      width: 360px;
      border-radius: 360px;
      background-color: #000;
      position: absolute;
      top: 120px;
      left: 20px;
    }

    .cd-ball-img{
      width: 300px;
      height: 300px;
      border-radius: 300px;
      /* background-color: #fff; */
      position: absolute;
      top: 30px;
      left: 30px;
      animation: rotate 50s linear infinite;
    }

    .cd-ball-run{
      animation-play-state: running;
    }

    .cd-ball-stop{
      animation-play-state: paused;
    }

    @keyframes rotate {
        from{
            transform: rotateZ(360deg);
        }

        to{
            transform: rotateZ(0);
        }
    }

    .song-msg-wrap{
      width: 600px;
      height: 650px;
      /* background-color: coral; */
      position: absolute;
      top: 5%;
      right: 10%;
    }

    .song-msg{
      width: 100%;
      height: 100px;
      color: rgba(255, 255, 255, 0.7);
      /* background-color: aqua; */
    }

    .song-lyric{
      width: 100%;
      height: 550px;
      /* background-color: black; */
      overflow: auto;
    }

    .song-lyric span{
      display: block;
      text-align: center;
      margin-top: 10px;
      color: rgb(202, 196, 196);
      font-weight: 500;
      font-size: 20px;
    }

    .song-lyric .big{
      font-size: 30px;
      color: #fff;
      font-weight: 600;
      /* background-color: rgba(185, 184, 184, 0.3); */
    }

    .song-msg span{
      display: block;
      margin: 5px;
    }

    .song-name{
      font-size: 25px;
      font-weight: 800;
    }

    .song-artist{
      font-size: 15px;
    }


</style>