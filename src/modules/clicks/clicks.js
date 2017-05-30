import $ from 'dom7';
import Device from '../../utils/device';
import Support from '../../utils/support';
import ViewClass from '../../components/view/view-class';

function initClicks(app) {

  function handleClicks(e) {
    const clicked = $(e.target);
    const clickedLink = clicked.closest('a');
    const isLink = clickedLink.length > 0;
    const url = isLink && clickedLink.attr('href');
    const isTabLink = clicked.closest('.tab-link').length > 0;

    // Check if link is external
    if (isLink) {
      if (clickedLink.is(app.params.clicks.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
        if (url && clickedLink.attr('target') === '_system') {
          e.preventDefault();
          window.open(url, '_system');
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach((moduleName) => {
      const moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) return;
      Object.keys(moduleClicks).forEach((clickSelector) => {
        const matchingClickedElement = clicked.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    /*

    // Smart Select
    if (clicked.hasClass('smart-select')) {
      if (app.smartSelectOpen) app.smartSelectOpen(clicked);
    }

    // Open Panel
    if (clicked.hasClass('open-panel')) {
      if ($('.panel').length === 1) {
        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
        else app.openPanel('right');
      } else if (clickedData.panel === 'right') app.openPanel('right');
      else app.openPanel('left');
    }

    // Close Panel
    if (clicked.hasClass('close-panel')) {
      app.closePanel();
    }

    // Panel Overlay
    if (clicked.hasClass('panel-overlay')) {
      $('.panel.active').trigger('panel:overlay-click');
      if (app.params.panelsCloseByOutside) app.closePanel();
    }

    // Popover
    if (clicked.hasClass('open-popover')) {
      let popover;
      if (clickedData.popover) {
        popover = clickedData.popover;
      } else popover = '.popover';
      app.popover(popover, clicked);
    }
    if (clicked.hasClass('close-popover')) {
      app.closeModal('.popover.modal-in');
    }

    // Popup
    let popup;
    if (clicked.hasClass('open-popup')) {
      if (clickedData.popup) {
        popup = clickedData.popup;
      } else popup = '.popup';
      app.popup(popup);
    }
    if (clicked.hasClass('close-popup')) {
      if (clickedData.popup) {
        popup = clickedData.popup;
      } else popup = '.popup.modal-in';
      app.closeModal(popup);
    }

    // Login Screen
    let loginScreen;
    if (clicked.hasClass('open-login-screen')) {
      if (clickedData.loginScreen) {
        loginScreen = clickedData.loginScreen;
      } else loginScreen = '.login-screen';
      app.loginScreen(loginScreen);
    }
    if (clicked.hasClass('close-login-screen')) {
      app.closeModal('.login-screen.modal-in');
    }

    // Close Modal
    if (clicked.hasClass('dialog-overlay')) {
      if ($('.dialog.modal-in').length > 0 && app.params.modalCloseByOutside) { app.closeModal('.dialog.modal-in'); }
      if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside) { app.closeModal('.actions-modal.modal-in'); }

      if ($('.popover.modal-in').length > 0 && app.params.popoverCloseByOutside) { app.closeModal('.popover.modal-in'); }
    }
    if (clicked.hasClass('popup-overlay')) {
      if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside) { app.closeModal('.popup.modal-in'); }
    }
    if (clicked.hasClass('picker-overlay')) {
      if ($('.picker.modal-in').length > 0) { app.closeModal('.picker.modal-in'); }
    }

    // Picker
    if (clicked.hasClass('close-picker')) {
      let pickerToClose = $('.picker.modal-in');
      if (pickerToClose.length > 0) {
        app.closeModal(pickerToClose);
      } else {
        pickerToClose = $('.popover.modal-in .picker');
        if (pickerToClose.length > 0) {
          app.closeModal(pickerToClose.parents('.popover'));
        }
      }
    }
    if (clicked.hasClass('open-picker')) {
      let pickerToOpen;
      if (clickedData.picker) {
        pickerToOpen = clickedData.picker;
      } else pickerToOpen = '.picker';
      app.pickerModal(pickerToOpen, clicked);
    }

    // Tabs
    if (clicked.hasClass('tab-link')) {
      isTabLink = true;
      app.showTab(clickedData.tab || clicked.attr('href'), clicked);
    }

    // Swipeout Close
    if (clicked.hasClass('swipeout-close')) {
      app.swipeoutClose(clicked.parents('.swipeout-opened'));
    }

    // Swipeout Delete
    if (clicked.hasClass('swipeout-delete')) {
      if (clickedData.confirm) {
        const text = clickedData.confirm;
        const title = clickedData.confirmTitle;
        if (title) {
          app.confirm(text, title, () => {
            app.swipeoutDelete(clicked.parents('.swipeout'));
          }, () => {
            if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
          });
        } else {
          app.confirm(text, () => {
            app.swipeoutDelete(clicked.parents('.swipeout'));
          }, () => {
            if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
          });
        }
      } else {
        app.swipeoutDelete(clicked.parents('.swipeout'));
      }
    }

    // Sortable
    if (clicked.hasClass('toggle-sortable')) {
      app.sortableToggle(clickedData.sortable);
    }
    if (clicked.hasClass('open-sortable')) {
      app.sortableOpen(clickedData.sortable);
    }
    if (clicked.hasClass('close-sortable')) {
      app.sortableClose(clickedData.sortable);
    }

    // Accordion
    if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
      let accordionItem = clicked.parent('.accordion-item');
      if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
      if (accordionItem.length === 0) accordionItem = clicked.parents('li');
      app.accordionToggle(accordionItem);
    }

    // Speed Dial
    if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
      clicked.parent().toggleClass('speed-dial-opened');
    }
    if (clicked.hasClass('close-speed-dial')) {
      $('.speed-dial-opened').removeClass('speed-dial-opened');
    }
    */

    // Load Page
    let clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = clickedLink.dataset();
    }

    const validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    const template = clickedLinkData.template;
    if (validUrl || clicked.hasClass('back') || template) {
      let view;
      if (clickedLinkData.view) {
        view = $(clickedLinkData.view)[0].f7View;
      } else {
        view = clicked.parents(`.${app.params.view.viewClass}`)[0] && clicked.parents(`.${app.params.view.viewClass}`)[0].f7View;
        if (view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
          else if (view.params.linksView instanceof ViewClass) view = view.params.linksView;
        }
      }
      if (!view) {
        if (app.mainView) view = app.mainView;
      }
      if (!view) return;
      if (clicked.hasClass('back')) view.router.back(url, clickedLinkData);
      else view.router.navigate(url, clickedLinkData);
    }
  }

  $(document).on('click', handleClicks);
  // $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .dialog-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-overlay', handleClicks);


  // Prevent scrolling on overlays
  function preventScrolling(e) {
    e.preventDefault();
  }
  if (Support.touch && !Device.android) {
    const activeListener = Support.passiveListener ? { passive: false, capture: false } : false;
    $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .dialog-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling, activeListener);
  }
}
export default {
  name: 'clicks',
  params: {
    clicks: {
      // External Links
      externalLinks: '.external',
      // Tap Navbar or Statusbar to scroll to top
      scrollTopOnStatusbarClick: false,
    },
  },
  on: {
    init() {
      const app = this;
      initClicks(app);
    },
  },
};
