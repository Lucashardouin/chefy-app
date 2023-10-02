import axios from 'axios'

const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  if (!token) {
    // Aucun token trouvé, l'utilisateur n'est pas authentifié
    return false;
  }

  try {
    // Tu envoies ton token au back
    const response = await axios.get('http://localhost:5001/api/auth/is-authenticated')
    // console.log(response);
    if (response.status === 200) {
      return true
    } else if (response.status === 401) {
      return false
    }
    return false
  } catch (error) {
    // Une erreur s'est produite lors du décodage du token, l'utilisateur n'est pas authentifié
    return false;
  }
};

const authGuard = async (to, from, next) => {
  if (await isAuthenticated()) {
    next(); // Autorise l'accès à la route
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    next("/connexion"); // Redirige vers la page de connexion
  }
};

const logout = () => {
  // Supprimer le token JWT du localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('id_user');

  // Supprimer le header d'autorisation Axios
  axios.defaults.headers.common['Authorization'] = '';

  // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
  window.location.href = '/connexion'; // Remplacez '/connexion' par l'URL de la page de connexion
};


export { isAuthenticated, authGuard, logout };