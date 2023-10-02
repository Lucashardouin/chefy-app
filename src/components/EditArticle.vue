<template>
  <form @submit.prevent="editArticle" class="article_form">
    <div class="articleform_container">
      <h1>Modifier un article</h1>
      <p>
        Modifier un article dans vos menus afin de le partager a vos clients
      </p>
      <div class="articlename container">
        <label for="article_name">Nom</label>
        <input
          v-model="updatedArticle.article_name"
          name="article_name"
          :placeholder="article.article_name"
        />
        <div v-if="formErrors.article_name" class="invalid-feedback">
          {{ formErrors.article_name }}
        </div>
      </div>
      <div class="prix container">
        <label for="prix">Prix ( en € )</label>
        <input v-model="updatedArticle.prix" name="prix" :placeholder="article.prix" />
        <div v-if="formErrors.prix" class="invalid-feedback">
          {{ formErrors.prix }}
        </div>
      </div>
      <div class="description container">
        <label for="description">Description</label>
        <textarea
          v-model="updatedArticle.description"
          name="description"
          :placeholder="article.description"
        ></textarea>
        <div v-if="formErrors.description_article" class="invalid-feedback">
          {{ formErrors.description_article }}
        </div>
      </div>
      <div class="categorie container">
        <label for="">Catégorie</label>
        <div v-if="!addNewCategory" class="select_categorie container">
          <select
            v-model="updatedArticle.id_category"
            name="id_category"
            placeholder="Catégorie"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option
              v-for="category in categories"
              :key="category.id_category"
              :value="category.id_category"
              :selected="category.id_category === article.id_category"
            >
              {{ category.category }}
            </option>
          </select>
          <div v-if="formErrors.category_selected" class="invalid-feedback">
            {{ formErrors.category_selected }}
          </div>
          <a @click="addNewCategory = true" class="add_categorie"
            >Ajouter une nouvelle catégorie</a
          >
        </div>
        <div v-else class="new_categorie container">
          <!-- Créez une nouvelle catégorie en utilisant un formulaire imbriqué -->
          <input
            v-model="newCategoryName"
            name="category"
            placeholder="Nom de votre catégorie"
          />
          <div v-if="formErrors.category_name" class="invalid-feedback">
            {{ formErrors.category_name }}
          </div>
          <input
            v-model="newCategoryDescription"
            name="description"
            placeholder="Description de votre catégorie"
          />
          <div v-if="formErrors.category_description" class="invalid-feedback">
            {{ formErrors.category_description }}
          </div>
          <a @click="addNewCategory = false" class="add_categorie"
            >Selectionner une catégorie existante</a
          >
        </div>
      </div>
      <div class="image container">
        <label for="image">Photo</label>
        <input
          ref="imageInput"
          type="file"
          name="image"
          @change="handleImageChange"
        />
        <div v-if="formErrors.image" class="invalid-feedback">
          {{ formErrors.image }}
        </div>
      </div>
      <button type="submit">Modifier l'article</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { isArticleName } from "@/tools/isArticleName";
import { isPrix } from "@/tools/isPrix";
import { isDescription } from "@/tools/isDescription";
import { isCategoryName } from "@/tools/isCategoryName";
import { isSelected } from "@/tools/isSelected";

export default {
  props: {
    article: {
      type: Object,
      default: () => ({}), // Défaut à un objet vide si aucun article n'est passé
    },
    currentImageUrl: String,
  },
  data() {
    return {
        updatedArticle: {
        article_name: this.article.article_name || '', // Utilisez la valeur de l'article s'il est défini, sinon une chaîne vide
        prix: this.article.prix || '', // Utilisez la valeur de l'article s'il est défini, sinon une chaîne vide
        description: this.article.description || '', // Utilisez la valeur de l'article s'il est défini, sinon une chaîne vide
        id_category: this.article.id_category || '', // Utilisez la valeur de l'article s'il est défini, sinon une chaîne vide
        image: null,
      },
      categories: [],
    //   selectedImage: null,
      addNewCategory: false, // Ajoutez cette propriété pour gérer l'ajout d'une nouvelle catégorie
      newCategoryName: "",
      newCategoryDescription: "",
      formErrors: {},
    //   currentImage: this.currentImageUrl,
    };
  },
  created() {
    console.log("Prop article:", this.article);
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
    async editArticle() {
      try {
        this.formErrors = {};

        if (this.addNewCategory) {
          if (!isCategoryName(this.newCategoryName)) {
            this.formErrors.category_name =
              "Le nom de la category doit contenir entre 2 et 15 caractères";
          }
          if (!isDescription(this.newCategoryDescription)) {
            this.formErrors.category_description =
              "Veuillez renseigner une description";
          }
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
          this.updatedArticle.id_category = newCategoryId;
          // console.log(this.newArticle.id_category);
        }
        if (!isArticleName(this.updatedArticle.article_name)) {
          this.formErrors.article_name =
            "Le nom de l'article doit contenir entre 2 et 15 caractères";
        }
        if (!isPrix(this.updatedArticle.prix)) {
          this.formErrors.prix = "Prix invalide";
        }
        if (!isDescription(this.updatedArticle.description)) {
          this.formErrors.description_article =
            "Veuillez renseigner une description";
        }
        if (!this.updatedArticle.image) {
          this.formErrors.image = "Veuillez renseigner une image";
        }
        if (!isSelected(this.updatedArticle.id_category)) {
          this.formErrors.category_selected =
            "Veuillez selectionner une catégorie";
        }

        if (Object.keys(this.formErrors).length > 0) {
          return; // Arrêtez la soumission si des erreurs existent
        }
        
        const formData = new FormData();
        formData.append("article_name", this.updatedArticle.article_name);
        formData.append("prix", this.updatedArticle.prix);
        formData.append("description", this.updatedArticle.description);
        formData.append("image", this.updatedArticle.image); // Envoyez l'image sélectionnée
        formData.append("id_category", this.updatedArticle.id_category); // Envoyez l'image sélectionnée
        console.log(this.updatedArticle.article_name);

        await axios.put(
          `${process.env.VUE_APP_API_BASE_URL}/api/article/${this.article.id_articles}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifiez le type de contenu pour envoyer le fichier
            },
          }
        );
        // this.$router.push("/profile");
        window.location.reload();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article", error);
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0]; // Obtenez le fichier sélectionné

      if (file) {
        // Afficher une prévisualisation de l'image
        this.updatedArticle.image = file;
        // this.selectedImage = URL.createObjectURL(file);
      }
    },
  },
};
</script>
