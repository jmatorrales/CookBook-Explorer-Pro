<template>
    <div class="peach flex flex-col">
        <div class="flex flex-wrap gap-4 p-4 justify-center">
            <button v-for="letter in alphabet" :key="letter" @click="activeLetter = letter; filterByLetter(letter)"
                :disabled="activeLetter === letter"
                :class="activeLetter === letter ? 'bg-green-400' : 'bg-mint hover:bg-warm_gray'"
                class="px-3 py-1 rounded">
                {{ letter }}
            </button>
        </div>
        <div class="flex flex-row p-4 gap-4 flex-wrap justify-center">
            <div v-for="recipe in store.recipes" :key="recipe.idMeal"
                class="flex flex-col items-center h-72 w-48 p-3 gap-2 bg-taupe border border-gray-600 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                @click="selectedMeal(recipe)">
                <img :src="recipe.strMealThumb" :alt="recipe.strMeal">
                <h3 class="text-white">{{ recipe.strMeal }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { usePlanner } from '../stores/planner'

export default {
    data() {
        return {
            alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            activeLetter: null,
        }
    },
    setup() {
        const store = usePlanner()
        return { store }
    },
    methods: {
        filterByLetter(letter) {
            this.activeLetter = letter;
            // Llamar a API con el parámetro de letra
            this.store.fetchSearchRecipesByLetter(letter);
        },
        selectedMeal(meal) {
            //this.$emit('meal-selected', meal);
            this.$router.push(`/recipe/${meal.idMeal}`)
        }
    },
    mounted() {
        // Cargar recetas por defecto (por ejemplo, la letra 'A')
        this.filterByLetter('A');
    }
}
</script>
<style></style>