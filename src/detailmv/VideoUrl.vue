<template>
  <div>
    <video :src=this.videourl type="mp4" controls></video>
    <VideoMessage/>
  </div>
</template>

<script>
import axios from 'axios'
import VideoMessage from '../detailmv/VideoMessage.vue'
export default {
    name:'VideoUrl',
    components:{VideoMessage},
    data() {
      return{
        videourl:'',
        mvName:''
      }
    },
    mounted() {
        axios.get(`http://localhost:3000/mv/url?id=${this.$route.query.id}`).then(
          response => {
            // console.log(response);
            this.videourl = response.data.data.url;
          },error => {
            alert(error)
          })
    }
}   
</script>

<style scoped>
  video{
    margin-left: 20px;
    width: 60%;
    height: 400px;
  }
</style>