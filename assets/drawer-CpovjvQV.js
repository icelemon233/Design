import{j as e,R as n,B as s}from"./index-BKj7f8pq.js";import{D as a}from"./ComponentPage-CxK9ZWuC.js";import{S as p}from"./index-Dv7KxCjI.js";const h={examples:[{id:"basic-drawer",zh:{title:"基础抽屉",description:"open 控制显隐，onClose 用于关闭抽屉。",codeToggle:"查看基础抽屉代码"},en:{title:"Basic drawer",description:"open controls visibility and onClose closes the drawer.",codeToggle:"View basic drawer code"},code:`import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} title="Recipe detail" onClose={() => setOpen(false)}>
        Drawer content stays in the current workflow.
      </Drawer>
    </>
  );
};`,render:()=>{const r=()=>{const[o,t]=n.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{onClick:()=>t(!0),children:"Open drawer"}),e.jsx(a,{open:o,title:"Recipe detail",onClose:()=>t(!1),children:"Drawer content stays in the current workflow."})]})};return e.jsx(r,{})}},{id:"drawer-placement",zh:{title:"抽屉方向",description:"placement 支持 left、right、top 和 bottom。",codeToggle:"查看抽屉方向代码"},en:{title:"Placement",description:"placement supports left, right, top, and bottom.",codeToggle:"View drawer placement code"},code:`import { Button, Drawer, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');

  return (
    <>
      <Space wrap>
        {['left', 'right', 'top', 'bottom'].map((item) => (
          <Button key={item} onClick={() => { setPlacement(item); setOpen(true); }}>
            {item}
          </Button>
        ))}
      </Space>
      <Drawer open={open} placement={placement} title="Placement" onClose={() => setOpen(false)}>
        Current placement: {placement}
      </Drawer>
    </>
  );
};`,render:()=>{const r=()=>{const[o,t]=n.useState(!1),[l,c]=n.useState("right"),d=["left","right","top","bottom"];return e.jsxs(e.Fragment,{children:[e.jsx(p,{wrap:!0,children:d.map(i=>e.jsx(s,{onClick:()=>{c(i),t(!0)},children:i},i))}),e.jsxs(a,{open:o,placement:l,title:"Placement",onClose:()=>t(!1),children:["Current placement: ",l]})]})};return e.jsx(r,{})}},{id:"drawer-extra",zh:{title:"额外操作",description:"extra 可在标题栏右侧放置按钮或其他操作。",codeToggle:"查看额外操作代码"},en:{title:"Extra actions",description:"Use extra to place buttons or other commands on the right side of the header.",codeToggle:"View drawer extra code"},code:`import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open actions</Button>
      <Drawer
        open={open}
        title="Batch actions"
        extra={<Button size="small" variant="primary">Save</Button>}
        onClose={() => setOpen(false)}
      >
        Extra actions sit beside the close control.
      </Drawer>
    </>
  );
};`,render:()=>{const r=()=>{const[o,t]=n.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{onClick:()=>t(!0),children:"Open actions"}),e.jsx(a,{open:o,title:"Batch actions",extra:e.jsx(s,{size:"small",variant:"primary",children:"Save"}),onClose:()=>t(!1),children:"Extra actions sit beside the close control."})]})};return e.jsx(r,{})}},{id:"drawer-size",zh:{title:"宽度与高度",description:"width 用于左右抽屉，height 用于上下抽屉。",codeToggle:"查看宽度与高度代码"},en:{title:"Width and height",description:"Use width for left or right drawers and height for top or bottom drawers.",codeToggle:"View drawer size code"},code:`import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open wide drawer</Button>
      <Drawer open={open} title="Wide drawer" width={420} onClose={() => setOpen(false)}>
        Set width for side drawers.
      </Drawer>
    </>
  );
};`,render:()=>{const r=()=>{const[o,t]=n.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{onClick:()=>t(!0),children:"Open wide drawer"}),e.jsx(a,{open:o,title:"Wide drawer",width:420,onClose:()=>t(!1),children:"Set width for side drawers."})]})};return e.jsx(r,{})}},{id:"drawer-mask",zh:{title:"遮罩关闭",description:"maskClosable={false} 可阻止点击遮罩关闭抽屉。",codeToggle:"查看遮罩关闭代码"},en:{title:"Mask closing",description:"Use maskClosable={false} to prevent closing the drawer by clicking the mask.",codeToggle:"View drawer mask code"},code:`import { Button, Drawer } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open locked drawer</Button>
      <Drawer
        open={open}
        title="Locked drawer"
        maskClosable={false}
        onClose={() => setOpen(false)}
      >
        The mask will not close this drawer.
      </Drawer>
    </>
  );
};`,render:()=>{const r=()=>{const[o,t]=n.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(s,{onClick:()=>t(!0),children:"Open locked drawer"}),e.jsx(a,{open:o,title:"Locked drawer",maskClosable:!1,onClose:()=>t(!1),children:"The mask will not close this drawer."})]})};return e.jsx(r,{})}}]};export{h as drawerDoc};
