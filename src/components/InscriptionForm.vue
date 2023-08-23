<template>
    <form @submit.prevent="submitInscription">
      <input v-model="restaurant_name" placeholder="Nom du restaurant" />
      <input v-model="username" placeholder="Identifiant" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <input v-model="adresse" placeholder="Adresse" />
      <input v-model="ville" placeholder="Ville" />
      <input v-model="code_postal" placeholder="Code postal" />
      <input ref="imageInput" type="file" @change="handleImageChange" />
      <img :src="image" alt="Image sélectionnée" />
      <input type="hidden" name="role" />
      <button type="submit">S'inscrire</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        restaurant_name: '',
        username: '',
        email: '',
        password: '',
        adresse: '',
        ville: '',
        code_postal: '',
        image: null,
        role: 'user' 
      };
    },
    methods: {
      async submitInscription() {
        try {
          // Créez un objet FormData pour envoyer les données, y compris le fichier
          const formData = new FormData();
          formData.append('restaurant_name', this.restaurant_name);
          formData.append('username', this.username);
          formData.append('email', this.email);
          formData.append('mdp', this.mdp);
          formData.append('adresse', this.adresse);
          formData.append('ville', this.ville);
          formData.append('code_postal', this.code_postal);
          formData.append('image', this.image); // Envoyez l'image sélectionnée
          formData.append('role', this.role);
  
          const response = await axios.post('/api/inscription', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Spécifiez le type de contenu pour envoyer le fichier
            },
          });
          console.log(response.data.message);
        } catch (error) {
          console.error('Erreur lors de l\'inscription', error);
        }
      },
      handleImageChange(event) {
        const file = event.target.files[0]; // Obtenez le fichier sélectionné
  
        if (file) {
          // Afficher une prévisualisation de l'image
          this.selectedImage = URL.createObjectURL(file);
        }
      },
    },
  };
  </script>
  