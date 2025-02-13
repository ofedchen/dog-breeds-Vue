import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BySizeView from '@/views/BySizeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter( {
    history: createWebHashHistory(import.meta.env.BASE_URL),
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
            path: '/:catchAll(.*)',
            name: 'not-found', 
            component: NotFoundView
        }
    ]
})

export default router