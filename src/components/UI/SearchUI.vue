<template>
    <div class="search">
        <v-text-field
            v-model="query"
            :rules="rules"
            label="Search package"
            @input="search"
        ></v-text-field>
    </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
    name: "SearchUI",
    data: () => ({
        query: '',
        minChars: 2,
        rules: [],
        queryTimeout: null,
    }),
    methods: {
        ...mapActions(["fetchPackages"]),
        ...mapMutations(["setText", "clearPackages", "clearPages", "setOffset", "setCurrentPage"]),
        search() {
            if(this.query.length >= this.minChars) {
                clearTimeout(this.queryTimeout);
                this.queryTimeout = setTimeout(() => {
                    this.setText(this.query);
                    this.setCurrentPage(1);
                    this.setOffset();
                    this.fetchPackages();
                }, 500);
            }
            else {
                this.clearPackages();
                this.clearPages();
                this.setCurrentPage(1);
                this.setOffset();
            }
        },
    },
    created() {
        this.rules = [
            value => !!value || 'Required.',
            value => (value && value.length >= this.minChars) || `Min ${this.minChars} characters`,
        ]
    }
}
</script>

<style scoped>
.search {
    max-width: 600px;
    margin: 0 auto;
}
</style>