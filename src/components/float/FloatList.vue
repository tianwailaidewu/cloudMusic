<template>
  <div class="float-list" v-show="0"></div>
</template>

<script>
export default {
    name:'FloatList'
}
</script>

<style scoped>
    .float-list{
        width: 400px;
        height: 600px;
        background-color: aqua;
        position: fixed;
        bottom: 30px;
        right: 20px;
        z-index: 996;
    }
</style>