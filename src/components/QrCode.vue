<template>
    <div>
      <h1>QR Code de votre menu</h1>
      <img :src="qrCodeImageUrl" alt="QR Code de votre menu" />
    </div>
  </template>
  
  <script>
  import QRCode from "qrcode";
  
  export default {
    data() {
      return {
        qrCodeImageUrl: "",
      };
    },
    created() {
      const id_user = localStorage.getItem('id_user');
      this.generateQRCode(id_user);
    },
    methods: {
      generateQRCode(id_user) {
        QRCode.toDataURL(`${process.env.VUE_APP_BASE_URL}/menu/${id_user}`, (err, imageUrl) => {
          if (err) {
            console.error(err);
          } else {
            this.qrCodeImageUrl = imageUrl;
          }
        });
      },
    },
  };
  </script>
  