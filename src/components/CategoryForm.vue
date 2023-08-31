<template>
  <form @submit.prevent="submitCategory">
    <input
      v-model="newCategory.category"
      name="category"
      placeholder="Nom de la category"
    />

    <button type="submit">Ajouter la catégorie</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newCategory: {
        category: "",
      },
    };
  },
  methods: {
    async submitCategory() {
      try {
        const formData = new FormData();
        formData.append("category", this.newCategory.category);

        console.log("formData:", formData);

        const response = await axios.post(
          "http://localhost:5001/api/category/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifiez le type de contenu pour envoyer le fichier
            },
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la category", error);
      }
    },
  },
};
</script>
