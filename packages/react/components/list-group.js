function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7ListGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7ListGroup, _React$Component);

  function F7ListGroup(props, context) {
    _classCallCheck(this, F7ListGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7ListGroup).call(this, props, context));
  }

  _createClass(F7ListGroup, [{
    key: "render",
    value: function render() {
      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          mediaList = props.mediaList,
          sortable = props.sortable,
          sortableTapHold = props.sortableTapHold,
          sortableMoveElements = props.sortableMoveElements;
      var classes = Utils.classNames(className, 'list-group', {
        'media-list': mediaList,
        sortable: sortable,
        'sortable-tap-hold': sortableTapHold
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
      }, React.createElement('ul', null, this.slots['default']));
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }]);

  return F7ListGroup;
}(React.Component);

__reactComponentSetProps(F7ListGroup, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  mediaList: Boolean,
  sortable: Boolean,
  sortableTapHold: Boolean,
  sortableMoveElements: {
    type: Boolean,
    default: undefined
  }
}, Mixins.colorProps));

F7ListGroup.displayName = 'f7-list-group';
export default F7ListGroup;