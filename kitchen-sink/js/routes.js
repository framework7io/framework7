var routes = [
  // Index page
  {
    path: '/',
    url: 'index.html',
  },
  // About page
  {
    path: '/about/',
    url: './about.html',
  },
  // Right Panel pages
  {
    path: '/panel-right-1/',
    content: '\
      <div class="page">\
        <div class="navbar">\
          <div class="navbar-inner sliding">\
            <div class="left">\
              <a href="#" class="link back">\
                <i class="icon icon-back"></i>\
                <span class="ios-only">Back</span>\
              </a>\
            </div>\
            <div class="title">Panel Page 1</div>\
          </div>\
        </div>\
        <div class="page-content">\
          <div class="block">\
            <p>This is a right panel page 1</p>\
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>\
          </div>\
        </div>\
      </div>\
    ',
  },
  {
    path: '/panel-right-2/',
    content: '\
      <div class="page">\
        <div class="navbar">\
          <div class="navbar-inner sliding">\
            <div class="left">\
              <a href="#" class="link back">\
                <i class="icon icon-back"></i>\
                <span class="ios-only">Back</span>\
              </a>\
            </div>\
            <div class="title">Panel Page 2</div>\
          </div>\
        </div>\
        <div class="page-content">\
          <div class="block">\
            <p>This is a right panel page 2</p>\
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>\
          </div>\
        </div>\
      </div>\
    ',
  },

  // Toolbars
  {
    path: '/toolbar/',
    url: './toolbar.html',
  },
  {
    path: '/tabbar/',
    url: './tabbar.html',
  },
  {
    path: '/tabbar-labels/',
    url: './tabbar-labels.html',
  },
  {
    path: '/tabbar-scrollable/',
    url: './tabbar-scrollable.html',
  },


  // Components
  {
    path: '/accordion/',
    url: './accordion.html',
  },
  {
    path: '/action-sheet/',
    componentUrl: './action-sheet.html',
  },
  {
    path: '/badge/',
    componentUrl: './badge.html',
  },
  {
    path: '/buttons/',
    url: './buttons.html',
  },
  {
    path: '/cards/',
    url: './cards.html',
  },
  {
    path: '/checkbox/',
    url: './checkbox.html',
  },
  {
    path: '/chips/',
    componentUrl: './chips.html',
  },
  {
    path: '/contacts-list/',
    url: './contacts-list.html',
  },
  {
    path: '/content-block/',
    url: './content-block.html',
  },
  {
    path: '/data-table/',
    componentUrl: './data-table.html',
  },
  {
    path: '/dialog/',
    componentUrl: './dialog.html',
  },
  {
    path: '/fab/',
    url: './fab.html',
  },
  {
    path: '/fab-morph/',
    url: './fab-morph.html',
  },
  {
    path: '/grid/',
    url: './grid.html',
  },
  {
    path: '/infinite-scroll/',
    componentUrl: './infinite-scroll.html',
  },
  {
    path: '/inputs/',
    url: './inputs.html',
  },
  {
    path: '/lazy-load/',
    url: './lazy-load.html',
  },
  {
    path: '/list/',
    url: './list.html',
  },
  {
    path: '/login-screen/',
    componentUrl: './login-screen.html',
  },
  {
    path: '/login-screen-page/',
    componentUrl: './login-screen-page.html',
  },
  {
    path: '/messages/',
    componentUrl: './messages.html',
  },
  {
    path: '/navbar/',
    url: './navbar.html',
  },
  {
    path: '/panel/',
    url: './panel.html',
  },
  {
    path: '/popup/',
    componentUrl: './popup.html',
  },
  {
    path: '/popover/',
    url: './popover.html',
  },
  {
    path: '/preloader/',
    componentUrl: './preloader.html',
  },
  {
    path: '/progressbar/',
    componentUrl: './progressbar.html',
  },
  {
    path: '/pull-to-refresh/',
    componentUrl: './pull-to-refresh.html',
  },
  {
    path: '/radio/',
    url: './radio.html',
  },
  {
    path: '/range/',
    componentUrl: './range.html',
  },
  {
    path: '/searchbar/',
    url: './searchbar.html',
  },
  {
    path: '/searchbar-expandable/',
    url: './searchbar-expandable.html',
  },
  {
    path: '/sheet-modal/',
    componentUrl: './sheet-modal.html',
  },
  {
    path: '/smart-select/',
    url: './smart-select.html',
  },
  {
    path: '/sortable/',
    url: './sortable.html',
  },
  {
    path: '/statusbar/',
    componentUrl: './statusbar.html',
  },
  {
    path: '/subnavbar/',
    url: './subnavbar.html',
  },
  {
    path: '/subnavbar-title/',
    url: './subnavbar-title.html',
  },
  {
    path: '/swipeout/',
    componentUrl: './swipeout.html',
  },
  {
    path: '/tabs/',
    url: './tabs.html',
  },
  {
    path: '/tabs-static/',
    url: './tabs-static.html',
  },
  {
    path: '/tabs-animated/',
    url: './tabs-animated.html',
  },
  {
    path: '/tabs-swipeable/',
    url: './tabs-swipeable.html',
  },
  {
    path: '/tabs-routable/',
    url: './tabs-routable.html',
    tabs: [
      {
        path: '/',
        id: 'tab1',
        content: ' \
        <div class="block"> \
          <p>Tab 1 content</p> \
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p> \
          <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p> \
          <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p> \
        </div> \
        ',
      },
      {
        path: '/tab2/',
        id: 'tab2',
        content: '\
        <div class="block"> \
          <p>Tab 2 content</p> \
          <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p> \
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p> \
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p> \
        </div> \
        ',
      },
      {
        path: '/tab3/',
        id: 'tab3',
        content: '\
        <div class="block"> \
          <p>Tab 3 content</p> \
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p> \
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p> \
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p> \
        </div> \
        ',
      },
    ],
  },
  {
    path: '/toggle/',
    url: './toggle.html',
  },
  {
    path: '/timeline/',
    url: './timeline.html',
  },
  {
    path: '/timeline-vertical/',
    url: './timeline-vertical.html',
  },
  {
    path: '/timeline-horizontal/',
    url: './timeline-horizontal.html',
  },
  {
    path: '/timeline-horizontal-calendar/',
    url: './timeline-horizontal-calendar.html',
  },
  {
    path: '/virtual-list/',
    componentUrl: './virtual-list.html',
  },

  // Color Themes
  {
    path: '/color-themes/',
    componentUrl: './color-themes.html',
  },


  // Dynamic + Content
  {
    path: '/blog/:user/:id/',
    url: 'blog.html',
  },
  // Inline Page
  {
    path: '/another-page/',
    name: 'another-page',
  },
  // Page Element
  {
    path: '/another-page/',
    el: document.querySelector('.page'),
  },
  // Template
  {
    path: '/page/',
    template: '<div class="page">{{hello}}</div>',
    context: { hello: 'Hello World!' },
  },
  // Component (For Vue/React)
  {
    path: '/page/',
    component: 'testComponent',
    // component: require('some-page.vue'),
  },
  // Nested Tabs
  {
    path: '/page-with-tabs/',
    tabs: [
      {
        path: '/',
        id: 'tab1',
        // available options: url, component, content, template, async
      },
    ],
  },
  // Async
  {
    path: '/async-page/',
    async(proceed, release) {
      setTimeout(() => {
        proceed({
          url: 'about.html',
        });
      }, 3000);
    },
  },
];
