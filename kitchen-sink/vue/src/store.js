// eslint-disable-next-line
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    users: null,
    usersLoading: false,
  },
  actions: {
    loadUsers({ state }) {
      state.usersLoading = true;
      setTimeout(() => {
        state.usersLoading = false;
        state.users = ['Aaron', 'Alexander', 'Candy', 'Chloe', 'Vladimir'];
      }, 3000);
    },
  },
  getters: {
    usersLoading: ({ state }) => state.usersLoading,
    users: ({ state }) => state.users,
  },
});

export default store;
