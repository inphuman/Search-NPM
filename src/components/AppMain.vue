<template>
    <content class="pt-10 pb-10">
        <v-main>
            <v-container>
                <SearchUI />
            </v-container>

            <v-container class="pt-4">
                <ProgressLinear :class="{hide: !loading}" />
                <img
                    v-if="!packagesList.length"
                    src="@/assets/img/nodatafound.png"
                    class="no-data text-center"
                >
                <PackagesList />
            </v-container>
        </v-main>
    </content>
</template>

<script>
import PackagesList from "@/components/Packages/PackagesList.vue";
import SearchUI from "@/components/UI/SearchUI.vue";

import {mapGetters} from "vuex";
import ProgressLinear from "@/components/UI/ProgressLinear.vue";

export default {
    name: "AppMain",
    components: {
        ProgressLinear,
        PackagesList,
        SearchUI
    },
    computed: mapGetters(["packagesList", "loading"]),
}
</script>

<style lang="scss" scoped>
content {
    min-height: calc(100vh - 100px);
}

.no-data {
    display: flex;
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
}

.hide {
    opacity: 0;
}
</style>