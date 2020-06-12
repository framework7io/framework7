export default function (component, events, ...args) {
  const self = component;
  events.split(' ').forEach((event) => {
    self.$emit(event, ...args);
  });
}
