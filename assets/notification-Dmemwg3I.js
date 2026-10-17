import{R as N,r as a,j as e,c as v,B as r}from"./index-BKj7f8pq.js";import{s as j,b as k,r as T}from"./ComponentPage-CxK9ZWuC.js";import{u as R}from"./useNoticeQueue-CeCIAozZ.js";import{S as g}from"./index-Dv7KxCjI.js";const u=N.forwardRef(({title:o,content:c,type:t="info",icon:l,actions:s,closable:n,onClose:d,duration:f=0,className:y,...b},x)=>{const[p,m]=a.useState(!0),h=a.useRef(d);return h.current=d,a.useEffect(()=>{if(!f||!p)return;const w=setTimeout(()=>{m(!1),h.current?.()},f*1e3);return()=>clearTimeout(w)},[f,p]),p?e.jsxs("div",{ref:x,className:v("cinna-notification",`cinna-notification--${t}`,n&&"cinna-notification--closable",y),role:"status",...b,children:[e.jsxs("strong",{children:[l??j(t)," ",o]}),e.jsx("span",{children:c}),s&&e.jsx("div",{className:"cinna-notification__actions",children:s}),n&&e.jsx("button",{type:"button",className:"cinna-notification__close","aria-label":"Close notification",onClick:()=>{m(!1),d?.()},children:"x"})]}):null});u.displayName="Notification";function z(o={}){const c=k(),t=R(4.5),l=a.useMemo(()=>({open:t.open,destroy:t.destroy}),[t.open,t.destroy]),s=typeof document>"u"?null:T.createPortal(e.jsx("div",{className:"cinna-notification-stack cinna-notification-stack--"+(o.placement??"topRight"),style:{fontFamily:"var(--cinna-font-family)",...c},"aria-label":"Notifications",children:t.items.map(n=>a.createElement(u,{...n,key:n.key,duration:0,closable:!0,onClose:()=>t.destroy(n.key)}))}),document.body);return[l,s]}const i=Object.assign(u,{useNotification:z});function B(){const[o,c]=i.useNotification({placement:"bottomRight"});return e.jsxs(e.Fragment,{children:[c,e.jsx(r,{onClick:()=>o.open({key:"recipe",title:"Recipe published",content:"Cloud cake is ready to share.",type:"success",duration:0,actions:e.jsx(r,{size:"small",onClick:()=>o.destroy("recipe"),children:"Dismiss publication"})}),children:"Show notification"})]})}const C=`import { Button, Notification } from '@cinna-design/react';
export default function NotificationQueueDemo() {
  const [api, holder] = Notification.useNotification({ placement: 'bottomRight' });
  return (
    <>
      {holder}
      <Button
        onClick={() =>
          api.open({
            key: 'recipe',
            title: 'Recipe published',
            content: 'Cloud cake is ready to share.',
            type: 'success',
            duration: 0,
            actions: (
              <Button size="small" onClick={() => api.destroy('recipe')}>
                Dismiss publication
              </Button>
            ),
          })
        }
      >
        Show notification
      </Button>
    </>
  );
}
`,E={examples:[{id:"enhanced-notification",zh:{title:"带位置的通知",description:"通知通过 Portal 显示，并可包含可操作的按钮。",codeToggle:"查看完整示例代码"},en:{title:"Positioned notifications",description:"Notifications use a portal and can contain working actions.",codeToggle:"View complete example"},code:C,render:()=>e.jsx(B,{})},{id:"basic-notification",zh:{title:"基础通知",description:"title 展示通知标题，content 展示通知正文。",codeToggle:"查看基础通知代码"},en:{title:"Basic notification",description:"title renders the notification heading and content renders the body.",codeToggle:"View basic notification code"},code:`import { Notification } from '@cinna-design/react';

export default () => (
  <Notification title="Review ready" content="The tasting notes are ready for approval." />
);`,render:()=>e.jsx(i,{title:"Review ready",content:"The tasting notes are ready for approval."})},{id:"notification-types",zh:{title:"状态类型",description:"type 可表达成功、信息、警告和错误状态。",codeToggle:"查看状态类型代码"},en:{title:"Status types",description:"Use type to express success, info, warning, and error states.",codeToggle:"View notification status code"},code:`import { Notification, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Notification type="success" title="Published" content="The menu is live." />
    <Notification type="warning" title="Low stock" content="Check butter inventory before noon." />
    <Notification type="error" title="Sync failed" content="Retry after checking the network." />
  </Space>
);`,render:()=>e.jsxs(g,{direction:"vertical",align:"stretch",children:[e.jsx(i,{type:"success",title:"Published",content:"The menu is live."}),e.jsx(i,{type:"warning",title:"Low stock",content:"Check butter inventory before noon."}),e.jsx(i,{type:"error",title:"Sync failed",content:"Retry after checking the network."})]})},{id:"notification-icon",zh:{title:"自定义图标",description:"icon 可替换标题前的默认状态图标。",codeToggle:"查看自定义图标代码"},en:{title:"Custom icon",description:"Use icon to replace the default status icon before the title.",codeToggle:"View notification icon code"},code:`import { Notification } from '@cinna-design/react';

export default () => (
  <Notification icon="!" title="Manual review" content="One item needs a second pass." />
);`,render:()=>e.jsx(i,{icon:"!",title:"Manual review",content:"One item needs a second pass."})},{id:"notification-actions",zh:{title:"操作按钮",description:"actions 可放置通知下方的操作区。",codeToggle:"查看操作按钮代码"},en:{title:"Actions",description:"Use actions to render a command area inside the notification.",codeToggle:"View notification actions code"},code:`import { Button, Notification, Space } from '@cinna-design/react';

export default () => (
  <Notification
    title="Pending approval"
    content="Two recipes are waiting for review."
    actions={
      <Space size="small">
        <Button size="small">Later</Button>
        <Button size="small" variant="primary">Review</Button>
      </Space>
    }
  />
);`,render:()=>e.jsx(i,{title:"Pending approval",content:"Two recipes are waiting for review.",actions:e.jsxs(g,{size:"small",children:[e.jsx(r,{size:"small",children:"Later"}),e.jsx(r,{size:"small",variant:"primary",children:"Review"})]})})},{id:"notification-closable",zh:{title:"可关闭",description:"closable 显示关闭按钮，关闭后会卸载当前通知。",codeToggle:"查看可关闭代码"},en:{title:"Closable",description:"closable shows a close button and removes the current notification when clicked.",codeToggle:"View closable notification code"},code:`import { Notification } from '@cinna-design/react';

export default () => (
  <Notification
    closable
    title="Dismissible note"
    content="This notification can be closed."
    onClose={() => console.log('closed')}
  />
);`,render:()=>e.jsx(i,{closable:!0,title:"Dismissible note",content:"This notification can be closed.",onClose:()=>{}})}]};export{E as notificationDoc};
