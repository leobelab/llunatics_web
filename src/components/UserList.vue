<!-- src/components/UserList.vue -->
<template>
    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>Position: {{ user.position }}</p>
        <p>Placement: {{ user.placement }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const users = ref([]);
  
      // Cargar usuarios al montar el componente
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:3000/users');
          users.value = response.data;
        } catch (error) {
          console.error('Error cargando usuarios:', error);
        }
      });
  
      return { users };
    },
  };
  </script>
  
  <style scoped>
  .user-list {
    /* Estilos para el listado de usuarios */
  }
  .user-card {
    /* Estilos para cada usuario */
  }
  </style>
  