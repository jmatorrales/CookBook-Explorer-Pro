<template>
    <div class="flex flex-col gap-3 p-4">
        <p class="text-xl underline">Instructions:</p>
        <!-- <p>{{ meal.strInstructions }}</p> -->
        <ol class=" list-inside space-y-3">
            <li v-for="(step, index) in steps" :key="index">
                {{ step }}
            </li>
        </ol>
        <div v-if="meal.strYoutube" class="flex flex-col justify-center p-4">
            <div class="flex justify-center">
                <iframe :src="youtubeEmbed" width="560" height="315" class="rounded" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['meal'],
    computed: {
        steps() {
            const regex = /step\s\d+\s[^]*?(?=step\s\d+|$)/gi
            return this.meal.strInstructions
                .match(regex)
                .map(step => step.trim())
        },
        youtubeThumb() {
            const videoId = this.meal.strYoutube.split('v=')[1]
            return `https://img.youtube.com/vi/${videoId}/0.jpg`
        },
        youtubeEmbed() {
            const videoId = this.meal.strYoutube.split('v=')[1]
            return `https://www.youtube.com/embed/${videoId}`
        }
    }
}
</script>