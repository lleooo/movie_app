import VueRouter from 'vue-router'


import movieList from '../pages/movieList'
import tvList from '../pages/tvList'
import actorList from '../pages/actorList'
import movieDetail from '../pages/movieDetail'
import tvDetail from '../pages/tvDetail'
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: movieList,
            // children:[
            //     {
            //         name:'movieDetail',
            //         path:'movieDetail',
            //         component:movieDetail,
            //     }
            // ]
        },
        {
            path:'/movieDetail',
            component:movieDetail,
        },
        {
            path: '/tv',
            component: tvList,
            children:[
                {
                    path:'tvDetail',
                    component:tvDetail,
                }
            ]
        },
        {
            path: '/actor',
            component: actorList
        }
    ]
})