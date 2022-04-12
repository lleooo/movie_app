import VueRouter from 'vue-router'


import movieList from '../pages/movieList'
import tvList from '../pages/tvList'
import movieDetail from '../pages/movieDetail'
import tvDetail from '../pages/tvDetail'
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: movieList,
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
    ]
})