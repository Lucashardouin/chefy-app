<template>
  <form @submit.prevent="submitCategory">
    <input
      v-model="newCategory.category"
      name="category"
      placeholder="Nom de la category"
    />
    <textarea
      v-model="newCategory.description"
      name="description"
      placeholder="Description"
    ></textarea>

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
        description: "",
      },
    };
  },
  methods: {
    async submitCategory() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/category/`,
          this.newCategory
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la category", error);
      }
    },
  },
};
</script>
