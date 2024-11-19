<template>

  <Header />
  <!-- Contenidor de l'imagen principal -->
  <div class="image-container">
    <div class="gradient-overlay"></div>
    <img src="../assets/llunatics_group.png" alt="Imagen principal" class="full-screen-image" />
  
    <!-- Capa overlay pel subtext del títol -->
    <div class="overlay">
        <h1>Llunàtics</h1>
        <p>Arrivem a la lluna</p>
    </div>
</div>

  <div class="posts-container">
    <img src="../assets/2_main_image.jpeg" alt="Segunda imagen" class="secondary-image" />

    <!-- Etiqueta "ÚLTIMS POSTS" --> 
    <div class="ultims-posts"> 
      <h2>ÚLTIMS POSTS</h2> 
    </div>
    <LastPostList />
  </div>

  <div class="video-container">
    <video class="video" autoplay muted loop>
      <source src="../assets/llunatics_join.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
    <div class="text-overlay">
      <h2>Som Llunàtics</h2>
      <button class="join-btn">Uneix-te a Llunàtics !</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LastPostList from '../components/LastPostList.vue'
import Header from '../components/Header.vue'

//For Reusable composable functions
// import getPosts from '../composables/getPosts'

export default {
  name: 'HomeView',
  components: {
    LastPostList,
    Header,
  },
  setup() {
  //   const { posts, error, load } = getPosts()

  //   load()//we call load and posts and error will have a value

  //   return { posts, error}
  }

}
</script>

<style scoped>

/* Contenedor de la imagen */
.image-container {
  position: relative;
  width: 100%;
  height: 95vh;
  overflow: hidden;
}

.full-screen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.1);
}

.gradient-overlay {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5%; /* Aumentamos la altura del gradiente para una transición más suave */
  background: linear-gradient(to bottom, rgba(12, 29, 121, 0.8), #a0bfeb);
  z-index: 1;
}


.image-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(to bottom, rgba(37, 68, 148, 0.5), rgba(10, 49, 146, 0));
  pointer-events: none;
  transition: background 0.5s ease;
}

.posts-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.secondary-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  opacity: 0.5; /* Ajuste de opacidad para dar contraste a los posts */
  position: absolute; /*   CON UN ABSOLUTE AQUÍ RESOLVEMOS EL PROBLEMA DE SUPERPOSICIÓN DE LOS POSTS PERO LA IMAGEN SE CORTA Y MUEVE (TOP, LEFT)*/
  top: 0;
  left: 0;
  z-index: -1; /* Asegura que esté detrás del contenido */
}

.posts-overlay {
  position: relative;
  z-index: 2;
  padding: 20px;
}

/* Overlay semitransparente para el texto */
.overlay {
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  color: white;
  padding: 0 5%; /* Un pequeño padding con porcentaje */
  transition: background-color 0.3s ease;
}

.overlay h1 {
  font-size: 8vw; /* Ajustamos el tamaño del texto de "Llunàtics" a un 8% del ancho de la pantalla */
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(90deg, #495af3, #ffffff);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.12em;
  transition: transform 0.3s ease; /* Añadimos transición para el estado normal */
}

.overlay h1:hover {
  transform: scale(1.02);
  transition: transform 0.5s ease; /* Añadimos transición para el efecto hover */
}

.overlay p {
  font-size: 2.5vw;
  margin-top: -20px;
  font-weight: 300;
  color: #d4d4e0;
  background: linear-gradient(90deg, #061ce0, #ffffff);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  filter: brightness(1.3);
  text-transform: uppercase;
  transition: transform 0.5s ease; /* Añadimos transición para el efecto hover */
}

.overlay p:hover {
  transform: scale(1.02);
  transition: transform 0.5s ease; /* Añadimos transición para el efecto hover */
}

.ultims-posts {
  position: relative; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  top: 12px;
  width: 30%; /* Ajustamos el ancho */
  height: 3vw; /* Ajustamos la altura */
  margin: 0 auto; /* Centramos horizontalmente */
  text-align: center;
  background: linear-gradient(90deg, #4a90e2, #a1c4fd);
  border-radius: 25px; /* Bordes circulares */
  z-index: 2; /* Aseguramos que esté encima de las imágenes */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
}

.ultims-posts h2 {
  margin: 0;
  font-weight: bold;
  font-size: 1.5vw; /* Ajustamos el tamaño del texto */
  letter-spacing: 0.1em;
  color: #fff;
  position: relative;
  z-index: 3; /* Aseguramos que el texto esté encima de todo */
}



.video-container {
  position: relative;
  width: 100%;
  height: 94vh; /* Reducción de altura del video */
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}


.text-overlay {
  position: absolute;
  top: 60%;
  left: 2%;
  transform: (-50%, -50%);
  color: white;
  text-align: center;
  z-index: 1;
}

.text-overlay h2 {
  font-size: 2.5vw; /* Aumentamos el tamaño del texto */
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.7); /* Sombra más marcada */
  background: linear-gradient(45deg, #f0a500, #c90076); /* Gradiente más moderno */
  background-clip: text;
  -webkit-background-clip: text;
}

.join-btn {
  font-family: 'Fjalla One', sans-serif;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border: none;
  padding: 10px 22px;
  font-size: 1.5em;
  cursor: pointer;
  border-radius: 9px;
  margin-top: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra para el botón */
}

.join-btn:hover {
  background: rgb(16, 98, 220); /* Gradiente en hover */
  transition: background 0.2s ease;
}

/* Media Queries para pantallas pequeñas */
@media (max-width: 768px) {
  header {
    padding: 8px 2%; /* Ajustamos el padding para pantallas más pequeñas */
    flex-direction: column; /* Cambiar el layout a vertical */
    align-items: center;
  }

  .logo {
    height: 8vw; /* Ajuste más pequeño para el logo */
  }

  .title {
    font-size: 4vw; /* Reducimos el tamaño de la fuente del título */
  }

  .main-nav {
    font-size: 2.5vw; /* Ajustamos el tamaño del texto de forma proporcional al ancho de la pantalla */
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center; /* Centramos la barra de navegación */
  }

  .overlay {
    font-size: 8vw; /* Reducimos el tamaño del título a un 10% de la pantalla */
  }

  .overlay p {
    font-size: 2.5vw; /* Ajuste en el tamaño del subtítulo */
  }

  .text-overlay h2 {
    font-size: 8vw;
  }

  .join-btn {
    font-size: 1.2em;
    padding: 12px 24px;
  }
}

@media (max-width: 480px) {
  header {
    padding: 15px 5%;
  }

  .logo {
    height: 12vw; /* Ajustamos aún más el logo */
  }

  .title {
    font-size: 6vw; /* Ajustamos el tamaño del texto del título */
  }

  .main-nav {
    gap: 0.8rem;
    justify-content: center; /* Mantener la navegación centrada */
  }

  .overlay {
    font-size: 12vw; /* Ajustamos el tamaño para dispositivos móviles */
  }

  .overlay p {
    font-size: 2.5vw; /* Ajuste en el tamaño del subtítulo */
  }

  .text-overlay h2 {
    font-size: 8vw;
  }

  .join-btn {
    font-size: 1.2em;
    padding: 12px 24px;
  }
}
</style>
