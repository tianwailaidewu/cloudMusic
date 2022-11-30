<template>
<div id="app">
  <!-- 整个页面容器 -->
    <!-- 页面头部 -->
    <Top />
    <!-- 页面主体 -->
    <Index/>
    <!-- 页面底部 -->
    <Bottom/>

    <!-- 浮动搜索框与浮动播放列表 -->
    
    <FloatList/>

    <!-- 歌曲播放页 -->
    <Song/>
</div>

</template>

<script>
import Top from './components/Top.vue'
import Index from './components/Index.vue'
import Bottom from './components/Bottom.vue'
import FloatList from './components/float/FloatList.vue'
import Song from './components/Song.vue'


export default {
  name: 'App',
  components: {Top,Index,Bottom,FloatList,Song}
}
</script>

<style>
  *{
    padding: 0px;
    margin: 0px;
    
  }
  a{
    text-decoration: none;
    color: #000;
  }
  #app{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: aqua; */
    position: absolute;
  }
</style>
