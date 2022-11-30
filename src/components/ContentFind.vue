<template>
  <div class="main">
    <!-- 轮播图 -->
    <Carousel/>
    <!-- 推荐歌单 -->
    <RecommendSong/>
    <!-- 最新音乐 -->
    <NewSong/>
  </div>
</template>

<script>
import Carousel from './content/Carousel.vue'
import RecommendSong from './content/RecommendSong.vue'
import NewSong from './content/NewSong.vue'

export default {
    name:'ContentFind',
    components:{Carousel,RecommendSong,NewSong}
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
</style>