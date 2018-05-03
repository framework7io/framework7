export default function (component, events, ...args) {
  const self = component;

  if (!events || !events.trim().length || typeof events !== 'string') return;

  events.trim().split(' ').forEach((event) => {
    let eventName = (event || '').trim();
    if (!eventName) return;
    eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

    const propName = `on${eventName}`;

    if (self.props[propName]) self.props[propName](...args);
  });
}
