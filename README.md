# 🎄 md-editor-v3-component

English \| [中文](https://github.com/renqiankun/md-editor-v3-component/blob/main/README-CN.md)

Based on the excellent open-source markdown editor [md-editor-v3](https://github.com/imzbf/md-editor-v3), integrated with the component encapsulated by [markdown-it-vue-component](https://github.com/renqiankun/markdown-it-vue-component-demo), supporting custom component insertion and enhanced custom component rendering functionality.

- Documentation and example: [Go](https://renqiankun.github.io/md-editor-v3-component/dist/)
- md-editor-v3-component [github](https://github.com/renqiankun/md-editor-v3-component)
- markdown-it-vue-component [github](https://github.com/renqiankun/markdown-it-vue-component-demo)

## ⭐️ Features

- Easy insertion of custom Vue components.
- Toolbar, screenfull or screenfull in web pages and so on.
- Themes, Built-in default and dark themes.
- Shortcut key for editor.
- Beautify your content by `prettier`(only for markdown content, not the code and other text).
- Multi-language, build-in Chinese and English(default: Chinese).
- Upload picture, paste or clip the picture and upload it.
- Render article directly(no editor, no event listener, only preview of content).
- Theme of preview, `default`, `vuepress`, `github`, `cyanosis`, `mk-cute`, `smart-blue` styles(not identical). It can be customized also(Refer to example page).
- `mermaid`(>=1.8.0), `katex` mathematical formula(>=1.9.0).
- Customize the toolbar as you like.
- On-demand Import(>=4.0.0).

## 🗺 Preview

| Default theme | Dark theme | Preview only |
| --- | --- | --- |
| ![](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

Inputing prompt and mark, emoji extensions

![](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 📦 Install

```shell
yarn add md-editor-v3-component
```

Use existing extension of language and theme, such as Japanese

```shell
yarn add @vavt/cm-extension
```

Use existing components of toolbar, such as exporting content as PDF

```shell
yarn add @vavt/v3-extension
```

For more ways to use or contribute, please refer to: [md-editor-extension](https://github.com/imzbf/md-editor-extension)

## 💡 Usage

When using server-side rendering, make sure to set `editorId` to a constant value.

Starting from `4.0.0`, internal components can be imported on-demand.

### ✍🏻 Display Editor

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

### 📖 Preview Only

```vue
<template>
  <MdPreview :id="id" :modelValue="text" />
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

When using server-side rendering, `scrollElement` should be of string type, eg: `html`, `body`, `#id`, `.class`.

---

For more usage, please visit the [Original md-editor-v3 Documentation](https://imzbf.github.io/md-editor-v3).

### Custom Component Configuration

```js
import customComponentPlugin, {
  type MDVueComponentOptions
} from 'markdown-it-vue-component';
import 'markdown-it-vue-component/style.css';
import MyCard from './components/my-card.vue';
// Using md-editor-v3 configuration
config({
    ...otherConfigurations,
    markdownItPlugins(plugins, { editorId }) {
       return [
         ...plugins,
         // Component insertion plugin for markdown
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
