import { defineStore } from "pinia";

export const usePlanner = defineStore("planner", {
  // Estado global del planificador
  state: () => ({
    recipes: [],                    // Array de recetas obtenidas de la API
    loading: false,                 // Flag de carga durante peticiones
    recipesCache: {},               // Caché de recetas por letra (evita peticiones duplicadas)
    weeklyPlan: {                   // Plan semanal: cada día contiene null o un objeto meal completo
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
      Saturday: null,
      Sunday: null,
    },
    activeLetter: 'A',
  }),
  actions: {
    // Obtiene recetas por letra desde la API, usa caché si ya las cargó
    async fetchSearchRecipesByLetter(letter) {
      // Si ya están en caché, usarlas sin hacer otra petición
      if (this.recipesCache[letter]) {
        this.recipes = this.recipesCache[letter];
        return;
      }
      
      this.loading = true;
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        this.recipes = data.meals || [];
        this.recipesCache[letter] = data.meals || []; // Guardar en caché
      } catch (error) {
        console.error(error);
        window.alert("An error occurred while fetching recipes. Please try again later.");
      } finally {
        this.loading = false;
      }
    },

    // Asigna una receta a un día específico (reemplaza si ya hay una)
    assignMeal(day, meal) {
      if (this.weeklyPlan.hasOwnProperty(day)) {
        this.weeklyPlan[day] = meal;
        console.log(`Added ${meal.strMeal} to ${day}`);
      } else {
        console.error(`Invalid day: ${day}`);
      }
    },

    // Elimina la receta de un día específico (lo deja en null)
    removeMealFromDay(day) {
      if (this.weeklyPlan.hasOwnProperty(day)) {
        this.weeklyPlan[day] = null;
        console.log(`Removed meal from ${day}`);
      } else {
        console.error(`Invalid day: ${day}`);
      }
    },

    // Vacía completamente el planificador
    clearPlanner() {
      Object.keys(this.weeklyPlan).forEach(day => {
        this.weeklyPlan[day] = null;
      });
      console.log("Planner cleared");
    },
  },

  // Getters: propiedades derivadas reactivas
  getters: {
    // Devuelve cuántos días tienen receta asignada
    plannedDays: (state) => {
      return Object.values(state.weeklyPlan).filter(meal => meal !== null).length;
    },

    // Devuelve array de días vacíos (sin receta)
    emptyDays: (state) => {
      return Object.keys(state.weeklyPlan).filter(day => state.weeklyPlan[day] === null);
    },
  },
});