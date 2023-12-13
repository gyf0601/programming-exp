```js
// 全局属性
// vue3
app.config.globalProperties

// vue2
Vue.prototype
```

## 动态参数
```html
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>

<!--
注意:
    动态参数中表达式的值应当是一个字符串，或者是 null。特殊值 null 意为显式移除该绑定。其他非字符串的值会触发警告。
    动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。例如下面的示例：
-->
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>

<!--
    当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：
-->
<a :[someAttr]="value"> ... </a>
<!--上面的例子将会在 DOM 内嵌模板中被转换为 :[someattr]-->
```
