import { createRouter, createWebHistory } from "vue-router";
import RecipeLayout from "../views/ RecipeLayout.vue";
import RecipeInfo from "../views/recipe/ RecipeInfo.vue";
import RecipeIngredients from "../views/recipe/RecipeIngredients.vue";
import RecipeInstructions from "../views/recipe/RecipeInstructions.vue";
import PlannerView from "../views/PlannerView.vue";

const routes = [
  { path: "/", component: () => import("../views/SearchView.vue") },
  {
    path: "/recipe/:id",
    component: RecipeLayout,
    children: [
      { path: "", component: RecipeInfo },
      { path: "ingredients", component: RecipeIngredients },
      { path: "instructions", component: RecipeInstructions },
    ],
  },
  { path: "/planner", component: PlannerView },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
