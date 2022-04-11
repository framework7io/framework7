<a href="https://www.patreon.com/framework7"><img src="https://framework7.io/i/support-badge.png" height="20"></a>

# Change Log

# [6.3.17](https://github.com/framework7io/framework7/compare/v6.3.16...v6.3.17) (2022-04-11)

### Bug Fixes

- **core:** fix component types ([249f54c](https://github.com/framework7io/framework7/commit/249f54c8f790a699b51c18c674821e52161f47d4)), closes [#3997](https://github.com/framework7io/framework7/issues/3997)
- **preloaded:** set initial position to 0 for iOS preloader ([#4002](https://github.com/framework7io/framework7/issues/4002)) ([76e8ef0](https://github.com/framework7io/framework7/commit/76e8ef0b9ae69aa5623bff18fac1d6045b89b34a))
- **react:** fix Actions and Range types ([5c3087c](https://github.com/framework7io/framework7/commit/5c3087c366acaaa3cf5775df8946c79c3b414392)), closes [#3997](https://github.com/framework7io/framework7/issues/3997)

# [6.3.16](https://github.com/framework7io/framework7/compare/v6.3.15...v6.3.16) (2022-02-10)

### Bug Fixes

- **list-index:** fix types for `indexes` param ([e94bb2b](https://github.com/framework7io/framework7/commit/e94bb2b07159d5add03577ec2b02b58c9617b81d)), closes [#3970](https://github.com/framework7io/framework7/issues/3970)
- **popup:** types for `containerEl` prop ([a06e3aa](https://github.com/framework7io/framework7/commit/a06e3aa03d7d9ea90d97ccf462b3c6d3f3517516))
- **router:** don't call enter/leave for stacked page preload ([56765e5](https://github.com/framework7io/framework7/commit/56765e55d38ba9996ec16fd0df162514bddd3747))
- **router:** don't call enter/leave for stacked page preload ([d9416ef](https://github.com/framework7io/framework7/commit/d9416eff32aca27377c39a25d87d612e8fc5d2f7)), closes [#3975](https://github.com/framework7io/framework7/issues/3975)
- **types:** add missing params to notification and toast open/close methods ([50b1504](https://github.com/framework7io/framework7/commit/50b150458d9260cfe99424f8a90d1b5203ad1784))

# [6.3.15](https://github.com/framework7io/framework7/compare/v6.3.14...v6.3.15) (2022-01-19)

### Bug Fixes

- **progressbar:** tweaked styles for RTL ([6f6167c](https://github.com/framework7io/framework7/commit/6f6167cd7ed3c6380189bae82dbe99a235ea888a))

# [6.3.14](https://github.com/framework7io/framework7/compare/v6.3.12...v6.3.14) (2021-12-30)

### Bug Fixes

- **vue:** fix `sortableMove` event arguments ([#3965](https://github.com/framework7io/framework7/issues/3965)) ([8e716f7](https://github.com/framework7io/framework7/commit/8e716f7a17dbf884493330224408405bd41f35fc))
- **vue:** fix textEditor events arguments ([e6a3218](https://github.com/framework7io/framework7/commit/e6a3218c7a71d725e77e0bc92ccc35a086a92c6b))

# [6.3.12](https://github.com/framework7io/framework7/compare/v6.3.11...v6.3.12) (2021-12-13)

### Bug Fixes

- **calendar:** remove `日` char from calendar days for Chinese locale ([5f595f2](https://github.com/framework7io/framework7/commit/5f595f26d8c2f97fc9fc2a3e84dd99a20377b8a8)), closes [#3960](https://github.com/framework7io/framework7/issues/3960)
- **popup:** add `pointer-events: none` to `popup-behind` state ([246e737](https://github.com/framework7io/framework7/commit/246e737d188a5d7d0c266cc21ad9a75ad4e78e2b))
- **range:** add missing type definitions ([#3961](https://github.com/framework7io/framework7/issues/3961)) ([d3bc1b4](https://github.com/framework7io/framework7/commit/d3bc1b4f703c1a236c66620ab54679a164bb4010))

### Features

- **tabbar:** allow tabbar to have highlight in iOS theme with extra `tabbar-highlight` class ([3a141ad](https://github.com/framework7io/framework7/commit/3a141ad8cb1c349623f50680e4c5930d52b3517c))

# [6.3.11](https://github.com/framework7io/framework7/compare/v6.3.10...v6.3.11) (2021-12-08)

### Bug Fixes

- **sortable:** unify `sortableMove` arguments ([a17bd83](https://github.com/framework7io/framework7/commit/a17bd8346bb6b42012281d5142cdbb8f914366b9))

# [6.3.10](https://github.com/framework7io/framework7/compare/v6.3.9...v6.3.10) (2021-12-08)

### Bug Fixes

- **vue:** fix `web-types` path ([6fe117a](https://github.com/framework7io/framework7/commit/6fe117abe9f8b0b1d44a0fb9f48d0869bd7613d5))

### Features

- **sortable:** new `sortableMove` event to trigger during sortable item drag ([ae055b2](https://github.com/framework7io/framework7/commit/ae055b20f11218e181771eaa807b1a9beb2e069c))

# [6.3.9](https://github.com/framework7io/framework7/compare/v6.3.8...v6.3.9) (2021-11-18)

### Bug Fixes

- **preloader:** add `showIn` and `hideIn` to types ([e9d0db7](https://github.com/framework7io/framework7/commit/e9d0db713efee6951f02d90d41a69c065a7df93f)), closes [#3956](https://github.com/framework7io/framework7/issues/3956)

# [6.3.8](https://github.com/framework7io/framework7/compare/v6.3.7...v6.3.8) (2021-11-08)

### Bug Fixes

- **react:** fix not working correctly change event with swipe ([9888e16](https://github.com/framework7io/framework7/commit/9888e167b38397c12311ae55cc276c57b79cd7fa))
- **svelte:** method to get Smart Select instance in Link component ([558b629](https://github.com/framework7io/framework7/commit/558b629b46bb78ef065c2d4bc700bfd0e273ef06)), closes [#3954](https://github.com/framework7io/framework7/issues/3954)

### Features

- **vue:** add web-types for JetBrains editors ([f2bd8f9](https://github.com/framework7io/framework7/commit/f2bd8f9903252c49ddc5b81819e22f8dfaed488f))

# [6.3.7](https://github.com/framework7io/framework7/compare/v6.3.6...v6.3.7) (2021-10-28)

### Bug Fixes

- **gauge:** fix update method types ([f1b75d5](https://github.com/framework7io/framework7/commit/f1b75d594d98e197f2060a2c9b5d14df517321b7)), closes [#3950](https://github.com/framework7io/framework7/issues/3950)
- **searchbar:** searchByItem to use current `vl.items` ([68e4a09](https://github.com/framework7io/framework7/commit/68e4a0943494d379f4a8c0dfa0a5a535426df8f0)), closes [#3948](https://github.com/framework7io/framework7/issues/3948)

### Features

- **vue:** reactive `closeByBackdropClick`, `closeByOutsideClick` and `closeOnEscape` props in Sheet component ([db21896](https://github.com/framework7io/framework7/commit/db2189663951353d404d1c5f75c29fd6b408c860)), closes [#3949](https://github.com/framework7io/framework7/issues/3949)

# [6.3.6](https://github.com/framework7io/framework7/compare/v6.3.5...v6.3.6) (2021-10-25)

### Bug Fixes

- **svelte:** fix swipe-to-step behavior in Sheet component ([6e0fa74](https://github.com/framework7io/framework7/commit/6e0fa7494997f6370f6f98b5744a9cfe401f7434))

# [6.3.5](https://github.com/framework7io/framework7/compare/v6.3.4...v6.3.5) (2021-09-30)

### Bug Fixes

- **list-input:** don't ignore sortable=false props in React, Vue, Svelte components
- **list-item:** don't ignore sortable=false props in React, Vue, Svelte components

### Features

- **component:** new `$ref` function to create reactive variables ([108b63b](https://github.com/framework7io/framework7/commit/108b63b5bcd4979a828fb8ceeee6752d95c20f7d))

# [6.3.4](https://github.com/framework7io/framework7/compare/v6.3.3...v6.3.4) (2021-09-16)

### Bug Fixes

- **actions:** bypass `containerEl` parameter when opened in Popover ([05ad92c](https://github.com/framework7io/framework7/commit/05ad92c8071b6244b2e5892a1a8c3ac1ad9b5e37))
- **smart-select:** fix `scrollToSelectedItem` in popover ([84b552a](https://github.com/framework7io/framework7/commit/84b552ad32e5b68ddad181ae00019feda38412d1))

### Features

- **router component:** add support for fragments `<>...</>` in JSX templates ([5c2ac50](https://github.com/framework7io/framework7/commit/5c2ac506c3ff10a310d1b940156b3d512ea2fdef))

# [6.3.3](https://github.com/framework7io/framework7/compare/v6.3.2...v6.3.3) (2021-09-07)

### Features

- **progressbar:** tweak iOS progressbar size to match iOS 15 ([88f002a](https://github.com/framework7io/framework7/commit/88f002a447e33d52ec8e2c75b1189e18857b6570))

# [6.3.2](https://github.com/framework7io/framework7/compare/v6.3.1...v6.3.2) (2021-08-31)

### Bug Fixes

- **vue:** fix text editor events ([378a594](https://github.com/framework7io/framework7/commit/378a594ad5ace6ebb545acb51d38539e75ec55a1)), closes [#3940](https://github.com/framework7io/framework7/issues/3940)

# [6.3.1](https://github.com/framework7io/framework7/compare/v6.3.0...v6.3.1) (2021-08-23)

### Bug Fixes

- **vue:** fix vue typings for Swiper and Skeleton Elements ([6c37be6](https://github.com/framework7io/framework7/commit/6c37be6a04938378e1ba9336d76b5ed9e48c95f5))

# [6.3.0](https://github.com/framework7io/framework7/compare/v6.2.0...v6.3.0) (2021-08-16)

### Bug Fixes

- **picker:** prevent closing picker on backdrop drag click ([7abae46](https://github.com/framework7io/framework7/commit/7abae4679113914bc6fffd7911624d8de040f68c))
- **popover:** prevent closing popover on backdrop drag click ([fef522e](https://github.com/framework7io/framework7/commit/fef522e3d437bcf33d4f3b38debfbf9bb7f0c3df))
- **pull-to-refresh:** fix ptr-closing class removal ([93951d2](https://github.com/framework7io/framework7/commit/93951d22161178c9849f9a4e427b4134dad37eee))
- **svelte:** fix duplicated export in typings ([1ed6d4b](https://github.com/framework7io/framework7/commit/1ed6d4b1be90a3b38d3b92d7e713b5ba7ad52bc8))

### Features

- **pull-to-refresh:** new system-like PTR behavior in iOS theme ([14a9c14](https://github.com/framework7io/framework7/commit/14a9c1482ccdae33ef4577bec140e1fddc50317f))

# [6.2.0](https://github.com/framework7io/framework7/compare/v6.1.1...v6.2.0) (2021-08-02)

### Bug Fixes

- **navbar:** don't scroll page top on navbar title's click when clicked on `<a>` and `<button>` ([2d78b63](https://github.com/framework7io/framework7/commit/2d78b63cf23fad615a618f220e4ef658512a4f7c))
- **stepper:** allow to enter negative numbers in manualMode ([94aec9e](https://github.com/framework7io/framework7/commit/94aec9ef6e61c26e32b0dfabad0878b2e14ed891)), closes [#3933](https://github.com/framework7io/framework7/issues/3933)
- **svelte:** fixed not working LoginScreen events ([5ae9b47](https://github.com/framework7io/framework7/commit/5ae9b47557b8b9335ecafe7e1397f56c7b27f278)), closes [#3934](https://github.com/framework7io/framework7/issues/3934)

### Features

- **checkbox:** black checkbox icon in dark theme ([fd3c3ff](https://github.com/framework7io/framework7/commit/fd3c3ff850c4befa8ab76c81fcaa8b3b73c20936))
- **checkbox:** update iOS checkbox icon to match iOS 15 look ([ac5b5ee](https://github.com/framework7io/framework7/commit/ac5b5ee62bfc96a4c14991da64e52d17120563eb))
- **panel:** new `push` effect ([6216d11](https://github.com/framework7io/framework7/commit/6216d1173b02c0b53f953330d6e34df0ab7797b7))
- **radio:** update iOS radio icon to match iOS 15 look ([a6c4bb4](https://github.com/framework7io/framework7/commit/a6c4bb483f19083229fd02d181692654f0da8f33))
- **range:** tweak Range Slider styles to match iOS 15 look ([cdf7fe5](https://github.com/framework7io/framework7/commit/cdf7fe5070d8811d5f3d2b0c5bc3eaf22dc83ea1))
- **segmented:** swipeable segmented strong in iOS theme ([29906e4](https://github.com/framework7io/framework7/commit/29906e4b7b76c49e49e82bcce817b006c6333019))
- **touch:** swipeable/activable Dialog and Actions buttons in iOS theme ([25a07ef](https://github.com/framework7io/framework7/commit/25a07ef19adae0f4294f6926cd39b5f8d09cafcb))

# [6.1.1](https://github.com/framework7io/framework7/compare/v6.1.0...v6.1.1) (2021-07-26)

### Bug Fixes

- **router:** fixed issue with removing routable modals specified with `asyncComponent` ([bbde9c5](https://github.com/framework7io/framework7/commit/bbde9c53cd8dca40ec4e5b45a24e9565f4640705))

# [6.1.0](https://github.com/framework7io/framework7/compare/v6.0.22...v6.1.0) (2021-07-26)

### Bug Fixes

- **svelte:** fix hidden initial breakpoint panel ([b9ab2c8](https://github.com/framework7io/framework7/commit/b9ab2c8383973f644525bf236a849c298b6411a4)), closes [#3824](https://github.com/framework7io/framework7/issues/3824)
- **svelte:** ignore some predefined rest props ([5c4ea26](https://github.com/framework7io/framework7/commit/5c4ea267e42633827b2790b2105e00a7a7b7d574))
- **svelte:** use native svelte $$slots for slots detection ([fd0ed52](https://github.com/framework7io/framework7/commit/fd0ed5266181181ed8d60d09b3d234a9ed7616c5))
- **gauge:** fix typed in `gaugeBeforeDestroy` event ([efbe583](https://github.com/framework7io/framework7/commit/efbe583f152b5030245d60c2ee6c90fc385ff231)), closes [#3919](https://github.com/framework7io/framework7/issues/3919)
- **swipeout:** check if event is cancelable before preventDefault ([c62b7f8](https://github.com/framework7io/framework7/commit/c62b7f8e1afccfdfdec2af1e7a73f8b6a6712483)), closes [#3921](https://github.com/framework7io/framework7/issues/3921)
- **get-device:** allow recognition of Chrome's Android emulator on Windows as android ([008bf32](https://github.com/framework7io/framework7/commit/008bf327484af6b93b4976a2a3e7a69f1aa9ccf2))
- **react:** display error when errorMessageForce is set on Input component ([e303b60](https://github.com/framework7io/framework7/commit/e303b60194ce47934fe0acef034e4939e1a944d9))
- **svelte:** display error when errorMessageForce is set on Input component ([13ebe86](https://github.com/framework7io/framework7/commit/13ebe8649720b1dd4fb7564a9ea8d67cf636f383))
- **types:** fixed default value description for Dialog `closeByBackdropClick` parameter ([62ea344](https://github.com/framework7io/framework7/commit/62ea344d9b1136aa24494a24232aeb4095a973aa)), closes [#3917](https://github.com/framework7io/framework7/issues/3917)
- **vue:** display error when errorMessageForce is set on Input component ([741261e](https://github.com/framework7io/framework7/commit/741261e21ff3e8dc52c17be75e47237396a9337c))
- **types:** fixes for cases when `el` parameter also can be a CSS Selector ([1bdf2da](https://github.com/framework7io/framework7/commit/1bdf2da9e617be2ad4093a98a231d973d3242dc6))

### Features

- **core:** refactor LESS imports to be compatible with Vite ([7e5b81d](https://github.com/framework7io/framework7/commit/7e5b81dcfce79e44dbbda5b54588e9d7ff834114))
- **svelte:** TypeScript definition for all Svelte components ([3033b3d](https://github.com/framework7io/framework7/commit/3033b3d6081b1771587df5c79f334b60a529a190)), closes [#3912](https://github.com/framework7io/framework7/issues/3912)
- **text-editor:** new `insertLink` and `insertImage` events to post-process added links and images ([a57301b](https://github.com/framework7io/framework7/commit/a57301b83c0d25c051ffaf9d7f37c1c4a1242e08)), closes [#3903](https://github.com/framework7io/framework7/issues/3903)
- **vue:** TypeScript definition for all Vue components ([b6d599a](https://github.com/framework7io/framework7/commit/b6d599ad91c8270ca7b752e256b0cb93b76d2c78))
- **svelte:** core component instance is now exposed through slot props ([6029fd1](https://github.com/framework7io/framework7/commit/6029fd197488044206f0bf062fa0068d7cbaacd0)), closes [#3899](https://github.com/framework7io/framework7/issues/3899)
- **svelte:** add .svelte components to the package ([a8f3913](https://github.com/framework7io/framework7/commit/a8f391307252acce5d314416bcfed6bf4c0c46c9))

# [6.1.0-beta.7](https://github.com/framework7io/framework7/compare/v6.1.0-beta.6...v6.1.0-beta.7) (2021-07-23)

### Features

- **core:** refactor LESS imports to be compatible with Vite ([7e5b81d](https://github.com/framework7io/framework7/commit/7e5b81dcfce79e44dbbda5b54588e9d7ff834114))

# [6.1.0-beta.6](https://github.com/framework7io/framework7/compare/v6.1.0-beta.5...v6.1.0-beta.6) (2021-07-19)

### Bug Fixes

- **gauge:** fix typed in `gaugeBeforeDestroy` event ([efbe583](https://github.com/framework7io/framework7/commit/efbe583f152b5030245d60c2ee6c90fc385ff231)), closes [#3919](https://github.com/framework7io/framework7/issues/3919)
- **swipeout:** check if event is cancelable before preventDefault ([c62b7f8](https://github.com/framework7io/framework7/commit/c62b7f8e1afccfdfdec2af1e7a73f8b6a6712483)), closes [#3921](https://github.com/framework7io/framework7/issues/3921)

# [6.1.0-beta.5](https://github.com/framework7io/framework7/compare/v6.1.0-beta.3...v6.1.0-beta.5) (2021-07-15)

### Features

- **svelte:** TypeScript definition for all Svelte components ([3033b3d](https://github.com/framework7io/framework7/commit/3033b3d6081b1771587df5c79f334b60a529a190)), closes [#3912](https://github.com/framework7io/framework7/issues/3912)

# [6.1.0-beta.3](https://github.com/framework7io/framework7/compare/v6.1.0-beta.2...v6.1.0-beta.3) (2021-07-14)

### Bug Fixes

- **get-device:** allow recognition of Chrome's Android emulator on Windows as android ([008bf32](https://github.com/framework7io/framework7/commit/008bf327484af6b93b4976a2a3e7a69f1aa9ccf2))
- **react:** display error when errorMessageForce is set on Input component ([e303b60](https://github.com/framework7io/framework7/commit/e303b60194ce47934fe0acef034e4939e1a944d9))
- **svelte:** display error when errorMessageForce is set on Input component ([13ebe86](https://github.com/framework7io/framework7/commit/13ebe8649720b1dd4fb7564a9ea8d67cf636f383))
- **types:** fixed default value description for Dialog `closeByBackdropClick` parameter ([62ea344](https://github.com/framework7io/framework7/commit/62ea344d9b1136aa24494a24232aeb4095a973aa)), closes [#3917](https://github.com/framework7io/framework7/issues/3917)
- **vue:** display error when errorMessageForce is set on Input component ([741261e](https://github.com/framework7io/framework7/commit/741261e21ff3e8dc52c17be75e47237396a9337c))

### Features

- **text-editor:** new `insertLink` and `insertImage` events to post-process added links and images ([a57301b](https://github.com/framework7io/framework7/commit/a57301b83c0d25c051ffaf9d7f37c1c4a1242e08)), closes [#3903](https://github.com/framework7io/framework7/issues/3903)
- **vue:** TypeScript definition for all Vue components ([b6d599a](https://github.com/framework7io/framework7/commit/b6d599ad91c8270ca7b752e256b0cb93b76d2c78))

# [6.1.0-beta.2](https://github.com/framework7io/framework7/compare/v6.1.0-beta.1...v6.0.1-beta.2) (2021-07-08)

### Bug Fixes

- **types:** fixes for cases when `el` parameter also can be a CSS Selector ([1bdf2da](https://github.com/framework7io/framework7/commit/1bdf2da9e617be2ad4093a98a231d973d3242dc6))

### Features

- **svelte:** core component instance is now exposed through slot props ([6029fd1](https://github.com/framework7io/framework7/commit/6029fd197488044206f0bf062fa0068d7cbaacd0)), closes [#3899](https://github.com/framework7io/framework7/issues/3899)

# [6.1.0-beta.1](https://github.com/framework7io/framework7/compare/v6.0.22...v6.1.0-beta.1) (2021-07-08)

### Features

- **svelte:** add .svelte components to the package ([a8f3913](https://github.com/framework7io/framework7/commit/a8f391307252acce5d314416bcfed6bf4c0c46c9))

# [6.0.22](https://github.com/framework7io/framework7/compare/v6.0.21...v6.0.22) (2021-06-25)

### Bug Fixes

- **react messages:** consider scrollMessagesOnEdge when scrolling ([05dba19](https://github.com/framework7io/framework7/commit/05dba19f42a0637773c33f6765cc512d9ea681f7)), closes [#3908](https://github.com/framework7io/framework7/issues/3908)
- **svelte messages:** fix missing `.instance()` component prop ([e156acc](https://github.com/framework7io/framework7/commit/e156acc5839c3ded9573b2ebc81477f295e00e50)), closes [#3905](https://github.com/framework7io/framework7/issues/3905)
- **vue:** fixes ignored Preloader `size` prop ([2cb535c](https://github.com/framework7io/framework7/commit/2cb535c6e24af1374f6c6bbb3fa7c8c04e91b178))
- **vue messages:** consider scrollMessagesOnEdge when scrolling ([110638e](https://github.com/framework7io/framework7/commit/110638eaa5d82e2b1ea6508f51834f402ad44028))

## [6.0.21](https://github.com/framework7io/framework7/compare/v6.0.20...v6.0.21) (2021-06-09)

### Bug Fixes

- **router:** correctly track DOM changes in React, Vue and Svelte components router ([3f96bf1](https://github.com/framework7io/framework7/commit/3f96bf127259c5deef71a4a6b8eb6e1dd62d93fa))
- **smart select:** mark `el` parameter optional for compatibility with `smartSelectParams` ([39a0cbf](https://github.com/framework7io/framework7/commit/39a0cbf75d650bb7a27d243efccaca7e9fcaf4ff)), closes [#3902](https://github.com/framework7io/framework7/issues/3902)
- **store:** fixed lost reactivity in core components store ([2af3355](https://github.com/framework7io/framework7/commit/2af3355039a655083fa6e6b4486212edf8064a91))

# [6.0.20](https://github.com/framework7io/framework7/compare/v6.0.19...v6.0.20) (2021-06-07)

### Bug Fixes

- **react store:** fixed issue with race-conditions in store updates ([40f4818](https://github.com/framework7io/framework7/commit/40f4818045644a6175e27a175f334b54963ad30b))
- **react tabs:** fix issue when initial tabShow event not catched ([b3e1dd0](https://github.com/framework7io/framework7/commit/b3e1dd0dc8f457ee07b3436728e7c38694417efe))
- **router:** correctly bypass `route.tab.options.props` to tab component ([f3326e2](https://github.com/framework7io/framework7/commit/f3326e2d8b868b18b0d318cf3a1e2dd90fccf71a))
- **router:** routable Tab now inherits parent route `options.props` ([a9e32af](https://github.com/framework7io/framework7/commit/a9e32af636c1a1eca2602af00faab10dbf66e54c))

# [6.0.19](https://github.com/framework7io/framework7/compare/v6.0.18...v6.0.19) (2021-05-31)

### Bug Fixes

- **router:** fix for routable swipeable tabs ([c0c6414](https://github.com/framework7io/framework7/commit/c0c6414054e135caa905e730db72026005037367))

# [v6.0.18](https://github.com/framework7io/framework7/compare/v6.0.17...v6.0.18) (2021-05-28)

### Bug Fixes

- **navbar:** added missing TS events definitions ([3bc1eb2](https://github.com/framework7io/framework7/commit/3bc1eb2f18f5b29ebc5bfa595582182a6e1f39bd)), closes [#3895](https://github.com/framework7io/framework7/issues/3895)
- **navbar:** fixed issue with large navbar scroll-hide on insufficient page scroll ([0b5e4ab](https://github.com/framework7io/framework7/commit/0b5e4abd0cae086dff2122b4355b1ea0e3609134))
- **panel:** added `containerEl` typing to props in React component ([da5b38f](https://github.com/framework7io/framework7/commit/da5b38f2e2b35f6f378b6869451308bbaf25f5b0)), closes [#3892](https://github.com/framework7io/framework7/issues/3892)
- **panel:** fix not emitting `collapsedBreakpoint` event ([03e661f](https://github.com/framework7io/framework7/commit/03e661f7858b7f22cb3d22256018ef36521f92cd)), closes [#3887](https://github.com/framework7io/framework7/issues/3887)
- **router:** components router fix when view component updated triggered by something else ([df64010](https://github.com/framework7io/framework7/commit/df640103946b2b3e1cf3dbd4ebf1f956fba5e3e0))
- **router:** don't set initial page component if it is master's detail page ([9e4e264](https://github.com/framework7io/framework7/commit/9e4e26429d2cb9c7a727566730bd83a88d90fb57))
- **router:** fixed issue for routable swipeable tabs with dynamic params in route path ([4a93d90](https://github.com/framework7io/framework7/commit/4a93d90a345251c03b9df5287bbd98d8ff00cc85))
- **toolbar:** added missing TS events definitions ([d0afb69](https://github.com/framework7io/framework7/commit/d0afb69b47e6cf06930ff4f759d523e6627e7317))

### Features

- **smart select:** new `sheetBackdrop` parameter to control Sheet backdrop ([0d2f60f](https://github.com/framework7io/framework7/commit/0d2f60f134624fca43384d75af2d96b0c98b55e5))
- **swiper:** Swiper updated to latest version ([9d30e4b](https://github.com/framework7io/framework7/commit/9d30e4bbd631610c057f58a5dc48408e8aa5161e))

# [v6.0.17](https://github.com/framework7io/framework7/compare/v6.0.16...v6.0.17) (2021-04-30)

### Bug Fixes

- **device:** fix iPhone detection on FireFox iOS ([840503e](https://github.com/framework7io/framework7/commit/840503e1984c2e0dddfe3d9eaed87e36af9b03f0)), closes [#3876](https://github.com/framework7io/framework7/issues/3876)
- **modals:** fixed issue when initially opened modal closed without animation ([e2cff56](https://github.com/framework7io/framework7/commit/e2cff56119bbe39409ba73481f9b197d19bb7e00))
- **svelte:** fix value of `textEditorChange` event in ListInput ([4e1d26f](https://github.com/framework7io/framework7/commit/4e1d26f8ca6a59d78c143dd76bfb58fa056de122)), closes [#3879](https://github.com/framework7io/framework7/issues/3879)
- fix missing method definitions for sheet step methods ([73167fb](https://github.com/framework7io/framework7/commit/73167fb0b44507705e1c6c150413b701729276f3))

# [v6.0.16](https://github.com/framework7io/framework7/compare/v6.0.15...v6.0.16) (2021-04-16)

### Bug Fixes

- **core messages:** fixed issue with `attrs` in `.addMessage` method ([da027b9](https://github.com/framework7io/framework7/commit/da027b9cd444254dd1ad1760ff260eabfefa3abd))
- **react:** fix events to be reactive in Range, Stepper and Toggle ([53c5be5](https://github.com/framework7io/framework7/commit/53c5be5620927f05d406f98737ef1decee25dba8)), closes [#3872](https://github.com/framework7io/framework7/issues/3872)
- **vue:** fixed issue with wrong `page-with-subnavbar` class

# [v.6.0.15](https://github.com/framework7io/framework7/compare/v6.0.14...v6.0.15) (2021-04-09)

### Bug Fixes

- **react:** fix events to be reactive in Actions, LoginScreen, Panel, Popover, Popup, Sheet ([8799b44](https://github.com/framework7io/framework7/commit/8799b442da085d131d78c3a4da669d2008e65147))

# [v6.0.14](https://github.com/framework7io/framework7/compare/v6.0.12...v6.0.14) - March 22, 2021

### Bug Fixes

- **core:** fixed `.less` division widths/heights
- **react:** fixed typing for Progressbar
- **text editor:** fixed wrong keyboard toolbar dark theme detection

# [v6.0.12](https://github.com/framework7io/framework7/compare/v6.0.11...v6.0.12) - March 5, 2021

### Bug Fixes

- **core:** typings for `f7.online` ([259c91e](https://github.com/framework7io/framework7/commit/259c91edc7c10e337ad47744771f748bed0e3f55)), closes [#3825](https://github.com/framework7io/framework7/issues/3825)
- **react:** add typings for React components `ref`s ([3ecadc2](https://github.com/framework7io/framework7/commit/3ecadc2c58b584decd4da140a882e6be9207134b)), closes [#3827](https://github.com/framework7io/framework7/issues/3827)
- **react:** fix smart select lifecycle hooks ([d40b13f](https://github.com/framework7io/framework7/commit/d40b13f7ca4a4523127a3364d9e2e704d96b35ad))

### Features

- **calendar:** new `calendar.allowTouchMove` boolean property to toggle touchmove interactions ([a58ef12](https://github.com/framework7io/framework7/commit/a58ef126cc942260623bf1dd85cd0eda9b3e8d9e))

# [v6.0.11](https://github.com/framework7io/framework7/compare/v6.0.10...v6.0.11) - February 24, 2021

### Bug Fixes

- **components:** fixed issue with keepAlive not working correctly for initial page routes ([171ca2a](https://github.com/framework7io/framework7/commit/171ca2af50ab86c3f1cf36032495f3502f222750))
- **store:** fixed issue with wrong getter value after state update ([11ac753](https://github.com/framework7io/framework7/commit/11ac75318a173ea86a185d3b782fdc142f742b29))

# [v6.0.10](https://github.com/framework7io/framework7/compare/v6.0.9...v6.0.10) - February 18, 2021

### Bug Fixes

- **components:** fix theme detection for initial page ([cf53ba3](https://github.com/framework7io/framework7/commit/cf53ba371ba3eb98c4842fac204b558bd0caebab))
- **svelte:** proper CJS components in package ([63032e3](https://github.com/framework7io/framework7/commit/63032e366e98264f2d84671ab93596a1ddc556b7))

# [v6.0.9](https://github.com/framework7io/framework7/compare/v6.0.8...v6.0.9) - February 18, 2021

### Bug Fixes

- **photo browser:** fixed issue with not working swipe to close ([1e3bcbc](https://github.com/framework7io/framework7/commit/1e3bcbcf538bc708553b1e1e621717384596b8c1))

### Features

- **swiper:** update Swiper to latest 6.4.15 ([b2274a1](https://github.com/framework7io/framework7/commit/b2274a1bbdfb8c572c43b55ded610ed021ac4460))

# [v6.0.8](https://github.com/framework7io/framework7/compare/v6.0.7...v6.0.8) - February 16, 2021

### Bug Fixes

- **components:** better SSR support ([0e7b9e8](https://github.com/framework7io/framework7/commit/0e7b9e831a8d28af3859604b0067dbd8f620407b))
- **core:** allow to init Framework7 more than once if runs on server-side ([964af1e](https://github.com/framework7io/framework7/commit/964af1e96466b487e44c81f3e9c560f50867a78f))

# [v6.0.7](https://github.com/framework7io/framework7/compare/v6.0.6...v6.0.7) - February 5, 2021

### Bug Fixes

- **frameworks:** better check if initial route is a Master route ([15c16b4](https://github.com/framework7io/framework7/commit/15c16b4cb3dd32ff13c75a0945a12b3770d95002))
- **frameworks:** fixed issue when passed store instance became different in f7.store ([b20b05d](https://github.com/framework7io/framework7/commit/b20b05db4dd3fc158e327359c9055f023c88d8a7))

# [v6.0.6](https://github.com/framework7io/framework7/compare/v6.0.5...v6.0.6) - January 26, 2021

- Core
  - Text Editor
    - Fixed "add link" button functionality

# [v6.0.5](https://github.com/framework7io/framework7/compare/v6.0.4...v6.0.5) - January 26, 2021

- Core
  - Router Component
    - Added support for HTML contents with `innerHTML` attribute/prop

# [v6.0.4](https://github.com/framework7io/framework7/compare/v6.0.3...v6.0.4) - January 19, 2021

- Package
  - Fixed `postinstall` script
- Vue
  - Removed `vue@2` peer dependency
  - Card
    - Fixed rendering of card footer passed by `footer` prop

# [v6.0.3](https://github.com/framework7io/framework7/compare/v6.0.1...v6.0.3) - January 11, 2021

- Core
  - Added compatibility with latest `less` v4
  - Swiper updated to latest v6.4.5
- React
  - Fixed issue with broken TypeScript declarations on some components
- Minor fixes

# [v6.0.1](https://github.com/framework7io/framework7/compare/v6.0.0...v6.0.1) - December 31, 2020

- React/Svelte/Vue
  - Fix for getting initial route component

# [v6.0.0](https://github.com/framework7io/framework7/compare/v5.7.14...v6.0.0) - December 31, 2020

- Core
  - Package
    - Renamed files and imports
    - Lite version doesn't contain the following components:
      - Gauge
      - Area Chart
      - Pie Chart
    - New types module in `framework7/types`
    - Modules are now babel transpiled
  - App Class
    - App `root` parameter to pass app root element renamed to `el`
    - `app.root` property which contains Dom7 instance of app root element has been renamed to `app.$el` property
    - Removed app `data` and `methods` global app properties in favor of new Store
  - Dom7
    - Uses new Dom7 v3
  - Template7
    - Template7 and its support has been completely removed from Framework7
  - Request
    - Export renamed to `request`
    - Now it uses only Promises API
    - New `request.abortController()`
  - Utils
    - Export renamed to `utils`
    - Removed `removeDiacritics` util
  - Device
    - Export renamed to `device`
    - Added `getDevice` export
  - Support
    - Export renamed to `support`
    - Added `getSupport` export
  - Components
    - Actions
      - Actions Button text in MD & Aurora theme now uses theme color
    - Area Chart
      - All new Area Chart component
    - Autocomplete
      - `routableModals` is now disabled by default
    - Button
      - New loading buttons
    - Calendar
      - `routableModals` is now disabled by default
      - New appearance for Range picker selection
      - Time Picker now supports AM/PM period selection based on selected locale or timePickerFormat
      - New appearance for Time selector link
    - Checkbox
      - Removed "extra" margin in checkboxes list in MD theme
    - Color Picker
      - `routableModals` is now disabled by default
    - Dialog
      - Added `containerEl` property to specify where to mount the modal
    - Gauge
      - Renamed `$gaugeSvgEl` property to `$svgEl`
    - List
      - All new Menu List style for List
      - List Button text in MD theme now uses theme color
    - Menu
      - New appearance for dropdown item hover/pressed states
    - Page
      - New Page Title element
    - Panel
      - Improved support for nested panels. Now panel can be created and correctly opened inside of the page (including with breakpoints)
    - Photo Browser
      - `routableModals` is now disabled by default
    - Picker
      - New appearance for selected item/row
      - `routableModals` is now disabled by default
    - Pie Chart
      - All new Pie Chart component
    - Popover
      - Now it considers safe-areas on positioning
    - Popup
      - Fixed issue when Push Popup can incorrectly transform View behind on app/window resize/rotate
    - Preloader
      - Preloader in MD theme now uses new SVG layout
      - Preloader in iOS reworked to match iOS 14 appearance
      - Preloader in iOS now also supports "multi" color
    - Radio
      - Removed "extra" margin in radios list in MD theme
    - Skeleton Elements
      - Used as dependency
      - New React, Svelte and Vue components
      - CSS vars renamed without `--f7-` prefix
    - Smart Select
      - `routableModals` is now disabled by default
    - Swipeout
      - New `app.params.swipeout.overswipeRatio` (default to `1.2`) allows to configure how more to swipe to enable overswipe
      - Fixed styles to consider left and right safe-areas
    - Swiper
      - Updated to all new Swiper v6
      - Used as dependency
    - Text Editor
      - New `.clearValue()` method
    - Tooltip
      - New `containerEl` parameter
      - New `delegated` parameter. Enables tooltip for all elements matching to `targetEl` selector (e.g. attaches event handler to document). `targetEl` parameter must be a CSS Selector (string)
      - New `trigger: 'manual'` value
      - New `.setTarget(targetEl)` instance method to change tooltip target after it was created
    - Touch Ripple
      - Highly reworked Touch Ripple effect (used in MD theme by default)
      - New `app.touch.touchRippleInsetElements` parameter to specify elements with inset touch ripple
    - Virtual List
      - `itemTemplate` parameter has been removed with removal of Template7
  - View/Router
    - `pushState...` parameters renamed to `browserHistory...`
    - New `browserHistoryInitialMatch` parameter
    - Now `reloadDetail` will remove all detail pages in master-detail layout between master and new detail page
    - Route's `master` property that indicates whether it is a master route or not now can be a method that receives `(f7, router)` (app and router instances) and should return boolean.
    - Route's `beforeEnter`, `beforeLeave`, `redirect` and `async` methods now receive a single object with following props
      - `to`
      - `from`
      - `resolve`
      - `reject`
      - `direction` (new in v6 - can be `forward` or `backward`)
      - `router` (new in v6 - current router instance)
      - `app` (new in v6 - f7 app instance)
    - Now it is possible to specify how to open page route with `data-open-in` attribute, e.g.
      ```html
      <a href="/about/" data-open-in="popup">About</a>
      ```
    - Route's `options.context` property has been removed
    - Route's `template` and `templateUrl` properties have been removed with removal of Template7
    - All new Router component
      - Uses ES templates instead of Template7 templates
      - Removed scoped styles
      - Simplified component declaration to be a simple function
      - Can be used with JSX syntax
  - Store
    - All new Store library for application state management
  - Capacitor
    - Added support for core APIs when app running under Capacitor environment (core Statusbar methods, automatic disabling of service workers and router browser history, etc.)
- React
  - `App` component now receives all app parameters as props
  - React components rewritten with hooks
  - Removed all prototypes methods (`$$`, `$f7`, `$f7ready`, `$f7route`, `$f7router`, `$utils`, `$device`, `$theme`, `$request`)
    - Now they should be imported as `import {f7, f7ready, theme} from 'framework7-react'`. `Dom7`, `device`, `request` can be used as `f7.` accessors or imported from `framework7`
  - Removed `umd` version
- Vue
  - Rewritten to new Vue v3 API (no Vue v2 support anymore)
  - `App` component now receives all app parameters as props
  - Removed all prototypes methods (`$$`, `$f7`, `$f7ready`, `$f7route`, `$f7router`, `$utils`, `$device`, `$theme`, `$request`)
    - Now they should be imported as `import {f7, f7ready, theme} from 'framework7-vue'`. `Dom7`, `device`, `request` can be used as `f7.` accessors or imported from `framework7`
  - Removed `umd` version
  - Added `v-model` support
    - Checkbox, ListItem, Radio, Toggle, MessagebarSheetImage
      - Support for `v-model:checked`
    - Actions, LoginScreen, Panel, Popover, Popup, Sheet
      - Support for `v-model:opened`
    - Card
      - Support for `v-model:expandableOpened`
    - Input, ListInput, Messagebar, Searchbar, Stepper, Range
      - Support for `v-model:value`
- Svelte
  - `App` component now receives all app parameters as props
  - Added `bind:$property` support
    - Checkbox, ListItem, Radio, Toggle, MessagebarSheetImage
      - Support for `bind:checked`
    - Actions, LoginScreen, Panel, Popover, Popup, Sheet
      - Support for `bind:opened`
    - Card
      - Support for `bind:expandableOpened`
    - Input, ListInput, Messagebar, Searchbar, Stepper, Range
      - Support for `bind:value`
- Common for React/Svelte/Vue
  - Button, Link, ListButton, ListItem, MenuDropdownItem, MenuItem, TreeviewItem
    - New `openIn` prop to specify how to open page route (e.g. open page as `popup`, `sheet`, `panel` etc)
  - Area Chart
    - New Area Chart component
  - Button
    - Support for loading button (button with preloader) with new props:
      - `preloader` - enables button to have preloader
      - `loading` - controls button state to show/hide preloader and hide/show button text (switch button to loading state)
      - `preloaderColor` - button's preloader color
      - `preloaderSize` - button's preloader size
  - Input
    - Added `error-message` slot
  - List
    - New `menuList` boolean property to enable menu List
  - ListItem
    - New `selected` boolean property to mark menu list item as selected
  - MenuItem
    - Added support for tooltip with `tooltip` and `tooltipTrigger` props
  - Messagebar
    - Removed component methods
  - Messages
    - Removed component methods
    - Added `typing` prop
  - Panel
    - Removed component `open`/`close` methods
  - Pie Chart
    - New Pie Chart component
  - Popover
    - `target` prop renamed to `targetEl`
  - Popover, Login Screen, Actions, Sheet
    - Added `animate` property
    - Removed component open/close methods
    - Added `containerEl` property to specify where to mount the modal
  - Sheet
    - Added `fixed` and `static` slots
  - Toggle
    - Added support for tooltip with `tooltip` and `tooltipTrigger` props

# [v5.7.14](https://github.com/framework7io/framework7/compare/v5.7.13...v5.7.14) - November 9, 2020

- Core
  - Types fixes (#3759, #3758)
  - Calendar
    - Minor fixes updating selected value (#3761)
- React
  - Removed React 16 peer dependency (to be compatible with React 17)

# [v5.7.13](https://github.com/framework7io/framework7/compare/v5.7.12...v5.7.13) - October 9, 2020

- Core
  - Router
    - Fixed swipe-back issues on iOS 14
  - Device
    - Fixed iOS detection for newest iPads
- Svelte
  - ListInput, Input
    - Fixed not working TextEditor events
  - LoginScreen
    - Fixed not working events
- Lots of docs and Kitchen Sink typos fixes by @DAnn2012

# [v5.7.12](https://github.com/framework7io/framework7/compare/v5.7.11...v5.7.12) - September 3, 2020

- Core
  - Autocomplete
    - Added `searchbarSpellcheck` parameter to enable/disable spell check on searchbar's input. Disabled by default
  - Panel
    - Now accepts new `containerEl` parameter to be able be mounted to other element rather than root
  - Smart Select
    - Added `searchbarSpellcheck` parameter to enable/disable spell check on searchbar's input. Disabled by default
- React/Svelte/Vue
  - Searchbar
    - Added `spellcheck` prop to set `spellcheck` attribute on input element
  - ListInput
    - Fixed not working `onTextEditorChange` prop in Svelte component
  - Minor fixes

# [v5.7.11](https://github.com/framework7io/framework7/compare/v5.7.10...v5.7.11) - August 17, 2020

- Core
  - Gauge
    - Fixed issue when gauge text wasn't appear on update
  - Router Component
    - Fixed issue when empty `value` attribute was removed on `<option>` element
- Svelte
  - List
    - Fixed issue with not working `sortableSort` event

# [v5.7.10](https://github.com/framework7io/framework7/compare/v5.7.9...v5.7.10) - July 14, 2020

- Core
  - Tooltip
    - Fixed issue with positioning for SVG elements

# [v5.7.9](https://github.com/framework7io/framework7/compare/v5.7.8...v5.7.9) - July 12, 2020

- Core
  - Router Component
    - Fixed issue with multiple event handler arguments
  - Searchbar
    - Not it won't scroll page on expandable open when navbar large collapsed
  - Treeview
    - Changed style to use/set item `min-height` instead of `height`
  - View
    - Now it will be also auto initialized on dynamically created panel open
  - Minor fixes

# [v5.7.8](https://github.com/framework7io/framework7/compare/v5.7.7...v5.7.8) - June 13, 2020

- Core
  - Card
    - Expandable card now has `user-select: none` when it is closed
  - Router Component
    - Fixed issue with parsing scoped styles that have `"{"` content
- React/Svelte/Vue
  - Badge
    - Added support for Tooltip with `tooltip` and `tooltipTrigger` props
  - Chip
    - Added support for Tooltip with `tooltip` and `tooltipTrigger` props
- Minor fixes

# [v5.7.7](https://github.com/framework7io/framework7/compare/v5.7.6...v5.7.7) - June 5, 2020

- React/Svelte/Vue
  - ListInput
    - Fixed issue with infinite loop when updating `calendarParams`
  - Stepper
    - Auto update stepper internal value on `value` prop update
- Minor Fixes

# [v5.7.6](https://github.com/framework7io/framework7/compare/v5.7.5...v5.7.6) - June 1, 2020

- Core
  - Range slider
    - Fix for better handling touch events on Windows
  - Router
    - Fixed issue with parsing route params for Master Detail master page when navigating directly to detail page
  - Tabs
    - Automatically set initial animated tab position based on `tab-active` class
- React/Svelte/Vue
  - List
    - Added `virtualListInstance()` methods to get Virtual List instance in Svelte
  - ListItem
    - Added `smartSelectInstance()` method to get Smart Select instance in Svelte
  - ListInput
    - Auto update Color Picker and Calendar params on `calendarParams` and `colorPickerParams` props changes
- Minor fixes

# [v5.7.5](https://github.com/framework7io/framework7/compare/v5.7.2...v5.7.5) - May 16, 2020

- Core
  - Input
    - Now `app.input.validate()` and `app.input.validateInputs()` should correctly work with readonly inputs (like in Calendar, Picker, Color Picker, etc.)
  - Range
    - Added support for `scaleSteps: 1`
    - Fixed issue when it didn't update size in parent resizable panel
  - Swiper updated to latest 5.4.0
    - Hash Navigation
      - Added `hashChange` and `hashSet` events (#3557)
    - Lazy
      - Added support for `<picture>` lazy loading (#3560)
    - Mousewheel
      - Potentially improved vertical scrolling issues on Windows/Linux
    - `History` and `Hash Navigation` modules are now included in Framework7 version of Swiper
  - Toast
    - Added `horizontalPosition` parameter - to set horizontal alignment on wide screen
  - Touch
    - Tweaked touch events detection
- React/Vue/Svelte
  - Fab
    - Fixed issue when it rendered not correctly without icon
  - Chip
    - Now it has default slot which goes to text label

# [v5.7.2](https://github.com/framework7io/framework7/compare/v5.7.1...v5.7.2) - May 9, 2020

- Core
  - Autocomplete
    - Fixed wrong padding when used as dropdown in searchbar
  - Buttons
    - Fixed rendering issue with "strong" segmented happened some times in iOS
  - Device
    - Better iPad detection
  - Panel
    - Now it auto-hides/restores on push Popup or Sheet modal open
  - View
    - Fixed `current` view detection when using layout with swipeable tabs
- Svelte
  - All components now supports `$$restProps` under the hood, it means all extra props passed to components will be set as html attributes on component element
- Minor fixes and improvements

# [v5.7.1](https://github.com/framework7io/framework7/compare/v5.7.0...v5.7.1) - May 1, 2020

- Core
  - CSS
    - `body` background color changed to `#000` when dark theme enabled
  - Panel
    - Now it correctly handles disabling backdrop.
  - Text Editor
    - Popover now calculates position relative to app root element (#3618)
  - View
    - Fixed `current` view detection when using layout with swipeable tabs
- Minor fixes

# [v5.7.0](https://github.com/framework7io/framework7/compare/v5.6.0...v5.7.0) - April 25, 2020

- Core
  - Card
    - Fixed issue when expandable card didn't work when expandable card was opened in another page
    - Fixed issue when used with "hide on scroll" Navbar/Toolbar on iOS
  - Panel
    - New `swipeNoFollow` parameter - fallback option for potentially better performance on old/slow devices. If you enable it, then swipe panel will not follow your finger during touch move, it will be automatically opened/closed on swipe left/right. (default false)
  - Popup
    - Disabled top/bottom safe areas on "tablet" when opened not as full screen popup
    - Now it correctly handles and stack multiple opened "push" popups
  - Radio
    - Now radio icon can be rendered in the beginning or in the end of the list item, by adding `item-radio-icon-start` or `item-radio-icon-end` class to `item-radio` list element
  - Smart Select
    - Add support for more data-option-icon properties:
      - `data-option-icon` - if it just a string then will create an icon with this class. If it is in the format of `f7:icon_name` then it will create a F7-Icons icon. If it is in the format of `md:icon_name` then it will create a Material Icons icon
      - `data-option-icon-ios` - same as `data-option-icon` but will apply only when iOS theme is active
      - `data-option-icon-md` - same as `data-option-icon` but will apply only when MD theme is active
      - `data-option-icon-aurora` - same as `data-option-icon` but will apply only when Aurora theme is active
  - Swiper - updated to latest 5.3.8
    - Core
      - Fix iOS bug with double bounce on free mode momentum bounce
    - A11y
      - Fixed focus ring on navigation buttons (#3544)
      - Fixed RegExp issue in paginationBulletMessage (#3540, #3541)
    - Thumbs
      - Added thumbs.autoScrollOffset parameter that allows to set on what thumbs active slide from edge it should automatically move scroll thumbs
  - View
    - New `masterDetailResizable` parameter to enable resizable Master Detail layout
    - New `viewResize` / `view:resize` event on Master Detail resize
- React/Vue/Svelte
  - ListItem
    - New `radioIcon` string property to define where to display radio icon - in the beginning or in the end of the list item. Can be `start` or `end`
  - Navbar
    - Fixed not working `onBackClick` event in Svelte
  - Panel
    - New `swipeNoFollow` boolean property - fallback option for potentially better performance on old/slow devices. If you enable it, then swipe panel will not follow your finger during touch move, it will be automatically opened/closed on swipe left/right. (default false)
  - View
    - New `materDetailResizable` boolean property to enable resizable Master Detail layout
    - New `viewResize` / `view:resize` event on Master Detail resize
- Minor fixes

# [v5.6.0](https://github.com/framework7io/framework7/compare/v5.5.5...v5.6.0) - April 18, 2020

- Core
  - App
    - Added new app instance boolean property `app.darkTheme`. This property has effect only when `autoDarkTheme` enabled and indicates whether the dark theme active or not
    - Added new app instance event `darkThemeChange`. It has effect only when `autoDarkTheme` enabled and fires on device preferred color scheme change
  - Checkbox
    - Fixed styles in RTL mode
  - Device
    - Added `nwjs` property that is true when app running under NW.js environment
  - Router
    - New `pageTabShow`/`page:tabshow` and `pageTabHide`/`page:tabhide` page events. These events fires on page's parent View-Tab show/hide
  - Segmented
    - Added animation for "strong" segmented active button
    - **BREAKING CHANGE** - now "strong" segmented requires new `<span class="segmented-highlight">` element
- React/Vue/Svelte
  - Input
    - Added support for `inputmode` input attribute
  - ListInput
    - Added support for `inputmode` input attribute
    - Fixed issue with `errorMessage` in Svelte
  - ListItem
    - Added `tabLink` and `tabLinkActive` props to make list item as a tab link
  - Page
    - New `pageTabShow`/`page:tabshow` and `pageTabHide`/`page:tabhide` page events. These events fire on page's parent View-Tab show/hide
- Minor fixes

# [v5.5.5](https://github.com/framework7io/framework7/compare/v5.5.4...v5.5.5) - April 10, 2020

- Core
  - Modals (Popup, Actions, Popover, Login Screen, etc.)
    - Now it is possible to specify all modal parameters via `data-` attributes, e.g.
      ```html
      <div class="sheet-modal" data-swipe-to-close="true" data-close-on-escape="true">...</div>
      ```
  - Swiper - updated to latest 5.3.7
    - Core
      - Fixed `cssMode` behavior in RTL layout
    - Zoom
      - Fixed issue with not working double-tap to toggle with virtual slides
- Minor fixes

# [v5.5.4](https://github.com/framework7io/framework7/compare/v5.5.3...v5.5.4) - April 2, 2020

- Core
  - Input
    - Don't unset focus on input on input's clear button click/tap
- Svelte
  - Input
    - Fixed issue keeping focused state on blur
- Minor fixes

# [v5.5.3](https://github.com/framework7io/framework7/compare/v5.5.1...v5.5.3) - March 28, 2020

- Core
  - Modals (Popup, Actions, Popover, Login Screen, etc.)
    - Now on modal open/close link click it will close only parent modal or last such modal if there are multiple modals with same selector
  - Input
    - `app.input.validate` and `app.input.validateInputs` methods now return `true` (when input(s) are valid) or `false` (when input(s) are not valid)
- Components (React, Vue, Svelte)
  - Input/ListInput
    - New `onValidate` prop callback that receives `true` (when input(s) are valid) or `false` (when input(s) are not valid)
- Minor fixes

# [v5.5.1](https://github.com/framework7io/framework7/compare/v5.5.0...v5.5.1) - March 20, 2020

- Core
  - Action Sheet
    - Fixed issue when it stops to emit events when converted to popover
    - Added `cssClass` parameter to add custom css class to generated element
  - Login Screen
    - Fixed issue with appearance in dark theme
  - Popup
    - New events when swipeToClose enabled: `swipeStart`, `swipeMove`, `swipeEnd`, `swipeClose`
  - Searchbar
    - Fixed inline-searchbar styles when used with large navbar
  - Subnavbar
    - Fixed issue with disabled pointer-events in hidden navbar
- Minor fixes

# [v5.5.0](https://github.com/framework7io/framework7/compare/v5.4.5...v5.5.0) - March 6, 2020

- Core
  - Card
    - Expandable card backdrop blur now uses opacity instead of blur transition for better performance
  - Input
    - Added dark/black backround for native select `<option>`
  - Navbar
    - Added support to make usual (not large) Navbar also transparent. Can be enabled by adding `navbar-transparent` class to navbar
    - New `snapPageScrollToTransparentNavbar` app.navbar parameter - when enabled it will snap page scroll to transparent title (default true)
  - Router
    - New `router.generateUrl({ name, query, params })` to generate route URL
  - Router Component
    - Fixed issue with `autocomplete` attribute treated as `boolean` attribute
    - Now calling `$update()` on root app component should automatically update all components that depends on `$root.` data
  - Text Editor
    - added `init` and `textEditorInit` events
    - added `type="button"` attribute for buttons to prevent form from submitting
    - fixed issue with missing arguments in custom button onClick callback
  - Treeview
    - `loadchildren`'s event `done()` callback now supports boolean `cancel` attribute to cancel/reject loading UI if required by calling `done(true)`
  - Swiper - updated to latest 5.3.6
    - Core
      - Fixed wrong auto height calculation with `centeredSlides` enabled
    - Lazy
      - Now it will update auto height (if enabled) on lazy image loaded (#3466)
    - Zoom
      - Fixed issue when previously active slide could be zoomed with `zoom.in()` API (#3451)
      - Fixed issue when zoom didn't work on `<picture>` element (#3456)
      - Added support for custom zoom-target element by adding `swiper-zoom-target` class to such elements
    - Coverflow Effect
      - `stretch` parameter now can be set in `%` (#3468)
- React, Svelte, Vue components
  - Page
    - Added support for `pageBeforeUnmount` event for `Page` component
  - Navbar
    - Added support to make usual (not large) Navbar also transparent. Can be enabled by adding `transparent` property to navbar, e.g. `<Navbar transparent>`
    - Large-transparent navbar now should be enabled by adding two properties `large` and `transparent` instead of one `large-transparent`. Before: `<Navbar large large-transparent>`, now: `<Navbar large transparent>`
- Lots of minor fixes

# [v5.4.5](https://github.com/framework7io/framework7/compare/v5.4.2...v5.4.5) - February 21, 2020

- Core
  - FAB (Floating Action Button)
    - Now it supports backdrop, by adding `<div class="fab-backdrop"></div>` element on same level as FAB element
  - Page
    - Added custom CSS properties for custom transitions durations: `--f7-page-parallax-transition-duration`, `--f7-page-cover-transition-duration`, `--f7-page-dive-transition-duration`, `--f7-page-fade-transition-duration`, `--f7-page-flip-transition-duration`, `--f7-page-push-transition-duration`
  - Preloader
    - New methods `app.preloader.showIn(el, color)` and `app.preloader.hideIn(el)` to show/hide preloader overlay in specific element
  - Request
    - Now it uses "native" XHR timeout
- React, Vue, Svelte
  - Added `<FabBackdrop />` component
- Minor fixes

# [v5.4.2](https://github.com/framework7io/framework7/compare/v5.4.1...v5.4.2) - February 16, 2020

- Core
  - Card
    - Fixed issue with expandable card overflow on iOS devices
    - Fixed expandable card transition in RTL
  - Text Editor
    - Fixed issue when keyboard toolbar stays opened on navigating to another page
- Minor fixes

# [v5.4.1](https://github.com/framework7io/framework7/compare/v5.4.0...v5.4.1) - February 8, 2020

- Core
  - Touch
    - Fully switch to `pointer` events where supported
  - Tooltip
    - New `trigger` parameter to define how to open Tooltip - on `hover` (default) or on `click`
  - Swiper - updated to latest 5.3.1
    - Fixed issue when slider could stuck after last slide (#3414)
    - Added `label` to list of form events to keep clicks on it (#3407)
  - Request
    - Now it won't set headers with `undefined` value
- Vue/React/Svelte
  - Tooltip
    - New `tooltipTrigger` prop for `Button`, `FabButton`, `Fab`, `Icon`, `Link`, `ListButton` and `ListItem` components
- Minor fixes

# [v5.4.0](https://github.com/framework7io/framework7/compare/v5.3.2...v5.4.0) - January 29, 2020

- Framework7 Svelte 🎉
- Core
  - Autocomplete
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Calendar
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Card
    - New `scrollabelEl` parameter that allows to define child scrollable element (if used) to correctly handle expandable card close with touch move
  - Color Picker
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Photo Browser
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Picker
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
    - New `scrollToEl` parameter to specify cutom elements to scroll to on open
  - Smart Select
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
- React/Vue
  - Card
    - New `scrollabelEl` prop that allows to define child scrollable element (if used) to correctly handle expandable card close with touch move
- Lot of minor fixes

# [v5.4.0-beta.3](https://github.com/framework7io/framework7/compare/v5.4.0-beta.2...v5.4.0-beta.3) - January 25, 2020

- Core
  - Autocomplete
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Calendar
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Color Picker
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Photo Browser
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Picker
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.
  - Smart Select
    - Now it falls back to not "routable" modal when there is no View passed or it can't be found.

# [v5.4.0-beta.2](https://github.com/framework7io/framework7/compare/v5.4.0-beta.1...v5.4.0-beta.2) - January 25, 2020

- Fix missing packages

# [v5.4.0-beta.1](https://github.com/framework7io/framework7/compare/v5.3.2...v5.4.0-beta.1) - January 25, 2020

- Card
  - New `scrollabelEl` parameter that allows to define child scrollable element (if used) to correctly handle expandable card close with touch move
- React/Vue
  - Card
    - New `scrollabelEl` prop that allows to define child scrollable element (if used) to correctly handle expandable card close with touch move
- Framework7 Svelte 🎉
- Minor fixes

# [v5.3.2](https://github.com/framework7io/framework7/compare/v5.3.0...v5.3.2) - January 18, 2020

- Core
  - Component
    - Now main app component will be created on app init respecting cordova's deviceready event
  - Toolbar
    - Fixed Tabbar init when it used in main app component
  - Picker
    - Added `backdrop` parameter support
  - Swiper updated to latest 5.3.0
    - Core
      - New `slidesPerGroupSkip` behavior (#3361)
      - New ratio-based breakpoints (#3389)
      - Added SCSS interpolation (#3373, #3374)
    - Mousehweel
      - Fixed issue when it can fail on load (#3383)
  - Touch
    - Fixed issue when it could prevent Leaflet map controls on iOS 12.x
- Vue/React
  - Navbar - fixed issue when it could disappear with custom transitions
- Minor fixes

# [v5.3.0](https://github.com/framework7io/framework7/compare/v5.2.0...v5.3.0) - January 3, 2020

- Core
  - Card
    - Increased default `z-index` for expandable card
  - Dialog
    - Added support for `backdrop` parameter to be able to disable backdrop
  - Sheet
    - New `sheet.setSwipeStep()` method to update swipe step position if content was modified manually
  - Tooltip
    - New `offset` parameter to add extra offset to tooltip position
  - Touch
    - New `touch.activeStateOnMouseMove` boolean app parameter. If enabled it will not remove "active state" from clicked elements on mouse move
  - Router Component
    - Fixed issue with parsing CSS media queries in scoped styles
    - Now it is possible to use whole app layout as a component
      - Main app component can be specified in app `component` or `componentUrl` parameter
      - `app.rootComponent` now refers to main app component instance
      - If main app component is used, then `$root` in components refers to main app component instance
  - Minor fixes

# [v5.2.0](https://github.com/framework7io/framework7/compare/v5.1.3...v5.2.0) - December 8, 2019

- Core
  - Accordion
    - It is now possible to use accordion chevron on opposite side (on left in LTR) by adding `accordion-opposite` class to accordion list
  - Calendar
    - Fixed issue when custom `dateFormat` parsed twice (#3434)
    - Added custom time tokens support to `dateFormat` when `timePicker` is enabled: `HH`, `H`, `hh`, `h`, `:mm`, `:m`, `:ss`, `:s`, `A`, `a` (#3439)
  - Dialog
    - New `app.dialog.autoFocus` boolean parameter to auto focus predefined dialog inputs on open (valid for predefined Prompt, Login and Password dialogs). Enabled by default
    - Added hover and pressed state for dialog buttons in Aurora theme
  - Panel
    - All panel instance events now have Panel instance as argument (#3404)
  - Photo Browser
    - Size navbar after updating count text (`1 of 4`) (#3420)
  - Router Component
    - Fixed issue when calling `$setState` recursively didn't work as expected (#3421)
  - Smart Select
    - Fixed issue calling scrollToSelectedItem caused error when there were no any items (#3412)
  - Sortable
    - It is now possible to make sortable handler appear on opposite side (on left in LTR) adding `sortable-opposite` class to sortable list
- Phenome
  - Added lock to not throw and error and ignore further attempts to init Framework7 (for example when App component unmounted and mounted again)
  - List
    - New boolean `sortableOpposite` prop to render sortable handler on opposite side
    - New boolean `accordionOpposite` prop to render accordion checron icon on opposite side
  - Navbar
    - Fixed issue when `no-shadow` and `no-hairline` props didn't have expected effect (#3436)
    - Fixed issue when it was loosing required position classes in Master Detail layout
- Minor fixes

# [v5.1.3](https://github.com/framework7io/framework7/compare/v5.1.2...v5.1.3) - November 17, 2019

- Core
  - Fixed issue with setting wrong class on page

# [v5.1.2](https://github.com/framework7io/framework7/compare/v5.1.1...v5.1.2) - November 17, 2019

- Core
  - Fixed issue when `.once` could be called more than once (#3322)
  - Navbar
    - Fixed issue when `scrollTopOnTitleClick` didn't work in iOS theme
  - Swiper - updated to latest 5.2.1
    - Core
      - New loop events `beforeLoopFix` and `loopFix`
      - New parameter `updateOnWindowResize` (by default `true`) that will update/recalc swiper on window resize/orientationchange
    - Mousewheel
      - Fixed scroll wheel unwanted frozen effect (#3328)
    - Thumbs
      - New `multipleActiveThumbs` (by default `true`) option to control whether multiple thumbnail slides may get activated or not.
- Phenome
  - Navbar
    - Fixed issue when dynamically updating its classes/props could break its layout
- Minor fixes

# [v5.1.1](https://github.com/framework7io/framework7/compare/v5.1.0...v5.1.1) - November 3, 2019

- Core
  - Calendar
    - Fixed `d`, `m`, `D`, `M` tokens parsing in custom date format
  - Photo Browser
    - Fixed issue when opening PhotoBrowser on not first slide can cause empty text in its Navbar
  - Router Component
    - New syntax to use custom components in strict HTML layout using `component` attribute, e.g. `<tr component="my-table-row"></tr>` instead of `<my-table-row></my-table-row>`
- Minor fixes

# [v5.1.0](https://github.com/framework7io/framework7/compare/v5.0.5...v5.1.0) - October 27, 2019

- Core
  - Grid
    - New resizable grid
  - Router Component
    - Fixed issue when triggering update could break scoped styles
    - Fixed update callbacks queue
  - Swiper - updated to latest 5.2.0
    - Core
      - New `centeredSlidesBounds` parameter that when enabled will keep first and last slides at bounds
      - Fixed issue when `freeMode` could break position on resize (#2708, #3303)
      - Fixed transition duration issue with `freeModeSticky` (#3302)
      - Fixed issue with wrong row/column if not full groups (#3294)
      - Fixed issue when `watchOverflow` and `slidesOffsetBefore`/`slidesOffsetAfter` couldn't work together (#3291)
    - Mousewheel
      - Faster & smoother mousewheel inertial scrolling (#3304)
- Phenome
  - Row/Col
    - New `resizable` components properties to enable resizable grid

# [v5.0.5](https://github.com/framework7io/framework7/compare/v5.0.4...v5.0.5) - October 16, 2019

- Core
  - Toolbar
    - Now it fires `toolbar:show` and `toolbar:hide` events on show/hide
  - Card
    - Now it should consider `hideStatusbarOnOpen` when calculating expandable card size
  - PhotoBrowser
    - Fixed issue with double preloader
    - Fixed issue when double tap to zoom also toggled exposition
  - Router Component
    - Fixed issue when `updated` hook had wrong context
  - Sheet Modal
    - Tweaked Sheet dark theme background color to have more contrast with page
  - Input
    - Added more events when resizable textarea's size should be recalculated
  - Swiper updated to latest v5.1.0
    - Core
      - Fixed issues with touch on iOS 13
      - New `translateTo` method
    - Pagination
      - Improved dynamic bullets behavior when `loop: true`
    - Zoom
      - Fixed issue with pinch to zoom on Android
- Phenome
  - Page
    - Fixed issue when pages can stuck on swipe back
  - TextEditor
    - Fixed issue with not working component events

# [v5.0.4](https://github.com/framework7io/framework7/compare/v5.0.3...v5.0.4) - October 9, 2019

- Core
  - Messages
    - Fixed iOS dark theme Messages colors
  - Text Editor
    - Fixed TypeScript definitions error

# [v5.0.3](https://github.com/framework7io/framework7/compare/v5.0.2...v5.0.3) - October 8, 2019

- Core
  - Input
    - `scrollIntoViewOnFocus` functionality now considers the case when input is inside of expandable card
  - TextEditor
    - Prevent parent form submission on editor button click
- Phenome
  - Page
    - Fixed issue when page after can stay "blocked" after expandable card close

# [v5.0.2](https://github.com/framework7io/framework7/compare/v5.0.1...v5.0.2) - October 7, 2019

- Phenome
  - ListGroup
    - Fixed issue breaking this component

# [v5.0.1](https://github.com/framework7io/framework7/compare/v5.0.0...v5.0.1) - October 7, 2019

- Core
  - Tooltip
    - Fixed issue when Tooltip stays hidden on desktop

# [v5.0.0](https://github.com/framework7io/framework7/compare/v4.5.2...v5.0.0) - October 7, 2019

## CSS & Theming

- iOS Dark theme colors reworked to match iOS 13 dark theme colors
- Most of CSS variables related to colors (especially "gray" colors) reworked to `rgba` colors to appear better on custom designs. It is related to text colors, background colors, icons colors, borders and hairlines colors.
- Most of iOS theme `15px` sizes (list/blocks paddings and margins) are changed to `16px` instead
- New CSS breakpoints. Now there are new names for app sizes instead of `tablet-` and `desktop-` before. Now they are:
  - `xsmall` - width more than `480px`
  - `small` - width more than `568px`
  - `medium` - width more than `768px`
  - `large` - width more than `1024px`
  - `xlarge` - width more than `1200px`
- Dark Theme can now be excluded from bundle (custom build)
- Light Theme can now also be excluded from bundle (custom build)

## Core Package

- Now core package contains new `framework7-lite.js`, `framework7-lite.bundle.js` scripts. Difference with usual scripts is that these "lite" versions don't contain Component (Router Component) functionality. This version is recommended to use with F7-Vue/React versions where you anyway use Vue/React components instead.

## Core APIs & Modules

- **iOS Translucent**
  - New `iosTranslucentBars` app parameter to enable translucent effect (blur background) on navigation bars (by default enabled)
  - New `iosTranslucentModals` app parameter to enable translucent effect (blur background) on modals (Dialog, Popover, Actions) (by default enabled)
- **Connection API** (new)
  - New F7 instance's `online` boolean property that is `true` when app online and `false` otherwise
  - Now app emits `online` event when app goes online
  - Now app emits `offline` event when app goes offline
  - Now app emits `connection` event on app connection change
- **Device**
  - `.needsStatusbarOverlay()` method has been removed
  - `.statusbar` property and detection has been removed
  - `.iphoneX` property and detection has been removed
  - `.windowsPhone` property and detection has been removed
  - It doesn't set `device-ios-gt-{version}` classes on `html` element anymore
  - It doesn't set `device-{os}-{version}` classes on `html` element anymore
  - It doesn't set `retina` class on `html` element anymore
- **Request**
  - Request "promise" methods now will be resolved with `{ data, status, xhr }` object (rather than with just `data` like before)
  - Request "promise" methods now will be rejected with `{ message, status, xhr }` object (rather than with just `status` like before)
- **Statusbar**
  - Statusbar overlay element (`<div class="statusbar">`) and related functionality has been removed in favor of using that space by navigation bars and other elements to provide true full-screen experience and customization. Statusbar cordova's API is there as it was before.
- **Touch**
  - Fast clicks functionality has been completely removed. Following `app.touch`' parameters are not supported anymore: `fastClicks`, `fastClicksDistanceThreshold`, `fastClicksDelayBetweenClicks` and `fastClicksExclude`
  - Added support to disable "active state" on specific elements by adding `no-active-state` class to such elements
- **View/Router**
  - New `loadInitialPage` (boolean) parameter. When enabled, and there is no children pages inside of the View. It will load initial page that matches to initial URL (default true)
  - New `componentCache` (boolean) parameter. When enabled, Router will cache components specified via `componentUrl` (default true)
  - Removed `.clearPreviousPages()` method. Now there is only `.clearPreviousHistory()` that removes both history and pages from DOM
  - Root (first) detail page (in master-detail layout) will now have extra `page-master-detail-root`
  - Root (first) detail navbar (in master-detail layout) will now have extra `navbar-master-detail-root`.
  - Added custom page transitions support and 8 new page transitions: `f7-circle`, `f7-cover`, `f7-cover-v`, `f7-dive`, `f7-fade`, `f7-flip`, `f7-parallax`, `f7-push`
  - Custom transition can now also be specified via `data-transition` attribute on links
  - Route declaration now supports new `viewName` property. And whatever View such route requested, it will be loaded in View specified in `viewName` property.
  - Route declaration now supports new `options.transition` string property to specify custom transition for this route
  - Route declaration now supports new `asyncComponent` method that should return Promise resolved with Component or ES module with `.default` property containing Component
  - It is now possible to specify "current" view for link to load the page with `data-view="current"` attribute
  - `iosSeparateDynamicNavbar` parameter has been removed and behavior that uses with `iosSeparateDynamicNavbar: false` is not supported anymore

## Core Components

- **Action Sheet**
  - Now it also appears in dark when dark theme enabled
- **Autocomplete**
  - New `popupPush` parameter - enables Autocomplete popup to push view(s) behind on open
  - New `popupSwipeToClose` parameter - enables ability to close Autocomplete popup with swipe
- **Block**
  - Now it uses new breakpoint names for `{size}-inset` classes (e.g. `tablet-inset` -> `medium-inset`, etc.)
  - Block title in iOS theme is now larger and bolder
- **Button**
  - iOS theme buttons are reworked a bit. They now has thicker border and uppercased
  - New "strong" segmented style (e.g. iOS 13 segmented). Can be enabled by adding `segmented-strong` class to segmented element (`<div class="segmented">`)
- **Calendar**
  - Now calendar value will be cleared on related input's clear (when "clear button" clicked)
  - Calendar has been reworked to use `Intl.DateTimeFormat` API.
    - New `locale` parameter (e.g. `en-US`). If not specified, it will use browser locale
    - `dateFormat` now can accept `Intl.DateTimeFormatOptions` (e.g. `{ month: 'long', day: 'numeric' }`)
    - `monthNames` now by default is `auto` - it will display month names based on specified locale (or browser locale)
    - `monthNamesShort` now by default is `auto` - it will display month names based on specified locale (or browser locale)
    - `dayNames` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
    - `dayNamesShort` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
    - Jalali calendar and `IDate` dependency removed in favor of new Intl api
  - New month picker functionality (clicking month name in toolbar will open month picker) with new `monthPicker` parameter (by default true)
  - New year picker functionality (clicking year in toolbar will open year picker) with new `yearPicker` parameter (by default true)
  - New `yearPickerMin` parameter to specify minimum available year for year picker, by default is today minus 100 years
  - New `yearPickerMax` parameter to specify maximum available year for year picker, by default is today plus 100 years
  - New time picker functionality (to select a time in addition to date) with new `timePicker` parameter (by default false)
  - New `timePickerFormat` parameter to specify time format displayed in time selector. (default `{ hour: 'numeric', minute: 'numeric' }`)
  - New `timePickerPlaceholder` parameter to specify time picker placeholder text (default "Select time")
  - New `sheetPush` parameter - enables Calendar sheet to push view(s) behind on open
  - New `sheetSwipeToClose` parameter - to close Calendar sheet with swipe
- **Card**
  - New `hideStatusbarOnOpen` app card parameter - will hide "Statusbar" on expandable card open. (default `true`)
- **Color Picker**
  - New `popupPush` parameter - enables Color Picker popup to push view(s) behind on open
  - New `popupSwipeToClose` parameter - enables ability to close Color Picker popup with swipe
  - New `sheetPush` parameter - enables Color Picker sheet to push view(s) behind on open
  - New `sheetSwipeToClose` parameter - enables ability to close Color Picker sheet with swipe
- **Data Table**
  - Removed support for `tablet-only` and `desktop-only` classes for table columns. Now it uses new breakpoint names and classes accordingly (e.g. `medium-only`, `xlarge-only`, etc.)
- **Dialog**
  - Now it also appears in dark when dark theme enabled
- **Grid**
  - Now it uses new breakpoint names for responsive columns classes (e.g. `tablet-50` -> `medium-50`, etc.)
- **List**
  - Now it uses new breakpoint names for `{size}-inset` classes (e.g. `tablet-inset` -> `medium-inset`, etc.)
  - Removed declaration for list icon default color (that could make it harder to customize)
- **Login Screen**
  - Now it centers content vertically
- **Navbar**
  - iOS theme dynamic Navbar behavior totally reworked. Now it doesn't take `navbar-inner` from the page's Navbar, but takes whole Navbar element. It makes it easier to customize each navbar (bg color, text color, hairlines, shadows) and brings better transitions between them.
  - Navbar size now will be increased (when top safe-area is in place) to cover the status bar space. This gives even better full-screen experience and transitions.
  - Navbar HTML layout has been reworked, now it has new `navbar-bg` element:
    ```html
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">...</div>
    </div>
    ```
  - Large Navbar should now have addition `navbar-large` class on navbar itself (instead of `navbar-large-inner` on `navbar-inner`):
    ```html
    <div class="navbar navbar-large">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">...</div>
    </div>
    ```
  - New large transparent Navbar (like in iOS 13), can enabled with additional `navbar-large-transparent` class:
    ```html
    <div class="navbar navbar-large navbar-large-transparent">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">...</div>
    </div>
    ```

* **Panel**
  - Panels functionality has been fully reworked and now behaves more like a modals, which means we now can have as many panels as we want (or need) not limited to only 2 (left and right) panels.
  - The following parameter has been removed from `app.panel` parameters: `leftBreakpoint`, `rightBreakpoint`, `swipe`, `swipeActiveArea`, `swipeCloseActiveAreaSide`, `swipeOnlyClose`, `swipeThreshold`, `closeByBackdropClick`.
  - Now every panel must be initialized separately and panel parameters must be specified for each panel.
  - It is now possible to auto init the panel by adding `panel-init` class and specify such panel parameters with `data-` attributes, e.g.:
    ```html
    <div class="panel panel-left panel-cover" data-swipe="true" data-visible-breakpoint="1200">
      ...
    </div>
    ```
  - Each panel supports new set of parameters:
    - `backdrop` - enables backdrop
    - `backdropEl` - specify custom backdrop element
    - `collapsedBreakpoint` (number) - app width when panel becomes partially visible (collapsed)
    - `visibleBreakpoint` (number) - app width when panel becomes fully visible
    - `swipe` (boolean) - makes panel swipeable
    - `swipeOnlyClose` (boolean) - makes panel swipeable but only to close
    - `swipeActiveArea` (number) - active area from the edge of the screen where panel swipes enabled
    - `swipeThreshold` (number) - panel will not move with swipe if "touch distance" will be less than this value
  - Each panel instance has new methods:
    - `enableVisibleBreakpoint()`
    - `disableVisibleBreakpoint()`
    - `toggleVisibleBreakpoint()`
    - `enableCollapsedBreakpoint()`
    - `disableCollapsedBreakpoint()`
    - `toggleCollapsedBreakpoint()`
    - `enableResizable()`
    - `disableResizable()`
    - `enableSwipe()`
    - `disableSwipe()`
  - `app.panel.open(panel)/close(panel)` methods now can receive panel element (or CSS selector) of the panel to open/close. `left` and `right` values are still work but on only if you have only one left or right panel
  - The following F7 instance props and methods removed and intended to be used on panel instance instead:
    - `app.panel.enableSwipe()`
    - `app.panel.disableSwipe()`
    - `app.panel.enableResizableSwipe()`
    - `app.panel.disableResizableSwipe()`
    - `app.panel.left`
    - `app.panel.right`
  - `panel-active` panel class renamed to `panel-in`
* **PhotoBrowser**
  - `backLinkText` parameter renamed to `pageBackLinkText`
  - New `popupCloseLinkText` parameter to specify "close" link text when it is opened as Popup or as Standalone
  - New `navbarShowCount` parameter to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item
  - New `popupPush` parameter - enables Photo Browser popup to push view(s) behind on open
* **Picker**
  - Font size on picker items became smaller in iOS and MD themes
  - New `sheetPush` parameter - enables Picker sheet to push view(s) behind on open
  - New `sheetSwipeToClose` parameter - enables ability to close Picker sheet with swipe
* **Popup**
  - New boolean `push` parameter. When enabled it will push view behind on open. Works only when top safe area is in place. It can also enabled by adding `popup-push` class to popup element.
* **Sheet Modal**
  - In iOS theme it now has white background color by default
  - New boolean `push` parameter. When enabled it will push view behind on open. Works only when top safe area is in place. It can also enabled by adding `sheet-push` class to sheet modal element.
  - Swipeable Sheet Modal now correctly handles scrolling inside of nested `page-content` element
* **Sortable**
  - Sortable `sort` event data now also contain `el` property with reference to sorted item
  - Now sorting can be done on tap-hold. It can be enabled by adding additional `sortable-tap-hold` to `sortable` container. Also `app.touch.tapHold` should be enabled to emit `taphold` events.
* **Smart Select**
  - Fixed behavior when it is `multiple` and with Virtual List enabled
  - New `.unsetValue()` method to unset smart select value
  - New `popupPush` parameter - enables Smart Select popup to push view(s) behind on open
  - New `popupSwipeToClose` parameter - enables ability to close Smart Select popup with swipe
  - New `sheetPush` parameter - enables Smart Select sheet to push view(s) behind on open
  - New `sheetSwipeToClose` parameter - enables ability to close Smart Select sheet with swipe
* **Subnavbar**
  - Subnavbar's title element (`<div class="title">`) now should be used with class `subnavbar-title` instead (`<div class="subnavbar-title">`)
* **Swiper** updated to latest 5 version:
  - Core
    - All new CSS Scroll Snap mode (can be enabled with `cssMode: true`). It doesn't support all of Swiper's features, but potentially should bring a much better performance in simple configurations
    - Fully removed Internet Explorer support
    - `breakpointsInverse` parameter has been removed and now `breakpoints` behave like with `breakpointsInverse: true` before.
    - `touchMoveStopPropagation` parameter now defaults to `false`
    - `click` event won't be fired with 300ms delay anymore. Now it will be fired at the same time as `tap` event
    - When `slidesPerColumnFill: 'column'` it now uses `flex-direction: column` layout which requires specified height on swiper-container
    - `slidesPerColumn` now can be used with breakpoints
    - Now Swiper styles use CSS Custom Properties (CSS Custom Variables) to specify swiper's color theme (color of navigation buttons/pagination). It is now `--swiper-theme-color: #007aff;`
    - Improved `es` module "tree-shake-ability"
    - New `swiper.esm.browser.bundle.js` package that can be used directly in browser (`import Swiper from 'swiper.esm.browser.bundle.js'`)
  - Autoplay
    - Now it will be paused when document becomes hidden (in not active tab) and continued again when document becomes visible
  - Lazy
    - Swiper preloader image replaced with a little bit simpler loader. Now its color can be changed with `--swiper-preloader-color` CSS custom property (which is defaults to `--swiper-theme-color`)
  - Pagination
    - Active pagination bullets and pagination theme colors now use CSS Custom Properties. It can be defined with `--swiper-pagination-color` property (which is defaults to `--swiper-theme-color`)
  - Navigation
    - Navigation icons reworked with built-in (base64) icon font. It allows to apply any color and size without replacing image
    - Navigation buttons colors now use CSS Custom Properties. It can be defined with `--swiper-navigation-color` property (which is defaults to `--swiper-theme-color`)
    - With `--swiper-navigation-size` (defaults to `44px`) it is now possible to change size of the navigation buttons (and icons)
* **Text Editor**
  - All new touch-friendly Rich Text Editor component
* **Timeline**
  - Now it uses new breakpoint names for `{size}-sides` classes (e.g. `tablet-sides` -> `medium-sides`, etc.)
* **Toolbar**
  - Tabbar labels text (font) size increased in iOS theme

## Framework7 Router Component

- Now it supports async `data` method (where it must return Promise)
  ```js
  export default {
    async data() {
      const user = await fetch('some/path').then((res) => res.json());
      return {
        user,
      };
    },
  };
  ```
  or
  ```js
  export default {
    data() {
      return new Promise((resolve) => {
        fetch('some/path')
          .then((res) => res.json())
          .then((user) => resolve({ user }));
      });
    },
  };
  ```
- Component DOM updates are now async. It means that it is not guaranteed that DOM will be updated right after calling `$setState`. So there is a new `$tick` context method that can be safely used to reference DOM and ensure it was updated:
  ```js
  this.$setState({ foo: 'bar' });
  this.$setState({ john: 'doe' });
  this.$tick(() => {
    // DOM updated
  });
  ```
- `$setState` now also receives second callback argument that will be fired on DOM update:
  ```js
  this.$setState({ foo: 'bar' }, () => {
    // DOM updated
  });
  ```
- Component context has new `$update(callback)` method that can be used instead of `$setState` to just trigger DOM update:
  ```js
  this.foo = 'bar';
  this.$update(() => {
    // DOM updated
  });
  ```
- Added support for mixins that can be re-used in components. Mixin can extend any component lifecycle hook, methods and `data`. Mixins should be passed in component's `mixins` property as an array:
  ```js
  const mountedMixin = {
    mounted() {
      // do something on mounted
      console.log('mounted');
    },
  };
  const defaultDataMixin = {
    data() {
      return { foo: 'bar' };
    },
  };
  // extend component with mixins
  export default {
    mixins: [mountedMixin, defaultDataMixin],
    data() {
      return { john: 'doe' };
    },
    // ...
  };
  ```
- It is also possible to register global mixins with new method `Framework7.registerComponentMixin(mixinName, mixin)`
  ```js
  Framework7.registerComponentMixin('default-data-mixin', {
    data() {
      return { foo: 'bar' };
    },
  });
  ```
  And use it like:
  ```js
  export default {
    mixins: ['default-data-mixin'],
    data() {
      return { john: 'doe' };
    },
    // ...
  };
  ```
- Now it is possible to create custom reusable components with new method `Framework7.registerComponent(tagName, component)`
  ```js
  Framework7.registerComponent('my-list-item', {
    data() {
      return { foo: 'bar' };
    },
    template: `
      <li class="list-item" id="{{foo}}">...</li>
    `,
  });
  ```
  And use it in other components like:
  ```html
  <div class="list">
    <ul>
      <my-list-item></my-list-item>
    </ul>
  </div>
  ```
- New `class` based syntax for components for better TypeScript support:

  ```js
  import { Component } from 'famework7';

  export default class extends Component {
    data() {
      return { foo: 'bar' };
    }
    mounted() {
      console.log('mounted');
      this.onMounted(); // call method
    }
    onMounted() {
      // ...
    }
    // ...
  }
  ```

## Phenome (Vue/React)

- Now it is possible to get Framework7 instance, `f7ready` function and `theme` by directly importing them from package. This can be useful for functional components that don't have F7 extensions, e.g.:

  ```js
  import { f7, f7ready, theme } from 'framework7-react';

  // or

  import { f7, f7ready, theme } from 'framework7-vue';
  ```

- Most of internal events reworked to use custom events system instead of DOM events. So all component events don't contain reference to HTML elements anymore.

## Phenome (Vue/React) Components

- **Block**
  - `tabletInset` prop has been removed
  - New inset props to reflect new breakpoint names: `xsmallInset`, `smallInset`, `mediumInset`, `largeInset`, `xlargeInset`
- **Button**
  - New `transition` (string) prop to specify custom page transition name for list link
- **Grid**
  - `Col` component now uses new breakpoint names for responsive size props. So there are new props instead of `tabletWidth` and `desktopWidth`: `xsmall`, `small`, `medium`, `large`, `xlarge`.
    ```html
      <Col size="50" medium="33" large="25">...</Col>
    ```
- **Icon**
  - `size` prop will also set element `width` and `height` in addition to just `font-size` (like before)
  - Removed support for Font Awesome and Ionic icons, props `fa` and `ion` not supported anymore
- **Link**
  - New `transition` (string) prop to specify custom page transition name for list link
- **List**
  - Sortable `sort` event data now also contain `el` property with reference to sorted item
  - Sortable `sort` event data now contains `sortableData` property as first argument
  - New `sortableTapHold` prop to enable sorting on tap hold. Also `app.touch.tapHold` parameter should be enable to emit `taphold` events.
  - `tabletInset` prop has been removed
  - New inset props to reflect new breakpoint names: `xsmallInset`, `smallInset`, `mediumInset`, `largeInset`, `xlargeInset`
- **ListItem**
  - `accordionBeforeOpen`, `accordionBeforeClose` events now contain `prevent` method as first argument
  - `swipeout` event now contains swipeout `progress` as first argument
  - New `transition` (string) prop to specify custom page transition name for list link
- **ListInput/Input**
  - Support for new `type="texteditor"` prop to make it appear as Text Editor
  - New `textEditorParams` prop to specify text editor parameters
- **Navbar**
  - Removed support for boolean `inner` prop and removed ability to render it without navbar-inner element
  - New `largeTransparent` prop to make large navbar transparent (should be used in addition to `large` prop)
  - `nav-left` slot renamed to `left`
  - `nav-right` slot renamed to `right`
  - New `title-large` slot
- **Panel**
  - New`collapsedBreakpoint` (number) prop - app width when panel becomes partially visible (collapsed)
  - New`visibleBreakpoint` (number) prop - app width when panel becomes fully visible
  - New`swipe` (boolean) prop - makes panel swipeable
  - New`swipeOnlyClose` (boolean) prop - makes panel swipeable but only to close
  - New`swipeActiveArea` (number) prop - active area from the edge of the screen where panel swipes enabled
  - New`swipeThreshold` (number) prop - panel will not move with swipe if "touch distance" will be less than this value
- **Page**
  - `ptr:refresh` event now contains `done` method as first argument
- **PageContent**
  - `ptr:refresh` event now contains `done` method as first argument
- **PhotoBrowser**
  - `backLinkText` prop renamed to `pageBackLinkText`
  - New `popupCloseLinkText` prop to specify "close" link text when it is opened as Popup or as Standalone
  - New `navbarShowCount` prop to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item
- **Popup**
  - New `push` prop to push view(s) behind on open
- **Segmented**
  - New `strong`, `strongIos`, `strongMd` and `strongAurora` props to enable new "strong" segmented style
- **Sheet**
  - New `push` prop to push view(s) behind on open
- **Statusbar**
  - `Statusbar` component has been removed
- **Tabs**
  - New `swiperParams` prop to specify swipeable tabs swiper parameters
- **TextEditor**
  - New `TextEditor` component

# [v4.5.2](https://github.com/framework7io/framework7/compare/v4.5.1...v4.5.2) - September 27, 2019

- Core
  - Router
    - Fixed issue in Firefox when going back from routable modal could reload the page in (#3316)
  - Card
    - Fixed issue with expandable card close, when it is opened in view with sidebar (#3315)
  - Swipeout
    - Fixed issue when overswipe didn't work with single item (#3279)
  - SmartSelect
    - Fixed issue when destroying it on close could throw and error
  - Autocomplete
    - Fixed issue when destroying it on close could throw and error
  - Photo Browser
    - Fixed issue when destroying it on close could throw and error

# [v4.5.1](https://github.com/framework7io/framework7/compare/v4.5.0...v4.5.1) - September 19, 2019

- Core
  - Router Component
    - Improved scoped styles parsing algorithm
  - Swiper
    - Fixed error in swiper lazy module
  - Color Picker
    - Fixed error with "Current Color" module destroy
  - Panel
    - Fixed issue with not working `breakpoint` events

# [v4.5.0](https://github.com/framework7io/framework7/compare/v4.4.10...v4.5.0) - August 21, 2019

- Core
  - Router Component
    - Fixed issue breaking rendering when root component element is not a `div`
  - Searchbar
    - Fixed issue with scroll for expandable Searchbar in RTL direction
  - Sortable
    - Now new `no-sorting` or `disallow-sorting` class can be added to specific list item to disable sorting for it
  - Infinite Scroll
    - Fixed issue when it may not work on routable tab if routable tab content is infinite-scroll element
  - Pull To Refresh
    - Fixed issue when it may not work on routable tab if routable tab content is PTR element
  - Dialog
    - Fixed issue when calling `.close()` on queued dialog would still open it
  - Smart Select
    - New `formatValueText(values)` parameter to return formatted (custom) text value that appears on list item (in `item-after`)
    - New `setValueText` (by default is `true`) parameter to set formatted text value on list item (in `item-after`)
    - Now it emits `beforeOpen(instance, prevent)` event that allows to prevent its opening by calling `prevent()` function
  - Preloader
    - Fixed issue when it didn't initialize correctly in routable tab
  - Progressbar
    - Fixed issue when it didn't initialize correctly in routable tab
  - Popover
    - Fixed issue when during positioning it didn't consider top safe area
- Phenome
  - Button, FabButton, Fab, Icon, Link, ListButton, ListItem
    - Improved `tooltip` prop reactivity to change, set or unset tooltip correctly
  - ListItem
    - Now settings `sortable: false` prop on it, will prevent this specific item from sorting
  - Navbar
    - `nav-left` slot is also available as `left` slot
    - `nav-right` slot is also available as `right` slot
    - New `title-large` slot to add custom content/layout to large title text
  - List, ListGroup
    - New `sortableMoveElements` (boolean) prop that allow to override same `sortable.moveElements` global app parameter. That when disabled (`false`) won't move DOM elements on sort
- Minor fixes

# [v4.4.10](https://github.com/framework7io/framework7/compare/v4.4.9...v4.4.10) - July 29, 2019

- Core
  - Device
    - Fixed `device-desktop` class

# [v4.4.9](https://github.com/framework7io/framework7/compare/v4.4.7...v4.4.9) - July 29, 2019

- Core
  - Infinite Scroll
    - Fixed issue when destroying infinite scroll could detach all other `scroll` event listeners
  - Navbar/Toolbar
    - Fixed issue with enabled `hideNavbar/ToolbarOnScroll` could hide toolbar on nested elements scrolling
  - Device
    - On desktop `device.os` will contain `macos` or `windows` if it is running under these OS
- Phenome
  - Card
    - Added `backdropEl` property to specify custom card backdrop

# [v4.4.7](https://github.com/framework7io/framework7/compare/v4.4.6...v4.4.7) - July 19, 2019

- Core
  - Card
    - Fixed issue when `data-close-by-backdrop-click` was ignored
  - Sheet
    - New `sheet:stepprogress` and `sheetStepPropgress` events firing during swipe step
  - Inputs
    - New `--f7-input-padding-left` and `--f7-input-padding-right` CSS variables
    - New `--f7-textarea-height` CSS variable
  - Device
    - Fixed iOS 13 iPad detection when it is in desktop mode
  - View/Router
    - Fixed issue when `currentView` may not return View in tabs layout
    - Fixed issue when returning to previous page could block its scroll in iOS
  - Tooltip
    - Fixed issue when tooltip wasn't initialized if added dynamically with VDOM
- Minor fixes

# [v4.4.6](https://github.com/framework7io/framework7/compare/v4.4.5...v4.4.6) - July 1, 2019

- Core
  - Router
    - Fixed issue when loading detail page in (Master Detail) with `reloadAll` loaded only detail page

# [v4.4.5](https://github.com/framework7io/framework7/compare/v4.4.3...v4.4.5) - June 27, 2019

- Core
  - Router
    - Improved Master-Detail behavior with `pushState` enabled
    - Fixed issue when routable modal template contains comments before actual template
    - Route `params` now url-decoded
  - Router Component
    - Fixed issue when Progressbar progress wasn't updated with `$setState`
- Phenome
  - Page
    - Fixed issue with not correctly rendered preloader when infinite or ptr preloader property set dynamically
- Minor tweaks and fixes

# [v4.4.3](https://github.com/framework7io/framework7/compare/v4.4.0...v4.4.3) - June 4, 2019

- Core
  - Color Picker
    - New Hue-Saturation spectrum module (`hs-spectrum`)
    - New Brightness slider module (`brightness-slider`)
  - Router
    - Fixed issue when `beforeIn` page callback called before `beforeOut` of other page
  - Virtual List
    - Now it is possible to pass custom scrollable parent element with new `scrollableParentEl` parameter
- Phenome
  - Range
    - New `name` prop to specify input's "name" attribute
  - Stepper
    - New `name` prop to specify input's "name" attribute
  - ListButton
    - Now also supports `tooltip` property to display tooltip
  - ListItem
    - Now also supports `tooltip` property to display tooltip
- Minor fixes

# [v4.4.0](https://github.com/framework7io/framework7/compare/v4.3.1...v4.4.0) - May 13, 2019

- Core
  - All new Treeview component 🎉
  - Popup
    - Added "swipe-to-close" feature
    - New `swipeToClose` parameter that will allow to close Popup with swipe
    - New `swipeHandler` parameter to specify swipe to close handler element
  - Sheet Modal
    - Added "swipe-to-close" feature
    - Added "swipe-to-step" feature
    - New `swipeToClose` parameter that will allow to close Sheet modal with swipe
    - New `swipeToStep` parameter that will allow to expand Sheet modal with swipe
    - New `swipeHandler` parameter to specify swipe to close handler element
    - New `stepOpen()`, `stepClose()` and `stepToggle()` sheet instance methods to open, close and toggle swipe step.
    - New `app.sheet.stepOpen()`, `app.sheet.stepClose()` and `app.sheet.stepToggle()` app sheet methods to open, close and toggle swipe step.
    - New `sheet:stepopen`, `sheet:stepclose` sheet DOM events
    - New `stepOpen`, `stepClose` sheet instance events
    - New `sheetStepOpen`, `sheetStepClose` app instance events
  - Autocomplete
    - Now it is possible to select dropdown values with keyboard UP and DOWN keys
    - Now it will close dropdown on ESC key
  - Checkbox
    - Added support for indeterminate checkboxes
  - Data Table
    - Now it uses indeterminate checkbox in head when some of the rows are selected
  - Range Slider
    - New `limitKnobPosition` boolean property to limit knob position to size of the bar. By default enabled for iOS theme
- Phenome
  - Treeview
    - New `Treeview` and `TreeviewItem` components
  - Popup
    - Added "swipe-to-close" feature
    - New `swipeToClose` prop that will allow to close Popup with swipe
    - New `swipeHandler` prop to specify swipe to close handler element
  - Sheet Modal
    - Added "swipe-to-close" feature
    - Added "swipe-to-step" feature
    - New `swipeToClose` parameter that will allow to close Sheet modal with swipe
    - New `swipeToStep` parameter that will allow to expand Sheet modal with swipe
    - New `swipeHandler` parameter to specify swipe to close handler element
    - New `sheet:stepopen` (`sheetStepOpen`), `sheet:stepclose` (`sheetStepClose`) sheet events
  - Checkbox/ListItem
    - New `indeterminate` prop to make checkbox indeterminate
  - Range Slider
    - New `limitKnobPosition` boolean property to limit knob position to size of the bar. By default enabled for iOS theme
- Minor fixes

# [v4.3.1](https://github.com/framework7io/framework7/compare/v4.3.0...v4.3.1) - April 29, 2019

- Core
  - Range Slider
    - Fixed issue with vertical slider not working correctly with side swipes
  - Cards
    - Fixed issue with expandable cards glitches in iOS
    - Expandable card app parameters can now be set on each card individually with `data-` attributes: `data-animate`, `data-backdrop`, `data-swipe-to-close`, `data-close-by-backdrop-click`, `data-hide-navbar-on-open`, `data-hide-toolbar-on-open`
  - Router
    - Fixed missing reference to `pageFrom` in swipe-back data
    - Router component has new `$id` property
  - Touch
    - Now touch clicks threshold is configurable with `app.touch.touchClicksDistanceThreshold` parameter
- Phenome
  - Card
    - Expandable card app parameters can now be set on each card individually with new props: `animate`, `hideNavbarOnOpen`, `hideToolbarOnOpen`, `swipeToClose`, `closeByBackdropClick`, `backdrop`
  - Navbar
    - Now it should return all children correctly when `inner: false` passed
- Minor fixes

# [v4.3.0](https://github.com/framework7io/framework7/compare/v4.2.2...v4.3.0) - April 17, 2019

- Core
  - Color Picker - all new modular Color Picker component 🎉
  - Auto Dark Theme
    - Now it can be set automatically based on user system color scheme preference (where supported). To enable `autoDarkTheme: true` must be passed to app init parameters
    - New `app.enableAutoDarkTheme()` to enable this feature manually (where supported)
    - New `app.disableAutoDarkTheme()` to disable this feature manually
  - Panel
    - Now side panels can be resizable 🎊. Requires `panel-resizable` class on panel element to enable
  - Device
    - New `prefersColorScheme()` that returns `dark` or `light` where supported, or `undefined` where not supported
  - Cards
    - Fixed issue whith "jumpy" layout when expandable card closes on iOS
  - Navbar
    - New `navbar:hide` and `navbar:show` events when navbar hidden/shown
    - New `navbar:collapse` and `navbar:expand` events when navbar collapsed/expanded to large title navbar
  - Popover
    - New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` parameter to pass custom backdrop element
    - Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
    - Now it will be repositioned when onscreen keyboard opens and closes (requires cordova keyboard plugin)
    - Reworked/tweaked positioning in MD theme
  - Popup
    - New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` parameter to pass custom backdrop element
    - Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
  - Actions
    - New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` parameter to pass custom backdrop element
    - Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
  - Sheet
    - New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` parameter to pass custom backdrop element
    - Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
    - Now it can be opened from top (instead of bottom) by adding `sheet-modal-top` class to sheet modal element
  - Stepper
    - Reworked RTL layout to be in same direction as in LTR
  - Request
    - Now it automatically set `Accept: 'application/json'` header when `dataType: 'json'` parameter passed
  - Touch
    - Fixed issue with not-removed touch-ripple with very fast clicks or multi-touch
  - Utils
    - New `utils.colorHsbToHsl(h, s, b)` method to convert HSB(V) color to HSL color
    - New `utils.colorHslToHsb(h, s, l)` method to convert HSL color to HSB(V) color
- Phenome
  - Panel
    - New `resizable` prop to enable resizable panel
  - Navbar
    - New `navbar:hide`/`navbarHide` and `navbar:show`/`navbarShow` events when navbar hidden/shown
    - New `navbar:collapse`/`navbarCollapse` and `navbar:expand`/`navbarExpand` events when navbar collapsed/expanded to large title navbar
  - Popover
    - Added `backdrop` prop to enable/disable backdrop
    - New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` prop to pass custom backdrop element
  - Popup
    - New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` prop to pass custom backdrop element
  - Actions
    - Added `backdrop` prop to enable/disable backdrop
    - New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` prop to pass custom backdrop element
  - Sheet
    - New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
    - New `backdropEl` prop to pass custom backdrop element
    - New `position` prop, can be `top` or `bottom` (default) to define how to open Sheet
    - New `top` prop, alias for `position="top"`
    - New `bottom` prop, alias for `position="bottom"`
  - ListInput / Input
    - Now it accepts special type `colorpicker` to open color picker on focus
    - New prop `colorPickerParams` to specify color picker params for `colorpicker` type
  - SwipeoutButton
    - New `confirmTitle` prop to set confirm dialog title
- Lots of minor fixes and improvements

# [v4.2.2](https://github.com/framework7io/framework7/compare/v4.2.0...v4.2.2) - April 4, 2019

- Core
  - Smart Select
    - New `scrollToSelectedItem` parameter - when enabled it will scroll smart select content to first selected item on open (default `false`)
    - New `.scrollToSelectedItem()` smart select instance method to scroll smart select content to first selected item (when opened)
    - Now when opened in Popup, it will render Popup's close button as a plain text link on the right side in Navbar
  - Autocomplete
    - Now when opened in Popup, it will render Popup's close button as a plain text link on the right side in Navbar
  - Router
    - Fixed issue with swipe-back when used in Master-Detail layout
  - List Index
    - Fixed issue with wrong positioning when used with large navbar
- Phenome
  - ListInput / Input
    - Now it accepts special type `datepicker` to open calendar on focus
    - New prop `calendarParams` to specify calendar params for `datepicker` type
  - Button
    - New `type` prop. If this prop is one of `submit`, `button` or `reset` then it will be rendered as `<button>` tag
- Lots of minor fixes

# [v4.2.0](https://github.com/framework7io/framework7/compare/v4.1.1...v4.2.0) - March 20, 2019

- All new Aurora theme! 🖥🎉
- Core
  - New Appbar component
  - Button
    - New `button-round-aurora`, `button-raised-aurora`, `button-fill-aurora`, `button-small-aurora`, `button-large-aurora`, `button-outline-aurora` modifier classes for Aurora theme
  - Cards
    - Now it is possible to specify custom expandable card backdrop element with `data-backdrop-el` attribute on card
  - Device
    - New `device.electron` property which is `true` when app runs in Electron environment
  - List Index
    - New `auroraItemHeight` parameter to specify item height in Aurora theme
  - Navbar
    - New `auroraCenterTitle` parameter (enabled by default) to position title at the center in Aurora theme.
  - Panel
    - New `app.panel.toggle(side, animate)` method to toggle (open or close) specified panel
    - New `panel.toggle(animate)` method to toggle (open or close) current panel
    - Support for `panel-toggle` class on links to toggle panels
  - Picker
    - New `mousewheel` parameter (enabled by default) to scroll picker values with mousewheel
    - New `updateValuesOnMousewheel` parameter (enabled by default) to updates picker and input values during mousewheel scrolling
  - Pull To Refresh
    - Added mousewheel support with additional `data-ptr-mousewheel="true"` attribute on PTR content element
  - Searchbar
    - New Inline Searchbar to fit it better within other components. Can be enabled by adding `searchbar-inline` class to searchbar
  - Stepper
    - New `stepper-round-aurora`, `stepper-raised-aurora`, `stepper-fill-aurora`, `stepper-small-aurora`, `stepper-large-aurora` modifier classes for Aurora theme
  - Toolbar
    - New `toolbar-top-aurora` and `toolbar-bottom-aurora` modifier classes for Aurora theme
  - Touch
    - Not it is possible to prevent active state bubbling on nested active-state elements with additional `prevent-active-state-propagation` class on nested active-state element
    - Improved clicks handling with Apple Pencil
  - Typography
    - New half-value margin and padding classes: `margin-half`, `margin-left-half`, `margin-right-half`, `margin-top-half`, `margin-bottom-half`, `margin-horizontal-half`, `margin-vertical-half`, `padding-half`, `padding-left-half`, `padding-right-half`, `padding-top-half`, `padding-bottom-half`, `padding-horizontal-half`, `padding-vertical-half`
  - View / Router
    - Router component's `$theme` object now contains boolean `aurora` property which is `true` for Aurora theme
    - New Aurora-related parameters: `auroraPageLoadDelay`, `auroraSwipeBack`, `auroraSwipeBackThreshold`, `auroraSwipeBackActiveArea`, `auroraSwipeBackAnimateShadow`, `auroraSwipeBackAnimateOpacity`
    - Fixed VDOM rendering with SVG elements
- Phenome
  - React and Vue's component prototype `$theme`object now contains boolean `aurora` property which is `true` for Aurora theme
  - New Appbar component
  - Button
    - New Aurora related modifier props: `raisedAurora`, `roundAurora`, `largeAurora`, `smallAurora`, `fillAurora`, `outlineAurora`
  - Icon
    - New `aurora` prop to specify icon for Aurora theme
  - Link
    - New `iconAurora` prop to specify icon for Aurora theme
  - ListIndex
    - New `auroraItemHeight` prop to specify item height in Aurora theme
  - Navbar
    - New boolean `backLinkForce` prop to load and ignore previous page in history
    - New boolean `backLinkShowText` prop to hide or show back button text. By default disable for MD theme
  - Page
    - New `ptrMousewheel` prop to make PTR work with mousewheel
  - Searchbar
    - New `inline` boolean prop to enable inline searchbar
  - Stepper
    - New Aurora related modifier props: `raisedAurora`, `roundAurora`, `largeAurora`, `smallAurora`, `fillAurora`
    - New `iconAurora` prop to specify icon for Aurora theme
  - Toolbar
    - New `topAurora` and `bottomAurora` boolean props to set Toolbar position for Aurora theme
- Lots of minor fixed and improvements

# [v4.1.1](https://github.com/framework7io/framework7/compare/v4.1.0...v4.1.1) - March 14, 2019

- Core
  - Form
    - Fix form ajax event arguments (`xhr` and `data`) to be in `e.detail`
  - Panel
    - Unset breakpoint layout on panel destroy
  - Autocomplete
    - Fixed issue with autocomplete dropdown click on iOS devices
  - Router
    - Fixed wrong behavior of navbar back link with swipe back in `ios` theme
  - Cards
    - Fixed issue when opened expanadble cards wasn't positioned correctly in some layouts
- Minor fixes

# [v4.1.0](https://github.com/framework7io/framework7/compare/v4.0.6...v4.1.0) - March 4, 2019

- Core
  - Input
    - New "outline" input styles
  - List
    - Fixed sticky list group titles when used with large navbar
  - Cards
    - Fixed issue when opened expanadble cards wasn't positioned correctly in some layouts
  - Tooltip
    - Fixed tooltip auto init under ios theme when it is used in navbar
  - Calendar
    - Fixed issue when `monthSelector` and `yearSelector` params were ignored
- Phenome
  - Support for new outline inputs by adding boolean `outline` prop to `f7-list-input`/`ListInput` component
- Minor fixes

# [v4.0.6](https://github.com/framework7io/framework7/compare/v4.0.5...v4.0.6) - February 25, 2019

- Core
  - Searchbar
    - Tweaked/fixed styles for MD-Dark theme
  - Pull To Refresh
    - Now it will be ignored on opened expandable cards
    - Now it will be ignored on elements with `ptr-ignore` class
  - Dialog
    - Fixed text alignment in RTL direction
  - Swiper update to latest 4.5.0:
    - Core
      - New `swiper.changeDirection()` method to change direction from horizontal to vertical (and back) dynamically
      - `direction` parameter can be used in breakpoints
    - Virtual Slides
      - `swiper.virtual.appendSlide` now accepts array of slides to add
      - `swiper.virtual.prependSlide` now accepts array of slides to prepend
      - New `swiper.virtual.removeSlide(indexes)` to remove virtual selected slides
      - New `swiper.virtual.removeAllSlides()` to remove all virtual slides
    - Navigation
      - Now it emits `navigationHide` and `navigationShow` events when on nav hide/show
    - Pagination
      - Now it emits `paginationHide` and `paginationShow` events when on pagination hide/show
- Phenome
  - Fixed broken `textarea:resize` / `textareaResize` on `Input` and `ListInput` components
- Minor fixes

# [v4.0.5](https://github.com/framework7io/framework7/compare/v4.0.4...v4.0.5) - February 14, 2019

- Core
  - Fixed d.ts reference path

# [v4.0.4](https://github.com/framework7io/framework7/compare/v4.0.3...v4.0.4) - February 13, 2019

- Core
  - Fixed lost messages color

# [v4.0.3](https://github.com/framework7io/framework7/compare/v4.0.2...v4.0.3) - February 13, 2019

- Core
  - Fixed d.ts reference path

# [v4.0.2](https://github.com/framework7io/framework7/compare/v4.0.1...v4.0.2) - February 13, 2019

- Core
  - Fixed issue when event handlers attached with `.once` may not be detached correctly later
  - Router
    - Fixed issue when routable tab with params `/:param/` in path could produce new page loading instead of switching tab
  - Card
    - Add `card-prevent-open` class that can be added to element inside of the expandable card. Click on that element won't open expandable card.
  - Searchbar
    - Fixed Searchbar position when it is used on page with large navbar
- Dom7 update to latest 2.1.3:
  - Fixed issue when event handlers attached with `.once` may not be detached correctly later
- Phenome
  - Card
    - New `cardPreventOpen` prop on Link-like components to prevent expandable card open on this element click.
- Minor fixes

# [v4.0.1](https://github.com/framework7io/framework7/compare/v4.0.0...v4.0.1) - February 8, 2019

- Core
  - Fixed issue with Safari crashing on `button-large` rendering
  - Fixed issue with wrong active button color in bars
  - Removed not needed animation prefixes in utils

# [v4.0.0](https://github.com/framework7io/framework7/compare/v3.6.6...v4.0.0) - February 7, 2019 🎉🎉🎉

- [What Is New In v4](https://blog.framework7.io/the-best-framework7-yet-what-is-new-in-v4-74b2b467047c)

# [v3.6.6](https://github.com/framework7io/framework7/compare/v3.6.5...v3.6.6) - February 5, 2019

- Core
  - App `data` and `methods` now available before app initialization. Useful when you delay app initialization (like on `deviceready` event in Cordova app) and need to access data before
  - Pull To Refresh
    - Support for `ptr-watch-scroll` that should be added on scollable elements inside of `ptr-content`, so pull to refresh won't trigger during their scrolling
  - Panel
    - Fixed issue when panel backdrop not removed for routable panel
  - Template7 update to latest 1.4.1:
    - Relaxed `escape` helper to escape only `<>&"'` characters
    - Improved variables parsing in `js` and `js_if` helpers
- Minor fixes

# [v3.6.5](https://github.com/framework7io/framework7/compare/v3.6.3...v3.6.5) - January 4, 2019

- Core
  - Router
    - Now router methods will throw error if accessed on main app router, e.g. `app.router.navigate()`, it was never allowed, and done to avoid further issues
- Minor fixes

# [v3.6.3](https://github.com/framework7io/framework7/compare/v3.6.2...v3.6.3) - December 27, 2018

- Core
  - Range
    - New `formatLabel` parameter that allows to pass function and return formatted value for range knob label
  - Tabs
    - Fixes issue when routable swipeable tabs don't emit `tab:show` events
  - Dialog
    - Now it is possible to specify default value for Prompt dialog by adding it as last parameter to `app.dialog.prompt()` method
- Phenome
  - New `routeProps` prop for Link, Button, ListItem, ListButton components that allows to pass props directly to target route component. For example, `<f7-link :props="{foo: 'bar'}">`
  - New `formatLabel` prop for Range component that allows to pass function and return formatted value for range knob label
- Lost of minor fixes

# [v3.6.2](https://github.com/framework7io/framework7/compare/v3.6.1...v3.6.2) - December 11, 2018

- Core
  - View
    - Fixed wrong type for `name` parameter in typescript definitions
- Phenome
  - Message - fixed wrong click handler target

# [v3.6.1](https://github.com/framework7io/framework7/compare/v3.6.0...v3.6.1) - December 10, 2018

- Phenome (React / Vue)
  - Tabs - fixed issue with broken Animated/Swipeable tabs

# [v3.6.0](https://github.com/framework7io/framework7/compare/v3.5.2...v3.6.0) - December 7, 2018

- Core
  - Router
    - New `keepAlive` routes. When route's page is specified with `keepAlive: true`, then it, instead of removing and destroying component, it will be detached from DOM and attached back when required.
    - New `router.clearPreviousPages()` method that removes all previous (stacked) pages from DOM
  - Accordion
    - New `accordion:beforeopen` event that is triggered right before accordion will be opened. `event.detail.prevent` contains function that will prevent it from opening if called;
    - New `accordion:beforeclose` event that is triggered right before accordion will be closed. `event.detail.prevent` contains function that will prevent it from closing if called;
- Phenome (React / Vue)
  - AccordionItem and ListItem have new `accordion:beforeopen` / `accordionBeforeOpen` events, second argument passed to handler contains function that will prevent it from closing if called;
  - AccordionItem and ListItem have new `accordion:beforeclose` / `accordionBeforeClose` events, second argument passed to handler contains function that will prevent it from closing if called;
  - View component now accepts MD-theme related swipeback props: `mdSwipeBack`, `mdSwipeBackAnimateShadow`, `mdSwipeBackAnimateOpacity`, `mdSwipeBackActiveArea`, `mdSwipeBackThreshold`
  - ListItem has new `virtualListIndex: Number` property to specify item index when rendered inside of Virtual List
  - Searchbar has new `value` property to specify Searchbar input's value. Can be usefule when used with `customSearch` enabled
- Lots of minor fixes and improvements

# [v3.5.2](https://github.com/framework7io/framework7/compare/v3.5.1...v3.5.2) - November 12, 2018

- Core
  - List
    - Fixed issue with hairlines in last swipeout-list item
  - Panel
    - Fixed issue when routable Panel can appear without backdrop
  - Searchbar
    - New `inputEvents` parameter that allow to specify which input events should be tracked for search
- Phenome
  - ListInput - add `tag` property to allow to change default `li` tag to anything else
  - Searchbar - new `inputEvents` prop that allow to specify which input events should be tracked for search
  - Fixed issue with router page classes
- Minor fixes

# [v3.5.1](https://github.com/framework7io/framework7/compare/v3.5.0...v3.5.1) - November 2, 2018

- Core
  - Swiper update to latest 4.4.2:
    - New `touchStartForcePreventDefault` parameter to force touch start event prevent default
    - Breakpoints fix when breakpoint keys are strings
    - Fixed issue when draggable scrollbar may not work on desktop Safari
    - Fixed issue with wrong sort of Virtual Slides
  - Swipeout
    - Added new `swipeout:overswipeenter` and `swipeout:overswipeexit` events fired when overswipe enabled/disabled
  - Panel
    - Fixed issue when Swipe Panel could cause kind of screen flickering on open
- Phenome
  - Messagebar - new `textareaId` property to set ID attribute on its textarea
  - ListItem - new `swipeoutOverswipeEnter` and `swipeoutOverswipeExit` events
- Minor fixes

# [v3.5.0](https://github.com/framework7io/framework7/compare/v3.4.3...v3.5.0) - October 26, 2018

- Phenome
  - Fix issues with handling "stacked" pages
  - New **ListInput** component to be used instead of ListItem+Label+Input
- Minor fixes

# [v3.4.3](https://github.com/framework7io/framework7/compare/v3.4.2...v3.4.3) - October 19, 2018

- Phenome
  - Input - better handling of `with-value` and `focused` states
  - Messagebar - make `resizePage` enabled by default like in docs
- Minor fixes

# [v3.4.2](https://github.com/framework7io/framework7/compare/v3.4.0...v3.4.2) - October 12, 2018

- Core
  - Device
    - Added correct detection for `webView` prop when app installed to home screen
  - Accordion
    - Fixes issue when `accordionOpened` event fired without passing opened element as argument
  - Request
    - If `contentType: 'application/json'` and `processData: false` it will automatically send POST data as JSON
  - Picker
    - Fixed issue when double click outside of opened Picker could cause router navigating to previous page
  - Pull To Refresh
    - Now it will ignore PTR when scrolling in page's nested container
  - Panel
    - Now it respects `swipeThreshold` parameter when `swipeNoFollow` is enabled
  - Searchbar
    - New `searchGroup` parameter to handle custom item groups to hide on search
    - New `searchGroupTitle` parameter to handle custom item groups titles to hide on search
- Phenome (React / Vue)
  - Input - better handling of `with-value` and `focused` states when used in list item
  - Searchbar - new `searchGroup` and `searchGroupTitle` props
  - Page - improved router-related page classes handling that could cause issue with navigation
- Minor fixes

# [v3.4.0](https://github.com/framework7io/framework7/compare/v3.3.2...v3.4.0) - September 28, 2018

- Core
  - Lazy modules support 🎉
    - Added support to load F7 modules during runtime with new app methods:
      - New `app.loadModule(module)` method to load F7 module
      - New `app.loadModules([module])` method to load array of F7 modules
    - New `lazyModulesPath` app parameter to specify lazy modules location
    - New lazy component files in `lazy-components/` package folder
    - New `js/framework7-lazy.js` script containing core version of Framework7
    - New `css/framework7-lazy.css` styles containing core version of Framework7
  - Router
    - New Route's `modules` parameter to load F7 modules before entering the route
  - Statusbar
    - Added new `statusbar` app parameters:
      - `androidOverlaysWebView` (by default `false`)
      - `androidTextColor` (by default `black`)
      - `androidBackgroundColor` (by default `null`)
    - Added new `app.statusbar` app methods:
      - `app.statusbar.overlaysWebView(overlays)`
      - `app.statusbar.setTextColor(color)`
- Phenome
  - Lots of TypeScript definitions fixes and tweaks
- Minor fixes

# [v3.3.2](https://github.com/framework7io/framework7/compare/v3.3.1...v3.3.2) - September 20, 2018

- Core
  - Support for new iPhone XR / XS / XS Max
  - View
    - Now it emits `view:init` DOM event and `viewInit` app event
  - Router
    - Now it is possible to pass React/Vue component `props` in route `options` or when navigating like `router.navigate('/somepage/', { props: { foo: 'bar' } })`
- Phenome
  - View Component - added support `viewInit` event
  - Improved TypeScript declaration for React components events
- Minor fixes

# [v3.3.1](https://github.com/framework7io/framework7/compare/v3.3.0...v3.3.1) - September 14, 2018

- Core
  - Router
    - TypeScript defs tweaks #2668 #2666
  - Panel
    - TypeScript defs tweaks #2667
  - Smart Select
    - Fixed issue when it could throw error on init trying to get select `name` attribute
- Phenome
  - ListItem
    - Fixed issue when Smart Select could be opened twice that caused router issue on navigating back

# [v3.3.0](https://github.com/framework7io/framework7/compare/v3.2.1...v3.3.0) - September 14, 2018

- Core
  - Added TypeScript definitions for whole core framework APIs (with huge help of @JasonKleban)! 🎉
  - Swiper update to latest 4.4.1:
    - Core
      - New `centerInsufficientSlides` parameter to center slides if the amount of slides less than `slidesPerView`
      - New `breakpointsInverse` parameter (boolean), if enabled then it will count breakpoints in reversed direction, e.g. will override parameters if window width is more than specified breakpoint
    - Virtual Slides
      - New `addSlidesBefore` and `addSlidesAfter` parameters to increase amount of pre-rendered slides
    - Thumbs
      - All new "Thumbs" module/component designed to control slider thumbnails, in more logical and correct way than with Controller module.
  - Virtual DOM Router Components
    - Added snabbdom's "style" module that allows to make fancy and smooth custom animations
  - Input
    - Now input placeholder will be visible on item with floating label when it receives focus
- Phenome
  - Added TypeScript definitions for all React components 🎉
  - Added TypeScript definitions for F7-Vue and F7-React components extensions (e.g. `this.$f7`, `this.$f7router`, etc.) 🎉
  - List Component
    - new `noChevron` prop to disable "chevron" icon on all nested list items with link
    - new `chevronCenter` prop to set "chevron" icon in the middle of all nested media list items with link
  - ListItem Component
    - `disabled` prop will now set "disabled" class on list item if it is not a checkbox or radio
    - new `noChevron` prop to disable "chevron" icon on list item with link
    - new `chevronCenter` prop to set "chevron" icon in the middle of media list item with link
  - Improved Framework7 initialization routine
  - Fixed issue when `f7ready` callback fired before `deviceready` event in Cordova environment
- Lots of fixes

# [v3.2.1](https://github.com/framework7io/framework7/compare/v3.2.0...v3.2.1) - August 31, 2018

- Template7 - updated to latest 1.4.0
  - Added TypeScript Definitions
- Dom7 - updated to latest 2.1.0
  - Added TypeScript Definitions
- Phenome
  - Navbar - added `innerClass` and `innerClassName` (alias) props to set additional class on `navbar-inner` element
  - Popup - fixed issue when its `animate` and `backdrop` props became disabled by default
- Minor fixes

# [v3.2.0](https://github.com/framework7io/framework7/compare/v3.1.1...v3.2.0) - August 28, 2018

- Core
  - Router
    - Added support for routable Panels! Thanks to @bencompton 🎉
    - Added support to navigate to route by its name using `router.navigate({ name: 'someroute' })`
    - Optimized Router Component ES template parsing
    - Now it caches XHR-loaded Router Components (from `componentUrl`)
  - Calendar
    - New `backdrop` and `closeByBackdropClick` parameters
  - Smart Select
    - New `cssClass` parameter that will add additional class to Smart Select element
    - `searchbar` parameter now can be a full object with Searchbar parameters
    - New `appendSearchbarNotFound` parameter that adds additional element to Smart Select container that will be visible when there are no searchbar results
  - Popup
    - Fixed issue on backdrop click when multiple popups opened same time
  - Device
    - It now adds `device-macos` and `device-windows` html classes when relevant device is used
  - Utils - 2 new methods added:
    - `app.utils.uniqueNumber()` - returns unique counter number
    - `app.utils.id(mask, map)` - returns randomly generated string by mask, e.g. `app.utils.id('xxxx-xxxx-xxxx-xxxx')` will return string like `d692-c811-e032-6028`
- Phenome (Vue/React)
  - View component - added new `routesBeforeEnter` and `routesBeforeLeave` properties
  - List component - now emits `submit` event if it is used as form
  - List Item component - fixed issue with `onChange` event in React
  - Actions, Popover, Sheet - added new `closeByBackdropClick` and `closeByOutsideClick` properties
  - Popup - added new `closeByBackdropClick`, `backdrop`, `animate` properties
- Lots of minor fixes

# [v3.1.1](https://github.com/framework7io/framework7/compare/v3.1.0...v3.1.1) - August 3, 2018

- Core
  - Virtual DOM Router Components
    - Improved boolean attributes handling (`readonly`, `checked`, etc.)
    - Fixed issue when comment inside of template can break the rendering
    - Better auto-init components cleanup
- Minor fixes

# [v3.1.0](https://github.com/framework7io/framework7/compare/v3.0.7...v3.1.0) - July 31, 2018

- Core
  - Router
    - New `updateCurrentUrl(url)` method to update url of the currently active route (and current browser state if `pushState` is enabled)
    - Will emit new `routeUrlUpdate` event if `updateCurrentUrl()` was called
    - Fixed issue when going back with enabled `pushState` could produce double pages back in Firefox
    - Fixed issue when changing routable swipeable tabs wasn't trigger `routeChanged` event
    - Single-file Router Components:
      - It can now treat component template as ES template literal. Additional `es` attribute is required on template to enable, e.g. `<template es>`
      - It is now rendered with Virtual DOM (Snabbdom library) for layout auto updating 🎉
      - It has new `$setState(mergeState)` method to set new component state and force component to update its layout
  - Searchbar
    - Fixed issue when in some situations it didn't trigger `search` event when used with Virtual List
  - Calendar
    - Day "events" dots layout is reworked and now each day can have few dots (of different color) at a time
  - Input
    - Fixed wrong resizable textarea calculation in Firefox
  - Stepper
    - Has new "manual input mode". When enabled it allows to type value from keyboar and check fractional part with defined accurancy. Also, when enabled, then `step` parameter is ignored during typing. It has 3 new parameters:
      - `manualInputMode: false` - enables manual input mode
      - `decimalPoint: 4` - number of digits after dot
      - `buttonsEndInputMode: true` - disables manual input mode on Stepper's button click
  - Swiper - updated to latest 4.3.5
    - Core
      - `iOSEdgeSwipeThreshold` parameter renamed to just `edgeSwipeThreshold`. Old `iOSEdgeSwipeThreshold` name is still supported
      - Improved observer performance if there are many mutations at a time.
    - Controller
      - Fixed issue with wrong auto height resizing
    - Scrollbar
      - Fixed issue when it was using active event listeners instead of passive.
  - Dom7 - updated to latest 2.0.7
    - Fixed issue with undefined elements in classList access (#13)
  - Template7 - updated to latest 1.3.8
    - Fixed issue with parsing parents in `js` and `js_if` helpers when properties contain `$` character
- Phenome
  - Stepper component has new properties:
    - `manualInputMode: false` - enables manual input mode
    - `decimalPoint: 4` - number of digits after dot
    - `buttonsEndInputMode: true` - disables manual input mode on Stepper's button click
  - Fixed Messagebar send-link reference issue
- Lots of minor fixes

# [v3.0.7](https://github.com/framework7io/framework7/compare/v3.0.6...v3.0.7) - July 20, 2018

- Phenome
  - Fixed build error

# [v3.0.6](https://github.com/framework7io/framework7/compare/v3.0.5...v3.0.6) - July 20, 2018

- Core
  - Fixed missing `idate` dependency

# [v3.0.5](https://github.com/framework7io/framework7/compare/v3.0.1...v3.0.5) - July 20, 2018

- Core
  - Calendar
    - Added support for Jalali calendar, can be enabled with `calendarType: 'jalali'`
    - New `rangePickerMinDays` and `rangePickerMaxDays` to require min/max days when range picker enabled
  - Tooltip
    - Fixed issue when tooltip wasn't fully hidden on touch devices
  - Router
    - `routeChanged` event will also work for routable tabs now
- Phenome
  - Fixed not working `readonly` prop in `f7-input` Vue component
- Minor fixes

# [v3.0.1](https://github.com/framework7io/framework7/compare/v3.0.0...v3.0.1) - July 10, 2018

- Phenome
  - Fixed `TypeError` error in `ActionsGroup` component

# [v3.0.0](https://github.com/framework7io/framework7/compare/v3.0.0-beta.19...v3.0.0) - July 5, 2018 🎉

# [v3.0.0-beta.19](https://github.com/framework7io/framework7/compare/v3.0.0-beta.18...v3.0.0-beta.19) - July 3, 2018

- Core
  - Router
    - View/Router parameter `beforeLeave` renamed to `routesBeforeLeave`
    - View/Router parameter `beforeEnter` renamed to `routesBeforeEnter`

# [v3.0.0-beta.18](https://github.com/framework7io/framework7/compare/v3.0.0-beta.17...v3.0.0-beta.18) - July 3, 2018

- Core
  - Router
    - Fixed error with `beforeLeave` middleware when loading initial route

# [v3.0.0-beta.17](https://github.com/framework7io/framework7/compare/v3.0.0-beta.16...v3.0.0-beta.17) - July 2, 2018

- Core
  - Router
    - `preRoute` middleware renamed to `beforeEnter` that will be executed before route load/enter.
    - Added `beforeLeave` route middleware that will be executed before route unload/leave.
  - Progressbar
    - Fixed positioning of progressbar inside of the Page with statusbar enabled

# [v3.0.0-beta.16](https://github.com/framework7io/framework7/compare/v3.0.0-beta.15...v3.0.0-beta.16) - July 1, 2018

- Core
  - Searchbar - fixed issue with wrong `previousQuery` in `search` event
- Phenome
  - ListItem has new `defaultChecked` prop to support React uncontrolled components
- Minor fixes

# [v3.0.0-beta.15](https://github.com/framework7io/framework7/compare/v3.0.0-beta.14...v3.0.0-beta.15) - June 27, 2018

- Phenome Components
  - Fixes issue when React components could be rendered wrong in production build

# [v3.0.0-beta.14](https://github.com/framework7io/framework7/compare/v3.0.0-beta.12...v3.0.0-beta.14) - June 24, 2018

- Core
  - Elevation
    - Elevation moved to separate component
    - Added support for `elevation-hover-$n` class to add elevation on hover
    - Added support for `elevation-pressed-$n` class to add elevation on press
    - Added support for `elevation-transiton` class to add transition between elevation states
- Phenome
  - Icon
    - Added support for tooltip with `tooltip` prop

# [v3.0.0-beta.12](https://github.com/framework7io/framework7/compare/v3.0.0-beta.11...v3.0.0-beta.12) - June 22, 2018

- Core
  - Tooltip
    - `el` parameter has been renamed to `targetEl`
  - Accordion
    - Now it toggles `aria-hidden` attribute on accordion content toggle

# [v3.0.0-beta.11](https://github.com/framework7io/framework7/compare/v3.0.0-beta.10...v3.0.0-beta.11) - June 19, 2018

- Core
  - Fix touch ripple issues that happen from time to time in Edge
  - Fix minor push state issues in Edge
  - Device util now has additional detections props: `windowsPhone`, `windows`, `macos`, `ie`, `edge`

# [v3.0.0-beta.10](https://github.com/framework7io/framework7/compare/v3.0.0-beta.9...v3.0.0-beta.10) - June 15, 2018

- Core
  - All new Gauge component with responsive SVG gauges
  - Router
    - Added `preRoute` support (middleware) that can be configured per route or globally on View/Router init for all routes
  - Smart Select
    - New `change`/`smartSelectChange` events
  - Autocomplete
    - Fixed error with undefined value replacement
  - Tooltip
    - New `setText` method to dynamically change Tooltip's text/content
- Phenome
  - Better validation logic for `Input` component
  - `Toggle` - fixed issue when `toggleChange` event not being fired on desktop
  - `ListItemContent` - fixed issue with calling `setState` in render function
  - Support for `target` prop/attribute for `Link`, `Button`, `Fab`, `FabButton` components
  - Tooltip support (with `tooltip` prop) for `Fab` and `FabButton` components
  - New `Gauge` (React) / `f7-gauge` (Vue) component to produce responsive SVG gauges
  - Added Smart Select for `Link` component with `smartSelect` and `smartSelectParams` props

# [v3.0.0-beta.9](https://github.com/framework7io/framework7/compare/v3.0.0-beta.8...v3.0.0-beta.9) - June 12, 2018

- Core
  - All new Tooltip component
  - Template7 update to latest 1.3.6
    - Better `@global` parsing in `js` and `js_if` helpers
- Phenome
  - Now `f7route` and `f7router` are passed as props for components loaded by router (Page, Routable Tabs, Routable Modals).
  - `$f7route` and `$f7router` are now also available only on components loaded by router (Page, Routable Tabs, Routable Modals) and may not be available in custom children components. For children components they must be passed done using props
  - Added `tooltip` support for `Link` and `Button` components

# [v3.0.0-beta.8](https://github.com/framework7io/framework7/compare/v3.0.0-beta.7...v3.0.0-beta.8) - June 11, 2018

- Phenome
  - Transform object rest spread syntax to Object.assign in Vue/React components

# [v3.0.0-beta.7](https://github.com/framework7io/framework7/compare/v3.0.0-beta.6...v3.0.0-beta.7) - June 9, 2018

- Core
  - Lots of MD styles updated to new Material Design specification
  - Cards
    - New outline cards style
  - Chips
    - New outline style + tweaked iOS chips styles
  - FAB
    - New FAB-Extended style with addtional text label support inside of FAB
    - Support for FAB actions label
  - Typography
    - New Elevation styles, can be configured with `elevation-1`, `elevation-2`, ..., `elevation-24` classes
  - Dialog
    - Preloader dialog now supports preloader color as second argument: `app.dialog.preloader(title, color)`
  - Smart Select
    - Will not error anymore about required View if it is actually not required (e.g. for SS opened in Popup, Popover or Sheet)
  - Picker - fixed issues with touch/swipe areas in RTL layout
  - Calendar
    - Fixed issue when not possible to switch calendar to previous month when min date is the last date of previous month
    - Fixed issue when double click behind calendar could cause router to go to the previous page
  - Swiper - updated to latest
    - Fixed issue when slidePrev goes to wrong slide #2650
    - Fixed issue when roundLength was not considered for grids calculation #2656
- Phenome
  - Card
    - New `outline` prop to make card outline
  - Chip
    - New `outline` prop to make chip outline
  - Fab
    - New `text` prop to add text to FAB and make it as Extended FAB
    - New `label` prop for `FabButton` to add label for fab button
  - Simplified conditional icon props for Icon, Link and Button components: `if-ios` -> `ios`, `if-md` -> `md`, `icon-if-ios` -> `icon-ios`, `icon-if-md` -> `icon-md`
  - Input
    - New `error-message-force` prop to force error message to show. Works in case of `validate` is omitted
  - Messagebar
    - New `resizePage` prop that will resize messages page with messagebar
    - New `resizePage()` method renamed to `resize()`

# [v3.0.0-beta.6](https://github.com/framework7io/framework7/compare/v3.0.0-beta.5...v3.0.0-beta.6) - June 5, 2018

- Phenome
  - ListItem - fixed `subtitle` slot being ignored

# [v3.0.0-beta.5](https://github.com/framework7io/framework7/compare/v3.0.0-beta.4...v3.0.0-beta.5) - June 4, 2018

- Phenome - fix issue when passing `undefined` child to the component

# [v3.0.0-beta.4](https://github.com/framework7io/framework7/compare/v3.0.0-beta.3...v3.0.0-beta.4) - June 4, 2018

- Core
  - App methods (specified in `methods` params) are now bound to app context (initialized F7 instance)
  - Swiper - updated to latest 4.3.2
    - Core
      - Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
      - Fixed issue with loop #2647. Thanks to @kochizufan
    - Pagination
      - New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
      - New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
- Phenome
  - Use `domProps` for Vue input components
  - ListItem
    - New `swipeoutOpened` prop to control (open/close) swipeout item by prop

# [v2.3.1](https://github.com/framework7io/framework7/compare/v2.3.0...v2.3.1) - June 1, 2018

- Searchbar
  - Fixed issue with not hiding/showing backdrop when `customSearch` is enabled
- Sortable
  - New app parameter `sortable.moveElements` by default is `true`. Useful to disable when you use for DOM manipulation other library like Vue or React
- Swiper update to latest v4.3.2:
  - Core
    - Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
    - Fixed issue with loop #2647. Thanks to @kochizufan
  - Pagination
    - New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
    - New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
- Minor fixes

# [v2.3.0](https://github.com/framework7io/framework7/compare/v2.2.5...v2.3.0) - May 27, 2018

- View/Router
  - Fixed missing `pushStateOnLoad` parameter
  - Added support for routable Action Sheet
- Searchbar
  - Fixed issue with exapandable Searchbar missplace in MD theme when used with Subnavbar
- Input
  - New `scrollIntoViewDuration` app.input parameter to set duration for scrolling input into view
  - New `scrollIntoViewAlways` app.input parameter to scroll input into view no matter is it outside of view or not
  - `app.input.scrollIntoView` now has additional `force` argument to scroll input into view no matter is it outside of view or not: `app.input.scrollIntoView(inputEl, duration, centered, force)`
  - Clicking input's clear button now also triggers `input` event in addition to `change` event
- Statusbar
  - Improved statusbar overlay detection for iOS devices
- Autocomplete
  - New `dropdownContainerEl` parameter to define place where dropdown need to be inserted
  - Improved dropdown positioning
- Dom7 update to latest v2.0.6:
  - Fixed issue with remove event listeners when they was not added
- Swiper update to latest v4.3.0:
  - Core
    - Fixed issue when `swipeBack` sometimes slides to wrong slide
    - Fixed issue when window resizing can break Coverflow effect layout
    - Fixed issue with wrong detection of iOSEdgeSwipeDetection
  - Dom7 update to latest v2.0.6:
    - Fixed issue with remove event listeners when they was not added
- Lots of minor fixes

# [v2.2.5](https://github.com/framework7io/framework7/compare/v2.2.1...v2.2.5) - April 29, 2018

- Router
  - Fixed issue with not loaded routable tabs content after swipe-back to page with these routable tabs
  - Page data will have additional `swipeback: true` prop when the page event was triggered by swipe back
- Range
  - New `range:changed` (`rangeChanged`, `changed`) event that will be triggered on slide knob release after value change
- Messagebar
  - Fixed textarea text color for MD-Dark theme
- Form Storage
  - Added support for skip inputs from storing by adding `no-store-data` or `ignore-store-data` class to input element
- Dom7 updated to latest v2.0.5
  - Support for setting array value on multiple select
  - Improved internal events proxies logic for better memory management
- Swiper update to latest v4.2.5
  - Core
    - Prevent apply grab cursor when swiper is locked
    - Fixed breakpoint with loop getting wrong realIndex when on init
    - Fixed "transformed" slides sizes calculation that could cause issues in with Coverflow effect
  - Autoplay
    - Fixed issue that can cause memory leak
- Minor fixes

# [v2.2.1](https://github.com/framework7io/framework7/compare/v2.2.0...v2.2.1) - April 7, 2018

- List Index
  - Improved page scroll logic when scrolling upward
- Router
  - Fixed issue when Swipe Back may not work for views other than main
  - Fixed issue with undefined initial browser history state when `pushState` enabled
- Minor fixes

## [v1.7.1](https://github.com/framework7io/framework7/compare/v1.7.0...v1.7.1) - April 7, 2018

- Fix for touch events when app can be unresponsive iOS 11.3

# [v2.2.0](https://github.com/framework7io/framework7/compare/v2.1.3...v2.2.0) - April 1, 2018

- List Index
  - Meet all new List Index component 🎉
- Full iPhone X safe areas support and required tweaks for MD theme 🙌. Same as for iOS theme: automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
  - `ios-edges` - for full-width elements (like main View)
  - `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
  - `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
- Stepper
  - New `autorepeat` parameter that will repeatedly increase/decrease values while you tap and hold plus/minus buttons
  - New `autorepeatDynamic` parameter that will increase autorepeat ratio based on how long you hold the button
  - New `wraps` parameter. When enabled, incrementing beyond maximum value sets value to minimum value; likewise, decrementing below minimum value sets value to maximum value
- Sortable
  - Fixed styling when sortable list is using with `no-chevron` class
- Range Slider
  - New `draggableBar` parameter (defaults to `true`) that allows to disable value change on range bar click and drag
  - Added auto sizes recalculation on parent modals/panel/tabs open
- Router
  - Will now replace state (if `pushState` enabled) on initial load when initial route has `redirect`
  - Fixed issue with `tab:beforeremove` event was not fired for routeable tabs
  - Improved `restoreScrollTopOnBack` logic to save and restore scrolling on active `page-content` element
  - Swipe Back support for MD theme with new Router parameters:
    - `mdSwipeBack: false` - enables swipe back for MD theme
    - `mdSwipeBackAnimateShadow: true` - enable/disable box-shadow animation during swipe back action
    - `mdSwipeBackAnimateOpacity: false` - enable/disable opacity animation during swipe back action. You can disable it to improve performance
    - `mdSwipeBackActiveArea: 30` - width of invisible left edge of the screen that triggers swipe back action
    - `mdSwipeBackThreshold: 0` - swipe back will start if "touch distance" will be more than this value
- Request
  - Now if you `return false` in `beforeOpen` or `beforeSend` callbacks it will cancel the XHR request
- Autocomplete
  - New `inputEvents` parameter (by default is `input`) allows to configure input events used to handle Autocomplete actions and source request
- Smart Select
  - Fixed issue when Searchbar didn't work when Smart Select opened in `page` with Searchbar in iOS theme
- Dialog
  - New `app.dialog.keyboardActions` parameter (enabled by default) that enables keyboard shortcuts (Enter and Esc) keys for predefined dialogs (Alert, Confirm, Prompt, Login, Password)
- Fixed iOS 11.3 bug that can break Fast clicks and make Cordova/PhoneGap app unresponsive on app resume from background 🔥
- Swiper updated to latest 4.2.2 version
  - Core
    - Respect and update breakpoints when calling Swiper's `.update()` method
  - Pagination
    - New `progressbarOpposite` parameter to make pagination progressbar opposite to `direction` parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction
- Lots of minor fixes

## [v1.7.0](https://github.com/framework7io/framework7/compare/v1.6.5...v1.7.0) - March 21, 2018

- Full iPhone X support and required tweaks. Automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
  - `ios-edges` - for full-width elements (like main View)
  - `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
  - `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
- Dom7
  - Added `beforeCreate` callback for `.ajax` method
- Minor fixes

# [v2.1.3](https://github.com/framework7io/framework7/compare/v2.1.2...v2.1.3) - March 19, 2018

- Searchbar
  - Fixed issue with position of input clear button
- Router
  - Fixed issue with wrong component context when `component` passed to route

# [v2.1.2](https://github.com/framework7io/framework7/compare/v2.1.1...v2.1.2) - March 18, 2018

- Stepper
  - Fixed theme-specific modifier classes, e.g. `stepper-fill-ios`, `.stepper-round-md` etc.

# [v2.1.1](https://github.com/framework7io/framework7/compare/v2.0.10...v2.1.1) - March 17, 2018

- Stepper
  - Meet all new Stepper component 🎉
- Data Table
  - Added data table footer UI for pagination
  - Added UI support for having inputs in table head
- Input
  - Now it is possible to use fancy input elements outside of List View, by just wrapping it with `<div class="input">`
- Router
  - Fixed issue when route context wasn't available in `async` route
  - Fixed issue when modal HTML element was duplicated in modal routes
- Form
  - Fixed issue when `enctype` attribute was ignored on ajax form
- VI (video intelligence)
  - Now serves vi api over `https`
- Actions
  - Fixed issue with error when pass already rendered HTML element to the `actions.create` constructor
  - Fixed issue with not setting actions button bg color
  - Added support for `closeByOutsideClick` logic
- Searchbar
  - Now hides elements (when required) by setting/unsetting classes instead of directly modifying element `display` property
- Toast
  - Added `destroyOnClose` parameter to automatically destroy toast instance on close
  - New `app.toast.show` method to automatically create and open Toast
  - Improved iPhone X support for bottom toast
- List
  - New `no-chevron` class on list and list item link to disable chevron icon
  - New `chevron-center` class on media list or media list item to set chevron icon position on center
- Swiper updated to latest 4.2.0 version
  - Core
    - `swiper.updateAutoHeight(speed)` now supports `speed` parameter to resize swiper wrapper with duration
    - Fixed issues in free mode with `freeModeSticky` not being able to snap to closest snap point
    - New `swiper.slideToClosest()` method to slide to closest snap point when it is somewhere in between
  - A11y (Accessibility)
    - It is now enabled by default (if installed)
  - Controller
    - Fixed RTL issue when vertical swiper controls horizontal one
  - Lazy
    - Fixed issue when lazy loading not always triggered on window resize
- Improved server-side rendering by using `ssr-window` package
- Lots of minor fixes

# [v2.0.10](https://github.com/framework7io/framework7/compare/v2.0.8...v2.0.10) - February 19, 2018

- Router
  - New `router.clearPreviousHistory()` method to clear all previous pages history and remove all previous pages from DOM
  - New `clearPreviousHistory` option for `router.navigate` that will clear history after reloading/navigating to specified page
  - Fixed issue with not correctly working `reloadPrevious` parameter
- Smart Select
  - Now accepts `view` as a parameter on initialization
- Accordion
  - Fixed iOS rendering issue when opening accordiong enables page scroll
- Panel
  - Swipe panel won't be opened on quick swipe if the swipe distance doesn't exceed `swipeThreshold` parameter
- Range Slider
  - Fixed issue with broken events when passing event listeners in `on` parameter on init
- Minor fixes

# [v2.0.8](https://github.com/framework7io/framework7/compare/v2.0.7...v2.0.8) - February 11, 2018

- Swipeout
  - Fixed issue in Safari when it flashes on open
- Router
  - Now `route` (currentRoute) object has additional `context` property if it was passed in route options
- Range Slider
  - Now it triggers input's `change` event on when user releases slider
- Sortable
  - Fixed issue when sortable list used with list groups
- Swiper updated to latest 4.1.6:
  - Improved touch events support on desktop Windows devices with touch screen
  - Improved "loop fix" when slider is in the free mode
  - New `noSwipingSelector` parameter that can be used instead of `noSwipingClass`
  - New `preventIntercationOnTransition` parameter to prevent interaction during slice change transition
  - New `.slideToLoop` method to be used in loop mode
  - Improved IE 10 support. But it is recommended to use [**proto** polyfill](https://www.npmjs.com/package/proto-polyfill)
  - Improved touch support for Edge
  - Fixed issue with `slideChange` events being fired when slide wasn't actually changed
  - Scrollbar
    - Now doesn't require to enable `simulateTouch` for desktops when it is `draggable`
  - Pagination
    - Added new multiple main bullets support for dynamic bullets pagination
  - Zoom
    - Now supports Virtual Slides
  - New `watchOverflow` (disabled by default). When enabled Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding
  - Autoplay
    - New `reverseDirection` to enable autoplay in reverse direction
    - New `waitForTransition` parameter when autoplay will wait for wrapper transition to continue (enabled by default). Can be disabled in case of using Virtual Translate when your slider may not have transition
- Minor fixes

# [v2.0.7](https://github.com/framework7io/framework7/compare/v2.0.6...v2.0.7) - January 27, 2018

- Picker
  - Fixed issue with `change` event not being fired
- Panel
  - Fixed issue with closing swipe panel with `swipeActiveArea` parameter
- Router
  - `async` route support for routable tabs
  - `async` route support for routable modals
- Virtual List
  - New `ul` and `createUl` parameters. When disabled then VL can be used with any elements not expecting the list only
- Dialog
  - New `app.destroyPredefinedDialogs` parameter to automatically destroy predefined dialogs like Alert, Confirm, Prompt, etc.
- Package
  - Now ES-next modules have named export in addition to default, it exports `{ Template7, Dom7, Utils, Request, Device, Support }`
- Minor fixes

# [v2.0.6](https://github.com/framework7io/framework7/compare/v2.0.5...v2.0.6) - January 9, 2018

- Photo Browser
  - Fixed isse with wrong navbar color when color theme applied
- Range Slider
  - Fixed wrong knob position in RTL layout
- Tabs
  - Fixed issue with routable tabs links in navbar not switching correctly active class
- Request
  - New `request.postJSON(url, data, success, error, dataType)` method to send pure JSON data with POST
- Router
  - Router ajax events now receives second argument with navigating options
  - New `router.refreshPage()` method to reload current page
  - New `passRouteQueryToRequest` parameter (`true` by default) will pass route url query to request url query (for route `url`, `templateUrl` and `componentUrl` options).
    If you have the following route `{ path: '/somepage/', url: 'http://myserver/page/' }` and you will click link with `/somepage/?foo=bar` url then it will load page from `http://myserver/page/?foo=bar` url.
  - New `passRouteParamsToRequest` parameter (`false` by default) will pass current route parameters to request url query (for route `url`, `templateUrl` and `componentUrl` options).
    If you have the following route `{ path: '/user/:userId/posts/:postId/', url: 'http://myserver/userpost/' }` and you will click link with `/user/11/posts/12/` url then it will load page from `http://myserver/userpost/?userId=11&postId=12` url.
  - It is now also possible to use router parameters delimiters in route `url`, `templateUrl` and `componentUrl` options that will be replaced on request. E.g. `{ path: '/user/:userId/posts/:postId/', url: 'http://myserver/{{userId}}/{{postId}}' }`
- Toolbar / Tabbar
  - Common app tabbar in multiple views app structure can be also hidden with "toolbar-hide-on-scroll"
- Minor fixes

# [v2.0.5](https://github.com/framework7io/framework7/compare/v2.0.2...v2.0.5) - January 2, 2018

\* Lots of minor fixes

# [v2.0.2](https://github.com/framework7io/framework7/compare/v2.0.1...v2.0.2) - December 5, 2017

- Router
  - Fix to make Routable tabs work on home page
- Few CSS tweaks for iPhone X safe areas

# [v2.0.1](https://github.com/framework7io/framework7/compare/v2.0.0...v2.0.1) - December 4, 2017

- Fixed iOS 11.2 iPhone X support with new CSS `env` safe areas

# [v2.0.0](https://github.com/framework7io/framework7/compare/v2.0.0-beta.21...v2.0.0) - December 3, 2017 🎉

# [v2.0.0-beta.21](https://github.com/framework7io/framework7/compare/v2.0.0-beta.20...v2.0.0-beta.21) - December 3, 2017

- Router
  - Fixed issue with multiple "destroy" hooks called when using modals/tabs as router components
- vi
  - Added `placementType` ad parameter

# [v2.0.0-beta.20](https://github.com/framework7io/framework7/compare/v2.0.0-beta.19...v2.0.0-beta.20) - December 2, 2017

- Range Slider
  - Recalculate range slider size when parent tab becomes visible
- CSS
  - `!important` rule for hiding `ios-only` and `md-only` elements

# [v2.0.0-beta.19](https://github.com/framework7io/framework7/compare/v2.0.0-beta.18...v2.0.0-beta.19) - December 1, 2017

- Fixed issue with View router initialization when it was created after app init. Fixes also issue in cordova when app initialized later within `deviceready` event

# [v2.0.0-beta.18](https://github.com/framework7io/framework7/compare/v2.0.0-beta.17...v2.0.0-beta.18) - November 30, 2017

- New _vi_ (video intelligence) component. _vi_ is a mobile video SSP (Supply / Sell Side Platform). It provides self-serve tools for publishers to captivate and monetize audiences
- Popover
  - Now may accept target elements coordinates with `targetX`, `targetY` parameters instead of `targetEl` target element itself
- Actions
  - New `forceToPopover` parameter to always convert it to Popover
  - `toPopover` parameter renamed to `convertToPopover`
  - New `backdrop` (true/false) parameter to enable/disable Actions backdrop
- Router
  - New `currentPageEl` router property that points to current page HTMLElement.
  - Improved routable tabs support for different routes but with same tab IDs
  - Improved dynamic navbar transition using CSS page transitions
- Form Storage
  - Renamed methods:
    - `app.form.data.get()` -> `app.form.getFormData()`
    - `app.form.data.remove()` -> `app.form.removeFormData()`
    - `app.form.data.store()` -> `app.form.storeFormData()`
    - `app.form.toData()` -> `app.form.convertToData()`
    - `app.form.fromData()` -> `app.form.fillFromData()`
- CSS & Theming
  - New "Dark Color Theme" for both "iOS" and "MD" themes. Can be added with `theme-dark` CSS class.
  - Full iPhone X support and required tweaks. Automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
    - `ios-edges` - for full-width elements (like main View)
    - `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
    - `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
  - Common `disabled` class to make any elements disabled
- Swiper updated to latest 4.0.7:
  - Fixed issue with not working correctly `touchReleaseOnEdges` on iOS
  - Fixed issue with not working allowSlideNext/Prev change on Breakpoints
  - Fixed wrong scrollbar dragging when using custom `dragSize`
- Build/Package - new files structure to improve tree-shaking as much as possible:
  - Now the `framework7.esm.js` and `framework7.esm.bundle.js` are in the root of `/dist/` folder.
  - `framework7.esm.js` now exports only Framework7 core library with single _default_ export
  - All additional components must be included from separate `/dist/components/` folder. For example `import Searchbar from 'framework7/dist/components/searchbar/searchbar.js';`
  - Custom CSS build is now also possible with LESS. `framework7.less` is now in the root of `/dist/` and contains only Framework7 core library styles. Additional components must be included from separate `/dist/components/` folder. For example `import "framework7/dist/components/searchbar/searchbar.less";`
- Lost of minor fixes

# [v2.0.0-beta.17](https://github.com/framework7io/framework7/compare/v2.0.0-beta.16...v2.0.0-beta.17) - November 14, 2017

- Preloader
  - Fixed preloader backdrop styles to cover the screen behind it
- Router
  - Cancels swipe back page in case of swipe left
- Input
  - Added `scrollIntoViewOnFocus` parameter, that is by default enabled for Android
  - Added `scrollIntoViewCentered` paramter to scroll input into center of view
- Minor fixes

# [v2.0.0-beta.16](https://github.com/framework7io/framework7/compare/v2.0.0-beta.15...v2.0.0-beta.16) - November 8, 2017

- Swiper updated to latest version
  - Fixed issue with not working `noSwiping` parameter
  - Parallax now considers `slidesPerGroup` parameter
  - Zoom: improved gestures handling
  - Pagination: fixed issues with wrong positioned dynamic-bullets when there are not enough slides
  - Fixed issues with some effects being broken with enabled `breakpoints`
- Panels
  - Fixed issue with wrong styles when panels become visible by breakpoints
- PhotoBrowser
  - Improved zoom behavior on Androids (due to Swiper update)
- Router
  - Added routes alias support
    ```
    routes = [
      {
        path: '/foo/',
        url: 'somepage.html',
        alias: '/bar/',
      }
    ]
    ```
  - Added routes redirect support
    ```
    routes = [
      {
        path: '/foo/',
        url: 'somepage.html',
      },
      {
        path: '/bar/',
        redirect: '/foo/',
      }
    ]
    ```
- Build
  - Along with config file path now it is also possible to specify build output path like `npm run build:prod -- --config path/to/config.js --output path/to/build`
- Minor fixes

# [v2.0.0-beta.15](https://github.com/framework7io/framework7/compare/v2.0.0-beta.14...v2.0.0-beta.15) - October 27, 2017

- Fixed issue with extented context in router components

# [v2.0.0-beta.14](https://github.com/framework7io/framework7/compare/v2.0.0-beta.12...v2.0.0-beta.14) - October 26, 2017

- Fix router page events issue when no `route` passed to page callback

# [v2.0.0-beta.12](https://github.com/framework7io/framework7/compare/v2.0.0-beta.11...v2.0.0-beta.12) - October 26, 2017

- Router
  - Added [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for better route matching with support of RegExp in route path
  - Route `name` renamed to `pageName` parameter to specify page's name to load. Route `name` now means name of the route
  - Added additional routes arguments to `async` method. Now it is `async(routeTo, routeFrom, resolve, reject)`
  - `pushState` now supports for multiple Views at a time
  - Router component's context now can be extended with `options.context` route parameter
  - Router component now supports inline nested `<template>` that won't be parsed by Template7
  - Added support for dynamic routes
  - Route events, now it is possible to specify `on` object with page events on route object
- PhotoBrowser
  - Now uses Virtual Slides by default
- Input
  - Now automatically scrolls into view on Androids when keyboard becomes opened
- Colors
  - Number of built-in colors reduced to red, green, blue, pink, yellow, orange, white, black, gray
- Build
  - Now it is possible to specify path to config file like `npm run build:dev -- --config path/to/config.js`
- Lost of minor fixes

# [v2.0.0-beta.11](https://github.com/framework7io/framework7/compare/v2.0.0-beta.10...v2.0.0-beta.11) - October 13, 2017

- Messagebar
  - Added `top` parameter to consider it as top messagebar
  - Added `resizePage` parameter to define whether it should resize the page
  - Added `maxHeight` parameter to specify messagebar max-height on resize
- Minor fixes

# [v2.0.0-beta.10](https://github.com/framework7io/framework7/compare/v2.0.0-beta.9...v2.0.0-beta.10) - October 11, 2017

- Swiper update to latest 4.0.1:
  - Fixed issue with pagination being broken with loop mode
  - Reworked `realIndex` calculation ordering
- Router
  - Now it creates dynamically navbar (for isDynamicNavbar) only when the page with navbar appears
- Statusbar
  - Fixed broken `statusbar.show` method
- Package
  - Now it exports by default modular `framework7.esm.js` version instead of bundle

# [v2.0.0-beta.9](https://github.com/framework7io/framework7/compare/v2.0.0-beta.8...v2.0.0-beta.9) - October 8, 2017

- New Picker component
- New Calendar component
- New Custom Modal component
- Router
  - Added support for swipeable routable tabs
- Swiper
  - Update to latest version with Virtual Slides support
- ES-next modules renamed
  - `framework7.module.js` -> `framework7.esm.bundle.js` (exported by default)
  - `framework7.modular.js` -> `framework7.esm.js`
- Numerous fixes and improvements

# [v2.0.0-beta.8](https://github.com/framework7io/framework7/compare/v2.0.0-beta.7...v2.0.0-beta.8) - September 21, 2017

- Toolbar
  - Class `toolbar-bottom` to display it on the bottom for MD theme has been renamed to `toolbar-bottom-md`.
- Sortable
  - Renamed events `sortable:open` -> `sortable:enable`, `sortable:close` -> `sortable:disable`.
- Grid
  - `no-gutter` class renamed to `no-gap`.
- Card
  - `card-content-inner` element has been removed. Now to have the same effect it is required additional `card-content-padding` class to `card-content` element.
- Modal is now a part of a core components.
- Toast
  - Added icon support for center-positioned Toast.
- Router
  - Reloaded page (called with `reloadAll` or `reloadCurrent` parameters) now also fires `pageBeforeIn` and `pageAfterIn` events.
  - Improved routable Tabs. Now it also works with Animated Tabs.
- Notification
  - All new Notification component arrived, with better unified look and swipe-to-close support.
- Buttons
  - `small` buttons now can be round and not round.
- Lots of minor fixes.

# [v2.0.0-beta.7](https://github.com/framework7io/framework7/compare/v2.0.0-beta.6...v2.0.0-beta.7) - September 13, 2017

- Fixed issue with Routable Tabs not working correctly on home page
- Fixed issue with touch ripple effect being broken after bundler optimization

# [v2.0.0-beta.6](https://github.com/framework7io/framework7/compare/v2.0.0-beta.5...v2.0.0-beta.6) - September 13, 2017

- Template7 updated to latest v1.3.0

# [v2.0.0-beta.5](https://github.com/framework7io/framework7/compare/v2.0.0-beta.4...v2.0.0-beta.5) - September 13, 2017

- Small core refactorings to work better in tree-shaking bundlers

# [v2.0.0-beta.4](https://github.com/framework7io/framework7/compare/v2.0.0-beta.3...v2.0.0-beta.4) - September 11, 2017

- Added full RTL layout support (with new `.rtl` stylesheets).
- Removed XHR (Ajax) functionality from Dom7, including `$.ajax`, `$.get`, `$.post`, `$.getJSON`. These are replaced with new Framework7 `request` module.
- Removed `$.` utilities from Dom7, including `$.parseUrlQuery`, `$.isArray`, `$.each`, `$.unique`, `$.serializeObject`, `$.dataset`, `$.extend`, they are available via `Framework7.utils` or `app.utils`.
- Utils' `.promise` now returns native Promise if it is supported by browser and fallback to Promise-like polyfill if it is not supported.

# [v2.0.0-beta.3](https://github.com/framework7io/framework7/compare/v2.0.0-beta.2...v2.0.0-beta.3) - September 7, 2017

- Add new Autocomplete component
- Add new Toast component
- New modular package `framework7.modular.js`
- New view `restoreScrollTopOnBack` parameter to restore previous page scroll position when navigating back
- Lots of minor fixes and improvements

# [v2.0.0-beta.2](https://github.com/framework7io/framework7/compare/v2.0.0-beta.1...v2.0.0-beta.2) - September 2, 2017

- Add new Swiper component
- Add new Photo Browser component
- Ported Notifications component
- Improved custom build
- Lots of minor fixes

# [v2.0.0-beta.1](https://github.com/framework7io/framework7/compare/v1.6.4...v2) - August 21, 2017

- Initial v2 release
