<template>
    <!-- <div class="post-list"> -->
        <div v-if="isLoading">Caregant publicacions...</div>
        <div v-else class="post-list">
            <div v-for="post in posts.slice(-6)" :key="post.id">
                <div class="post-card">
                    <router-link :to="{ name: 'details', params: { id: post.id }}"> 
                        <h3 class="post-title">{{ post.title }}</h3>
                    </router-link>
                    <p class="post-body">{{ post.body.substring(0, 220) + '...'}}</p>
                    <div class="post-tags-container">
                        <span v-for="tag in post.tags" :key="tag" class="post-tags">
                            #{{ tag }}
                        </span>
                    </div>
                    <router-link :to="{ name: 'details', params: { id: post.id }}"> 
                        <p class="post-more">veure post</p>
                    </router-link>
                    <!-- <button @click="deletePost(post.id)">Eliminar</button> -->
                </div> 
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import { usePostStore } from '../stores/postStore';
import { onMounted, computed, ref } from 'vue';


export default {
    setup() {
        const postStore = usePostStore();
        const isLoading = ref(true);

        onMounted(async () => {
            await postStore.fetchPosts(); // Esperamos a que se obtengan los posts
            isLoading.value = false;
        });

        const deletePost = async (postId) => {
            await postStore.deletePost(postId);
            postStore.posts = postStore.posts.filter(post => post.id !== postId);
            postStore.posts = [...postStore.posts];
        };

        
        const posts = computed(() => postStore.posts);
        const error = computed(() => postStore.error);

        return {
            posts,
            error,
            deletePost,
            isLoading,
        };
    },

}
</script>

<style scoped>
    .post-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Tres columnas en pantallas grandes */
        gap: 30px; /* Espacio entre tarjetas */
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .post-card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    text-align: center;
    min-height: 290px;
    max-height: 290px;
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
    line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.post-tags-container {
    position: absolute;
    bottom: 12px;
    left: 20px;
    gap: 8px; /* Espacio entre los tags */
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

  @media (max-width: 1024px) {
    .post-list {
        grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas medianas */
    }
  }
  @media (max-width: 768px) {
    .post-list {
        grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
    }
  }
</style>