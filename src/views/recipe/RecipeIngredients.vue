<template>
    <div class="flex flex-col p-5 gap-4">
        <p class="text-xl underline">Ingredients:</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 gap-x-10">
            <div v-for="ing in ingredients" :key="ing.ingredient">
                {{ ing.measure }} - {{ ing.ingredient }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['meal'],
    computed: {
        ingredients() {
            const list = []
            for (let i = 1; i <= 20; i++) {
                if (this.meal[`strIngredient${i}`]) {
                    list.push({
                        ingredient: this.meal[`strIngredient${i}`],
                        measure: this.meal[`strMeasure${i}`]
                    })
                }
            }
            return list
        }
    }
}
</script>
<style></style>