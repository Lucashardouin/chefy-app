const path = require('path');

module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/global.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  chainWebpack: (config) => {
    // Ajoutez la règle pour les fichiers SCSS dans les blocs <style lang="scss">
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .end()
      .end();

    // Vous pouvez également inclure des règles spécifiques pour les fichiers SCSS à la racine
    config.module
      .rule('scss')
      .oneOf('normal')
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .end()
      .use('sass-loader')
      .loader('sass-loader')
      .end();
  },
};
