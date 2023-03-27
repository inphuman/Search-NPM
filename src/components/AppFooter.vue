<template>
    <v-footer class="pa-0">
        <v-card
            flat
            tile
            width="100%"
            class="red lighten-1 text-center"
        >
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Search NPM</strong>
                <div>
                    Candidate: <strong>Igor Ponomarenko</strong>
                </div>
                <div>
                    GitHub:
                    <a href="https://github.com/inphuman?tab=repositories" target="_blank" style="color: #fff">
                        <strong>Link</strong>
                    </a>
                </div>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "AppFooter"
}
</script>

<style lang="scss" scoped>
footer {
    min-height: 100px;

    .v-card {
        min-height: 100px;
    }
}

a {
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>