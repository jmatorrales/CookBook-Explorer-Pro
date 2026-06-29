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
            <!-- Calendario semanal de recetas planificadas -->
            <div>
                <button @click="store.clearPlanner"
                    class="px-3  mx-2  bg-mint rounded-md border border-green-600 hover:bg-emerald-500 hover:border-cream">
                    Limpiar todo
                </button>
            </div>
            <!-- <div class="flex flex-row gap-2">
                <div v-for="(meal, day) in store.weeklyPlan" :key="day">
                    <div v-if="meal" @click="selectedMeal(meal)"
                        class="w-72 min-h-96 p-5 border border-black bg-yellow-50 flex flex-col cursor-pointer">
                        <p class="self-center pb-5 text-xl">{{ day }}</p>
                        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-64 h-64 object-cover" />
                        <p class="">{{ meal.strMeal }}</p>
                    </div>
                </div>
            </div> -->
            <div class="flex flex-row gap-2">
                <div v-for="(meal, day) in store.weeklyPlan" :key="day">
                    <div v-if="meal"
                        class="w-72 min-h-96 p-5 border border-black bg-yellow-50 flex flex-col cursor-pointer relative group"
                        @click="selectedMeal(meal)">

                        <!-- Contenido normal -->
                        <p class="self-center pb-5 text-xl">{{ day }}</p>
                        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-64 h-64 object-cover" />
                        <p class="">{{ meal.strMeal }}</p>

                        <!-- Basura que aparece al hover -->
                        <button @click.stop="deleteMeal(day)"
                            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <img src="../assets/GgTrash.svg" alt="delete" class="h-8 w-8">
                        </button>
                    </div>
                </div>
            </div>

            <p class="boder border-b-2 border-orange-950"></p>

            <!-- Días sin comidas planificadas -->
            <div v-if="noMealDays.length > 0" class="flex flex-row gap-1">
                <p>No hay asignado ninguna comida en los días:
                    <span class="font-bold">{{ noMealDays.join(', ') }}</span>
                </p>
            </div>

            <p class="boder border-b-2 border-orange-950"></p>

            <!-- Lista de ingredientes general con opción a imprimir -->
            <div>
                <button @click="printIngredients" class="py-2 rounded">
                    <img src="../assets/FaPrint.svg" alt="printer" class="h-7">
                </button>
                <div id="list-of-ingredients">
                    <p>Ingredientes necesarios</p>
                    <ul>
                        <li v-for="(ingredient, index) in allIngredients" :key="index">
                            {{ ingredient }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- En caso que no haya comidas planificadas se notificara con el siguiente contenido -->
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
        },
        noMealDays() {
            return Object.entries(this.store.weeklyPlan)
                .filter(([day, meal]) => !meal)
                .map(([day]) => day)
        },
    },
    methods: {
        selectedMeal(meal) {
            this.$router.push(`/recipe/${meal.idMeal}`)
        },
        printIngredients() {
            window.print()
        },
        deleteMeal(day) {
            this.store.removeMealFromDay(day) // o como se llame tu función
        },
    },
    mounted() {
        console.log(this.store.weeklyPlan);

    }
}
</script>
<style>
@media print {
    body * {
        display: none;
    }

    #list-of-ingredients {
        display: block;
    }
}
</style>