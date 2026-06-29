// función reutilizable que encapsula lógica (especialmente con reactividad de Vue).
import { toast } from "vue-sonner";
import { usePlanner } from "../stores/planner";

export function useToastActions() {
  const store = usePlanner();

  const addMealWithToast = (day, meal) => {
    store.assignMeal(day, meal);
    toast.success(`The recipe has been added successfully!`, {
      duration: 2500,
      closeButton: false,
      // Usamos classes para estilizar el contenedor del toast
      classes: {
        toast:
          "bg-green-500 border border-green-800 text-white rounded-xl shadow-xl  flex items-center justify-center p-4 min-w-[250px] max-w-[320px] max-h-[10px]",
        title: "text-sm font-medium text-white",
      },
    });
  };

  const removeMealWithToast = (day) => {
    const meal = store.weeklyPlan[day];
    store.removeMeal(day);
    toast.success(`Receta eliminada de ${day}`);
  };

  return { addMealWithToast, removeMealWithToast };
}
