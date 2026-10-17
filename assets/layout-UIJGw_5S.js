import{R as r,j as e,c as g,r as O,I as b}from"./index-BKj7f8pq.js";import{M as K}from"./index-Cyl1ZsOC.js";import"./useIsomorphicLayoutEffect-DYwKHNn_.js";import"./ComponentPage-CxK9ZWuC.js";const u=t=>typeof t=="number"?`${t}px`:t,n=r.forwardRef(({hasSider:t,className:o,...a},i)=>e.jsx("div",{ref:i,className:g("cinna-layout",t&&"cinna-layout--has-sider",o),...a}));n.displayName="Layout";const p=r.forwardRef(({sticky:t,offsetTop:o=0,height:a,className:i,style:s,...y},c)=>e.jsx("header",{ref:c,className:g("cinna-layout__header",t&&"cinna-layout__header--sticky",i),style:{...t?{"--cinna-layout-header-top":u(o)}:null,...a!==void 0?{"--cinna-layout-header-height":u(a)}:null,...s},...y}));p.displayName="LayoutHeader";const m=r.forwardRef(({width:t=200,collapsedWidth:o=72,collapsed:a,defaultCollapsed:i=!1,collapsible:s,trigger:y,menu:c,menuProps:C,sticky:L,offsetTop:T=0,placement:D="left",expandOnHover:w,onCollapse:F,className:R,style:W,children:_,onMouseEnter:A,onMouseLeave:P,...I},z)=>{const[N,M]=O.useState(i),d=a??N,v=h=>{a===void 0&&M(h),F?.(h)};return e.jsxs("aside",{ref:z,className:g("cinna-layout__sider",`cinna-layout__sider--${D}`,L&&"cinna-layout__sider--sticky",s&&"cinna-layout__sider--collapsible",d&&"cinna-layout__sider--collapsed",c&&"cinna-layout__sider--with-menu",R),style:{"--cinna-layout-sider-width":u(t),"--cinna-layout-sider-collapsed-width":u(o),...L?{"--cinna-layout-sider-top":u(T)}:null,...W},"aria-expanded":s?!d:void 0,onMouseEnter:h=>{A?.(h),w&&s&&d&&v(!1)},onMouseLeave:h=>{P?.(h),w&&s&&!d&&v(!0)},...I,children:[e.jsx("div",{className:"cinna-layout__sider-content",children:c?e.jsx(K,{mode:"inline",...C,items:c,inlineCollapsed:d}):_}),s&&y!==null&&e.jsx("button",{type:"button",className:"cinna-layout__sider-trigger","aria-label":d?"Expand sider":"Collapse sider",onClick:()=>v(!d),children:y??(d?e.jsx(b,{name:"chevron-right",size:12}):e.jsx(b,{name:"chevron-left",size:12}))})]})});m.displayName="LayoutSider";const l=r.forwardRef(({className:t,...o},a)=>e.jsx("main",{ref:a,className:g("cinna-layout__content",t),...o}));l.displayName="LayoutContent";const x=r.forwardRef(({sticky:t,offsetBottom:o=0,height:a,className:i,style:s,...y},c)=>e.jsx("footer",{ref:c,className:g("cinna-layout__footer",t&&"cinna-layout__footer--sticky",i),style:{...t?{"--cinna-layout-footer-bottom":u(o)}:null,...a!==void 0?{"--cinna-layout-footer-height":u(a)}:null,...s},...y})),B={display:"grid",gap:10,minHeight:"100%",alignContent:"start"},V={display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"},G={color:"var(--cinna-color-text)",fontSize:18,fontWeight:900},E={padding:"4px 10px",borderRadius:999,background:"rgba(168, 223, 241, 0.34)",color:"var(--cinna-color-primary-deep)",fontSize:12,fontWeight:900},q={margin:0,color:"var(--cinna-color-text-secondary)",fontWeight:800,lineHeight:1.55},Q={display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(118px, 1fr))",gap:8},U={minHeight:48,padding:"10px 12px",borderRadius:14,background:"rgba(255, 252, 246, 0.92)",color:"var(--cinna-color-text-secondary)",fontWeight:850},f=t=>e.jsxs("div",{style:B,children:[e.jsxs("div",{style:V,children:[e.jsx("strong",{style:G,children:t.title}),e.jsx("span",{style:E,children:t.tag})]}),e.jsx("p",{style:q,children:t.description}),e.jsx("div",{style:Q,children:t.items.map(o=>e.jsx("span",{style:U,children:o},o))})]}),k={overview:{title:"Overview",description:"A calm landing page for release status, ownership, and the next action.",tag:"3 updates",items:["Health 98%","Next review","2 blockers"]},tasks:{title:"Tasks",description:"Task queues stay in the content area while the sider keeps navigation persistent.",tag:"12 open",items:["Design pass","API check","QA notes"]},settings:{title:"Settings",description:"Configuration pages can reuse the same shell without leaving the current layout.",tag:"Saved",items:["Access","Theme","Billing"]}},$=[{key:"overview",icon:"O",label:"Overview"},{key:"tasks",icon:"T",label:"Tasks"},{key:"settings",icon:"S",label:"Settings"}],S={home:{title:"Home",description:"Global overview with product shortcuts and recent activity.",tag:"Live",items:["Today","Pinned","Activity"]},docs:{title:"Docs",description:"Documentation pages keep the global header while the inner sider controls sections.",tag:"24 pages",items:["Components","Patterns","Tokens"]},team:{title:"Team",description:"Team workspace with member status and shared review queues.",tag:"8 people",items:["Owners","Reviewers","Guests"]}},J=[{key:"home",icon:"H",label:"Home"},{key:"docs",icon:"D",label:"Docs"},{key:"team",icon:"T",label:"Team"}],H={inbox:{title:"Inbox",description:"Collapsed sidebars can still drive the page state with a compact icon-first menu.",tag:"5 new",items:["Mentions","Approvals","Warnings"]},files:{title:"Files",description:"Hover to expand the sider, then select a destination without leaving the layout.",tag:"Synced",items:["Specs","Screenshots","Exports"]},settings:{title:"Settings",description:"The trigger only controls width; selection remains a normal controlled menu state.",tag:"Ready",items:["Profile","Security","Integrations"]}},X=[{key:"inbox",icon:"I",label:"Inbox",title:"Inbox"},{key:"files",icon:"F",label:"Files",title:"Files"},{key:"settings",icon:"S",label:"Settings",title:"Settings"}],j={board:{title:"Task board",description:"A focused two-column workspace for cards, lanes, and progress.",tag:"Board",items:["Backlog","Doing","Done"]},calendar:{title:"Calendar",description:"The same sider can switch to schedule views with a different content surface.",tag:"Week",items:["Planning","Reviews","Launch"]}},Y=[{key:"board",icon:"B",label:"Board"},{key:"calendar",icon:"C",label:"Calendar"}],Z=()=>{const[t,o]=r.useState("overview"),a=k[t]??k.overview;return e.jsxs(n,{hasSider:!0,style:{maxWidth:680},children:[e.jsx(m,{width:164,sticky:!0,offsetTop:16,style:{minHeight:210},menu:$,menuProps:{selectedKey:t,onSelect:i=>o(i)}}),e.jsxs(n,{style:{padding:0,border:0,background:"transparent"},children:[e.jsx(p,{children:a.title}),e.jsx(l,{style:{minHeight:150},children:f(a)})]})]})},ee=()=>{const[t,o]=r.useState("docs"),a=S[t]??S.docs;return e.jsxs(n,{style:{maxWidth:680},children:[e.jsxs(p,{children:["Global header / ",a.title]}),e.jsxs(n,{hasSider:!0,style:{padding:0,border:0,background:"transparent"},children:[e.jsx(m,{width:148,menu:J,menuProps:{selectedKey:t,onSelect:i=>o(i)}}),e.jsx(l,{style:{minHeight:150},children:f(a)})]}),e.jsx(x,{children:a.tag})]})},te=()=>{const[t,o]=r.useState("inbox"),a=H[t]??H.inbox;return e.jsxs(n,{hasSider:!0,style:{maxWidth:680},children:[e.jsx(m,{width:188,collapsedWidth:76,collapsible:!0,defaultCollapsed:!0,expandOnHover:!0,menu:X,menuProps:{selectedKey:t,onSelect:i=>o(i)}}),e.jsx(l,{style:{minHeight:150},children:f(a)})]})},oe=()=>{const[t,o]=r.useState("board"),a=j[t]??j.board;return e.jsxs(n,{hasSider:!0,style:{maxWidth:680},children:[e.jsx(m,{width:156,style:{minHeight:168},menu:Y,menuProps:{selectedKey:t,onSelect:i=>o(i)}}),e.jsx(l,{style:{minHeight:168},children:f(a)})]})},re={examples:[{id:"basic-layout",zh:{title:"基本结构",description:"使用 Header、Content、Footer 组成页面骨架。",codeToggle:"查看基本结构代码"},en:{title:"Basic structure",description:"Use Header, Content, and Footer to compose a page skeleton.",codeToggle:"View basic structure code"},code:`import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

export default () => (
  <Layout>
    <LayoutHeader>Header</LayoutHeader>
    <LayoutContent>Content</LayoutContent>
    <LayoutFooter>Footer</LayoutFooter>
  </Layout>
);`,render:()=>e.jsxs(n,{children:[e.jsx(p,{children:"Header"}),e.jsx(l,{children:"Content"}),e.jsx(x,{children:"Footer"})]})},{id:"top-middle-bottom-layout",zh:{title:"上中下布局",description:"适合内容型页面和文档型页面的经典上中下结构。",codeToggle:"查看上中下布局代码"},en:{title:"Header content footer",description:"A classic top-middle-bottom layout for content and documentation pages.",codeToggle:"View top-middle-bottom code"},code:`import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

export default () => (
  <Layout style={{ maxWidth: 620 }}>
    <LayoutHeader>Product navigation</LayoutHeader>
    <LayoutContent style={{ minHeight: 96 }}>Release workspace</LayoutContent>
    <LayoutFooter>Cloud-soft footer</LayoutFooter>
  </Layout>
);`,render:()=>e.jsxs(n,{style:{maxWidth:620},children:[e.jsx(p,{children:"Product navigation"}),e.jsx(l,{style:{minHeight:96},children:"Release workspace"}),e.jsx(x,{children:"Cloud-soft footer"})]})},{id:"header-sider-layout",zh:{title:"顶部-侧边布局",description:"Sider 贯穿主体高度，点击侧边菜单会切换右侧页面内容。",codeToggle:"查看顶部侧边布局代码"},en:{title:"Header and sider",description:"Let the sider span the body height and switch the right page content on selection.",codeToggle:"View header sider code"},code:`import { useState } from 'react';
import { Layout, LayoutContent, LayoutHeader, LayoutSider } from '@cinna-design/react';

const pages: Record<string, { title: string; body: string }> = {
  overview: { title: 'Overview', body: 'Release status, ownership, and the next action.' },
  tasks: { title: 'Tasks', body: 'Task queues stay in the content area.' },
  settings: { title: 'Settings', body: 'Configuration pages reuse the same shell.' },
};

export default () => {
  const [active, setActive] = useState('overview');
  const page = pages[active];

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={164}
        sticky
        offsetTop={16}
        style={{ minHeight: 210 }}
        menu={[
          { key: 'overview', icon: 'O', label: 'Overview' },
          { key: 'tasks', icon: 'T', label: 'Tasks' },
          { key: 'settings', icon: 'S', label: 'Settings' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <Layout style={{ padding: 0, border: 0, background: 'transparent' }}>
        <LayoutHeader>{page.title}</LayoutHeader>
        <LayoutContent style={{ minHeight: 150 }}>
          <strong>{page.title}</strong>
          <p>{page.body}</p>
        </LayoutContent>
      </Layout>
    </Layout>
  );
};`,render:()=>e.jsx(Z,{})},{id:"full-width-layout",zh:{title:"顶部-侧边布局-通栏",description:"Header 横跨页面，主体区域继续嵌套可切换内容的侧边栏。",codeToggle:"查看通栏布局代码"},en:{title:"Full-width app layout",description:"Let the header span the page while the body nests a sider that switches content.",codeToggle:"View full-width layout code"},code:`import { useState } from 'react';
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '@cinna-design/react';

const pages: Record<string, { title: string; body: string }> = {
  home: { title: 'Home', body: 'Global overview with product shortcuts.' },
  docs: { title: 'Docs', body: 'Documentation sections live under the global header.' },
  team: { title: 'Team', body: 'Team workspace with shared review queues.' },
};

export default () => {
  const [active, setActive] = useState('docs');
  const page = pages[active];

  return (
    <Layout style={{ maxWidth: 680 }}>
      <LayoutHeader>Global header / {page.title}</LayoutHeader>
      <Layout hasSider style={{ padding: 0, border: 0, background: 'transparent' }}>
        <LayoutSider
          width={148}
          menu={[
            { key: 'home', icon: 'H', label: 'Home' },
            { key: 'docs', icon: 'D', label: 'Docs' },
            { key: 'team', icon: 'T', label: 'Team' },
          ]}
          menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
        />
        <LayoutContent style={{ minHeight: 150 }}>{page.body}</LayoutContent>
      </Layout>
      <LayoutFooter>{page.title}</LayoutFooter>
    </Layout>
  );
};`,render:()=>e.jsx(ee,{})},{id:"sticky-header-footer-layout",zh:{title:"吸顶和吸底",description:"Header 和 Footer 贴住容器顶部和底部，中间内容区独立滚动。",codeToggle:"查看吸顶吸底代码"},en:{title:"Sticky header and footer",description:"Keep the header and footer attached to the panel edges while the middle content scrolls.",codeToggle:"View sticky layout code"},code:`import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

const panels = ['Overview', 'Daily metrics', 'Queued reviews', 'Release notes', 'Access log'];

export default () => (
  <Layout style={{ maxWidth: 680, height: 280, overflow: 'hidden', gridTemplateRows: 'auto minmax(0, 1fr) auto' }}>
    <LayoutHeader sticky>Sticky header</LayoutHeader>
    <LayoutContent style={{ display: 'grid', gap: 10, minHeight: 0, overflow: 'auto' }}>
      {panels.map((panel) => (
        <div key={panel} style={{ minHeight: 56, padding: 14, borderRadius: 14, background: '#fffcf6' }}>
          {panel}
        </div>
      ))}
    </LayoutContent>
    <LayoutFooter sticky>Sticky footer</LayoutFooter>
  </Layout>
);`,render:()=>{const t=["Overview","Daily metrics","Queued reviews","Release notes","Access log"];return e.jsxs(n,{style:{maxWidth:680,height:280,overflow:"hidden",gridTemplateRows:"auto minmax(0, 1fr) auto"},children:[e.jsx(p,{sticky:!0,children:"Sticky header"}),e.jsx(l,{style:{display:"grid",gap:10,minHeight:0,overflow:"auto"},children:t.map(o=>e.jsx("div",{style:{minHeight:56,padding:14,borderRadius:14,background:"#fffcf6"},children:o},o))}),e.jsx(x,{sticky:!0,children:"Sticky footer"})]})}},{id:"sider-control-layout",zh:{title:"侧栏宽度与收起",description:"width 和 collapsedWidth 控制侧栏宽度，侧栏收起或展开时仍然可以切换页面。",codeToggle:"查看侧栏控制代码"},en:{title:"Sider width and collapse",description:"Use width and collapsedWidth for sizing; page switching still works while the sider collapses or expands.",codeToggle:"View sider control code"},code:`import { useState } from 'react';
import { Layout, LayoutContent, LayoutSider } from '@cinna-design/react';

const pages: Record<string, string> = {
  inbox: 'Mentions, approvals, and warnings.',
  files: 'Specs, screenshots, and exports.',
  settings: 'Profile, security, and integrations.',
};

export default () => {
  const [active, setActive] = useState('inbox');

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={188}
        collapsedWidth={76}
        collapsible
        defaultCollapsed
        expandOnHover
        menu={[
          { key: 'inbox', icon: 'I', label: 'Inbox', title: 'Inbox' },
          { key: 'files', icon: 'F', label: 'Files', title: 'Files' },
          { key: 'settings', icon: 'S', label: 'Settings', title: 'Settings' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <LayoutContent style={{ minHeight: 150 }}>{pages[active]}</LayoutContent>
    </Layout>
  );
};`,render:()=>e.jsx(te,{})},{id:"sider-layout",zh:{title:"侧边布局",description:"适合常驻导航和主内容区的两栏工作台，点击导航即可切换内容。",codeToggle:"查看侧边布局代码"},en:{title:"Sider layout",description:"Use a persistent sider with a main workspace and switch content from the navigation.",codeToggle:"View sider layout code"},code:`import { useState } from 'react';
import { Layout, LayoutContent, LayoutSider } from '@cinna-design/react';

const pages: Record<string, string> = {
  board: 'Task board',
  calendar: 'Calendar',
};

export default () => {
  const [active, setActive] = useState('board');

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={156}
        style={{ minHeight: 168 }}
        menu={[
          { key: 'board', icon: 'B', label: 'Board' },
          { key: 'calendar', icon: 'C', label: 'Calendar' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <LayoutContent style={{ minHeight: 168 }}>{pages[active]}</LayoutContent>
    </Layout>
  );
};`,render:()=>e.jsx(oe,{})}]};export{re as layoutDoc};
