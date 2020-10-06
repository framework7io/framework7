var store = Framework7.createStore({
  state: {
    firstName: 'John',
    lastName: 'Doe',
    users: null,
    usersLoading: false,
  },
  actions: {
    helloWorld(ctx) {
      app.dialog.alert('Hello world');
    },
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
