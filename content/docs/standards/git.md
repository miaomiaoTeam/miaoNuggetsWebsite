# git提交规范

## 提交结构

```base
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

## 提交规范

截取自[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

本文中的关键词 `必须（MUST）`、`禁止（MUST NOT）`、`必要（REQUIRED）`、`应当（SHALL）`、`不应当（SHALL NOT）`、`应该（SHOULD）`、`不应该（SHOULD NOT）`、`推荐（RECOMMENDED）`、`可以（MAY）` 和 `可选（OPTIONAL）` ，其相关解释参考[RFC 2119](https://www.ietf.org/rfc/rfc2119.txt)。

- 每个提交都必须使用类型字段前缀，它由一个名词构成，诸如`feat`或`fix`， 其后接可选的范围字段，可选的 !，以及必要的冒号（英文半角）和空格。
- 当一个提交为应用或类库实现了新功能时，必须使用`feat`类型。
- 当一个提交为应用修复了bug时，必须使用`fix`类型。
- 范围字段可以跟随在类型字段后面。范围必须是一个描述某部分代码的名词，并用圆括号包围，例如：`fix(parser):`
- 描述字段必须直接跟在`<类型>(范围)`前缀的冒号和空格之后。 描述指的是对代码变更的简短总结，例如：`fix: array parsing issue when multiple spaces were contained in string`。
- 在简短描述之后，可以编写较长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。
- 提交的正文内容自由编写，并可以使用空行分隔不同段落。
- 在正文结束的一个空行之后，可以编写一行或多行脚注。每行脚注都必须包含一个令牌（token），后面紧跟`:<space>`或`<space>#`作为分隔符，后面再紧跟令牌的值（受[git trailer convention](https://git-scm.com/docs/git-interpret-trailers)启发）。
- 脚注的令牌必须使用`-`作为连字符，比如`Acked-by`(这样有助于 区分脚注和多行正文)。有一种例外情况就是 `BREAKING CHANGE`，它可以被认为是一个令牌。
- 脚注的值可以包含空格和换行，值的解析过程必须直到下一个脚注的令牌/分隔符出现为止。
- 破坏性变更必须在提交信息中标记出来，要么在`<类型>(范围)`前缀中标记，要么作为脚注的一项。
- 包含在脚注中时，破坏性变更必须包含大写的文本`BREAKING CHANGE`，后面紧跟着冒号、空格，然后是描述，例如：`BREAKING CHANGE: environment variables now take precedence over config files`。
- 包含在 <类型>(范围) 前缀时，破坏性变更必须通过把`!`直接放在`:`前面标记出来。如果使用了`!`，那么脚注中可以不写`BREAKING CHANGE:`， 同时提交信息的描述中应该用来描述破坏性变更。
- 在提交说明中，可以使用`feat`和`fix`之外的类型，比如`docs: updated ref docs.`。
- 工具的实现必须不区分大小写地解析构成约定式提交的信息单元，只有`BREAKING CHANGE`必须是大写的。
- `BREAKING-CHANGE`作为脚注的令牌时必须是`BREAKING CHANGE`的同义词。

## 提交类型

| 类型 | emji | 描述 |
| :--: | :--: | :--: |
| feat | ✨ | 引入新功能 |
| fix | 🐛 | 修复 bug |
| style | 💄 | 更新 UI 样式文按键 |
| format | 🥚 | 格式化代码 |
| docs | 📝 | 添加/更新文档 |
| perf | 👌 | 提高性能/优化 |
| init | 🎉 | 初次提交/初始化项目 |
| test | ✅ | 增加测试代码 |
| refactor | 🎨 | 改进代码结构/代码格式 |
| patch | 🚑 | 添加重要补丁 |
| file | 📦 | 添加新文件 |
| publish | 🚀 | 发布新版本 |
| tag | 📌 | 发布新版本 |
| config | 🔧 | 修改配置文件 |
| git | 🙈 | 添加或修改.gitignore 文件 |

## 分支结构

```base
<类型>-<功能>-<人员>-<来源>

例：feat-comment_api-miao-develop
例：bugfix-comment_api-miao-release_v0.2.0
特殊：release-v0.2.0
```

## 分支规范

- main\[唯一\]\[tag\]：主分支，用于版本持续发布，必须是随时可使用的
- docs\[唯一\]：文档分支，用于展示项目文档
- develop\[唯一\]：开发分支，即日常迭代使用的开发分支，用于日常开发持续集成
- feature：特性分支，用于日常开发时切出分支进行单功能开发
- bugfix：故障修补分支，通常用于修复故障
- release\[tag\]：发布分支，即发布次版本时使用的分支，用于大版本发布
- hotfix：热修补分支，用于产品发布后修复缺陷

## 检出分支

![分支发布图示](/png/git-branches.png)

### 组员操作

- 修复故障时，基于`develop`分支创建`bugfix`故障修补分支，提交代码并测试完成后后，合并至`develop`分支并删除`bugfix`分支。
- 日常开发时，基于`develop`分支创建`feature`特性分支，提交代码并测试完成后后，合并至`develop`分支并删除`feature`分支。

### 管理员操作

- 发布次版本时，基于`develop`分支创建`release`发布分支，提交代码并测试完成后后，合并至`main`分支并删除`release`分支，次版本号加1。

### 管理授权操作

- 发布版本前发现bug时，基于`release`分支创建`bugfix`热修补分支，提交代码并测试完成后后，合并至`release`分支与`develop`分支并删除`bugfix`分支。
- 发布版本后发现bug时，基于`main`分支创建`hotfix`热修补分支，提交代码并测试完成后后，合并至`main`分支与`develop`分支并删除`hotfix`分支，修订号加1。
