const isAuthenticated = () => {
  const token = localStorage.token;
  
  if (!token) {
    // Aucun token trouvé, l'utilisateur n'est pas authentifié
    return false;
  }

  try {
    // Décoder la partie payload du token (sans vérifier la signature)
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));

    // Obtenez la date d'expiration du token (exp)
    const tokenExpirationTimestamp = payload.exp;
    
    // Obtenez la date actuelle en timestamp
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    // Comparez la date d'expiration avec la date actuelle
    if (tokenExpirationTimestamp < currentTimestamp) {
      // Le token a expiré, l'utilisateur n'est pas authentifié
      return false;
    } else {
      // Le token est toujours valide, l'utilisateur est authentifié
      return true;
    }
  } catch (error) {
    // Une erreur s'est produite lors du décodage du token, l'utilisateur n'est pas authentifié
    return false;
  }
};

const authGuard = (to, from, next) => {
  if (isAuthenticated()) {
    next(); // Autorise l'accès à la route
  } else {
    localStorage.removeItem('token');
    next("/connexion"); // Redirige vers la page de connexion
  }
};


export { isAuthenticated, authGuard };