import Vue from "vue";
import Vuex from "vuex";

import packagesModule from "@/store/modules/packages-module";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        packagesModule
    }
})