<template>
  <div class="profile_container">
    <div class="chefy_container">
      <div class="side_nav">
        <div class="logo">
          <h1 class="logo_title">Chefy</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="9"
            viewBox="0 0 53 9"
            fill="none"
            class="chefy_underline"
          >
            <path
              d="M52 1C36.4042 1 20.8085 1 5.2127 1C3.84206 1 2.47142 1 1.10078 1C-4.36853 1 12.0394 1 17.5087 1C26.1956 1 34.8798 1.02987 43.566 1.22845C45.3208 1.26856 47.089 1.0788 48.8422 1.25532C52.4119 1.61474 41.7027 1.9894 38.1365 2.50507C33.972 3.10723 29.7326 3.34115 25.6019 4.81642C25.2052 4.9581 22.0297 6.17098 23.6677 6.62963C25.9215 7.26071 33.9988 6.03704 25.6019 9"
              stroke="#FF7116"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="menu_qrcode_icons">
          <img
            width="64"
            height="64"
            :src="
              activeIcon === 'menu'
                ? require('@/assets/styles/menu_activated.svg')
                : require('@/assets/styles/menu_notactivated.svg')
            "
            alt="Menu Icon"
            @click="activateMenuIcon"
            class="menu_icon"
          />

          <img
            width="64"
            height="64"
            :src="
              activeIcon === 'qr'
                ? require('@/assets/styles/qrcode_activated.svg')
                : require('@/assets/styles/qrcode_notactivated.svg')
            "
            alt="QR Icon"
            @click="activateQRCodeIcon"
            class="qr_icon"
          />
        </div>
      </div>

      <div class="logout_container">
        <img
          src="@/assets/styles/logout.svg"
          alt="logout icon"
          @click="logout"
          class="logout_icon"
        />
      </div>
    </div>
    <div class="profile">
      <div class="add_article">
        <button @click="showAddModal = true" v-if="showMenu">+ Ajouter</button>
      </div>
      <div class="main_menu" v-if="showMenu">
        <!-- <h2>Mon Menu</h2> -->
        <div class="my_menu">
          <div
            v-for="category in categories"
            :key="category.id_category"
            class="my_category"
          >
            <div class="my_categorie">
              <div class="category_title">
                <h2>{{ category.category }}</h2>
                <i class="fas fa-trash-alt" @click="selectCategoryForDelete(category)"></i>
              </div>
              <div class="my_article">
                <div
                  v-for="article in articlesByCategory(category.id_category)"
                  :key="article.id_article"
                  class="my_articles"
                >
                  <div class="articles_main">
                    <div class="article_img">
                      <img
                        :src="getImageUrl(article.image)"
                        alt="Image de l'article"
                      />
                    </div>
                    <div class="article_infos">
                      <p class="article_name">{{ article.article_name }}</p>
                      <p class="article_description">
                        ( {{ article.description }} )
                      </p>
                      <p class="article_prix">{{ article.prix }} €</p>
                    </div>
                  </div>
                  <div class="links">
                    <button
                      class="edit_button"
                      @click="selectArticleForEdit(article)"
                    >
                      Modifier
                    </button>
                    <button class="delete_button" @click="selectArticleForDelete(article)">Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="qr_code" v-if="showQRCode">
        <div class="qr_description">
          <h1>Votre QR code</h1>
          <p>
            Voici le QR code que vous devez partager à vos clients pour qu'il
            accède à votre carte
          </p>
        </div>
        <div class="qrcode_img">
          <img
            :src="qrCodeImageUrl"
            alt="QR Code de votre menu"
            class="qr_img"
          />
        </div>
        <p>
          Ou accédez-y directement via ce lien <br />
          <a :href="`/menu/${user.id_user}`"
            >https://chefy.app/menu/{{ user.id_user }}</a
          >
        </p>
      </div>
      <div class="profile_footer"></div>
    </div>
    <ShowModal :show-modal="showAddModal" @close="showAddModal = false">
      <!-- Contenu de la modal -->
      <article-form @article-added="onArticleAdded"></article-form>
    </ShowModal>
    <ShowModal :show-modal="showEditModal" @close="showEditModal = false">
      <!-- Contenu de la modal -->
      <edit-article
        :article="selectedArticle"
        @article-updated="onArticleUpdated"
      ></edit-article>
    </ShowModal>
    <ShowModal :show-modal="showDeleteModal" @close="showDeleteModal = false">
      <!-- Contenu de la modal -->
      <delete-article
        :article="selectedArticle"
      ></delete-article>
    </ShowModal>
    <ShowModal :show-modal="showDeleteCategory" @close="showDeleteCategory = false">
      <!-- Contenu de la modal -->
      <delete-category
        :category="selectedCategory"
      ></delete-category>
    </ShowModal>
  </div>
</template>
<script>
import ShowModal from "./ShowModal.vue";
import ArticleForm from "./ArticleForm.vue";
import EditArticle from "./EditArticle.vue";
import DeleteArticle from "./DeleteArticle.vue";
import DeleteCategory from "./DeleteCategory.vue";
import axios from "axios";
import { logout } from "@/authGuard";
import QRCode from "qrcode";

export default {
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showDeleteCategory: false,
      showMenu: true,
      showQRCode: false,
      categories: [], // Liste de toutes les catégories
      articles: [], // Liste de tous les articles
      user: {},
      qrCodeImageUrl: "",
      activeIcon: "menu",
      selectedArticle: null,
      selectedCategory: null,
    };
  },
  components: {
    ShowModal,
    ArticleForm,
    EditArticle,
    DeleteArticle,
    DeleteCategory
  },
  created() {
    
    const id_user = localStorage.getItem("id_user");
    this.generateQRCode(id_user);

    // Chargez la liste des catégories existantes depuis votre API ici
    this.loadCategories();

    // Chargez la liste de tous les articles depuis votre API ici
    this.loadArticles();

    this.loadUser();
  },
  methods: {
    selectArticleForEdit(article) {
      this.selectedArticle = { ...article }; // Copiez les données de l'article dans selectedArticle
      this.showEditModal = true; // Affichez la modal d'édition
    },
    selectArticleForDelete(article) {
      this.selectedArticle = { ...article }; // Copiez les données de l'article dans selectedArticle
      this.showDeleteModal = true; // Affichez la modal d'édition
    },
    selectCategoryForDelete(category) {
      this.selectedCategory = { ...category }; // Copiez les données de l'article dans selectedArticle
      console.log(category);
      this.showDeleteCategory = true; // Affichez la modal d'édition
    },
    onArticleAdded() {
      // Cette méthode est appelée lorsque l'article est ajouté avec succès.
      // Vous pouvez mettre à jour votre liste d'articles ici si nécessaire.
      this.showAddModal = false; // Fermez la modal d'ajout après ajout réussi
    },
    onArticleUpdated() {
      // Cette méthode est appelée lorsque l'article est modifié avec succès.
      // Vous pouvez mettre à jour votre liste d'articles ici si nécessaire.
      this.showEditModal = false; // Fermez la modal de modification après modification réussie
      // console.log("Article mis à jour :", this.updatedArticle);
    },
    logout() {
      logout(); // Appel de la fonction de déconnexion lorsque l'utilisateur clique sur le lien
    },
    activateMenuIcon() {
      this.activeIcon = "menu";
      this.showQRCode = false;
      this.showMenu = true;
    },
    activateQRCodeIcon() {
      this.activeIcon = "qr";
      this.showQRCode = true;
      this.showMenu = false;
    },
    async loadCategories() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/category/`
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
        // console.log("Données des articles:", response.data);
        this.articles = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des articles", error);
      }
    },
    async loadUser() {
      try {
        // console.log(id_user);
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/users/`
        );
        // console.log("Données de l'user:", response.data);
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
    generateQRCode(id_user) {
      QRCode.toDataURL(
        `${process.env.VUE_APP_BASE_URL}/menu/${id_user}`,
        (err, imageUrl) => {
          if (err) {
            console.error(err);
          } else {
            this.qrCodeImageUrl = imageUrl;
          }
        }
      );
    },
  },
};
</script>
