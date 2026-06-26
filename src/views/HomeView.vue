<template>
    <div class="flex flex-col h-screen">
        <Navbar />
        <RouterView class="flex-1" />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { RouterView } from 'vue-router'
export default {
    components: {
        Navbar,
        RouterView
    },
    data() {
        return {
            nombre: "Home",
        }
    }
}
</script>

<style></style>
