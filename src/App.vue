<template>
  <nav v-if="!loading && !isUserLoggedIn">
    <div class="chefy_logo">
      <li><a href="/">Chefy</a></li>
    </div>
    <div class="burger"><i class="fa-solid fa-bars" @click="toggleMenu()"></i></div>
    <ul class="nav_menu">
      <div class="menu_content">
        <li class="close_burger"><i class="fa-solid fa-xmark"></i></li>
        <li @click="closeMenu"><a href="/#convertir">Comment ça fonctionne ?</a></li>
        <!-- <li><router-link :to="{ name: 'home' }">Accueil</router-link></li> -->
        <li @click="closeMenu">
          <router-link :to="{ name: 'sign-up' }">Inscription</router-link>
        </li>
        <li @click="closeMenu"><router-link :to="{ name: 'sign-in' }">Connexion</router-link></li>
        <!-- <li><router-link @click="logout" to="/">Déconnexion</router-link></li> -->
        <li @click="closeMenu">
          <a href="/inscription"
            ><button>Créer votre QR code gratuitement</button></a
          >
        </li>
        <!-- <li><router-link :to="{ name: 'profile' }">profile</router-link></li> -->
        <!-- <li><router-link :to="{ name: 'category' }">category</router-link></li> -->
        <!-- <li><router-link :to="{ name: 'article' }">article</router-link></li> -->
        <!-- <li><router-link :to="{ name: 'menu' }">menu</router-link></li> -->
        <!-- <li><router-link :to="{ name: 'qrcode' }">qrcode</router-link></li> -->
      </div>
    </ul>
  </nav>
  <router-view class="content"></router-view>
  <footer v-if="!loading && !isUserLoggedIn">
    <div>
      <p>Langue : FR</p>
      <p>Copyright &copy; 2023 - Chefy</p>
    </div>
    <div>
      <p>Mentions légales</p>
      <p>Contact</p>
    </div>
  </footer>
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
  created() {
    // Initialisez l'état d'authentification en fonction de la présence du token
    this.isUserLoggedIn = !!localStorage.getItem("token");
  },
  methods: {
    toggleMenu() {
      let menu = document.querySelector('.nav_menu');
      let burger = document.querySelector('.burger');
      let close = document.querySelector('.close_burger');
      burger.addEventListener('click', function(){
        menu.classList.add('deploye','transition');
      });
      close.addEventListener('click',function(){
        menu.classList.remove('deploye');
      });
      window.addEventListener('resize',function(){
        if(window.innerWidth<=1024){
          menu.classList.remove('deploye','transition');
        }
      });
      // navList.style.display = navList.style.display === 'block' ? 'none' : 'block';
    },
    closeMenu() {
    let menu = document.querySelector('.nav_menu');
    menu.classList.remove('deploye');
    },
    logout() {
      logout(); // Appel de la fonction de déconnexion lorsque l'utilisateur clique sur le lien
    },
  },
  computed: {
    isUserLoggedIn() {
      // Vérifiez si l'utilisateur est connecté en fonction de la valeur du token dans localStorage
      return !!localStorage.getItem("token"); // Double négation pour obtenir une valeur booléenne
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
