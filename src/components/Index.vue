<template>
    <div class="body-container">
        <!-- 左侧导航栏 -->
        <Left/>
        <!-- 内容部分 -->
        <router-view></router-view>  
    </div>
</template>

<script>
import Left from './Left.vue'

export default {
    name:'Index',
    components:{Left}
}
</script>

<style>
  /* 主体的样式 */
  .body-container{
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>