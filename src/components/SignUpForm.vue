<template>
  <form @submit.prevent="submitInscription" class="signup_form">
    <div class="form_container">
      <h1>Inscription a Chefy</h1>
      <div class="names_container">
        <div class="restaurant_name label">
          <label for="restaurant_name">Nom du restaurant</label>

          <input
            v-model="newUser.restaurant_name"
            name="restaurant_name"
            placeholder="Veuillez entrer le nom du restaurant"
            :class="{ 'is-invalid': formErrors.restaurant_name }"
          />
          <div v-if="formErrors.restaurant_name" class="invalid-feedback">
            {{ formErrors.restaurant_name }}
          </div>
        </div>

        <div class="label">
          <label for="username">Nom d'utilisateur</label>

          <input
            v-model="newUser.username"
            name="username"
            placeholder="Veuillez entrer votre nom d'utilisateur"
            :class="{ 'is-invalid': formErrors.username }"
          />
          <div v-if="formErrors.username" class="invalid-feedback">
            {{ formErrors.username }}
          </div>
        </div>
      </div>
      <div class="label">
        <label for="email">Email</label>

        <input
          v-model="newUser.email"
          name="email"
          type="email"
          placeholder="Veuillez entrer votre email"
          :class="{ 'is-invalid': formErrors.email }"
        />
        <div v-if="formErrors.email" class="invalid-feedback">
          {{ formErrors.email }}
        </div>
      </div>
      <div class="label">
        <label for="password">Mot de passe</label>

        <input
          v-model="newUser.mdp"
          name="password"
          type="password"
          placeholder="Veuillez entrer votre mot de passe"
          :class="{ 'is-invalid': formErrors.mdp }"
        />
        <div v-if="formErrors.mdp" class="invalid-feedback">
          {{ formErrors.mdp }}
        </div>
      </div>
      <div class="label">
        <label for="adresse">Adresse</label>

        <input
          v-model="newUser.adresse"
          name="adresse"
          placeholder="Veuillez entrer votre adresse"
          :class="{ 'is-invalid': formErrors.adresse }"
        />
        <div v-if="formErrors.adresse" class="invalid-feedback">
          {{ formErrors.adresse }}
        </div>
      </div>
      <div class="label">
        <label for="ville">Ville</label>

        <input
          v-model="newUser.ville"
          name="ville"
          placeholder="Veuillez entrer votre ville"
          :class="{ 'is-invalid': formErrors.ville }"
        />
        <div v-if="formErrors.ville" class="invalid-feedback">
          {{ formErrors.ville }}
        </div>
      </div>
      <div class="label">
        <label for="code_postal">Code Postal</label>

        <input
          v-model="newUser.code_postal"
          name="code_postal"
          placeholder="Veuillez entrer votre code postal"
          :class="{ 'is-invalid': formErrors.code_postal }"
        />
        <div v-if="formErrors.code_postal" class="invalid-feedback">
          {{ formErrors.code_postal }}
        </div>
      </div>
      <div class="label">
        <label for="image">Photo du restaurant</label>

        <input
          ref="imageInput"
          type="file"
          name="image"
          @change="handleImageChange"
          :class="{ 'is-invalid': formErrors.image }"
        />
        <div v-if="formErrors.image" class="invalid-feedback">
          {{ formErrors.image }}
        </div>
      </div>
      <!-- <img v-if="newUser.image" :src="selectedImage" alt="Image sélectionnée" /> -->
      <input type="hidden" name="role" v-model="newUser.role" />
      <button type="submit">S'inscrire</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { isRestaurantName } from "@/tools/isRestaurantName";
import { isUsername } from "@/tools/isUsername";
import { isEmail } from "@/tools/isEmail";
import { isPassword } from "@/tools/isPassword";
import { isAdresse } from "@/tools/isAdresse";
import { isVille } from "@/tools/isVille";
import { isCodePostal } from "@/tools/isCodePostal";

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
      formErrors: {},
    };
  },
  methods: {
    async submitInscription() {
      try {
        this.formErrors = {}; // Réinitialisez les erreurs avant la soumission

        // Validez le nom du restaurant
        if (!isRestaurantName(this.newUser.restaurant_name)) {
          this.formErrors.restaurant_name =
            "Le nom du restaurant doit contenir entre 3 et 15 caractères";
        }

        // Validez l'username
        if (!isUsername(this.newUser.username)) {
          this.formErrors.username =
            "Le nom d'utilisateur doit contenir entre 3 et 15 caractères";
        }

        // Validez l'email
        if (!isEmail(this.newUser.email)) {
          this.formErrors.email = "Adresse email invalide";
        }

        // Validez le mot de passe, l'adresse, la ville, le code postal, etc.
        if (!isPassword(this.newUser.mdp)) {
          this.formErrors.mdp =
            "Le mot de passe doit contenir entre 8 et 20 caractères et inclure au moins une minuscule, une majuscule, un chiffre et un caractère spécial (#, @, $, !, %, *, ?, ou &).";
        }

        if (!isAdresse(this.newUser.adresse)) {
          this.formErrors.adresse = "Veuillez renseigner une adresse";
        }

        if (!isVille(this.newUser.ville)) {
          this.formErrors.ville = "Veuillez renseigner une ville";
        }

        if (!isCodePostal(this.newUser.code_postal)) {
          this.formErrors.code_postal = "Code postal invalide";
        }

        if (!this.newUser.image) {
          this.formErrors.image = "Veuillez renseigner une image";
        }

        // Ajoutez d'autres validations pour les autres champs du formulaire

        if (Object.keys(this.formErrors).length > 0) {
          return; // Arrêtez la soumission si des erreurs existent
        }

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

        await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/users/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifiez le type de contenu pour envoyer le fichier
            },
          }
        );
        this.$router.push("/connexion");
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
