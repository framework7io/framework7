export default function (component, updater, callback) {
  const self = component;
  let newState;
  if (typeof updater === 'function') {
    newState = updater(self.state, self.props);
  } else {
    newState = updater;
  }
  Object.keys(newState).forEach((key) => {
    self.$set(self.state, key, newState[key]);
  });
  if (typeof callback === 'function') callback();
}
