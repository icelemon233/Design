# Cinna Design

[English](./README.md) | 简体中文

<img src="./apps/site/src/assets/cinna-cloud-cat.webp" alt="Cinna Design 云朵小猫" width="180" />

云朵甜点风格的 React UI 组件库，以柔和配色、圆润界面和云朵小猫，为应用增添轻松的视觉气质。

[浏览组件演示](https://icelemon233.github.io/cinna-design/)

## 提供什么

- 按钮、卡片、带标签的输入框，以及云朵小猫加载动效。
- 布局、导航、表单、数据展示和反馈组件。
- 共用配色与主题设置，保持界面风格一致。

适用于 React 18 及更新版本。除核心组件外，还包含一批实验性控件；使用前可在演示中确认所需交互。

## 本地体验

准备 Node.js 和仓库声明的 pnpm 版本，克隆仓库后运行：

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

打开预览服务输出的本地地址。

## 组件示例

组件通过本仓库的工作区包 `@cinna-design/react` 提供。下面是一个最小用法：

```tsx
import '@cinna-design/react/style.css';
import { Button, Card } from '@cinna-design/react';

export function Example() {
  return (
    <Card title="My project">
      <Button>Save</Button>
    </Card>
  );
}
```

## 致谢

视觉灵感来自 [animal-island-ui](https://github.com/guokaigdg/animal-island-ui/tree/main)。

## 许可证

[MIT](./LICENSE)。
