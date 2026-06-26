<template>
    <div class="peach">
        <!-- Bucle que recorre dentro de weeklyPlan los dias de la semana, si no hay nada en ninguna muestra una imagen sino muestra la receta en el dia concreto -->
        <!-- <div v-for="(meal, day) in store.weeklyPlan" :key="day" class="p-4 border flex flex-row">
            <div v-if="!meal">
                <img src="../assets/taz_cookbook.jpeg" alt="empty">
            </div>
            <div v-else>
                <h3>{{ day }}</h3>
                <h4>{{ store.strMeal }}</h4>
                <img :src="store.strMealThumb" :alt="store.strMeal">
            </div>
        </div> -->
        <div v-if="hasPlannings" class="p-3 flex flex-col gap-3">
            <div v-for="(meal, day) in store.weeklyPlan" :key="day">
                <div v-if="meal">
                    <p>{{ day }}: {{ meal.strMeal }}</p>
                </div>                
            </div>
            <p class="boder border-b-2 border-orange-950"></p>
            <div v-for="(meal,day) in store.weeklyPlan" :key="day">
                <div v-if="!meal" class="flex flex-row">
                    <p>{{ day }}: No hay comidas</p>
                    
                </div>
            </div>
            <p class="boder border-b-2 border-orange-950"></p>
        </div>
        <div v-else>
            <img src="../assets/taz_cookbook.jpeg" alt="empty">
        </div>
    </div>
</template>
<script>
import { usePlanner } from '../stores/planner'
export default {
    setup() {
        const store = usePlanner()
        return { store }
    },
    computed: {
        hasPlannings() {
            return Object.values(this.store.weeklyPlan).some(meal => meal !== null)
        }
    },
    mounted() {
        console.log(this.store.weeklyPlan);

    }
}
</script>
<style></style>