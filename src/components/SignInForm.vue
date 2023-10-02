<template>
  <form @submit.prevent="submitConnexion" class="signin_form">
    <h1>Connexion a Chefy</h1>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="email_container">
      <label for="email">E-mail</label>
      <input
        v-model="loginData.email"
        name="email"
        type="email"
        placeholder="Veuillez entrer votre adresse mail"
      />
    </div>
    <div class="mdp_container">
      <label for="mdp">Mot de passe</label>
      <input
        v-model="loginData.mdp"
        name="mdp"
        type="password"
        placeholder="Veuillez entrer votre mot de passe"
      />
    </div>
    <button type="submit">Se connecter</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginData: {
        email: "",
        mdp: "",
      },
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async submitConnexion() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/auth/login`,
          this.loginData
        );
        // Gérez le succès de la connexion ici
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id_user", response.data.id_user);

        this.loading = true;
        // Naviguez vers la page de profil
        await this.$router.push("/profile");

        // Rechargez la page
        window.location.reload();
        this.loading = false;
      } catch (error) {
        this.errorMessage = "Email ou mot de passe incorrect.";
      }
    },
  },
};
</script>
<style>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
