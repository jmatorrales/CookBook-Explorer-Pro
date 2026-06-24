<template>
  <div class="peach min-h-screen flex items-center justify-center">
    <div v-if="loading">
      <p class="text-2xl">Loading...</p>
    </div>
    <div v-else>
      <div class="flex items-center gap-1 py-2">
        <button @click="$router.go(-1)">
          <img src="../assets/ArrowLeftBold.svg" alt="Back" class="h-14 w-14" />
        </button>
        <p>Back</p>
      </div>
      <div v-if="meal" class="flex flex-col gap-7 p-5">
        <p class="text-2xl font-bold text-black">{{ meal.strMeal }}</p>
        <div class="flex flex-row gap-10">
          <RecipeInfo :meal="meal" />
          <RecipeIngredients :meal="meal" />
        </div>
        <RecipeInstructions :meal="meal" />
      </div>
      <!-- Si solo se quiere uno de los hijos cambiar a <router-link> -->
    </div>
  </div>
</template>

<script>
import RecipeInfo from './recipe/ RecipeInfo.vue'
import RecipeIngredients from './recipe/RecipeIngredients.vue'
import RecipeInstructions from './recipe/RecipeInstructions.vue'

export default {
  components: { RecipeInfo, RecipeIngredients, RecipeInstructions },
  data() {
    return {
      meal: null,
      loading: false
    }
  },
  methods: {
    async fetchMeal() {
      this.loading = true
      const id = this.$route.params.id
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const data = await response.json()
      this.meal = data.meals[0]
      this.loading = false
    }
  },
  mounted() {
    this.fetchMeal()
  }
}
</script>