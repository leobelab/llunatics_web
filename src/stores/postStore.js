// stores/postStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [], // Estado inicial: lista de artículos vacía
    post: null,
  }),

  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },

    async fetchPost(id) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        this.post = response.data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },

    async addPost(newPost) {
      try {
        const response = await axios.post('http://localhost:3000/posts', newPost);
        this.posts.push(response.data); // Actualizamos el estado con el nuevo artículo
      } catch (error) {
        console.error("Error adding post:", error);
      }
    },

    async updatePost(updatedPost) {
      try {
        await axios.put(`http://localhost:3000/posts/${updatedPost.id}`, updatedPost);
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) this.posts[index] = updatedPost; // Modificar el estado local
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },

    async deletePost(id) {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`);
        this.posts = this.posts.filter(post => post.id !== id); // Eliminar en el estado local
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  }
});
