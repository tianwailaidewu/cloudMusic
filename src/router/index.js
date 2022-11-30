// 该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

// 引入组件
import ContentFind from '../components/ContentFind'
import ContentRecommend from '../components/ContentRecommend'
import ContentMvs from '../components/ContentMvs'
import Detailmv from '../components/Detailmv'
import Detailrecommend from '../components/Detailrecommend'
import Search from '../components/Search'

// 创建一个路由器
export default new VueRouter({
    // mode:'hash',
    // 管理一堆路由
    routes:[
        {
            path:'/',
            component:ContentFind
        },
        {
            path:'/recommend',
            component:ContentRecommend,
        },
        {
            path:'/mvs',
            component:ContentMvs
        },
        {
            path:'/detailmv',
            component:Detailmv
        },
        {
            path:'/detailrecommend',
            component:Detailrecommend
        },
        {
            path:'/search',
            component:Search
        }
    ]
})