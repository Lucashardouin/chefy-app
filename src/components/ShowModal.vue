<template>
  <div class="modal" v-if="showModal">
    <!-- Contenu de la modal -->
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-content">
      <slot></slot>
      <button @click="closeModal">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Fond semi-transparent pour assombrir l'arrière-plan */
  z-index: 1000; /* Pour s'assurer que la modal est au-dessus de tout le reste */
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-y: auto; /* Ajout du défilement pour la modal principale */
}

.modal-content {
  background-color: #fff; /* Couleur de fond de la modal */
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Ombre pour un effet de profondeur */
  /* text-align: center; */
  max-height: 80vh; /* Réglez la hauteur maximale à 80% de la hauteur de la fenêtre */
  overflow-y: auto; /* Ajout du défilement pour le contenu de la modal */
  position: relative;
  display: flex;
  width: 400px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
}

/* Styles pour le bouton "Fermer" */
.modal-content button {
  color: #ff7116; /* Couleur du texte du bouton */
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  border: 2px solid var(--primary, #ff7116);
  background: var(--grey050, #fafafa);
  cursor: pointer;
  width: 100%;
}

/* Style pour l'overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: -99;
}

@media screen and (max-width: 480px) {
  .modal-content{
    width: 80%;
  }
  .modal-content button {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
