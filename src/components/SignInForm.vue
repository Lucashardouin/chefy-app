<template>
  <form @submit.prevent="submitConnexion">
    <input
      v-model="loginData.username"
      name="username"
      type="username"
      placeholder="Username"
    />
    <input
      v-model="loginData.mdp"
      name="mdp"
      type="password"
      placeholder="Mot de passe"
    />
    <button type="submit">Se connecter</button>
  </form>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      loginData: {
        username: "",
        mdp: "",
      },
    };
  },
  methods: {
    async submitConnexion() {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/auth/login",
          this.loginData
        );
        // Gérez le succès de la connexion ici
        localStorage.setItem("token", response.data.token);
        this.$router.push("/profile");
      } catch (error) {
        console.error("Erreur lors de la connexion", error);
      }
    },
  },
};
</script>
