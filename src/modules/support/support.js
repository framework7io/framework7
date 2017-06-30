import Support from '../../utils/support';

export default {
  name: 'support',
  proto: {
    support: Support,
  },
  static: {
    Support,
  },
  on: {
    init() {
      const html = document.querySelector('html');
      const classNames = [];
      if (Support.positionSticky) {
        classNames.push('support-position-sticky');
        if (Support.positionStickyFalsy) {
          classNames.push('support-position-sticky-falsy');
        }
      }
      // Add html classes
      classNames.forEach((className) => {
        html.classList.add(className);
      });
    },
  },
};
