<template>
    <div class="hello">
      <button @click="test()">lancer test</button>
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
      };
    },
    methods: {
      async test() {
        try {
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/profile`);
          // Gérez le succès de la connexion ici
          console.log(response);
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
        }
      },
    },
  };
  </script>