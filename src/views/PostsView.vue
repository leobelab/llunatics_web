<template>
    <Header />
    <div class="posts-image">
      <div class="historic">
          <h2>Historial de publicacions</h2>
          <button @click="showModal = true" class="add-post-button">+ Nou post</button>
          <transition name="fade">
            <div v-if="showModal" class="modal" @click="showModal = false">
              <transition name="scale">
                <div class="modal-content" @click.stop>
                  <h2>Crea un nou post</h2>
                  <form @submit.prevent="createPost" class="form-layout">
                    <!-- Área clicable para subir una imagen -->
                    <div class="image-upload" :class="{ 'has-image': newPost.imageFile }">
                      <p v-if="!newPost.imageFile" @click="triggerFileInput">Fes clic per seleccionar una imatge</p>
                      <img v-if="newPost.imageFile" :src="newPost.imagePreview" alt="Preview" @click="triggerFileInput"/>
                    </div>
                    <input 
                      ref="fileInput" 
                      type="file" 
                      accept="image/*" 
                      @change="handleImageUpload" 
                      class="file-input" 
                    />

                    <input id="title" v-model="newPost.title" placeholder="Escriu un títol" required class="form-input" />
                    <textarea id="body" v-model="newPost.body" placeholder="Informació, idees, reunions, publicitat, advertències, ..." required class="form-input textarea"></textarea>
                    <input id="tags" v-model="newPost.tags" placeholder="#junta" class="form-input" />

                    <div class="modal-buttons">
                      <button type="submit" class="btn-submit">Crear</button>
                      <button type="button" @click="showModal = false" class="btn-cancel">Cancelar</button>
                    </div>
                  </form>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      <div v-if="!isCreating">
        <PostList />
      </div>
    </div>
</template>
  
  <script>
  import PostList from '../components/PostList.vue'
  import Header from '../components/Header.vue'
  import { ref } from 'vue';
  import { usePostStore } from '../stores/postStore';

export default {
    components: {
        PostList,
        Header,
    },
    setup() {
    const postStore = usePostStore();
    const showModal = ref(false);
    const isCreating = ref(false);

    const newPost = ref({
      title: '',
      body: '',
      tags: '',
      imageFile: null,
      imagePreview: '',
    });

    const fileInput = ref(null);

    const createPost = async () => {
      isCreating.value = true;
      // Convertir los datos del formulario en un nuevo post
      const currentMaxId = postStore.posts.reduce((max, post) => Math.max(max, Number(post.id)), 0);
      const postData = {
        id: (currentMaxId + 1).toString(),
        title: newPost.value.title,
        body: newPost.value.body,
        image: newPost.value.image,
        tags: newPost.value.tags.split(',').map(tag => tag.trim()), // Convierte la cadena de tags en un array
      };

      try {
        // Llama a la acción addPost del store
        await postStore.addPost(postData);
        isCreating.value = false;
        await postStore.fetchPosts()
        // Limpia el formulario y cierra el modal
        resetForm();
        showModal.value = false;
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };

    const resetForm = () => {
      newPost.value = {
        title: '',
        body: '',
        tags: '',
        imageFile: null,
        imagePreview: '',
      };
    };

    const triggerFileInput = () => {
      fileInput.value.click(); // Abre el selector de ficheros.
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        newPost.value.imageFile = file;
        newPost.value.image = file.name; // Obtiene el nombre del archivo y lo asigna al post
        const reader = new FileReader();
        reader.onload = (e) => {
          newPost.value.imagePreview = e.target.result; // Muestra la vista previa.
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      showModal,
      newPost,
      fileInput,
      createPost,
      triggerFileInput,
      handleImageUpload,
      isCreating,
    };
  },
};
</script>
  
<style scoped>
    .posts-image {
      width: auto; /* Ajusta el ancho al contenedor */
      height: auto; /* Ajusta la altura según lo que necesites */
      background-image: url('../assets/llunatics_logo.png'); /* Ruta de tu imagen */
      background-repeat: repeat; /* Repite la imagen como mosaico */
      background-size: auto; /* Usa el tamaño original de la imagen */
      background-position: center; /* Centra el patrón del mosaico */
      position: relative;
      top: -57px;
      z-index: 2; /* Asegúrate de que tenga la capa adecuada */
    }
    .historic {
        position: relative; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        top: 18px;
        width: 30%; /* Ajustamos el ancho */
        height: 3vw; /* Ajustamos la altura */
        margin: 0 auto; /* Centramos horizontalmente */
        margin-top: 100px;
        margin-bottom: 40px;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 40px;
        padding-bottom: 40px;
        text-align: center;
        background: linear-gradient(90deg, #4a90e2, #a1c4fd);
        border-radius: 25px; /* Bordes circulares */
        z-index: 2; /* Aseguramos que esté encima de las imágenes */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
    }

    .historic h2 {
        margin: 0;
        font-weight: bold;
        font-size: 1.5vw; /* Ajustamos el tamaño del texto */
        letter-spacing: 0.1em;
        color: #fff;
        position: relative;
        z-index: 3; /* Aseguramos que el texto esté encima de todo */
    }
    .add-post-button {
    margin-left: 20px; /* Espacio entre el título y el botón */
    padding: 8px;
    padding-left: 18px;
    padding-right: 28px;
    background-color: #28a745;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    cursor: pointer;
    font-size: 1.vw;
    transition: transform 0.3s ease;
  }

  .add-post-button:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;

  }
/* Fondo del modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 16px;
  width: 90vw;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-upload {
  width: 100%;
  top: -30px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  position: relative;
  text-align: center;
}

.image-upload img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

.image-upload.has-image {
  border: none; /* Elimina el borde discontinúo */
  background-color: transparent; /* Fondo transparente */
  padding: 0; /* Opcional: elimina el relleno */
  cursor: default; /* El área sin imagen no reacciona al clic */
}

.image-upload p {
  color: #aaa;
  font-size: 1rem;
  cursor: pointer;
}

.file-input {
  display: none; /* Oculta el input de archivo real */
}

/* Form layout */
.form-layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-label {
  font-size: 1rem;
  font-weight: bold;
  color: #4a4a4a;
}

.form-input {
  font-family: 'Fjalla One', sans-serif;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
}

.textarea {
  height: 80px;
  resize: none; /* Evita que el usuario cambie el tamaño del textarea */
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-submit {
  font-family: 'Fjalla One', sans-serif;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #45a049;
}

.btn-cancel {
  font-family: 'Fjalla One', sans-serif;
  font-weight: bold;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cancel:hover {
  background-color: #e53935;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.3s ease;
}
.scale-enter-from {
  transform: scale(0.8);
}
.scale-leave-to {
  transform: scale(0.8);
}

/* Animaciones adicionales */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}
  </style>