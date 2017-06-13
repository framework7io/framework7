import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Sheet extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      backdrop: app.theme === 'md',
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const sheet = this;

    sheet.params = extendedParams;

    // Find Element
    let $el;
    if (!sheet.params.el) {
      $el = $(sheet.params.html);
    } else {
      $el = $(sheet.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return sheet.destroy();
    }
    let $backdropEl;
    if (sheet.params.backdrop) {
      $backdropEl = app.root.children('.sheet-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="sheet-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    let $pageContentEl;
    function scrollToOpen() {
      const $scrollEl = $(sheet.params.scrollToEl).eq(0);
      if ($scrollEl.length === 0) return;
      $pageContentEl = $scrollEl.parents('.page-content');
      if ($pageContentEl.length === 0) return;

      const paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      const paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      const pageHeight = $pageContentEl[0].offsetHeight - paddingTop - $el.height();
      const pageScrollHeight = $pageContentEl[0].scrollHeight - paddingTop - $el.height();
      const pageScroll = $pageContentEl.scrollTop();

      let newPaddingBottom;

      const scrollElTop = ($scrollEl.offset().top - paddingTop) + $scrollEl[0].offsetHeight;
      if (scrollElTop > pageHeight) {
        const scrollTop = (pageScroll + scrollElTop) - pageHeight;
        if (scrollTop + pageHeight > pageScrollHeight) {
          newPaddingBottom = ((scrollTop + pageHeight) - pageScrollHeight) + paddingBottom;
          if (pageHeight === pageScrollHeight) {
            newPaddingBottom = $el.height();
          }
          $pageContentEl.css({
            'padding-bottom': `${newPaddingBottom}px`,
          });
        }
        $pageContentEl.scrollTop(scrollTop, 300);
      }
    }

    function scrollToClose() {
      if ($pageContentEl && $pageContentEl.length > 0) {
        $pageContentEl.css({
          'padding-bottom': '',
        });
      }
    }

    if (sheet.params.scrollToEl) {
      sheet.on('sheetOpen', scrollToOpen);
      sheet.on('sheetClose', scrollToClose);
    }

    Utils.extend(sheet, {
      app,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'sheet',
    });

    $el[0].f7Modal = sheet;

    return sheet;
  }
}
export default Sheet;
