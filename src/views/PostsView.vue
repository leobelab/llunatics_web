<template>
    <Header />
    <div class="historic">
        <h2>Historial de publicacions</h2>
    </div>
    <PostList />
</template>
  
  <script>
  import PostList from '../components/PostList.vue'
  import Header from '../components/Header.vue'

export default {
    components: {
        PostList,
        Header,
    },
    setup () {

    },
}
  </script>
  
<style scoped>
    .historic {
        position: relative; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        top: 12px;
        width: 30%; /* Ajustamos el ancho */
        height: 3vw; /* Ajustamos la altura */
        margin: 0 auto; /* Centramos horizontalmente */
        margin-top: 100px;
        margin-bottom: 40px;
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
  </style>