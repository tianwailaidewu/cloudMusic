// 该文件用于创建Vuex中最核心的store

// 引入Vuex
import Vuex from 'vuex'

// 引入Vue
import Vue from 'vue'

// 应用Vue插件
Vue.use(Vuex)

// 准备actions 用于响应组件里的动作
const actions = {

}

// 准备mutations 用于操作数据（state）
const mutations = {

}

// 准备state 用于存储数据
const state = {
    song:[],
    artistsName:'',
    songPicUrl:'',
    songIsShow:false,
    isPlay:false,
    lyric:[],
    // lyricText:[]
    currentTime:0,
    duration:0,
    minuteTime:0,
    secondTime:0,
    minute:0,
    second:0,
    // value:0

    keyWord:''
}


// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
})
