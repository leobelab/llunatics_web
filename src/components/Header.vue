<template>
   <header>
  <!-- Secció header amb logo i navegadors -->
    <div class="logo-section">
      <img src="../assets/llunatics_logo.png" alt="Logo" class="logo" />
      <router-link to="/" class="title">
        <strong>Llunàtics</strong>
      </router-link>
    </div>
    <nav class="main-nav">
      <router-link to="/rehearsals">Assajos</router-link>
      <router-link to="/calendar">Calendari</router-link>
      <router-link to="/group">Colla</router-link>
      <router-link to="/posts">Publicacions</router-link>
      <router-link to="/about">Coneix-nos</router-link>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5%;
  background: rgba(42, 85, 163, 0.3); /* Azul más transparente */
  -webkit-backdrop-filter: blur(20px); /* Compatibilidad con Safari */
  backdrop-filter: blur(20px);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background 0.3s ease, backdrop-filter 0.3s ease; /* Suaviza los cambios */
  flex-wrap: wrap;
}

.logo-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.logo {
  height: 2.2vw; /* Ajustem la mida del logo en funció de l'amplada de la pantalla */
  max-height: 50px; /* Per evitar que el logo es faci massa pequeño */
  width: auto;
  margin-right: 1rem;
}
.title {
  font-size: 1.6vw; /* Ajustamos el tamaño del texto de forma proporcional al ancho de la pantalla */
  font-weight: 700;
  filter: brightness(1.2);
  background: linear-gradient(90deg, #4a90e2, #a1c4fd);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.title:hover {
  transform: scale(1.05);
}

.main-nav {
  font-size: 1.2vw; /* Ajustamos el tamaño del texto de forma proporcional al ancho de la pantalla */
  display: flex;
  gap: 4rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.main-nav a {
  font-weight: normal;
  color: #ffffff;
  text-decoration: none;
  -webkit-text-stroke: 0.5px rgba(0, 0, 139, 0.8);
  transition: transform 0.2s ease;
}

.main-nav a:hover {
  color: #60e3e5;
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.main-nav a.router-link-exact-active {
  color: #051326;
  -webkit-text-stroke: 2px rgba(0, 0, 139, 1); /* Borde persistente en estado activo */
}
</style>