import{r as c,j as e,c as S,B as d,R as b}from"./index-_8eXcLz2.js";import{L as x}from"./index-6sPi9eMg.js";import{C as v}from"./index-B77ohxiv.js";import{S as f}from"./index-n3tSMIzx.js";const i=({spinning:t,active:a=!0,delay:n=0,tip:r,label:p,children:g,className:u,...m})=>{const l=t??a,[o,s]=c.useState(l&&n===0);return c.useEffect(()=>{if(!l){s(!1);return}if(!n){s(!0);return}const h=setTimeout(()=>s(!0),n);return()=>clearTimeout(h)},[l,n]),g?e.jsxs("div",{className:S("cinna-spin",u),"aria-busy":o,children:[e.jsx("div",{className:S("cinna-spin__content",o&&"cinna-spin__content--busy"),...o?{inert:""}:{},children:g}),o&&e.jsx("div",{className:"cinna-spin__overlay",children:e.jsx(x,{...m,label:r??p})})]}):e.jsx(x,{...m,active:o,className:u,label:r??p})};i.displayName="Spin";function j(){const[t,a]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(d,{onClick:()=>a(!t),children:t?"Stop loading":"Start loading"}),e.jsx(i,{spinning:t,delay:150,tip:"Preparing recipe",children:e.jsxs(v,{title:"Cloud cake",children:[e.jsx("p",{children:"Wrapped content remains visible while the loading layer blocks interaction."}),e.jsx(d,{variant:"cream",children:"Edit recipe"})]})})]})}const z=`import { Button, Card, Spin } from '@cinna-design/react';
import { useState } from 'react';
export default function WrappedSpinDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onClick={() => setLoading(!loading)}>
        {loading ? 'Stop loading' : 'Start loading'}
      </Button>
      <Spin spinning={loading} delay={150} tip="Preparing recipe">
        <Card title="Cloud cake">
          <p>Wrapped content remains visible while the loading layer blocks interaction.</p>
          <Button variant="cream">Edit recipe</Button>
        </Card>
      </Spin>
    </>
  );
}
`,B={examples:[{id:"enhanced-spin",zh:{title:"内容加载遮罩",description:"延迟显示加载状态，避免短请求闪烁；加载时阻止内容操作。",codeToggle:"查看完整示例代码"},en:{title:"Loading over content",description:"Delay the overlay to avoid flashing during short requests and block interaction while busy.",codeToggle:"View complete example"},code:z,render:()=>e.jsx(j,{})},{id:"basic-spin",zh:{title:"基础加载",description:"Spin 展示云朵加载状态，默认尺寸为 medium。",codeToggle:"查看基础加载代码"},en:{title:"Basic loading",description:"Spin renders the cloud loading state with medium size by default.",codeToggle:"View basic spin code"},code:`import { Spin } from '@cinna-design/react';

export default () => <Spin />;`,render:()=>e.jsx(i,{})},{id:"spin-sizes",zh:{title:"加载尺寸",description:"size 支持 small、medium 和 large。",codeToggle:"查看加载尺寸代码"},en:{title:"Sizes",description:"size supports small, medium, and large.",codeToggle:"View spin sizes code"},code:`import { Space, Spin } from '@cinna-design/react';

export default () => (
  <Space wrap align="center">
    <Spin size="small" />
    <Spin size="medium" />
    <Spin size="large" />
  </Space>
);`,render:()=>e.jsxs(f,{wrap:!0,align:"center",children:[e.jsx(i,{size:"small"}),e.jsx(i,{size:"medium"}),e.jsx(i,{size:"large"})]})},{id:"spin-label",zh:{title:"自定义文案",description:"label 可替换默认加载文案，也可以传入 ReactNode。",codeToggle:"查看自定义文案代码"},en:{title:"Custom label",description:"Use label to replace the default loading copy, including ReactNode content.",codeToggle:"View spin label code"},code:`import { Spin } from '@cinna-design/react';

export default () => <Spin label="Preparing preview" />;`,render:()=>e.jsx(i,{label:"Preparing preview"})},{id:"spin-hide-label",zh:{title:"隐藏文案",description:"label={null} 可只展示加载动画。",codeToggle:"查看隐藏文案代码"},en:{title:"Hide label",description:"Use label={null} to render only the loading animation.",codeToggle:"View spin hide label code"},code:`import { Spin } from '@cinna-design/react';

export default () => <Spin label={null} />;`,render:()=>e.jsx(i,{label:null})},{id:"spin-active",zh:{title:"控制显示",description:"active 为 false 时组件返回 null，可用于控制加载态是否出现。",codeToggle:"查看控制显示代码"},en:{title:"Controlled visibility",description:"When active is false, the component returns null and can be used to control visibility.",codeToggle:"View spin active code"},code:`import { Button, Space, Spin } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(true);

  return (
    <Space wrap direction="vertical" align="flex-start">
      <Button onClick={() => setActive((value) => !value)}>Toggle loading</Button>
      <Spin active={active} label="Syncing" />
    </Space>
  );
};`,render:()=>{const t=()=>{const[a,n]=b.useState(!0);return e.jsxs(f,{wrap:!0,direction:"vertical",align:"flex-start",children:[e.jsx(d,{onClick:()=>n(r=>!r),children:"Toggle loading"}),e.jsx(i,{active:a,label:"Syncing"})]})};return e.jsx(t,{})}}]};export{B as spinDoc};
