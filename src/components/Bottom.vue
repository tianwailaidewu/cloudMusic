<template>
    <div class="bottom">
        <!-- 歌曲信息 -->
        <div class="songInfo">
            <div class="songImg">
                <img :src=this.$store.state.songPicUrl @click="showSong" ref="img">
            </div>
            <div class="songText">
                <span>{{this.$store.state.song.name}}</span>
                <span>{{this.$store.state.artistsName}}</span>
            </div>
        </div>
        <!-- 进度条 -->
        <div class="progress">
            <div class="prog-up">
                <i class="iconfont">&#xe611;</i>
                <i class="iconfont" @click="play"  v-show="!this.$store.state.isPlay">&#xe610;</i>
                <i class="iconfont" @click="paused" v-show="this.$store.state.isPlay">&#xe60f;</i>
                <i class="iconfont">&#xe612;</i>
            </div>
            <div class="prog-down">
                <span>{{minute}}:{{second}}</span>
                <el-slider v-model="value" :show-tooltip="false" :min="0" :max="this.$store.state.duration"></el-slider>
                <span>{{haveMinuteZero}}:{{haveSecondZero}}</span>
            </div>
        </div>
        <!-- 播放列表 -->
        <div class="list">
            <div>
                <a href="">
                    <i class="el-icon-finished"><span>2</span></i>
                </a>
            </div>
        </div>
        <!-- audio播放器 -->
        <audio :src="`https://music.163.com/song/media/outer/url?id=${this.$store.state.song.id}.mp3`" ref="audio"></audio>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'Bottom',
    data() {
        return{
            value:0,
            // isPlay:false,
            timer:0,
            // mtime:0
        }
    },
    mounted(){
        const runway = document.querySelector('.el-slider__runway')
        runway.onclick = () => {
            this.$refs.audio.currentTime = this.value
        }
    },
    computed:{
        ...mapState(['isPlay','songPicUrl']),
        isPlay: {
            get() {
                return this.$store.state.isPlay
            },
            set(value) {
                return value
            }
        },
        minute() {
            return this.$store.state.minute <= 9 ? '0' + String(this.$store.state.minute) : this.$store.state.minute
        },
        second() {
            return this.$store.state.second <= 9 ? '0' + String(this.$store.state.second) : this.$store.state.second
        },
        haveMinuteZero(){
            return this.$store.state.minuteTime <= 9 ? '0' + String(this.$store.state.minuteTime) : this.$store.state.minuteTime
        },
        haveSecondZero(){
            return this.$store.state.secondTime <= 9 ? '0' + String(this.$store.state.secondTime) : this.$store.state.secondTime
        }
    },
    watch:{
        // 一点击歌曲就能自动播放
        songPicUrl: {
            immediate:true,     // 初始化时让handler调用一次
            handler(value){
                if(!value){
                    return
                } else{
                    if(this.isPlay){
                        clearInterval(this.timer)
                        setTimeout(() => { 
                            this.play()
                            // this.$refs.audio.autoplay = true
                            // this.mtime = parseInt(Math.floor(this.$refs.audio.duration) / 60)
                            this.$store.state.duration = this.$refs.audio.duration
                            this.$store.state.minuteTime = parseInt(Math.floor(this.$refs.audio.duration) / 60)
                            this.$store.state.secondTime = parseInt(Math.floor(this.$refs.audio.duration)) - this.$store.state.minuteTime*60
                            // console.log(this.$refs);
                            // console.log(this.$refs.audio.duration);
                            // console.log(this.$store.state.minuteTime);  
                            // console.log(this.$store.state.secondTime);  
                        }, 500);
                    } 
                }
            }

        },
    },
    methods:{
        play() {
            this.$refs.audio.play()
            this.$store.state.isPlay = true
            // this.$store.state.isPlay = this.isPlay
            // 启动定时器
            this.updataTime()

        },
        paused() {
            this.$refs.audio.pause()
            this.$store.state.isPlay = false
            // this.$store.state.isPlay = this.isPlay
            // 清除定时器
            clearInterval(this.timer)
        },
        showSong() {
            this.$store.state.songIsShow = !this.$store.state.songIsShow
            // console.log(this.$refs);
        },
        // 设置定时器函数
        updataTime() {
            this.timer = setInterval(() => {
                this.$store.state.value = this.$refs.audio.currentTime
                this.value = this.$store.state.value
                // console.log(this.$store.state.value);
                // 设置currentTime
                this.$store.state.currentTime = this.$refs.audio.currentTime
                this.$store.state.minute = parseInt(Math.floor(this.$refs.audio.currentTime) / 60)
                this.$store.state.second = parseInt(Math.floor(this.$refs.audio.currentTime)) - this.$store.state.minute*60
            }, 1000)
        },
    }
}
</script>

<style scoped>
    .bottom{
        /* background-color: aqua; */
        width: 100%;
        height: 10%;
        z-index: 999;
        position: fixed;
        bottom: 0px;
        box-shadow: 5px 0px 5px #000;
        background-color: #f1f3f4;
        display: flex;
    }

    /* 歌曲信息相关样式 */
    .songInfo{
        width: 25%;
        height: 100%;
        display: flex;
    }

    .songImg{
        width: 70px;
        height: 70px;
        /* background-color: aqua; */
        margin: 5px;
    }

    .songImg img{
        width: 100%;
        height: 100%;
    }

    img[src=""],img:not([src]){
        opacity: 0;
    }

    .songText span{
        display: block;
        padding: 4px;
    }
    .songText span:nth-child(1) {
        margin-top: 2px;
        font-size: 17px;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .songText span:nth-child(2) {
        font-size: 14px;
    }

    /* 进度条相关样式 */
    .progress{
        width: 45%;
        height: 100%;
    }

    .prog-up{
        text-align: center;
        height: 40px;
    }


    .iconfont:nth-child(1),.iconfont:nth-child(4) {
        font-family: "iconfont" !important;
        font-size: 30px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 0px 30px;
    }

    .iconfont:nth-child(2),.iconfont:nth-child(3){
        font-size: 45px;
    }

    .prog-down{
        width: 1000px;
        height: 40px;
        /* margin: 0 12%; */
        display: flex;
    }

    .el-slider{
        width: 600px;
        margin: -8px 20px;
    }

    /* 播放列表相关样式 */
    .list{
        width: 30%;
        height: 100%;
        /* background-color: aqua; */
        /* text-align: center; */
        position: relative;
    }

    .list div{
        height: 80px;
        line-height: 80px;
        position: absolute;
        left: 50%;
    }

    .list div a{
        width: 25px;
        height: 25px;
    }

    .list i{
        font-size: 25px;
    }

    .list i span{
        font-size: 15px;
    }

    
</style>
