# 🎄 md-editor-v3-component

[English](https://github.com/renqiankun/md-editor-v3-component) \| 中文

基于优秀的开源markdown编辑器[md-editor-v3](https://github.com/imzbf/md-editor-v3)基础上结合[markdown-it-vue-component](https://github.com/renqiankun/markdown-it-vue-component-demo)封装的组件，支持自定义组件插入。增加渲染自定义组件功能。

- 文档与在线预览：[在线预览](https://renqiankun.github.io/md-editor-v3-component/dist/)
- md-editor-v3-component [github](https://github.com/renqiankun/md-editor-v3-component)
- markdown-it-vue-component [github](https://github.com/renqiankun/markdown-it-vue-component-demo)

## ⭐️ 功能一览

- 方便插入自定义vue组件；
- 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
- 内置的白色主题和暗黑主题，支持绑定切换；
- 支持快捷键插入内容； 支持使用 `prettier` 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
- 多语言，支持自行扩展语言；
- 粘贴上传图片，图片裁剪上传；
- 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）；
- 预览主题，内置`default`、`vuepress`、`github` 、`cyanosis`、`mk-cute`、`smart-blue` 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）；
- `mermaid`绘图（>=1.8.0），`katex`数学公式（>=1.9.0）；
- 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。
- 按需引用(>=4.0.0)。

## 🗺 预览图

| 默认模式 | 暗黑模式 | 仅预览 |
| --- | --- | --- |
| ![](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

输入提示和自定义简单的标记、表情扩展预览

![](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 📦 安装

```shell
yarn add md-editor-v3-component
```

使用已存在的语言、主题扩展，例如：日语

```shell
yarn add @vavt/cm-extension
```

使用更多的扩展工具栏组件，例如：导出内容为 PDF

```shell
yarn add @vavt/v3-extension
```

更多使用及贡献方式参考：[md-editor-extension](https://github.com/renqiankun/md-editor-extension)

## 💡 用法

从`v4.0.0`开始，内部组件支持按需引用。

### ✍🏻 编辑器模式

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');
</script>
```

### 📖 仅预览模式

```vue
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>
```

当使用服务端渲染时，`scrollElement`应该是字符类型，例：`html`、`body`、`#id`、`.class`。

---

更多用法请前往 [原md-editor-v3文档](https://imzbf.github.io/md-editor-v3)。

### 插入自定义组件配置

```js
import customComponentPlugin, {
  type MDVueComponentOptions
} from 'markdown-it-vue-component';
import 'markdown-it-vue-component/style.css';
import MyCard from './components/my-card.vue';
//使用 md-editor-v3配置
config({
    ...其他配置,
    markdownItPlugins(plugins, { editorId }) {
       return [
         ...plugins,
         // markdown中插入组件插件
         {
           type: 'customComponentPlugin',
           plugin: customComponentPlugin,
           options: {
             components: {
               'my-card': {
                 component: shallowRef(MyCard),
                 propsUseJson: true,
                 multipleProps: true
               } as MDVueComponentOptions,
               img: {
                 component: shallowRef(MyImg)
               }
             }
           }
      }
       ]
    }
})

```
