// composables/useUpdatePost.js
import { ref } from 'vue';
import { usePostStore } from '../stores/postStore';

const useUpdatePost = (updatedPost) => {
  const postStore = usePostStore();
  const isUpdating = ref(false);
  const error = ref(null);

  const updatePost = async () => {
    isUpdating.value = true;
    error.value = null;
    try {
      await postStore.updatePost(updatedPost); // Llama a la acción de la store para actualizar
      console.log('Post actualizado:', updatedPost);
    } catch (err) {
      error.value = 'Error al actualizar el post.';
      console.error(error.value, err);
    } finally {
      isUpdating.value = false;
    }
  };

  return {
    updatePost,
    isUpdating,
    error,
  };
}

export default useUpdatePost
