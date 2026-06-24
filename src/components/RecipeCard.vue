<template>
    <div>
        <h3>{{ recipe.strMeal }}</h3>
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" />
        <p>{{ recipe.strInstructions }}</p>
    </div>
</template>
<script>
import { usePlanner } from '../../stores/planner'
export default {
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
}
</script>
<style>
    
</style>