<template>
  <form @submit.prevent="submitInscription">
    <input
      v-model="newUser.restaurant_name"
      name="restaurant_name"
      placeholder="Nom du restaurant"
    />
    <input
      v-model="newUser.username"
      name="username"
      placeholder="Identifiant"
    />
    <input
      v-model="newUser.email"
      name="email"
      type="email"
      placeholder="Email"
    />
    <input
      v-model="newUser.mdp"
      name="password"
      type="password"
      placeholder="Mot de passe"
    />
    <input v-model="newUser.adresse" name="adresse" placeholder="Adresse" />
    <input v-model="newUser.ville" name="ville" placeholder="Ville" />
    <input
      v-model="newUser.code_postal"
      name="code_postal"
      placeholder="Code postal"
    />
    <input
      ref="imageInput"
      type="file"
      name="image"
      @change="handleImageChange"
    />
    <img v-if="newUser.image" :src="selectedImage" alt="Image sélectionnée" />
    <input type="hidden" name="role" v-model="newUser.role" />
    <button type="submit">S'inscrire</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newUser: {
        restaurant_name: "",
        username: "",
        email: "",
        mdp: "",
        adresse: "",
        ville: "",
        code_postal: "",
        image: null,
        role: "user",
      },
      selectedImage: null,
    };
  },
  methods: {
    async submitInscription() {
      try {
        console.log("restaurant_name:", this.newUser.restaurant_name);
        const formData = new FormData();
        formData.append("restaurant_name", this.newUser.restaurant_name);
        formData.append("username", this.newUser.username);
        formData.append("email", this.newUser.email);
        formData.append("mdp", this.newUser.mdp);
        formData.append("adresse", this.newUser.adresse);
        formData.append("ville", this.newUser.ville);
        formData.append("code_postal", this.newUser.code_postal);
        formData.append("image", this.newUser.image); // Envoyez l'image sélectionnée
        formData.append("role", this.newUser.role);

        console.log("formData:", formData);

        const response = await axios.post(
          "http://localhost:5001/api/users/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifiez le type de contenu pour envoyer le fichier
            },
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Erreur lors de l'inscription", error);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0]; // Obtenez le fichier sélectionné

      if (file) {
        // Afficher une prévisualisation de l'image
        this.newUser.image = file;
        this.selectedImage = URL.createObjectURL(file);
      }
    },
  },
};
</script>
