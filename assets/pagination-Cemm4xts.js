import{j as e,I as n,R as g}from"./index-_8eXcLz2.js";import{P as t}from"./index-BgdSJg61.js";import{S as a}from"./index-n3tSMIzx.js";import{T as l}from"./index-BAwLJX5K.js";import"./ComponentPage-BGTThW6u.js";const p=()=>{const[i,o]=g.useState(3),[r,s]=g.useState(10);return e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsxs(l,{tone:"secondary",children:["Page ",i,", ",r," items per page"]}),e.jsx(t,{current:i,pageSize:r,total:168,showSizeChanger:!0,onChange:(d,c)=>{o(d),s(c)}})]})},x={examples:[{id:"basic-pagination",zh:{title:"基本用法",description:"用于拆分长列表，让用户按页浏览数据。",codeToggle:"查看基本用法代码"},en:{title:"Basic pagination",description:"Split a long list so users can browse data page by page.",codeToggle:"View basic pagination code"},code:`import { Pagination } from '@cinna-design/react';

export default () => <Pagination total={50} />;`,render:()=>e.jsx(t,{total:50})},{id:"more-pagination",zh:{title:"更多页码",description:"页数较多时会自动收起中间页码，并通过省略按钮快速前后跳转。",codeToggle:"查看更多页码代码"},en:{title:"More pages",description:"Long page lists collapse into jump controls for faster navigation.",codeToggle:"View more pages code"},code:`import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={500} defaultCurrent={6} showLessItems />
);`,render:()=>e.jsx(t,{total:500,defaultCurrent:6,showLessItems:!0})},{id:"size-align-pagination",zh:{title:"尺寸与对齐",description:"size 控制分页尺寸，align 控制分页在容器中的起始、居中或末尾对齐。",codeToggle:"查看尺寸与对齐代码"},en:{title:"Size and alignment",description:"Use size for density and align to position the pagination inside its container.",codeToggle:"View size and alignment code"},code:`import { Icon, Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: '100%' }}>
    <Pagination total={80} size="small" align="start" />
    <Pagination total={80} size="medium" align="center" />
    <Pagination total={80} size="large" align="end" />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"stretch",style:{width:"100%"},children:[e.jsx(t,{total:80,size:"small",align:"start"}),e.jsx(t,{total:80,size:"medium",align:"center"}),e.jsx(t,{total:80,size:"large",align:"end"})]})},{id:"page-size-pagination",zh:{title:"每页条数",description:"showSizeChanger 展示每页条数选择器，pageSizeOptions 可配置可选项。",codeToggle:"查看每页条数代码"},en:{title:"Page size",description:"showSizeChanger displays the page-size selector and pageSizeOptions controls its options.",codeToggle:"View page size code"},code:`import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination
    total={240}
    defaultPageSize={20}
    pageSizeOptions={[10, 20, 40, 80]}
    showSizeChanger
  />
);`,render:()=>e.jsx(t,{total:240,defaultPageSize:20,pageSizeOptions:[10,20,40,80],showSizeChanger:!0})},{id:"quick-jumper-pagination",zh:{title:"快速跳转",description:"showQuickJumper 允许用户输入页码后回车跳转，也可以配置确认按钮。",codeToggle:"查看快速跳转代码"},en:{title:"Quick jumper",description:"showQuickJumper lets users enter a page number and press Enter or a custom button.",codeToggle:"View quick jumper code"},code:`import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={360} showQuickJumper={{ goButton: 'Go' }} />
);`,render:()=>e.jsx(t,{total:360,showQuickJumper:{goButton:"Go"}})},{id:"simple-pagination",zh:{title:"简洁模式",description:"simple 适合空间有限的区域，readOnly 可以只展示当前页。",codeToggle:"查看简洁模式代码"},en:{title:"Simple mode",description:"Use simple mode in compact areas; readOnly keeps the current page display static.",codeToggle:"View simple mode code"},code:`import { Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination total={88} simple defaultCurrent={2} />
    <Pagination total={88} simple={{ readOnly: true }} defaultCurrent={4} />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{total:88,simple:!0,defaultCurrent:2}),e.jsx(t,{total:88,simple:{readOnly:!0},defaultCurrent:4})]})},{id:"controlled-pagination",zh:{title:"受控分页",description:"current、pageSize 和 onChange 可以把页码与业务状态绑定在一起。",codeToggle:"查看受控分页代码"},en:{title:"Controlled pagination",description:"Bind current, pageSize, and onChange to application state.",codeToggle:"View controlled pagination code"},code:`import { Pagination, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Space direction="vertical" align="flex-start">
      <Text tone="secondary">Page {page}, {pageSize} items per page</Text>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={168}
        showSizeChanger
        onChange={(nextPage, nextPageSize) => {
          setPage(nextPage);
          setPageSize(nextPageSize);
        }}
      />
    </Space>
  );
};`,render:()=>e.jsx(p,{})},{id:"total-hidden-pagination",zh:{title:"总数与隐藏",description:"showTotal 展示当前页范围；hideOnSinglePage 可在只有一页时隐藏分页器。",codeToggle:"查看总数与隐藏代码"},en:{title:"Total and hiding",description:"showTotal displays the visible range; hideOnSinglePage hides the control for one-page data.",codeToggle:"View total and hiding code"},code:`import { Pagination, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination
      total={128}
      pageSize={16}
      defaultCurrent={2}
      showTotal={(total, range) => \`\${range[0]}-\${range[1]} of \${total}\`}
    />
    <Text tone="secondary">The next pagination is hidden because it has one page.</Text>
    <Pagination total={8} hideOnSinglePage />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{total:128,pageSize:16,defaultCurrent:2,showTotal:(i,o)=>`${o[0]}-${o[1]} of ${i}`}),e.jsx(l,{tone:"secondary",children:"The next pagination is hidden because it has one page."}),e.jsx(t,{total:8,hideOnSinglePage:!0})]})},{id:"all-pages-pagination",zh:{title:"全部展示",description:"showAllPages 可展示完整页码，适合页数不多且需要快速扫视的列表。",codeToggle:"查看全部展示代码"},en:{title:"Show all pages",description:"showAllPages keeps every page visible when the page count is still manageable.",codeToggle:"View show all pages code"},code:`import { Pagination } from '@cinna-design/react';

export default () => <Pagination total={120} showAllPages />;`,render:()=>e.jsx(t,{total:120,showAllPages:!0})},{id:"custom-pagination",zh:{title:"自定义页码样式和图标",description:"可以自定义页码字体、边框、圆角、激活态颜色、当前页横条，以及上一页和下一页图标。",codeToggle:"查看自定义页码样式和图标代码"},en:{title:"Custom page style and icons",description:"Customize page font, border, radius, active color, active underline, and previous or next icons.",codeToggle:"View custom style and icons code"},code:`import { Pagination, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Pagination
      total={96}
      defaultCurrent={4}
      prevIcon={<Icon name="chevron-left" size={13} />}
      nextIcon={<Icon name="chevron-right" size={13} />}
      pageFontSize={15}
      pageFontWeight={800}
      pageColor="#6b584b"
      pageBorderColor="#efb8c8"
      pageBorderWidth={2}
      pageRadius={12}
      activePageColor="#513323"
      activePageBackgroundColor="#ffe8a8"
      activePageBorderColor="#d8984f"
      activePageUnderlineColor="#fff8cf"
      activePageUnderlineWidth={28}
      activePageUnderlineHeight={4}
      activePageUnderlineBottom={6}
    />
    <Pagination
      total={96}
      defaultCurrent={4}
      prevIcon={<Icon name="chevron-left" size={13} />}
      nextIcon={<Icon name="chevron-right" size={13} />}
      pageFontSize={15}
      pageFontWeight={800}
      pageColor="#6b584b"
      pageBorderColor="#efb8c8"
      pageBorderWidth={2}
      pageRadius={12}
      activePageColor="#513323"
      activePageBackgroundColor="#ffe8a8"
      activePageBorderColor="#d8984f"
      activePageUnderline={false}
    />
  </Space>
);`,render:()=>e.jsxs(a,{direction:"vertical",align:"flex-start",children:[e.jsx(t,{total:96,defaultCurrent:4,prevIcon:e.jsx(n,{name:"chevron-left",size:13}),nextIcon:e.jsx(n,{name:"chevron-right",size:13}),pageFontSize:15,pageFontWeight:800,pageColor:"#6b584b",pageBorderColor:"#efb8c8",pageBorderWidth:2,pageRadius:12,activePageColor:"#513323",activePageBackgroundColor:"#ffe8a8",activePageBorderColor:"#d8984f",activePageUnderlineColor:"#fff8cf",activePageUnderlineWidth:28,activePageUnderlineHeight:4,activePageUnderlineBottom:6}),e.jsx(t,{total:96,defaultCurrent:4,prevIcon:e.jsx(n,{name:"chevron-left",size:13}),nextIcon:e.jsx(n,{name:"chevron-right",size:13}),pageFontSize:15,pageFontWeight:800,pageColor:"#6b584b",pageBorderColor:"#efb8c8",pageBorderWidth:2,pageRadius:12,activePageColor:"#513323",activePageBackgroundColor:"#ffe8a8",activePageBorderColor:"#d8984f",activePageUnderline:!1})]})},{id:"disabled-pagination",zh:{title:"不可用",description:"disabled 会禁用页码、上一页下一页、输入框和每页条数选择器。",codeToggle:"查看不可用代码"},en:{title:"Disabled",description:"disabled turns off page buttons, navigation buttons, inputs, and the page-size selector.",codeToggle:"View disabled code"},code:`import { Pagination } from '@cinna-design/react';

export default () => (
  <Pagination total={180} defaultCurrent={5} showSizeChanger showQuickJumper disabled />
);`,render:()=>e.jsx(t,{total:180,defaultCurrent:5,showSizeChanger:!0,showQuickJumper:!0,disabled:!0})}]};export{x as paginationDoc};
