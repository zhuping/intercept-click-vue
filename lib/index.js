/*!
  * intercept-click-vue v1.0.0
  * last modify 2020-8-11 16:54:45
  * @license MIT
  */
var captureContexts = [];
var eventTypes = ['click'];
var Intercept = {
  debounce: function debounce(fn, delay) {
    var timer;
    return function () {
      var context = this;
      var args = arguments;

      if (timer) {
        clearTimeout(timer);
        args[0].stopImmediatePropagation();
      }

      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    };
  },
  delegateBehavior: function delegateBehavior(context, cb) {
    var _this = this;

    if (context.$el && context.$el.nodeType !== 8) {
      context.$el.setAttribute('vue-component-uid', context._uid);
    }

    if (context.$root.$el && !context.$root.$el._isBindDelegate) {
      eventTypes.forEach(function (eventType) {
        context.$root.$el.addEventListener(eventType, _this.debounce(function (e) {
          _this.captureEvent(e, captureContexts, eventType, cb);
        }, 250), true);
      });
      context.$root.$el._isBindDelegate = true;
    }
  },
  captureEvent: function captureEvent(e, contexts, eventType, cb) {
    var els = contexts.map(function (context) {
      return context.$el;
    });
    var currentEl = e.target;

    while (currentEl) {
      var index = els.indexOf(currentEl);

      if (index > -1) {
        cb && cb(e, contexts, index, eventType);
        break;
      }

      currentEl = currentEl.parentNode;
    }
  }
};
var index = {
  install: function install(Vue, fn) {
    Vue.mixin({
      mounted: function mounted() {
        var _this2 = this;

        this.$nextTick(function () {
          captureContexts.push(_this2);
          Intercept.delegateBehavior(_this2, fn);
        });
      }
    });
  }
};

export default index;
//# sourceMappingURL=index.js.map
