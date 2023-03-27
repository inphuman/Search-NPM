import axios from 'axios';

// TODO move to .env
const npmjsBaseURL = "https://registry.npmjs.org/-/v1";
const jsdelivrBaseURL = "https://data.jsdelivr.com/v1";

const state = {
    packages: [],
    loading: false,
    text: '',
    currentPage: 1,
    perPage: 10,
    offset: 0,
    pages: 0,
    packageModal: {
        status: false,
    },
    packageVersions: [],
    packageUsegeStats: [],
};

const getters = {
    packagesList: state => state.packages,
    loading: state => state.loading,
    pages: state => state.pages,
    currentPage: state => state.currentPage,
    packageModal: state => state.packageModal,
    packageVersions: state => state.packageVersions,
    packageUsegeStats: state => state.packageUsegeStats,
};

const actions = {
    async fetchPackages({state, commit}) {
        commit("setLoading", true);

        try {
            // Search npm packages
            const response = await axios.get(`${npmjsBaseURL}/search?text=${state.text}&size=${state.perPage}&from=${state.offset}`);
            commit("setPackages", response.data.objects);
            commit("setPages", response.data.total);
        } catch (error) {
            // TODO create display error message
            console.log(error);
        }

        commit("setLoading", false);
    },
    async fetchPackageVersions({commit}, name) {
        try {
            // List package versions
            let response = await axios.get(`${jsdelivrBaseURL}/package/npm/${name}`);
            commit("setPackageVersions", response.data);
        } catch (error) {
            // TODO create display error message
            console.log(error);
        }
    },
    async fetchPackageUsegeStats({commit}, name) {
        try {
            // Get package usage stats
            let response = await axios.get(`${jsdelivrBaseURL}/package/npm/${name}/stats`);
            commit("setPackageUsegeStats", response.data);
        } catch (error) {
            // TODO create display error message
            console.log(error);
        }
    },
};

const mutations = {
    setPackages: (state, packages) => (
        state.packages = packages
    ),
    setLoading: (state, status) => (
        state.loading = status
    ),
    setText: (state, text) => (
        state.text = text
    ),
    setPages: (state, total) => {
        let pages;
        pages = Math.ceil(total / state.perPage);
        return state.pages = pages;
    },
    setOffset: (state) => {
        let offset = (state.currentPage - 1) * state.perPage;
        return state.offset = offset;
    },
    setCurrentPage: (state, page) => (
        state.currentPage = page
    ),
    setPackageModal: (state, payload) => (
        state.packageModal = payload
    ),
    setPackageVersions: (state, payload) => (
        state.packageVersions = payload
    ),
    setPackageUsegeStats: (state, payload) => (
        state.packageUsegeStats = payload
    ),
    clearPages: (state) => (
        state.pages = 0
    ),
    clearPackages: (state) => (
        state.packages = []
    ),
};
export default {
    state,
    getters,
    actions,
    mutations
}