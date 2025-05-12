import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue';
import StartGame from '@/components/StartGame.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { 
            path: '/',
            name: 'home',
            component: Home
        },
        { 
            path: '/startGame',
            name: 'startGame',
            component: StartGame
        }
    ]
});

export default router;