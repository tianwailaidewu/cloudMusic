<template>
  <div class="carousel">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <h3 class="medium"><img :src="item.imageUrl"></h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Carousel',
    data() {
      return{
        images:[]
      }
    },
    mounted(){
        axios.get('http://localhost:3000/banner').then(
          response => {
            this.images = response.data.banners
          },error => {
            alert(error,'获取轮播图失败')
          })
        }
}
</script>

<style scoped>

  .carousel{
    width: 95%;
    margin-left: 20px;
    margin-top: 30px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    padding: 0px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    border-radius: 30px;

  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    border-radius: 30px;
  }

  img{
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }
</style>