<script setup lang="ts">
import KnowledgeMap from './components/KnowledgeMap.vue'
</script>

<template>
  <div class="app">
    
    <main>
     
      <KnowledgeMap />
    </main>
   
  </div>
</template>

<style>
html, body {
  height: 100%; /* Ensure html and body take full height */
  margin: 0; /* Reset default margin for body */
}

body {
  overflow: hidden; /* Prevent scrollbars if not needed */
}

.app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  height: 100%; /* App container takes full height */
}



main {
  height: 100%; /* Main content takes full height */
}
</style>