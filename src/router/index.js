import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BySizeView from '../views/BySizeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import MyFavoritesView from '../views/MyFavoritesView.vue'
import BreedView from '../views/BreedView.vue'


const router = createRouter( {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/breeds/:size',
            name: 'size',
            component: BySizeView
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: MyFavoritesView
        },
        {
            path: '/:id',
            name: 'breed-page',
            component: BreedView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found', 
            component: NotFoundView
        }
    ]
})

export default router