<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <router-link :to="{ name: 'home' }">Accueil</router-link>
  <router-link :to="{ name: 'sign-in' }">Connexion</router-link>
  <router-link :to="{ name: 'sign-up' }">Inscription</router-link>
  <router-link :to="{ name: 'profile' }">profile</router-link>
  <router-link :to="{ name: 'category' }">category</router-link>
  <router-link :to="{ name: 'article' }">article</router-link>
  <router-link @click="logout" to="/">Déconnexion</router-link>
  <router-view></router-view>
</template>

<script>
// import { isAuthenticated } from "@/authGuard";
// export default {
//   computed: {
//     isAuthenticated() {
//       return isAuthenticated(); // Utilisez la fonction isAuthenticated comme propriété calculée
//     },
//   },
// };
import { logout } from "@/authGuard";

export default {
  methods: {
    logout() {
      logout(); // Appel de la fonction de déconnexion lorsque l'utilisateur clique sur le lien
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
