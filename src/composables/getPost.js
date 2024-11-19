import { ref, onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'

const getPost = (id) => {
    const postStore = usePostStore()     // Accedemos al store
    const post = ref(null)
    const error = ref(null) //if there's an error with the request

    //We are going to be using async and await to do this
    const loadPost = async () => {
      try {
        await postStore.fetchPost(id)    // Llamada a la acción fetchPost del store
        post.value = postStore.post      // Almacenamos el post obtenido en la variable local
      } catch (err) {
        error.value = "Error al cargar el post: " + err.message // Guardamos cualquier error en la variable local
      }
    }

    onMounted(loadPost)                  // Llamamos a loadPost cuando el componente está montado

    return { post, error, loadPost}
}

export default getPost
