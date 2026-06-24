<script setup>
</script>

<template>
  <nav class="bg-red-400 text-white flex flex-row items-center justify-between p-4">
    <router-link to="/" class="flex items-center gap-4 p-4">
      <h1 class="text-2xl font-bold">CookBook Explorer</h1>
      <img src="../assets/taz_eat.png" alt="Logo" class="h-16 w-16 rounded-full mt-2" />
    </router-link>
    <div class="flex flex-row gap-6 px-3">
      <router-link to="/" class="hover:opacity-80">
        <h1 class="text-base font-bold">Home</h1>
      </router-link>
      <router-link to="/planner" class="hover:opacity-80">
        <h1 class="text-base font-bold">Planner</h1>
      </router-link>
    </div>

  </nav>
</template>
