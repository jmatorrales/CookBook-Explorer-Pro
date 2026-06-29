<script setup>
import { Toaster } from 'vue-sonner';
import HomeView from './views/HomeView.vue'
</script>

<template>
  <!-- Añadimos toaster para meter notificaciones por todos los componentes -->
  <Toaster position="bottom-center" richColors :toastOptions="{
    style: { position: 'fixed', zIndex: 9999 }
  }" />
  <HomeView />
</template>
