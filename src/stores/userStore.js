// stores/userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users'); // Asegúrate de que tu DB esté corriendo en este puerto
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
});
