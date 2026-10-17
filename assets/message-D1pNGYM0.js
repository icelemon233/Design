import{R as w,r as c,j as e,c as M,B as l}from"./index-BKj7f8pq.js";import{s as b,b as j,r as k}from"./ComponentPage-CxK9ZWuC.js";import{u as v}from"./useNoticeQueue-CeCIAozZ.js";import{S as p}from"./index-Dv7KxCjI.js";const g=w.forwardRef(({type:a="info",content:t,icon:i,closable:r,onClose:s,duration:o=0,className:f,...y},h)=>{const[d,u]=c.useState(!0),m=c.useRef(s);return m.current=s,c.useEffect(()=>{if(!o||!d)return;const x=setTimeout(()=>{u(!1),m.current?.()},o*1e3);return()=>clearTimeout(x)},[o,d]),d?e.jsxs("div",{ref:h,className:M("cinna-message",`cinna-message--${a}`,f),role:"status",...y,children:[i??b(a)," ",e.jsx("span",{children:t}),r&&e.jsx("button",{type:"button","aria-label":"Close message",onClick:()=>{u(!1),s?.()},children:"x"})]}):null});g.displayName="Message";function S(){const a=j(),t=v(3),i=c.useMemo(()=>({open:t.open,destroy:t.destroy,info:(s,o)=>t.open({type:"info",content:s,duration:o}),success:(s,o)=>t.open({type:"success",content:s,duration:o}),warning:(s,o)=>t.open({type:"warning",content:s,duration:o}),error:(s,o)=>t.open({type:"error",content:s,duration:o})}),[t.open,t.destroy]),r=typeof document>"u"?null:k.createPortal(e.jsx("div",{className:"cinna-message-stack",style:{fontFamily:"var(--cinna-font-family)",...a},"aria-label":"Messages",children:t.items.map(s=>c.createElement(g,{...s,key:s.key,duration:0,closable:!0,onClose:()=>t.destroy(s.key)}))}),document.body);return[i,r]}const n=Object.assign(g,{useMessage:S});function T(){const[a,t]=n.useMessage();return e.jsxs(e.Fragment,{children:[t,e.jsxs(p,{wrap:!0,children:[e.jsx(l,{onClick:()=>a.open({key:"recipe",type:"info",content:"Recipe is ready to save.",duration:0}),children:"Show message"}),e.jsx(l,{variant:"cream",onClick:()=>a.open({key:"recipe",type:"success",content:"Recipe saved.",duration:3}),children:"Update same message"}),e.jsx(l,{variant:"ghost",onClick:()=>a.destroy(),children:"Clear messages"})]})]})}const C=`import { Button, Message, Space } from '@cinna-design/react';
export default function MessageQueueDemo() {
  const [api, holder] = Message.useMessage();
  return (
    <>
      {holder}
      <Space wrap>
        <Button
          onClick={() =>
            api.open({
              key: 'recipe',
              type: 'info',
              content: 'Recipe is ready to save.',
              duration: 0,
            })
          }
        >
          Show message
        </Button>
        <Button
          variant="cream"
          onClick={() =>
            api.open({ key: 'recipe', type: 'success', content: 'Recipe saved.', duration: 3 })
          }
        >
          Update same message
        </Button>
        <Button variant="ghost" onClick={() => api.destroy()}>
          Clear messages
        </Button>
      </Space>
    </>
  );
}
`,D={examples:[{id:"enhanced-message",zh:{title:"全局提示队列",description:"使用 Hook 打开、更新同一个 key 的提示，或清空队列。",codeToggle:"查看完整示例代码"},en:{title:"Message queue",description:"Open, update a keyed message, or clear the queue with the hook API.",codeToggle:"View complete example"},code:C,render:()=>e.jsx(T,{})},{id:"basic-message",zh:{title:"基础提示",description:"content 是提示内容，默认使用 info 状态。",codeToggle:"查看基础提示代码"},en:{title:"Basic message",description:"content is the message body, with info status by default.",codeToggle:"View basic message code"},code:`import { Message } from '@cinna-design/react';

export default () => <Message content="Saved successfully." />;`,render:()=>e.jsx(n,{content:"Saved successfully."})},{id:"message-types",zh:{title:"状态类型",description:"type 支持 info、success、warning 和 error 四种反馈状态。",codeToggle:"查看状态类型代码"},en:{title:"Status types",description:"type supports info, success, warning, and error feedback states.",codeToggle:"View message status code"},code:`import { Message, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Message type="success" content="Published." />
    <Message type="info" content="Draft restored." />
    <Message type="warning" content="Review recommended." />
    <Message type="error" content="Sync failed." />
  </Space>
);`,render:()=>e.jsxs(p,{direction:"vertical",align:"flex-start",children:[e.jsx(n,{type:"success",content:"Published."}),e.jsx(n,{type:"info",content:"Draft restored."}),e.jsx(n,{type:"warning",content:"Review recommended."}),e.jsx(n,{type:"error",content:"Sync failed."})]})},{id:"message-custom-icon",zh:{title:"自定义图标",description:"icon 可替换默认状态图标。",codeToggle:"查看自定义图标代码"},en:{title:"Custom icon",description:"Use icon to replace the default status icon.",codeToggle:"View custom message icon code"},code:`import { Message } from '@cinna-design/react';

export default () => <Message icon="i" content="Custom icon content." />;`,render:()=>e.jsx(n,{icon:"i",content:"Custom icon content."})},{id:"message-closable",zh:{title:"可关闭",description:"closable 显示关闭按钮，点击后会卸载当前提示。",codeToggle:"查看可关闭代码"},en:{title:"Closable",description:"closable shows a close button and removes the current message when clicked.",codeToggle:"View closable message code"},code:`import { Message } from '@cinna-design/react';

export default () => (
  <Message closable content="This message can be dismissed." onClose={() => console.log('closed')} />
);`,render:()=>e.jsx(n,{closable:!0,content:"This message can be dismissed.",onClose:()=>{}})},{id:"message-inline-stack",zh:{title:"组合排列",description:"Message 是普通 React 组件，可以和布局组件一起组成局部提示区。",codeToggle:"查看组合排列代码"},en:{title:"Stacked messages",description:"Message is a normal React component and can be composed with layout components.",codeToggle:"View stacked message code"},code:`import { Message, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Message type="success" content="Assets uploaded." />
    <Message type="warning" content="Two files need review." />
  </Space>
);`,render:()=>e.jsxs(p,{direction:"vertical",align:"flex-start",children:[e.jsx(n,{type:"success",content:"Assets uploaded."}),e.jsx(n,{type:"warning",content:"Two files need review."})]})}]};export{D as messageDoc};
