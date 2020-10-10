const captureContexts = []
const eventTypes = ['click']

const Intercept = {
  debounce(fn, delay) {
    let timer

    return function () {
      const context = this
      const args = arguments

      // 忽略被过滤的元素 `data-intercept`
      const els = captureContexts.map(context => context.$el)
      let currentEl = args[0].target
      while(currentEl) {
        if (currentEl.dataset && currentEl.dataset.intercept === 'stop') {
          return fn.apply(context, args)
        }
        
        const index = els.indexOf(currentEl)

        // 只查询到组件根节点为止，不再继续往上查询
        if (index > -1) {
          break
        }
        currentEl = currentEl.parentNode
      }

      if (timer) {
        clearTimeout(timer)
        args[0].stopImmediatePropagation();
      }

      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  },
  delegateBehavior (context, cb) {
    if (context.$el && context.$el.nodeType !== 8) {
      context.$el.setAttribute('vue-component-uid', context._uid)
    }

    if (context.$root.$el && !context.$root.$el._isBindDelegate) {
      eventTypes.forEach(eventType => {
        context.$root.$el.addEventListener(eventType, this.debounce(e => {
          this.captureEvent(e, captureContexts, eventType, cb)
        }, 250), true)
      })
      context.$root.$el._isBindDelegate = true
    }
  },
  captureEvent (e, contexts, eventType, cb) {
    const els = contexts.map(context => context.$el)
    let currentEl = e.target
    while (currentEl) {
      const index = els.indexOf(currentEl)
      if (index > -1) {
        cb && cb(e, contexts, index, eventType)
        break
      }
      currentEl = currentEl.parentNode
    }
  }
}

export default {
  install (Vue, fn) {
    Vue.mixin({
      mounted () {
        this.$nextTick(() => {
          captureContexts.push(this)
          Intercept.delegateBehavior(this, fn)
        })
      }
    })
  }
}