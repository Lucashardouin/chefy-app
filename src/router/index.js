import { createRouter, createWebHistory } from 'vue-router'
// import signin from '@/views/signin.vue'
import signup from '@/views/InscriptionView.vue'

const routes = [{
    //     path: '/',
    //     name: 'signin',
    //     component: signin
    // },
    // {
        path: '/signup',
        name: 'signup',
        component: signup

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router