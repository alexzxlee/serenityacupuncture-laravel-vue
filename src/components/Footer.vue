<template>
    <v-footer class="d-flex flex-column">
        <v-bottom-navigation>
            <div class="bg-white d-flex w-100 align-center px-4">
                © Copyright {{ new Date().getFullYear() }}, Serenity Acupuncture. All rights reserved.
            </div>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon.name" :href="icon.link" variant="plain" size="small"></v-btn>
        </v-bottom-navigation>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        // icons: [
        //     'mdi-facebook',
        //     'mdi-twitter',
        //     'mdi-linkedin',
        //     'mdi-instagram',
        // ],
        icons: [
            {
                name: 'mdi-facebook',
                link: 'https://www.facebook.com/'
            },
            {
                name: 'mdi-twitter',
                link: 'https://www.twitter.com'
            },
            {
                name: 'mdi-linkedin',
                link: 'https://www.linkedin.com'
            },
            {
                name: 'mdi-instagram',
                link: 'https://www.instagram.com'
            },
        ],
    }),
}
</script>