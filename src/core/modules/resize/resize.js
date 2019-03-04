import { window, document } from 'ssr-window';

export default {
  name: 'resize',
  instance: {
    getSize() {
      const app = this;
      if (!app.root[0]) return { width: 0, height: 0, left: 0, top: 0 };
      const offset = app.root.offset();
      const [width, height, left, top] = [app.root[0].offsetWidth, app.root[0].offsetHeight, offset.left, offset.top];
      app.width = width;
      app.height = height;
      app.left = left;
      app.top = top;
      return { width, height, left, top };
    },
  },
  on: {
    init() {
      const app = this;

      // Get Size
      app.getSize();

      // Emit resize
      window.addEventListener('resize', () => {
        app.emit('resize');
      }, false);

      // Emit orientationchange
      window.addEventListener('orientationchange', () => {
        app.emit('orientationchange');
      });
    },
    orientationchange() {
      const app = this;
      // Fix iPad weird body scroll
      if (app.device.ipad) {
        document.body.scrollLeft = 0;
        setTimeout(() => {
          document.body.scrollLeft = 0;
        }, 0);
      }
    },
    resize() {
      const app = this;
      app.getSize();
    },
  },
};
