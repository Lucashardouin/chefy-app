<template>
    <form @submit.prevent="deleteArticle" class="article_form">
      <div class="articleform_container">
        <h1>Supprimer un article</h1>
        <p>
          Vous êtes sur le point de supprimer un article. Etes-vous sûr de votre décision ?
        </p>
        <button type="submit">Supprimer l'article</button>
      </div>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
    article: {
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
      async deleteArticle() {
        try {
          const response = await axios.delete(
            `${process.env.VUE_APP_API_BASE_URL}/api/article/${this.article.id_articles}`
          );
          // this.$router.push("/profile");
          window.location.reload();
          console.log(response.data.message);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'article", error);
        }
      },
    },
  };
  </script>
  