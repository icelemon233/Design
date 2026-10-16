<p align="center"><img src="./apps/site/src/assets/cinna-cloud-cat.webp" alt="Cinna Design" width="150"></p>

<h1 align="center">Cinna Design</h1>

<p align="center"><a href="./README.md">English</a> · 简体中文</p>

React 组件库，采用浅色配色、圆角和云朵小猫形象。

[组件演示](https://icelemon233.github.io/cinna-design/) · [MIT 许可证](./LICENSE)

包含按钮、卡片、输入框、加载动效，以及表单、导航和数据展示组件。支持 React 18 及更新版本，部分控件仍为实验版本。

## 示例

工作区包名为 `@cinna-design/react`，组件可以这样组合：

```tsx
import '@cinna-design/react/style.css';
import { Button, Card } from '@cinna-design/react';

export function Example() {
  return (
    <Card title="Notes">
      <Button>Save</Button>
    </Card>
  );
}
```

## 本地查看

准备 Node.js 和仓库声明的 pnpm 版本后运行：

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

打开服务输出的本地地址。也可以直接访问在线演示，无需本地配置。

## 致谢

视觉灵感来自 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui/tree/main)。
