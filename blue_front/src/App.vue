<script setup>

import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Estado reactivo para los datos, el estado de carga y el error
const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref('');
const isButtonDisabled = ref(false);

// Función para consumir la API de tu backend
const fetchPosts = async () => {
  try {
    // La URL de tu API local
    const apiUrl = 'http://localhost:3000/posts';

    // Hacemos la petición POST. El cuerpo es un objeto de ejemplo, ya que tu API lo requiere
    const response = await axios.post(apiUrl, {prueba :1});

    // Verificamos si la respuesta es un array o un objeto y lo guardamos
    // en el estado reactivo 'posts'
    if (Array.isArray(response.data)) {
      posts.value = response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      // Si es un solo objeto, lo convertimos en un array para poder iterar sobre él
      posts.value = [response.data];
    }

  } catch (err) {
    error.value = 'Failed to fetch data from the API.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Propiedad para agrupar los posts por 'name'
const groupedPosts = computed(() => {
  const counts = {};
  
  posts.value.forEach(post => {
    const name = post.name || 'sin nombre'; // no no existir el atributo se utiliza 'sin nombre'
    counts[name] = (counts[name] || 0) + 1;
  });

  // El objeto conteos se convierte a un array de objetos para la tabla
  return Object.keys(counts).map(name => ({
    name: name,
    posts: counts[name]
  }));
});

// filtrar los resultados basándose en el término de búsqueda
const filteredPosts = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) {
    return groupedPosts.value;
  }
  return groupedPosts.value.filter(post =>
    post.name.toLowerCase().includes(term)
  );
});

const loadMorePosts = async () => {
  isButtonDisabled.value = true; 
  try {
    // La URL de tu API local
    const apiUrl = 'http://localhost:3000/posts';
    
    // consumir peticion nuevamente
    const response = await axios.post(apiUrl, {prueba :1});

    // Verificamos si la respuesta es un array o un objeto y lo agregamos al array existente
    const newData = Array.isArray(response.data) ? response.data : [response.data];
    posts.value = [...posts.value, ...newData];

  } catch (err) {
    error.value = 'Error 500 : Al consumir el servicio ';
    console.error(err);
  }
  isButtonDisabled.value = false; 
};

// Llamar a la función para obtener los datos
onMounted(fetchPosts);

</script>

<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-100 rounded-xl shadow-lg mt-8 font-sans">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Posts Agrupados</h1>
    
    <!-- Filtro de búsqueda -->
    <div class="mb-6">
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Filtrar por nombre..."
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
      >
    </div>
    <button 
      @click="loadMorePosts"
      :disabled="isButtonDisabled"
      class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
      :class="{ 'opacity-50 cursor-not-allowed': isButtonDisabled }"
    >
      Consultar más Posts
    </button>

    <!-- Mensajes de estado -->
    <div v-if="loading" class="text-center text-gray-600">
      <p>Cargando datos...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- Tabla de resultados -->
    <div v-else class="overflow-x-auto rounded-lg shadow-md">
      <table class="min-w-full divide-y divide-gray-200 bg-white">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad de Posts
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="post in filteredPosts" :key="post.name" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ post.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ post.posts }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
