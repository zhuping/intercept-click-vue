# intercept-click-vue

基于 Vue 的点击拦截插件，0业务代码侵入，默认对点击操作做了防抖（debounce）处理

### Usage

```vue
import Intercept from 'intercept-click-vue';
Vue.use(Intercept, (e, contexts, index, eventType) => {
    ...
});
```

### Tips

如果针对某些场景不需要做 `click` 拦截操作，比如键盘输入，可以在 `绑定事件的元素` 或者 `绑定事件的父元素` 上添加 `data-intercept="stop"` 属性，例如：

```html
<button data-intercept="stop" @click="onClick">点击</button>
```

### Inspiration

* [link](https://www.zhihu.com/question/290066361/answer/486336434)