<template>
    <v-dialog
        width="70%"
        :value="packageModal.status"
        @click:outside="close"
    >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                {{ packageModal.package.name }}
            </v-card-title>

            <v-card-text class="mt-8">
                <LoaderUI v-if="loading"/>

                <div v-else>
                    <h3>Description</h3>
                    <div>
                        {{ packageModal.package.description ? packageModal.package.description : "No description available" }}
                    </div>

                    <h3 class="mt-4">Publisher</h3>
                    <div>
                        {{ packageModal.package.publisher?.username }}
                    </div>

                    <h3 class="mt-4">Usage stats</h3>
                    <div>
                        <div>
                            <strong>Rank</strong>: {{ packageUsegeStats.rank ? packageUsegeStats.rank : 'n/a' }}
                        </div>
                        <div>
                            <strong>Total</strong>: {{ packageUsegeStats.total ? packageUsegeStats.total : 'n/a' }}
                        </div>
                        <div>
                            <strong>Type rank</strong>: {{ packageUsegeStats.typeRank ? packageUsegeStats.typeRank : 'n/a' }}
                        </div>
                    </div>

                    <h3 class="mt-4">Versions</h3>
                    <div>
                        <div v-for="(item, i) in packageVersions.versions" :key="i">
                            {{ item }}
                        </div>
                    </div>
                </div>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="close"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import LoaderUI from "@/components/UI/LoaderUI.vue";

export default {
    name: "PackageModal",
    components: {LoaderUI},
    data: () => ({
        loading: true,
    }),
    computed: mapGetters(["packageModal", "packageVersions", "packageUsegeStats"]),
    methods: {
        ...mapActions(["fetchPackageVersions", "fetchPackageUsegeStats"]),
        ...mapMutations(["setPackageModal"]),
        close() {
          this.setPackageModal({
              status: false
          });
        }
    },
    async mounted() {
        await this.fetchPackageVersions(this.packageModal.package.name);
        await this.fetchPackageUsegeStats(this.packageModal.package.name);

        this.loading = false;
    }
}
</script>