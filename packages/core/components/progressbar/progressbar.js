import $ from 'dom7';
import Utils from '../../utils/utils';

const Progressbar = {
  set(...args) {
    const app = this;
    let [el, progress, duration] = args;
    if (typeof args[0] === 'number') {
      [progress, duration] = args;
      el = app.root;
    }
    if (typeof progress === 'undefined' || progress === null) return el;
    if (!progress) progress = 0;

    const $el = $(el || app.root);
    if ($el.length === 0) {
      return el;
    }
    const progressNormalized = Math.min(Math.max(progress, 0), 100);
    let $progressbarEl;
    if ($el.hasClass('progressbar')) $progressbarEl = $el.eq(0);
    else {
      $progressbarEl = $el.children('.progressbar');
    }
    if ($progressbarEl.length === 0 || $progressbarEl.hasClass('progressbar-infinite')) {
      return $progressbarEl;
    }
    let $progressbarLine = $progressbarEl.children('span');
    if ($progressbarLine.length === 0) {
      $progressbarLine = $('<span></span>');
      $progressbarEl.append($progressbarLine);
    }
    $progressbarLine
      .transition(typeof duration !== 'undefined' ? duration : '')
      .transform(`translate3d(${(-100 + progressNormalized)}%,0,0)`);

    return $progressbarEl[0];
  },
  show(...args) {
    const app = this;

    // '.page', 50, 'multi'
    let [el, progress, color] = args;
    let type = 'determined';

    if (args.length === 2) {
      if ((typeof args[0] === 'string' || typeof args[0] === 'object') && typeof args[1] === 'string') {
        // '.page', 'multi'
        [el, color, progress] = args;
        type = 'infinite';
      } else if (typeof args[0] === 'number' && typeof args[1] === 'string') {
        // 50, 'multi'
        [progress, color] = args;
        el = app.root;
      }
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        el = app.root;
        progress = args[0];
      } else if (typeof args[0] === 'string') {
        type = 'infinite';
        el = app.root;
        color = args[0];
      }
    } else if (args.length === 0) {
      type = 'infinite';
      el = app.root;
    }

    const $el = $(el);
    if ($el.length === 0) return undefined;

    let $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
      if ($progressbarEl.length === 0) {
        $progressbarEl = $(`
          <span class="progressbar${type === 'infinite' ? '-infinite' : ''}${color ? ` color-${color}` : ''} progressbar-in">
            ${type === 'infinite' ? '' : '<span></span>'}
          </span>`);
        $el.append($progressbarEl);
      }
    }

    if (typeof progress !== 'undefined') {
      app.progressbar.set($progressbarEl, progress);
    }

    return $progressbarEl[0];
  },
  hide(el, removeAfterHide = true) {
    const app = this;
    const $el = $(el || app.root);
    if ($el.length === 0) return undefined;
    let $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar, .progressbar-infinite');
    }
    if ($progressbarEl.length === 0 || !$progressbarEl.hasClass('progressbar-in') || $progressbarEl.hasClass('progressbar-out')) {
      return $progressbarEl;
    }
    $progressbarEl
      .removeClass('progressbar-in')
      .addClass('progressbar-out')
      .animationEnd(() => {
        if (removeAfterHide) {
          $progressbarEl.remove();
        }
      });
    return $progressbarEl;
  },
};

export default {
  name: 'progressbar',
  create() {
    const app = this;
    Utils.extend(app, {
      progressbar: {
        set: Progressbar.set.bind(app),
        show: Progressbar.show.bind(app),
        hide: Progressbar.hide.bind(app),
      },
    });
  },
  on: {
    pageInit(page) {
      const app = this;
      page.$el.find('.progressbar').each((index, progressbarEl) => {
        const $progressbarEl = $(progressbarEl);
        app.progressbar.set($progressbarEl, $progressbarEl.attr('data-progress'));
      });
    },
  },
};
