<template>
    <Header />

    <div class="group-view">
        <UserList />
    </div>
</template>
  
<script>
import UserList from '@/components/UserList.vue';  
import Header from '../components/Header.vue'

export default {
    components: {
        UserList,
        Header
    },
    name: 'GroupView',
    setup() {

    },
  };
  </script>
  
  <style scoped>
  .group-view {
    padding: 20px;
  }
  
  .user-card {
    border: 1px solid #ddd;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .user-card h2 {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  
  .user-card p {
    font-size: 1rem;
    margin: 2px 0;
  }
  </style>
  