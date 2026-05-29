const BASE = '/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mg_token');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Error ${res.status}`);
  }

  return res.json();
}

// Auth
export const login = (username, password) =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const register = (username, email, password) =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ username, email, password }) });

export const getMe = () => apiFetch('/auth/me');

// Recipes
export const getRecipes = () => apiFetch('/recipes');
export const getRecipeById = (id) => apiFetch(`/recipes/${id}`);
export const searchRecipes = (q) => apiFetch(`/recipes/search?q=${encodeURIComponent(q)}`);
export const createRecipe = (data) => apiFetch('/recipes', { method: 'POST', body: JSON.stringify(data) });
export const updateRecipe = (id, data) => apiFetch(`/recipes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteRecipe = (id) => apiFetch(`/recipes/${id}`, { method: 'DELETE' });

// Ingredients
export const getIngredients = () => apiFetch('/ingredients');
export const createIngredient = (name) => apiFetch('/ingredients', { method: 'POST', body: JSON.stringify({ name }) });
export const deleteIngredient = (id) => apiFetch(`/ingredients/${id}`, { method: 'DELETE' });

// Filters
export const getFilters = () => apiFetch('/filters');
export const createFilter = (data) => apiFetch('/filters', { method: 'POST', body: JSON.stringify(data) });
export const deleteFilter = (id) => apiFetch(`/filters/${id}`, { method: 'DELETE' });

// Favorites
export const getFavorites = () => apiFetch('/favorites');
export const addFavorite = (recipeId) => apiFetch(`/favorites/${recipeId}`, { method: 'POST' });
export const removeFavorite = (recipeId) => apiFetch(`/favorites/${recipeId}`, { method: 'DELETE' });

// Comments
export const getComments = (recipeId) => apiFetch(`/recipes/${recipeId}/comments`);
export const addComment = (recipeId, description) =>
  apiFetch(`/recipes/${recipeId}/comments`, { method: 'POST', body: JSON.stringify({ description }) });
export const deleteComment = (id) => apiFetch(`/comments/${id}`, { method: 'DELETE' });

// Users (admin)
export const getUsers = () => apiFetch('/users');
export const updateUser = (id, data) => apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteUser = (id) => apiFetch(`/users/${id}`, { method: 'DELETE' });
