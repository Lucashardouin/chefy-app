<template>
  <form @submit.prevent="submitArticle">
    <input
      v-model="newArticle.article_name"
      name="article_name"
      placeholder="Nom de l'article"
    />
    <input v-model="newArticle.prix" name="prix" placeholder="Prix" />
    <textarea
      v-model="newArticle.description"
      name="description"
      placeholder="Description"
    ></textarea>
    <div v-if="!addNewCategory">
      <select
        v-model="newArticle.id_category"
        name="id_category"
        placeholder="Catégorie"
      >
        <option value="">Sélectionnez une catégorie</option>
        <option
          v-for="category in categories"
          :key="category.id_category"
          :value="category.id_category"
        >
          {{ category.category }}
        </option>
      </select>
      <a @click="addNewCategory = true" style="cursor: pointer; color: blue; text-decoration: underline;">Ajouter une nouvelle catégorie</a>
    </div>
    <div v-else>
      <!-- Créez une nouvelle catégorie en utilisant un formulaire imbriqué -->
      <input
        v-model="newCategoryName"
        name="category"
        placeholder="Nouvelle catégorie"
      />
      <input
        v-model="newCategoryDescription"
        name="description"
        placeholder="Nouvelle description"
      />
      <a @click="addNewCategory = false" style="cursor: pointer; color: red; text-decoration: underline;">Slectionner une catégorie existante</a>
    </div>
    <input
      ref="imageInput"
      type="file"
      name="image"
      @change="handleImageChange"
    />
    <img
      v-if="newArticle.image"
      :src="selectedImage"
      alt="Image sélectionnée"
    />

    <button type="submit">Ajouter l'article</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newArticle: {
        article_name: "",
        prix: "",
        description: "",
        id_category: "",
        image: null,
      },
      categories: [],
      selectedImage: null,
      addNewCategory: false, // Ajoutez cette propriété pour gérer l'ajout d'une nouvelle catégorie
      newCategoryName: "",
      newCategoryDescription: "",
    };
  },
  created() {
    // Chargez la liste des catégories existantes depuis votre API ici
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/api/category/`
        );
        this.categories = response.data; // Mettez à jour la liste des catégories
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    },
    async submitArticle() {
      try {
        if (this.addNewCategory) {
          // Créez une nouvelle catégorie avec sa description
          const response = await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/api/category/`,
            {
              category: this.newCategoryName,
              description: this.newCategoryDescription,
            }
          );
          // Obtenez l'ID de la nouvelle catégorie créée
          const newCategoryId = response.data.id_category;
          console.log(response.data);
          this.newArticle.id_category = newCategoryId;
          // console.log(this.newArticle.id_category);
        }
        
        const formData = new FormData();
        formData.append("article_name", this.newArticle.article_name);
        formData.append("prix", this.newArticle.prix);
        formData.append("description", this.newArticle.description);
        formData.append("image", this.newArticle.image); // Envoyez l'image sélectionnée
        formData.append("id_category", this.newArticle.id_category); // Envoyez l'image sélectionnée

        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/article/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifiez le type de contenu pour envoyer le fichier
            },
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article", error);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0]; // Obtenez le fichier sélectionné

      if (file) {
        // Afficher une prévisualisation de l'image
        this.newArticle.image = file;
        this.selectedImage = URL.createObjectURL(file);
      }
    },
  },
};
</script>
