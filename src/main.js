import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
// import { createRouter, createWebHistory } from 'vue-router'; // Utilisez les fonctions de création de routeur
import router from './router';

// Importez votre composant InscriptionForm
// import InscriptionForm from '@/components/InscriptionForm.vue';

// // Installez les plugins VueRouter et Axios
// const app = createApp(App);
// app.config.globalProperties.$axios = axios;

// // Configurez les routes
// const routes = [
//   // ... autres routes ...
//   { path: '/inscription', component: InscriptionForm },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Utilisez le routeur dans l'application
// app.use(router);

// // Montez l'application avec le routeur
// app.mount('#app');

createApp(App).use(axios).use(router).mount('#app')