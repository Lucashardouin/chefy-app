<template>
  <div class="restaurant_card">
    <div class="restaurant_container">
      <div class="image_wrapper">
        <img :src="getImageUrl(user.image)" alt="image du restaurant" />
        <h1>{{ user.restaurant_name }}</h1>
      </div>
    </div>

    <div class="menu_container">
      <!-- <h2>Mon Menu</h2> -->
      <div class="mymenu_container">
        <div
          v-for="category in categories"
          :key="category.id_category"
          class="category_container"
        >
          <div class="categorie_container">
            <h2 class="categorie_title">{{ category.category }}</h2>
            <p class="categorie_desc">{{ category.description }}</p>
            <div class="article_container">
              <div
                v-for="article in articlesByCategory(category.id_category)"
                :key="article.id_article"
                class="articles_container"
              >
                <div class="image_article">
                  <img :src="getImageUrl(article.image)" alt="Image de l'article" />
                </div>
                <div class="infos_article">
                  <p class="name">{{ article.article_name }}</p>
                  <p class="description">{{ article.description }}</p>
                  <p class="prix">{{ article.prix }} €</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [], // Liste de toutes les catégories
      articles: [], // Liste de tous les articles
      user: {},
    };
  },
  created() {
    
    const id_user = localStorage.getItem('id_user');
    
    this.$router.push({ name: "menu", params: { id_user } });
    console.log(id_user);

    const id_user_url = this.$route.params.id_user;
    console.log("id_user_url:", id_user_url);
    
    // Chargez la liste des catégories existantes depuis votre API ici
    this.loadCategories(id_user_url);
    
    // Chargez la liste de tous les articles depuis votre API ici
    this.loadArticles();
    
    this.loadUser(id_user_url);
    
  },
  methods: {
    async loadCategories(id_user_url) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/category/${id_user_url}`
          );
          this.categories = response.data;
          
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    },
    async loadArticles() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/article/`
        );
        console.log("Données des articles:", response.data);
        this.articles = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des articles", error);
      }
    },
    async loadUser(id_user_url) {
      try {
        // console.log(id_user);
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/users/${id_user_url}`
        );
        console.log("Données de l'user:", response.data);
        this.user = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur ", error);
      }
    },
    articlesByCategory(categoryId) {
      // Filtrer les articles par catégorie
      return this.articles.filter(
        (article) => article.id_category === categoryId
      );
    },
    getImageUrl(blobData) {
      if (blobData && blobData.data && blobData.data.length > 0) {
        const uint8Array = new Uint8Array(blobData.data);
        const blob = new Blob([uint8Array], { type: "image/png" });
        return URL.createObjectURL(blob);
      }
      //   console.log(this.getImageUrl(blobData));
      // Retournez une URL par défaut ou une image de remplacement si nécessaire
      //   return "/path/to/default-image.jpg";
    },
  },
};
</script>
