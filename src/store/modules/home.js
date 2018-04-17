const home = {
    state: {
        sidebar: {
            opened: true
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                // Cookies.set('sidebarStatus', 1);
            } else {
                // Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        }
    },
    actions: {
        ToggleSideBar: ({
            commit
        }) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
};

export default home;
