<template>
    <form @submit.prevent="deleteCategory" class="article_form">
      <div class="articleform_container">
        <h1>Supprimer une catégorie</h1>
        <p>
          Vous êtes sur le point de supprimer une catégorie. Etes-vous sûr de votre décision ?
        </p>
        <button type="submit">Supprimer la catégorie</button>
      </div>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
    category: {
      type: Object,
      default: () => ({}), // Défaut à un objet vide si aucun article n'est passé
    },
  },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      async deleteCategory() {
        try {
          await axios.delete(
            `${process.env.VUE_APP_API_BASE_URL}/api/category/${this.category.id_category}`
          );
          // this.$router.push("/profile");
          window.location.reload();
        } catch (error) {
          console.error("Erreur lors de la suppression de la catégorie", error);
        }
      },
    },
  };
  </script>
  