import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        home,
    },
    getters
});

export default store
