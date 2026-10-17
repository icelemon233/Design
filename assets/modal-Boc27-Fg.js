import{r as v,j as e,R as a,B as l,c as j}from"./index-_8eXcLz2.js";import{T as y,a as z}from"./ComponentPage-BGTThW6u.js";import{S as I}from"./index--75eZf6r.js";import{F as V,a as q}from"./index-CQh5rYWF.js";import{S as K}from"./index-n3tSMIzx.js";import"./FloatingPanel-CnLNE9BF.js";import"./useIsomorphicLayoutEffect-Clyg1nNa.js";import"./useControllable-BAjGFdKN.js";import"./useOutside-B5Pjeknc.js";const w=({children:o,className:n,style:t,theme:r})=>{const c={...v.useContext(y),...r?.primary?{"--cinna-color-primary":r.primary}:null,...r?.background?{"--cinna-color-bg":r.background}:null,...r?.surface?{"--cinna-color-surface":r.surface}:null,...r?.text?{"--cinna-color-text":r.text}:null,...r?.radius?{"--cinna-radius-md":r.radius}:null,...Object.fromEntries(Object.entries(t??{}).filter(([d])=>d.startsWith("--")||["color","fontFamily","fontSize","fontWeight","lineHeight","direction"].includes(d)))};return e.jsx(y.Provider,{value:c,children:e.jsx("div",{"data-cinna-theme":"cloud",className:n,style:{...c,...t},children:o})})};w.displayName="ConfigProvider";const s=a.forwardRef(({open:o,title:n,onCancel:t,onOk:r,onOkError:g,confirmLoading:c,keyboard:d=!0,closable:S=!0,footer:p,okText:B="OK",cancelText:T="Cancel",maskClosable:M=!0,width:F,centered:R=!0,className:P,children:D,style:E,...N},W)=>{const x=a.useId(),[C,u]=a.useState(!1),[O,m]=a.useState(""),i=a.useRef(0),k=a.useRef(o);k.current=o,a.useEffect(()=>()=>{i.current++},[]);const f=()=>{i.current++,u(!1),m(""),t?.()};a.useEffect(()=>{o||(i.current++,m(""),u(!1))},[o]);const _=async()=>{if(C||c)return;const b=++i.current;m(""),u(!0);try{await r?.()}catch(h){b===i.current&&k.current&&(m(h instanceof Error?h.message:"Unable to confirm. Try again."),g?.(h))}finally{b===i.current&&u(!1)}};return e.jsxs(z,{open:o,ref:W,maskClassName:j("cinna-overlay",R&&"cinna-overlay--centered"),maskClosable:M,keyboard:d,onDismiss:f,className:j("cinna-modal",P),"aria-labelledby":n?x:void 0,"aria-label":n?void 0:"Dialog",style:{width:F,...E},...N,children:[e.jsxs("div",{className:"cinna-modal__header",children:[e.jsx("strong",{id:x,children:n}),S&&e.jsx("button",{type:"button","aria-label":"Close modal",onClick:f,children:"×"})]}),e.jsx("div",{className:"cinna-modal__body",children:D}),O&&e.jsx("p",{role:"alert",className:"cinna-modal__error",children:O}),p!==null&&e.jsx("div",{className:"cinna-modal__footer",children:p!==void 0?p:e.jsxs(e.Fragment,{children:[e.jsx(l,{variant:"cream",onClick:f,children:T}),e.jsx(l,{onClick:_,loading:C||c,children:B})]})})]})});s.displayName="Modal";function U(){const[o,n]=v.useState(!1);return e.jsxs(w,{theme:{primary:"#9bdce8"},children:[e.jsx(l,{onClick:()=>n(!0),children:"Open recipe editor"}),e.jsx(s,{open:o,title:"Edit recipe",footer:null,onCancel:()=>n(!1),children:e.jsxs(V,{onFinish:()=>n(!1),children:[e.jsx(q,{name:"category",label:"Category",rules:[{required:!0,message:"Choose a category."}],children:e.jsx(I,{showSearch:!0,placeholder:"Choose a category",options:[{value:"cake",label:"Cake"},{value:"tart",label:"Tart"}]})}),e.jsx(l,{htmlType:"submit",children:"Save category"})]})})]})}const H=`import { Button, ConfigProvider, Form, FormItem, Modal, Select } from '@cinna-design/react';
import { useState } from 'react';

export default function ModalFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <ConfigProvider theme={{ primary: '#9bdce8' }}>
      <Button onClick={() => setOpen(true)}>Open recipe editor</Button>
      <Modal open={open} title="Edit recipe" footer={null} onCancel={() => setOpen(false)}>
        <Form onFinish={() => setOpen(false)}>
          <FormItem
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Choose a category.' }]}
          >
            <Select
              showSearch
              placeholder="Choose a category"
              options={[
                { value: 'cake', label: 'Cake' },
                { value: 'tart', label: 'Tart' },
              ]}
            />
          </FormItem>
          <Button htmlType="submit">Save category</Button>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
`,ee={examples:[{id:"enhanced-modal",zh:{title:"弹窗内的表单和下拉框",description:"校验失败时聚焦字段；Escape 优先关闭内层下拉框。局部主题也会传入弹窗。",codeToggle:"查看完整示例代码"},en:{title:"Forms and selects inside a modal",description:"Focus invalid fields and dismiss the inner select before the modal with Escape. Scoped themes carry into the portal.",codeToggle:"View complete example"},code:H,render:()=>e.jsx(U,{})},{id:"basic-modal",zh:{title:"基础对话框",description:"open 控制显隐，onCancel 与 onOk 用于关闭或提交。",codeToggle:"查看基础对话框代码"},en:{title:"Basic modal",description:"open controls visibility, while onCancel and onOk handle closing or submitting.",codeToggle:"View basic modal code"},code:`import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Recipe review"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Review the latest recipe changes before publishing.
      </Modal>
    </>
  );
};`,render:()=>{const o=()=>{const[n,t]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>t(!0),children:"Open modal"}),e.jsx(s,{open:n,title:"Recipe review",onCancel:()=>t(!1),onOk:()=>t(!1),children:"Review the latest recipe changes before publishing."})]})};return e.jsx(o,{})}},{id:"modal-button-text",zh:{title:"按钮文案",description:"okText 与 cancelText 可替换默认底部按钮文案。",codeToggle:"查看按钮文案代码"},en:{title:"Button text",description:"Use okText and cancelText to replace the default footer button copy.",codeToggle:"View modal button text code"},code:`import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Publish menu</Button>
      <Modal
        open={open}
        title="Publish menu?"
        okText="Publish"
        cancelText="Keep editing"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Customers will see the new seasonal menu immediately.
      </Modal>
    </>
  );
};`,render:()=>{const o=()=>{const[n,t]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>t(!0),children:"Publish menu"}),e.jsx(s,{open:n,title:"Publish menu?",okText:"Publish",cancelText:"Keep editing",onCancel:()=>t(!1),onOk:()=>t(!1),children:"Customers will see the new seasonal menu immediately."})]})};return e.jsx(o,{})}},{id:"modal-custom-footer",zh:{title:"自定义页脚",description:"footer 可完全替换默认操作区。",codeToggle:"查看自定义页脚代码"},en:{title:"Custom footer",description:"footer can fully replace the default action area.",codeToggle:"View modal footer code"},code:`import { Button, Modal, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open footer</Button>
      <Modal
        open={open}
        title="Custom footer"
        onCancel={() => setOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save draft</Button>
          </Space>
        }
      >
        Replace the default footer with any ReactNode.
      </Modal>
    </>
  );
};`,render:()=>{const o=()=>{const[n,t]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>t(!0),children:"Open footer"}),e.jsx(s,{open:n,title:"Custom footer",onCancel:()=>t(!1),footer:e.jsxs(K,{children:[e.jsx(l,{onClick:()=>t(!1),children:"Close"}),e.jsx(l,{variant:"primary",onClick:()=>t(!1),children:"Save draft"})]}),children:"Replace the default footer with any ReactNode."})]})};return e.jsx(o,{})}},{id:"modal-mask",zh:{title:"遮罩关闭",description:"maskClosable={false} 可阻止点击遮罩关闭对话框。",codeToggle:"查看遮罩关闭代码"},en:{title:"Mask closing",description:"Use maskClosable={false} to prevent closing the modal by clicking the mask.",codeToggle:"View modal mask code"},code:`import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open locked modal</Button>
      <Modal
        open={open}
        title="Confirm carefully"
        maskClosable={false}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        The mask will not close this dialog.
      </Modal>
    </>
  );
};`,render:()=>{const o=()=>{const[n,t]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>t(!0),children:"Open locked modal"}),e.jsx(s,{open:n,title:"Confirm carefully",maskClosable:!1,onCancel:()=>t(!1),onOk:()=>t(!1),children:"The mask will not close this dialog."})]})};return e.jsx(o,{})}},{id:"modal-width-centered",zh:{title:"宽度与位置",description:"width 设置对话框宽度，centered 控制是否居中展示。",codeToggle:"查看宽度与位置代码"},en:{title:"Width and position",description:"width sets the dialog width and centered controls centered display.",codeToggle:"View modal width code"},code:`import { Button, Modal } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open wide modal</Button>
      <Modal
        open={open}
        title="Wide review"
        width={680}
        centered
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Wider dialogs are useful for denser review content.
      </Modal>
    </>
  );
};`,render:()=>{const o=()=>{const[n,t]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>t(!0),children:"Open wide modal"}),e.jsx(s,{open:n,title:"Wide review",width:680,centered:!0,onCancel:()=>t(!1),onOk:()=>t(!1),children:"Wider dialogs are useful for denser review content."})]})};return e.jsx(o,{})}}]};export{ee as modalDoc};
