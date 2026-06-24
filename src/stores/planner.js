import { defineStore } from "pinia";

export const usePlanner = defineStore("planner", {
  state: () => ({
    recipes: [],
    loading: false,
    recipesCache: {},
    weeklyPlan: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
      Saturday: null,
      Sunday: null,
    },
  }),
  actions: {
    async fetchSearchRecipesByLetter(letter) {
      if (this.recipesCache[letter]) {
        this.recipes = this.recipesCache[letter];
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.recipes = data.meals || [];
        this.recipesCache[letter] = data.meals || [];
      } catch (error) {
        console.error(error);
        window.alert(
          "An error occurred while fetching recipes. Please try again later.",
        );
      } finally {
        this.loading = false;
      }
    },
    // Asigna una receta a un día específico de la semana
    assignMeal(day, meal) {
      if (this.weeklyPlan.hasOwnProperty(day)) {
        this.weeklyPlan[day] = meal;
        console.log(`Added ${meal.strMeal} to ${day}`);
      } else {
        console.error(`Invalid day: ${day}`);
      }
    },
    // TODO: Elimina la receta asignada a un dia específico de la semana
    removeMeal(day) {
      if (this.weeklyPlan.hasOwnProperty(day)) {
        this.weeklyPlan[day] = null;
        console.log(`Removed meal from ${day}`);
      } else {
        console.error(`Invalid day: ${day}`);
      }
    },
    // TODO:Devuelve cuántos días tienen asignada una receta
    plannedDays(recipeId) {
      return Object.values(this.weeklyPlan).filter(
        (meal) => meal && meal.idMeal === recipeId,
      ).length;
    },
    // Devuelve los días que todavía no tienen asignada una receta
    emptyDays() {
      return Object.keys(this.weeklyPlan).filter(
        (day) => this.weeklyPlan[day] === null,
      );
    },
  },
});
