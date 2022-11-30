<template>
  <div class="artist-wrap">
    <img :src='`${artistImg}`'>
    <span>{{artistName}}</span>
    <!-- <div class="mv-name">{{}}</div> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'VideoMessage',
    data() {
      return{
        artistImg:'',
        artistName:'',
        // mvName:''
      }
    },
    mounted() {
        // this.artistName = response.data.data.artist.name;
        axios.get(`http://localhost:3000/artist/detail/?id=${this.$route.query.artistId}`).then(
          response => {
            // console.log(response);
            this.artistImg = response.data.data.artist.cover;
            this.artistName = response.data.data.artist.name;
          },error => {
            alert(error)
          })
    }
}
</script>

<style scoped>
    .artist-wrap{
      width: 400px;
      height: 100px;
      /* background-color: aqua; */
      margin: 20px;
      position: relative;
    }
    img{
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
    span{
      position: absolute;  
      top: 40px;
      left: 120px;
    }

</style>