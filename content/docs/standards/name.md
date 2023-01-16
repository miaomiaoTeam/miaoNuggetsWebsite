# 命名与使用规范

- 大驼峰式命名(PascalCase)
- 小驼峰式命名(camelCase)
- 短横线连接式命名(kebab-case)
- 下划线连接式命名(Snake)

## Vue组件

### 文件名(name)

- 命名：大驼峰式命名(PascalCase)，禁止只使用单个单词作为文件名，如`Main`，如果只表示单一功能的底层组件只有简单命名时，请以`M`开头命名，如`MMain`。但可参照[Nuxt3 components](https://nuxt.com/docs/guide/directory-structure/components#component-names)自动识别导入的方式利用文件夹进行语义化命名：

```base
| components/
--| base/
----| foo/
------| Button.vue
```

```vue
<BaseFooButton />
```

- 使用：Nuxt3具有组件自动导入功能，所以不需要显式引用组件，本项目中**禁止**显式引用。使用组件是请以大驼峰式(PascalCase)使用

### 接口与插槽(props and slots)

- 命名：短横线连接式命名(kebab-case)，语义化命名。

- 使用：jsx语法中请以小驼峰式(camelCase)使用，非jsx语法中请以短横线连接式(kebab-case)使用。
