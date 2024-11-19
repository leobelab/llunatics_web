// composables/useDeletePost.js
import { ref } from 'vue';
import { usePostStore } from '@/stores/postStore';

export default function useDeletePost(id) {
  const postStore = usePostStore(); // Accede al store de Pinia
  const isDeleting = ref(false);    // Estado para verificar si se está eliminando
  const error = ref(null);          // Estado para almacenar errores
  // Función para eliminar un post
  const deletePost = async () => {
    isDeleting.value = true;
    error.value = null; // Reinicia el estado de error al iniciar la función
    try {
      await postStore.deletePost(id); // Llama a la acción `deletePost` en el store
    } catch (err) {
      error.value = "Error deleting post"; // Actualiza el estado de error
      console.error("Error deleting post:", err);
    } finally {
      isDeleting.value = false; // Finaliza el estado de carga
    }
  };

  return {
    deletePost,  // Función para eliminar el post
    isDeleting,  // Estado de carga
    error        // Estado de error
  };
}
