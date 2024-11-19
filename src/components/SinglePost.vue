<template>
  <div v-if="post" class="post-card">
    <router-link :to="{ name: 'details', params: { id: post.id }}"> 
      <h3 class="post-title">{{ post.title }}</h3>
    </router-link>
    <p class="post-body">{{ post.body }}</p>
    <div class="post-tags-container">
      <span v-for="tag in post.tags" :key="tag" class="post-tags">
        #{{ tag }}
      </span>
    </div>
    <router-link :to="{ name: 'details', params: { id: post.id }}"> 
      <p class="post-more">veure post</p>
    </router-link>
    <button @click="deletePost(post.id)">Eliminar</button>
  </div> 
  <div v-else>Carregant post...</div>
</template>


<script>
import { onMounted, computed, ref, watch } from 'vue';
import { usePostStore } from '../stores/postStore';

export default {
    props: {
      post: Object, 
      postId: String,
    },
    setup(props) {
    const postStore = usePostStore();
    const error = ref(null);
    const localPost = ref(null);

    // Definimos si usar el post pasado o buscarlo por el ID
    const fetchPost = async () => {
      if (!props.post && props.postId) { // Si no hay post completo, pero sí id
        try {
          await postStore.fetchPosts();
          localPost.value = postStore.posts.find((p) => p.id === props.postId);
          if (!localPost.value) throw new Error("Post no encontrado");
        } catch (err) {
          error.value = "Error al cargar el post";
        }
      } else {
        localPost.value = props.post; // Si ya hay post completo, lo usamos directamente
      }
    };


    onMounted(fetchPost);
    
    // Observa cambios en `postId` si se espera que este componente se reutilice
    watch(() => props.postId, fetchPost);

    const snippet = computed(() => {
      return localPost.value ? localPost.value.body.substring(0, 300) + '...' : '';
    });

    return { post: localPost, error, snippet };
  }
};
</script>

<style scoped>

  .post-card {
    background: white;
    padding: 30px;
    padding-bottom: 35px;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
}

.post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.post-title {
    font-size: 1.8rem;
    margin: 0 0 15px;
    color: #33475b;
    font-weight: bold;
}

.post-body {
    font-size: 1.1rem;
    color: #5a5a5a;
    line-height: 1.8;
    max-height: 155px;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 5;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.post-tags-container {
    display: flex;
    flex-wrap: wrap; /* Permite que los tags se ajusten en varias líneas si es necesario */
    gap: 8px; /* Espacio entre los tags */
    margin-top: 15px; /* Separación entre el texto y los tags */
}

.post-tags {
    font-size: 0.9rem;
    color: #2e9dd7;
    background-color: #e9f6fc;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: 500;
}

.post-more {
    position: absolute;
    bottom: 12px;
    right: 20px;
    font-weight: bold;
    color: #495af3;
    text-decoration: none;
    transition: color 0.3s;
}

.post-more:hover {
    color: #2e9dd7;
}

</style>