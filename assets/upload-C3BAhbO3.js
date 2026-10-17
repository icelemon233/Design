import{R as ee,u as te,r as c,j as r,c as re}from"./index-42cP9WwP.js";import{S as oe}from"./index-1s6UphMX.js";let ae=0;const u=ee.forwardRef(({label:p="Choose file",hint:b,showUploadList:w=!0,className:L,onChange:B,buttonProps:N,fileList:D,defaultFileList:V=[],onFilesChange:F,action:M,name:P="file",headers:H,withCredentials:I,data:W,beforeUpload:A,onRemove:X,customRequest:y,maxCount:j,draggable:E,disabled:G,multiple:q,accept:T,...z},J)=>{const i=te(G),[K,Q]=c.useState(V),[k,x]=c.useState(""),[Y,v]=c.useState(!1),U=D??K,d=c.useRef(U),f=c.useRef(new Map),m=c.useRef(!0),h=c.useRef(i);d.current=U,h.current=i,c.useEffect(()=>(m.current=!0,()=>{m.current=!1,f.current.forEach(e=>e())}),[]);const R=e=>{m.current&&(d.current=e,D===void 0&&Q(e),F?.(e))},S=(e,o)=>{d.current.some(a=>a.uid===e)&&R(d.current.map(a=>a.uid===e?{...a,...o}:a))},O=e=>{if(!m.current||h.current)return;const o=e.originFileObj;if(!o||!M&&!y)return;S(e.uid,{status:"uploading",percent:0,error:void 0});let a=!1;const g=t=>{a||(a=!0,f.current.delete(e.uid),S(e.uid,t))},n={file:o,onProgress:t=>S(e.uid,{percent:Math.max(0,Math.min(100,t))}),onSuccess:t=>g({status:"done",percent:100,response:t}),onError:t=>g({status:"error",error:t.message})};if(y){try{const t=y(n);typeof t=="function"?f.current.set(e.uid,t):t&&typeof t.then=="function"&&t.then(l=>n.onSuccess(l),l=>n.onError(l instanceof Error?l:new Error(String(l))))}catch(t){n.onError(t instanceof Error?t:new Error(String(t)))}return}const s=new XMLHttpRequest;s.open("POST",M),s.withCredentials=!!I,Object.entries(H??{}).forEach(([t,l])=>s.setRequestHeader(t,l)),s.upload.onprogress=t=>{t.lengthComputable&&n.onProgress(t.loaded/t.total*100)},s.onload=()=>s.status>=200&&s.status<300?n.onSuccess(s.response):n.onError(new Error("Upload failed ("+s.status+").")),s.onerror=()=>n.onError(new Error("Network error.")),s.onabort=()=>{a=!0};const C=new FormData;C.append(P,o),Object.entries(W??{}).forEach(([t,l])=>C.append(t,l)),f.current.set(e.uid,()=>s.abort()),s.send(C)},Z=e=>!T||T.split(",").some(o=>{const a=o.trim().toLowerCase();return a.startsWith(".")?e.name.toLowerCase().endsWith(a):a.endsWith("/*")?e.type.startsWith(a.slice(0,-1)):e.type===a}),_=async e=>{if(i)return;q||(e=e.slice(0,1)),x("");const o=[];for(const n of e)try{if(!Z(n)){x("File type is not accepted.");continue}if(await A?.(n,e)===!1)continue;if(!m.current||h.current)return;o.push({uid:"cinna-upload-"+ ++ae,name:n.name,status:"ready",originFileObj:n})}catch(s){x(s instanceof Error?s.message:"File validation failed.")}if(!m.current||h.current)return;let a=[...d.current,...o];j!==void 0&&(j===1?a=o.length?[o[o.length-1]]:d.current:a=a.slice(0,Math.max(0,j)));const g=new Set(a.map(n=>n.uid));d.current.filter(n=>!g.has(n.uid)).forEach(n=>f.current.get(n.uid)?.()),R(a),o.filter(n=>g.has(n.uid)).forEach(O)},$=async e=>{if(!i)try{if(await X?.(e)===!1||!m.current||h.current)return;f.current.get(e.uid)?.(),f.current.delete(e.uid),R(d.current.filter(o=>o.uid!==e.uid))}catch(o){x(o instanceof Error?o.message:"Unable to remove file.")}};return r.jsxs("div",{className:re("cinna-upload",E&&"cinna-upload--drag",Y&&"cinna-upload--drag-over",i&&"cinna-upload--disabled",L),onDragOver:e=>{E&&!i&&(e.preventDefault(),v(!0))},onDragLeave:()=>v(!1),onDrop:e=>{E&&!i&&(e.preventDefault(),v(!1),_(Array.from(e.dataTransfer.files)))},children:[r.jsxs("label",{className:"cinna-upload__trigger",children:[r.jsx("input",{...z,ref:J,type:"file",name:P,disabled:i,multiple:q,accept:T,"aria-label":z["aria-label"]??(typeof p=="string"?p:"Choose file"),onChange:e=>{const o=Array.from(e.currentTarget.files??[]);B?.(e),_(o),e.currentTarget.value=""}}),r.jsx("span",{...N,children:p})]}),b&&r.jsx("small",{children:b}),k&&r.jsx("small",{role:"alert",children:k}),w&&U.length>0&&r.jsx("ul",{className:"cinna-upload__list",children:U.map(e=>r.jsxs("li",{className:"cinna-upload__file cinna-upload__file--"+e.status,children:[r.jsx("span",{children:e.name}),r.jsx("small",{role:"status",children:e.status==="uploading"?Math.round(e.percent??0)+"%":e.status==="error"?e.error??"Upload failed":e.status==="done"?"Uploaded":"Ready"}),e.status==="uploading"&&r.jsx("progress",{"aria-label":"Upload "+e.name,value:e.percent??0,max:100}),e.status==="error"&&r.jsx("button",{type:"button",disabled:i,"aria-label":"Retry "+e.name,onClick:()=>O(e),children:"Retry"}),r.jsx("button",{type:"button",disabled:i,"aria-label":"Remove "+e.name,onClick:()=>{$(e)},children:"×"})]},e.uid))})]})});u.displayName="Upload";function ne(){return r.jsx(u,{label:"Upload a sample",accept:".txt,.md",draggable:!0,maxCount:2,hint:"Demo request. Choose a text or Markdown file; no file leaves your browser.",beforeUpload:p=>{if(p.size>1024*1024)throw new Error("Choose a file smaller than 1 MB.")},customRequest:({onProgress:p,onSuccess:b})=>{p(50);const w=setTimeout(()=>b({demo:!0}),600);return()=>clearTimeout(w)}})}const se=`import { Upload } from '@cinna-design/react';
export default function UploadRequestDemo() {
  return (
    <Upload
      label="Upload a sample"
      accept=".txt,.md"
      draggable
      maxCount={2}
      hint="Demo request. Choose a text or Markdown file; no file leaves your browser."
      beforeUpload={(file) => {
        if (file.size > 1024 * 1024) throw new Error('Choose a file smaller than 1 MB.');
      }}
      customRequest={({ onProgress, onSuccess }) => {
        onProgress(50);
        const timer = setTimeout(() => onSuccess({ demo: true }), 600);
        return () => clearTimeout(timer);
      }}
    />
  );
}
`,de={examples:[{id:"enhanced-upload",zh:{title:"上传请求和进度",description:"此示例模拟请求并显示进度，不发送文件。实际业务可配置 action 或 customRequest。",codeToggle:"查看完整示例代码"},en:{title:"Upload requests and progress",description:"This demo simulates progress without sending files. Configure action or customRequest for real uploads.",codeToggle:"View complete example"},code:se,render:()=>r.jsx(ne,{})},{id:"basic-upload",zh:{title:"基本用法",description:"label 设置触发按钮文案，选择文件后会在本地列表中展示文件名。",codeToggle:"查看基本用法代码"},en:{title:"Basic upload",description:"label sets the trigger text, and selected files appear in the local list.",codeToggle:"View basic upload code"},code:`import { Upload } from '@cinna-design/react';

export default () => <Upload label="Choose file" />;`,render:()=>r.jsx(u,{label:"Choose file"})},{id:"upload-hint",zh:{title:"提示说明",description:"hint 用于展示文件大小、格式或业务说明。",codeToggle:"查看提示说明代码"},en:{title:"Hint",description:"hint describes file size, type, or business guidance.",codeToggle:"View hint code"},code:`import { Upload } from '@cinna-design/react';

export default () => (
  <Upload
    label="Upload changelog"
    hint="Markdown or text files under 2 MB."
    accept=".md,.txt"
  />
);`,render:()=>r.jsx(u,{label:"Upload changelog",hint:"Markdown or text files under 2 MB.",accept:".md,.txt"})},{id:"upload-multiple",zh:{title:"类型与多选",description:"accept 与 multiple 来自原生 file input，用于限制类型和允许多选。",codeToggle:"查看类型与多选代码"},en:{title:"Type and multiple",description:"accept and multiple come from native file input for type limits and multi-select.",codeToggle:"View type and multiple code"},code:`import { Upload } from '@cinna-design/react';

export default () => (
  <Upload
    label="Upload images"
    accept="image/*"
    multiple
    hint="Select one or more images."
  />
);`,render:()=>r.jsx(u,{label:"Upload images",accept:"image/*",multiple:!0,hint:"Select one or more images."})},{id:"upload-hidden-list",zh:{title:"隐藏列表",description:"showUploadList={false} 会隐藏本地文件名列表。",codeToggle:"查看隐藏列表代码"},en:{title:"Hidden list",description:"showUploadList={false} hides the local filename list.",codeToggle:"View hidden list code"},code:`import { Upload } from '@cinna-design/react';

export default () => <Upload label="Import file" showUploadList={false} />;`,render:()=>r.jsx(u,{label:"Import file",showUploadList:!1})},{id:"upload-button-props",zh:{title:"按钮属性与禁用",description:"buttonProps 可传给触发按钮内容，disabled 会禁用原生文件输入。",codeToggle:"查看按钮属性与禁用代码"},en:{title:"Button props and disabled",description:"buttonProps goes to the trigger content, while disabled disables the native input.",codeToggle:"View button props and disabled code"},code:`import { Space, Upload } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Upload label="Primary upload" buttonProps={{ title: 'Upload report' }} />
    <Upload label="Disabled upload" disabled />
  </Space>
);`,render:()=>r.jsxs(oe,{direction:"vertical",align:"flex-start",children:[r.jsx(u,{label:"Primary upload",buttonProps:{title:"Upload report"}}),r.jsx(u,{label:"Disabled upload",disabled:!0})]})}]};export{de as uploadDoc};
