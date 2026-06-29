<template>
    <div class="flex flex-col">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-64 h-64 object-cover" />
        <p class="text-lg">Category: {{ meal.strCategory }}</p>
        <p class="text-lg">Country: {{ meal.strCountry }}</p>
        <div class="py-5 flex items-center">
            <select v-model="selectedDay" class="ml-2 p-2 rounded">
                <option value="" disabled>Select a day</option>
                <option v-for="day in days" :key="day" :value="day">
                    {{ day }}
                </option>
            </select>
            <button class="h-10 w-10 ml-2 hover:opacity-80" @click="addWithToast">
                <img src="../../assets/addSquareSolid.svg" alt="add">
            </button>
        </div>
    </div>
</template>

<script>
import { useToastActions } from '../../composables/useToastAction'

export default {
    props: ['meal'],
    setup() {
        const { addMealWithToast } = useToastActions()
        return { addMealWithToast }
    },
    data() {
        return {
            selectedDay: '',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    },
    methods: {
        addWithToast() {
            if (this.selectedDay) {
                this.addMealWithToast(this.selectedDay, this.meal)
                this.selectedDay = ''
            }
        }
    }
}
</script>