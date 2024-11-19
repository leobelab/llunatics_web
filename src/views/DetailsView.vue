<!-- src/views/DetailsView.vue -->
<template>

  <Header />
  <div v-if="post">
    <img :src="getImageUrl(post.image)" alt="Imagen del post" class="post-image" v-if="post.image" />
    <div class="post-card">
      <!-- <div class="post-content"> -->
      <h3 v-if="!isEditing" class="post-title">{{ post.title }}</h3>
      <input v-if="isEditing" v-model="editedTitle" class="post-title-input" />
      <p v-if="!isEditing" class="post-body">{{ post.body }}</p>
      <input v-if="isEditing" v-model="editedBody" class="post-body-input" />
      <div class="post-tags-container">
        <span v-for="tag in post.tags" :key="tag" class="post-tags">
          #{{ tag }}
        </span>
      </div>
      <div class="button-container">
        <button @click="savePost" class="edit-button">
          {{ isEditing ? 'Guardar' : 'Editar' }}
        </button>
        <button @click="deletePost(post.id)" v-if="!isEditing && !isDeleting" class="delete-button">
          Eliminar
        </button>
        <p v-if="isDeleting">Eliminando...</p>
        <p v-if="errorDelete">{{ errorDelete }}</p>
      </div>  
    </div> 
  </div>
  <div v-else>Carregant post...</div>
    <div class="stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
    </div>
</template>
  
<script>
import { onMounted, computed, ref, watch } from 'vue';
import getPost from '../composables/getPost'
import useUpdatePost from '../composables/useUpdatePost'
import useDeletePost from '@/composables/useDeletePost';
import { useRouter } from 'vue-router'; 
import Header from '../components/Header.vue'


export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Header
  },
  setup(props) {
    const getImageUrl = (imageName) => {
      try {
        // Usa require para obtener la imagen desde assets de forma dinámica
        return require(`@/assets/${imageName}`);
      } catch (e) {
        console.error(`Error loading image: ${imageName}`, e);
        return null;
      }
    };

    const isEditing = ref(false);
    const editedTitle = ref('');
    const editedBody = ref('');
    const isDeleting = ref(false);
    const errorDelete = ref('');
    const router = useRouter(); 


    const { post, error, loadPost } = getPost(props.id)  // Usamos el composable getPost con el ID del post

    onMounted(() => {
      loadPost().then(() => {
        editedTitle.value = post.value.title;  // Inicializa con el título actual del post
        editedBody.value = post.value.body;    // Inicializa también con el cuerpo del post si es necesario
      });
    });

    const savePost = async () => {
      isEditing.value = !isEditing.value;
      const editedPost = ref({
        "id": props.id,
        "title": editedTitle,
        "body": editedBody,
        "image": "post1.jpg",
        "tags": [
          "historia"
        ]
      });
      const { updatePost, isUpdating, errorUpdate } = useUpdatePost(editedPost.value);
      await updatePost(); // Llama al composable para actualizar el post
      await loadPost();   // Recarga el post para reflejar los cambios
    };

    const deletePost = async (postId) => {
      if (!post.value) {
        errorDelete.value = "No se puede eliminar el post, ya que no está disponible";
        return;
      }
      const { deletePost } = useDeletePost(postId);
      isDeleting.value = true;
      errorDelete.value = null; // Reinicia el estado del error
      try {
        await deletePost(); // Llama al composable para eliminar el post
        router.push('/'); // 3. Redirige al Home después de eliminar correctamente
      } catch (error) {
        errorDelete.value = 'Error al eliminar el post'; // Manejo del error
      } finally {
        isDeleting.value = false;
      }
    };

    return { post, error, getImageUrl, savePost, isEditing, editedTitle, editedBody, isDeleting, errorDelete, deletePost }
  }
}
</script>
  

<style scoped>


  .post-image {
    max-width: 100%;       /* Asegura que no sobrepase el ancho del contenedor */
    max-height: 300px;     /* Define una altura máxima para todas las imágenes */
    width: auto;           /* Mantiene la proporción del ancho */
    height: auto;          /* Mantiene la proporción de la altura */
    object-fit: cover;     /* Ajusta la imagen si es necesario para llenar el espacio */
    border-radius: 8px;    /* Opcional: le da un borde redondeado a las imágenes */
    position: relative;
    top: 90px;
  }

    .post-card {
        background-color: white;
        padding: 30px;
        padding-bottom: 35px;
        border-radius: 10px;
        /* box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        width: 100%;
        top: 55px;
        height: 100%;
        margin-top: 30px;
        padding-left: 100px; 
        padding-right: 100px;
    }

    .post-title {
        font-size: 1.8rem;
        margin: 0 0 15px;
        color: #33475b;
        font-weight: bold;
        padding-bottom: 15px;
        width: wrap;
    }

    .post-title-input {
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.8rem;
        margin: 0 0 15px;
        color: #33475b;
        font-weight: bold;
        padding-bottom: 15px;
        border: none;
        background: transparent;
        width: 100%; /* Mantiene el input del mismo tamaño que el título */
    }

    .post-body {
        font-size: 1.1rem;
        color: #5a5a5a;
        line-height: 1.8;
        overflow: hidden;
        display: -webkit-box;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        width: 100%; /* Mantiene el input del mismo tamaño que el título */
    }

    .post-body-input {
        font-family: 'Fjalla One', sans-serif;
        font-size: 1.1rem;
        color: #5a5a5a;
        line-height: 1.8;
        overflow: hidden;
        display: -webkit-box;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        border: none;
        background: transparent;
        width: 100%; /* Mantiene el input del mismo tamaño que el título */
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

    .button-container {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .edit-button,
    .delete-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    /* Botón Editar */
    .edit-button {
      background-color: #4CAF50; /* Color verde para el botón de editar */
    }

    .edit-button:hover {
      background-color: #45a049;
      transform: scale(1.05);
    }

    /* Botón Eliminar */
    .delete-button {
      background-color: #f44336; /* Color rojo para el botón de eliminar */
    }

    .delete-button:hover {
      background-color: #d32f2f;
      transform: scale(1.05);
    }

    .stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-45deg);
    z-index: -1;
    }

    .star {
    --star-color: #FFD700;
    --star-tail-length: 6em;
    --star-tail-height: 2px;
    --star-width: calc(var(--star-tail-length) / 6);
    --fall-duration: 9s;
    --tail-fade-duration: var(--fall-duration);
    position: absolute;
    top: var(--top-offset);
    left: 0;
    width: var(--star-tail-length);
    height: var(--star-tail-height);
    color: var(--star-color);
    background: linear-gradient(45deg, currentColor, transparent);
    border-radius: 50%;
    filter: drop-shadow(0 0 6px currentColor);
    transform: translate3d(104em, 0, 0);
    animation: fall var(--fall-duration) var(--fall-delay) linear infinite, tail-fade var(--tail-fade-duration) var(--fall-delay) ease-out infinite;
    }
    @media screen and (max-width: 750px) {
    .star {
        animation: fall var(--fall-duration) var(--fall-delay) linear infinite;
    }
    }
    .star:nth-child(1) {
    --star-tail-length: 5.02em;
    --top-offset: 36.89vh;
    --fall-duration: 8.599s;
    --fall-delay: 4.111s;
    }
    .star:nth-child(2) {
    --star-tail-length: 6.75em;
    --top-offset: 30.1vh;
    --fall-duration: 11.802s;
    --fall-delay: 4.521s;
    }
    .star:nth-child(3) {
    --star-tail-length: 6.19em;
    --top-offset: 64.53vh;
    --fall-duration: 10.666s;
    --fall-delay: 6.831s;
    }
    .star:nth-child(4) {
    --star-tail-length: 5.94em;
    --top-offset: 60.05vh;
    --fall-duration: 7.489s;
    --fall-delay: 3.333s;
    }
    .star:nth-child(5) {
    --star-tail-length: 7.06em;
    --top-offset: 38.1vh;
    --fall-duration: 7.054s;
    --fall-delay: 4.954s;
    }
    .star:nth-child(6) {
    --star-tail-length: 5.87em;
    --top-offset: 95.1vh;
    --fall-duration: 8.77s;
    --fall-delay: 5.639s;
    }
    .star:nth-child(7) {
    --star-tail-length: 5.57em;
    --top-offset: 47.92vh;
    --fall-duration: 7.6s;
    --fall-delay: 2.13s;
    }
    .star:nth-child(8) {
    --star-tail-length: 5.28em;
    --top-offset: 95.22vh;
    --fall-duration: 6.033s;
    --fall-delay: 8.093s;
    }
    .star:nth-child(9) {
    --star-tail-length: 5.45em;
    --top-offset: 1.24vh;
    --fall-duration: 6.555s;
    --fall-delay: 6.899s;
    }
    .star:nth-child(10) {
    --star-tail-length: 5.22em;
    --top-offset: 83.87vh;
    --fall-duration: 7.252s;
    --fall-delay: 1.395s;
    }
    .star:nth-child(11) {
    --star-tail-length: 5.03em;
    --top-offset: 90.15vh;
    --fall-duration: 7.858s;
    --fall-delay: 3.758s;
    }
    .star:nth-child(12) {
    --star-tail-length: 6.93em;
    --top-offset: 97.65vh;
    --fall-duration: 7.627s;
    --fall-delay: 3.365s;
    }
    .star:nth-child(13) {
    --star-tail-length: 7.16em;
    --top-offset: 96.16vh;
    --fall-duration: 10.949s;
    --fall-delay: 2.972s;
    }
    .star:nth-child(14) {
    --star-tail-length: 5.63em;
    --top-offset: 71.68vh;
    --fall-duration: 7.772s;
    --fall-delay: 0.093s;
    }
    .star:nth-child(15) {
    --star-tail-length: 6.54em;
    --top-offset: 45.03vh;
    --fall-duration: 6.971s;
    --fall-delay: 0.99s;
    }
    .star:nth-child(16) {
    --star-tail-length: 6.37em;
    --top-offset: 3.96vh;
    --fall-duration: 8.14s;
    --fall-delay: 2.059s;
    }
    .star:nth-child(17) {
    --star-tail-length: 6.46em;
    --top-offset: 12.11vh;
    --fall-duration: 11.765s;
    --fall-delay: 3.84s;
    }
    .star:nth-child(18) {
    --star-tail-length: 6.62em;
    --top-offset: 24.82vh;
    --fall-duration: 6.935s;
    --fall-delay: 4.147s;
    }
    .star:nth-child(19) {
    --star-tail-length: 5.07em;
    --top-offset: 49.05vh;
    --fall-duration: 8.125s;
    --fall-delay: 6.414s;
    }
    .star:nth-child(20) {
    --star-tail-length: 6.38em;
    --top-offset: 19.45vh;
    --fall-duration: 9.582s;
    --fall-delay: 5.453s;
    }
    .star:nth-child(21) {
    --star-tail-length: 7.12em;
    --top-offset: 59.51vh;
    --fall-duration: 11.36s;
    --fall-delay: 0.425s;
    }
    .star:nth-child(22) {
    --star-tail-length: 7.42em;
    --top-offset: 72.23vh;
    --fall-duration: 9.488s;
    --fall-delay: 9.427s;
    }
    .star:nth-child(23) {
    --star-tail-length: 6.6em;
    --top-offset: 41.95vh;
    --fall-duration: 8.115s;
    --fall-delay: 8.712s;
    }
    .star:nth-child(24) {
    --star-tail-length: 7.45em;
    --top-offset: 13.67vh;
    --fall-duration: 9.755s;
    --fall-delay: 3.76s;
    }
    .star:nth-child(25) {
    --star-tail-length: 5.34em;
    --top-offset: 45.5vh;
    --fall-duration: 11.316s;
    --fall-delay: 7.942s;
    }
    .star:nth-child(26) {
    --star-tail-length: 6.21em;
    --top-offset: 78.25vh;
    --fall-duration: 8.457s;
    --fall-delay: 6.924s;
    }
    .star:nth-child(27) {
    --star-tail-length: 7.23em;
    --top-offset: 59.37vh;
    --fall-duration: 9.8s;
    --fall-delay: 2.238s;
    }
    .star:nth-child(28) {
    --star-tail-length: 6.87em;
    --top-offset: 11.36vh;
    --fall-duration: 8.455s;
    --fall-delay: 4.4s;
    }
    .star:nth-child(29) {
    --star-tail-length: 7.22em;
    --top-offset: 65.11vh;
    --fall-duration: 6.284s;
    --fall-delay: 5.16s;
    }
    .star:nth-child(30) {
    --star-tail-length: 6.1em;
    --top-offset: 93.31vh;
    --fall-duration: 8.522s;
    --fall-delay: 7.101s;
    }
    .star:nth-child(31) {
    --star-tail-length: 5.19em;
    --top-offset: 50.3vh;
    --fall-duration: 9.255s;
    --fall-delay: 1.982s;
    }
    .star:nth-child(32) {
    --star-tail-length: 7.3em;
    --top-offset: 41.76vh;
    --fall-duration: 8.449s;
    --fall-delay: 0.012s;
    }
    .star:nth-child(33) {
    --star-tail-length: 5.16em;
    --top-offset: 18.63vh;
    --fall-duration: 6.014s;
    --fall-delay: 0.361s;
    }
    .star:nth-child(34) {
    --star-tail-length: 6.46em;
    --top-offset: 21.97vh;
    --fall-duration: 8.443s;
    --fall-delay: 5.698s;
    }
    .star:nth-child(35) {
    --star-tail-length: 7.25em;
    --top-offset: 35.14vh;
    --fall-duration: 10.884s;
    --fall-delay: 2.936s;
    }
    .star:nth-child(36) {
    --star-tail-length: 6.89em;
    --top-offset: 32.91vh;
    --fall-duration: 9.134s;
    --fall-delay: 7.136s;
    }
    .star:nth-child(37) {
    --star-tail-length: 5.46em;
    --top-offset: 27.94vh;
    --fall-duration: 11.521s;
    --fall-delay: 0.267s;
    }
    .star:nth-child(38) {
    --star-tail-length: 7.12em;
    --top-offset: 79.35vh;
    --fall-duration: 11.291s;
    --fall-delay: 0.218s;
    }
    .star:nth-child(39) {
    --star-tail-length: 6.02em;
    --top-offset: 40.24vh;
    --fall-duration: 9.572s;
    --fall-delay: 4.255s;
    }
    .star:nth-child(40) {
    --star-tail-length: 6.61em;
    --top-offset: 6.44vh;
    --fall-duration: 8.657s;
    --fall-delay: 6.656s;
    }
    .star:nth-child(41) {
    --star-tail-length: 6.02em;
    --top-offset: 58.28vh;
    --fall-duration: 9.635s;
    --fall-delay: 5.192s;
    }
    .star:nth-child(42) {
    --star-tail-length: 5.67em;
    --top-offset: 10.11vh;
    --fall-duration: 11.16s;
    --fall-delay: 2.146s;
    }
    .star:nth-child(43) {
    --star-tail-length: 6.99em;
    --top-offset: 83.67vh;
    --fall-duration: 11.303s;
    --fall-delay: 5.262s;
    }
    .star:nth-child(44) {
    --star-tail-length: 6.35em;
    --top-offset: 22.66vh;
    --fall-duration: 7.903s;
    --fall-delay: 0.819s;
    }
    .star:nth-child(45) {
    --star-tail-length: 7em;
    --top-offset: 78.14vh;
    --fall-duration: 11.192s;
    --fall-delay: 6.549s;
    }
    .star:nth-child(46) {
    --star-tail-length: 6.16em;
    --top-offset: 29.06vh;
    --fall-duration: 6.611s;
    --fall-delay: 3.925s;
    }
    .star:nth-child(47) {
    --star-tail-length: 7.11em;
    --top-offset: 55.44vh;
    --fall-duration: 6.748s;
    --fall-delay: 1.792s;
    }
    .star:nth-child(48) {
    --star-tail-length: 5.01em;
    --top-offset: 99.6vh;
    --fall-duration: 9.091s;
    --fall-delay: 2.171s;
    }
    .star:nth-child(49) {
    --star-tail-length: 6.9em;
    --top-offset: 3.23vh;
    --fall-duration: 7.108s;
    --fall-delay: 6.37s;
    }
    .star:nth-child(50) {
    --star-tail-length: 5.95em;
    --top-offset: 90.46vh;
    --fall-duration: 11.153s;
    --fall-delay: 3.335s;
    }
    .star::before, .star::after {
    position: absolute;
    content: "";
    top: 0;
    left: calc(var(--star-width) / -2);
    width: var(--star-width);
    height: 100%;
    background: linear-gradient(45deg, transparent, currentColor, transparent);
    border-radius: inherit;
    animation: blink 2s linear infinite;
    }
    .star::before {
    transform: rotate(45deg);
    }
    .star::after {
    transform: rotate(-45deg);
    }

    @keyframes fall {
    to {
        transform: translate3d(-30em, 0, 0);
    }
    }
    @keyframes tail-fade {
    0%, 50% {
        width: var(--star-tail-length);
        opacity: 1;
    }
    70%, 80% {
        width: 0;
        opacity: 0.4;
    }
    100% {
        width: 0;
        opacity: 0;
    }
    }
    @keyframes blink {
    50% {
        opacity: 0.6;
    }
    }
</style>