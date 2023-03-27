<template>
    <v-app>
        <AppBar/>
        <AppMain/>
        <AppFooter />
    </v-app>
</template>

<script>

import AppBar from "@/components/AppBar.vue";
import AppMain from "@/components/AppMain.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
    name: 'App',

    components: {
        AppFooter,
        AppMain,
        AppBar
    }
};
</script>
