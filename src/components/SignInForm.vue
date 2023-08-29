<template>
    <!-- <form @submit.prevent="submitConnexion">
      <input v-model="loginData.email" name="email" type="email" placeholder="Email" />
      <input v-model="loginData.mdp" name="password" type="password" placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
    </form> -->
    <div>sign in</div>
  </template>
  
  <!-- <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        loginData: {
          email: '',
          mdp: '',
        },
      };
    },
    methods: {
      async submitConnexion() {
        try {
          console.log('email:', this.loginData.email);
          const response = await axios.post('http://localhost:5001/api/auth/login', this.loginData);
          console.log(response.data.message);
          // Gérez le succès de la connexion ici
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      },
    },
  };
  </script> -->
  