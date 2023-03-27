<template>
    <div>
        <div v-if="packagesList.length">
            <div class="packages-list">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    Description
                                </th>
                                <th class="text-left">
                                    Publisher
                                </th>
                                <th class="text-left">
                                    Version
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, i) in packagesList"
                                :key="i"
                                @click="showPackageModal(item)"
                                class="pointer"
                            >
                                <td>
                                    {{ item.package.name }}
                                </td>
                                <td>{{ item.package.description ? item.package.description : "No description available" }}</td>
                                <td>{{ item.package.publisher?.username }}</td>
                                <td>{{ item.package.version }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>
        </div>

        <PackageModal v-if="packageModal.status" />

        <div v-if="pages >= 2" class="text-center mt-10">
            <v-pagination
                :value="currentPage"
                :length="pages"
                :total-visible="7"
                @input="changePage"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import PackageModal from "@/components/Packages/PackageModal.vue";

export default {
    name: "PackagesList",
    components: {PackageModal},
    computed: mapGetters(["packagesList", "pages", "currentPage", "packageModal", "loading"]),
    methods: {
        ...mapActions(["fetchPackages"]),
        ...mapMutations(["setOffset", "setCurrentPage", "setPackageModal"]),
        changePage(page) {
            this.setCurrentPage(page);
            this.setOffset();
            this.fetchPackages();
        },
        showPackageModal(item) {
            this.setPackageModal({
                status: true,
                ...item,
            })
        }
    }
}
</script>

<style lang="scss">
.pointer {
    &:hover {
        cursor: pointer;
    }
}
</style>