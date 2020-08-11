# intercept-click-vue

基于 Vue 的点击拦截插件，0业务代码侵入，默认对点击操作做了防抖（debounce）处理

### Usage

```vue
import Intercept from 'intercept-click-vue';
Vue.use(Intercept, (e, contexts, index, eventType) => {
    ...
});
```

### Inspiration

* [link](https://www.zhihu.com/question/290066361/answer/486336434)