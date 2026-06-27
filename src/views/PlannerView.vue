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
            <div v-for="(meal, day) in store.weeklyPlan" :key="day">
                <div v-if="!meal" class="flex flex-row">
                    <p>{{ day }}: No hay comidas</p>

                </div>
            </div>
            <p class="boder border-b-2 border-orange-950"></p>
            <div>
                <p>Ingredientes necesarios</p>
                <ul>
                    <li v-for="(ingredient, index) in allIngredients" :key="index">
                        {{ ingredient }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="h-full">
            <div class="flex items-center gap-1 py-2">
                <button @click="$router.go(-1)">
                    <img src="../assets/ArrowLeftBold.svg" alt="Back" class="h-14 w-14" />
                </button>
                <p>Back</p>
            </div>
            <div class="flex flex-col justify-center items-center h-full gap-10">
                <p class="text-4xl text-fuchsia-900">No hay recetas planificadas</p>
                <img src="../assets/taz_cookbook.png" alt="empty">
            </div>
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
        },
        // Funcion para obtener todos los ingredientes de las recetas 
        allIngredients() {
            const listIngredients = []
            for (const [day, meal] of Object.entries(this.store.weeklyPlan)) {
                if (meal) {
                    for (let i = 1; i <= 20; i++) {
                        if (meal[`strIngredient${i}`]) {
                            listIngredients.push(meal[`strIngredient${i}`])
                        }
                    }
                }
            }
            return listIngredients
        }
    },
    mounted() {
        console.log(this.store.weeklyPlan);

    }
}
</script>
<style></style>