<template>
  <div class="main">
    <span>MV详情</span>
    <VideoUrl/>
    <h1>{{mvContent.name}}</h1>
    <div class="detail-wrap">
        <span>发布：{{mvContent.publishTime}}</span>
        <span>播放：{{mvContent.playCount}}</span>
        <div>
        {{mvContent.desc}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VideoUrl from '../detailmv/VideoUrl.vue'
export default {
    name:'Detailmv',
    components:{VideoUrl},
    data() {
        return{
          mvContent:'',
          // mvDetail:''
        }
    },
    mounted() {
        axios.get(`http://localhost:3000/mv/detail?mvid=${this.$route.query.id}`).then(
          response => {
            // console.log(response);
            // console.log(this.$route);
            this.mvContent = response.data.data
            // this.mvDetail = this.mvContent.alias[0]
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
    position: absolute;
    top: 80px;
    right: 0;
    overflow: scroll;
}

  .main > span{
    display: block;
    margin: 20px;
    font-weight: 900;
  }

  h1{
    margin-left: 20px;
  }

  .detail-wrap span{
    display: inline-block;
    margin: 20px;
    font-weight: 200;
  }

  .detail-wrap div{
    margin: 20px;
    width: 800px;
  }
</style>