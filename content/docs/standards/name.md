# 命名与使用规范

- 大驼峰式命名(PascalCase)
- 小驼峰式命名(camelCase)
- 短横线连接式命名(kebab-case)
- 下划线连接式命名(Snake)

***尽可能语义化命名，如果不方便语义化命名的话请使用jsdoc记录相关描述***

***同一分类下要谨记防止命名冲突***

## Vue组件(components)

### 文件名(name)

- 命名：大驼峰式命名(PascalCase)，禁止只使用单个单词作为文件名，如`Main`。
  - 如果只表示单一功能的底层组件只有简单命名时，请以`M`开头命名，如`MMain`。
  - 或者可参照[Nuxt3 components](https://nuxt.com/docs/guide/directory-structure/components#component-names)自动识别导入的方式利用文件夹进行语义化命名：

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

### 接口(props)、事件(emits)、属性(attrs)、与插槽(slots)

- 命名：
  - 事件(emits)请以小驼峰式命名(camelCase)，语义化命名。
  - 其他三项短横线连接式命名(kebab-case)，语义化命名。

- 使用：
  - jsx语法中请以小驼峰式(camelCase)使用。
  - 非jsx语法中请以短横线连接式(kebab-case)使用。
  - 组件属性(attrs)请按vue指令、原生属性、接口(props)、事件(emits)的顺序书写

## Vue页面(pages)

- 命名：短横线连接式命名(kebab-case)，语义化命名。
  - 如果是简单单一功能页面，请直接对vue文件命名
  - 如果是可扩展的或者目录页面，请对文件夹命名并在文件夹下级放置`index.vue`文件作为页面。

- 使用：路由跳转时使用路径时，除了一级页面，禁止使用`name`进行跳转，以便IDE追踪路径。

## Vue Hooks(composables)

- 命名：短横线连接式命名(kebab-case)，语义化命名。模块内禁止默认导出。
  - `export const`导出的变量名以`use`开头，后接大驼峰式命名(PascalCase)。

- 使用：禁止显式导入。

## 工具函数(utils)

- 命名：小驼峰式命名(camelCase)，语义化命名。模块内禁止默认导出。
  - `export const`导出的变量名以小驼峰式命名(camelCase)。

- 使用：禁止显式导入。

## API接口(server/api)

- 命名：小驼峰式命名(camelCase)，后接短横线(`-`)和请求类型，语义化命名。

## JS

非导出的变量和函数，一定在作用域内规范命名，防止语义混淆

### 变量名

- 命名：下划线连接式命名(Snake)，语义化命名。功能或结构专用的变量以功能或结构为开头，后接具体描述。例：

  | 变量名 | 变量说明 |
  | :--: | :--- |
  | form-ref | 表单引用 |
  | form-rules | 表单校验规则 |
  | form-data | 表单数据 |

  | 变量名 | 变量说明 |
  | :--: | :--- |
  | user-form-ref | 用户表单引用 |
  | comment-form-ref | 评论表单引用 |

### 函数名

- 命名：小驼峰式命名(camelCase)，语义化命名。
  - 操作类函数以操作类型为开头，后接具体描述。
  - 检测类函数以`check`开头，后接具体描述，并对返回值进行断言(`asserts`)。
  - 判断类函数以`is`开头，后接具体描述，并对返回值进行判断(`is`)。

- 使用：模块内顶层非导出函数请使用function命名函数，并写在文件底部。其他函数请根据需要使用箭头函数function匿名函数。

### TS接口(interface)或别名(type)类型

- 命名：大驼峰式命名(PascalCase)，语义化命名。必要时使用类型空间隔离作用域。

### TS工具类型

- 命名：多个单词组成时请用小驼峰式命名(camelCase)，单个单词组成时请将首字母大写，语义化命名。必要时使用类型空间隔离作用域。

## CSS

- 使用原子类进行样式的修改，参考[TailWindCss](https://www.tailwindcss.cn/docs)。
- 页面内需要在`<style>`块上使用[`scope`](https://cn.vuejs.org/api/sfc-css-features.html#scoped-css)限制作用域。
- 功能性组件内有需求可以自行设置css class命名，此时参考使用[BEM规范](https://bemcss.com)。
- 全局修改组件库样式时请在`assets/css/main.css`内的`components`层下修改。

### HTML

- 使用：
  - 原生标签请使用纯小写字母，除了特殊标签，禁止使用自闭合标签。
  - Vue组件请使用大驼峰式(PascalCase)，如果组件没有插槽，请使用自闭合标签。
