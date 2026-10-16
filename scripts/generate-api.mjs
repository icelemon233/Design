import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Native HTML attributes are inherited. These tables document Cinna's own additions.
const root = path.resolve('.');
const docsRoot = path.join(root, 'apps/site/src/docs');
const apiRoot = path.join(docsRoot, 'api');
const read = (file) =>
  ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
const nav = read(path.join(docsRoot, 'navigation.ts'));
const items = nav.statements
  .find((n) => n.declarationList?.declarations[0]?.name.getText(nav) === 'docsNavItems')
  .declarationList.declarations[0].initializer.elements.map((n) =>
    Object.fromEntries(n.properties.map((p) => [p.name.getText(nav), p.initializer.text])),
  );
const kebab = (name) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const legacyFile = path.join(docsRoot, 'apiRows.ts');
fs.mkdirSync(path.join(apiRoot, 'curated'), { recursive: true });
if (fs.existsSync(legacyFile)) {
  const legacy = read(legacyFile);
  for (const n of legacy.statements) {
    const name = n.declarationList?.declarations[0]?.name.getText(legacy);
    if (!name || name === 'componentApiRows') continue;
    const key = kebab(name.replace('ApiRows', ''));
    fs.writeFileSync(
      path.join(apiRoot, 'curated', key + '.ts'),
      "import type { ApiRow, ApiSection, SiteLanguage } from '../../../types';\n\n" +
        n.getText(legacy) +
        '\n',
    );
  }
  fs.unlinkSync(legacyFile);
}
const config = ts.parseJsonConfigFileContent(
  ts.readConfigFile('packages/react/tsconfig.build.json', ts.sys.readFile).config,
  ts.sys,
  path.join(root, 'packages/react'),
);
const program = ts.createProgram(config.fileNames, config.options);
const checker = program.getTypeChecker();
const descriptions = {
  value: ['受控值；变更后由父组件更新。', 'Controlled value; update it from the parent.'],
  defaultValue: ['非受控模式的初始值。', 'Initial value in uncontrolled mode.'],
  onChange: ['值变更时调用。', 'Called when the value changes.'],
  options: ['可选项数据及禁用配置。', 'Available options and per-option disabled state.'],
  disabled: ['禁用用户输入和操作。', 'Disable user input and interaction.'],
  readOnly: ['保留展示，禁止修改。', 'Display the value without allowing changes.'],
  controlSize: ['控件尺寸。', 'Control size.'],
  size: ['组件尺寸。', 'Component size.'],
  status: ['语义状态及反馈颜色。', 'Semantic status and feedback color.'],
  allowClear: ['显示清除操作。', 'Show a clear action.'],
  placeholder: ['没有选中内容时的提示。', 'Placeholder when no value is selected.'],
  showSearch: ['显示搜索输入。', 'Show the search input.'],
  notFoundContent: ['没有匹配选项时显示的内容。', 'Content displayed when no options match.'],
  open: ['受控的打开状态。', 'Controlled open state.'],
  defaultOpen: ['初始打开状态。', 'Initial open state.'],
  onOpenChange: ['打开状态变化时调用。', 'Called when the open state changes.'],
  loading: ['展示加载状态。', 'Show the loading state.'],
  content: ['正文内容。', 'Body content.'],
  title: ['标题内容。', 'Title content.'],
  children: ['组件内容。', 'Component content.'],
  label: ['关联控件的标签。', 'Label for the associated control.'],
  icon: ['自定义图标。', 'Custom icon.'],
  closable: ['显示关闭按钮。', 'Show a close button.'],
  onClose: ['关闭时调用。', 'Called when closed.'],
  duration: [
    '自动关闭的秒数；0 表示不自动关闭。',
    'Seconds before dismissal; 0 keeps the notice open.',
  ],
  items: ['展示项目。', 'Items to display.'],
  dataSource: ['数据记录。', 'Data records.'],
  treeData: ['含嵌套 children 的树节点。', 'Tree nodes with nested children.'],
  selectedKey: ['受控的当前选中节点。', 'Controlled selected node.'],
  selectedKeys: ['受控的选中项目键值。', 'Controlled selected item keys.'],
  expandedKeys: ['受控的展开节点键值。', 'Controlled expanded node keys.'],
  checkedKeys: ['受控的勾选节点键值。', 'Controlled checked node keys.'],
  onSelect: ['选中项目时调用。', 'Called when an item is selected.'],
  onCheck: ['勾选节点变化时调用。', 'Called when checked nodes change.'],
  onExpand: ['展开节点变化时调用。', 'Called when expanded nodes change.'],
  checkable: ['显示复选框并启用父子级联。', 'Show checkboxes with parent-child selection.'],
  multiple: ['允许选择多个项目。', 'Allow multiple selected items.'],
  selectable: ['允许选择节点。', 'Allow node selection.'],
  columns: [
    '列定义，支持渲染、排序与筛选。',
    'Column definitions with rendering, sorting and filtering.',
  ],
  rowKey: ['记录的稳定唯一键。', 'Stable unique key for each record.'],
  rowSelection: [
    '受控行选择、禁用规则及变化回调。',
    'Row selection, disabled rules and change callback.',
  ],
  pagination: [
    '客户端分页；可设置页码、页容量及回调。',
    'Client-side pagination with page, page size and callback.',
  ],
  scroll: [
    '表格横向最小宽度和纵向最大高度。',
    'Table minimum horizontal width and maximum vertical height.',
  ],
  expandable: ['展开行内容及受控展开状态。', 'Expanded row content and controlled expansion.'],
  emptyText: ['没有数据时显示的内容。', 'Content displayed when there is no data.'],
  renderItem: ['每项数据的渲染函数。', 'Render function for each record.'],
  loadMore: ['列表底部的加载操作。', 'Load-more action at the bottom of the list.'],
  initialValues: ['表单首次挂载时的字段值。', 'Field values when the form first mounts.'],
  form: ['由 useForm 创建的表单实例。', 'Form instance created with useForm.'],
  onFinish: ['校验成功后提交字段值。', 'Submit field values after successful validation.'],
  onFinishFailed: [
    '校验失败的字段及错误信息。',
    'Invalid fields and messages after failed validation.',
  ],
  onValuesChange: ['字段变化时的增量与全部值。', 'Changed fields and all values.'],
  requiredMark: ['必填标记的显示方式。', 'Display of required-field marks.'],
  name: ['字段名或原生输入 name。', 'Field name or native input name.'],
  rules: ['必填、格式、范围或异步校验规则。', 'Required, format, range or async validation rules.'],
  valuePropName: ['接收字段值的属性名。', 'Property receiving the field value.'],
  trigger: ['字段值变更事件名。', 'Event used to update the field value.'],
  getValueFromEvent: [
    '从控件事件参数提取字段值。',
    'Extract the field value from control event arguments.',
  ],
  htmlFor: ['关联输入元素的 id。', 'ID of the associated input element.'],
  help: ['辅助说明；校验错误优先显示。', 'Help text; validation errors take priority.'],
  required: ['标记字段为必填。', 'Mark the field as required.'],
  validateStatus: ['手动指定校验状态。', 'Manually specify validation status.'],
  extra: ['额外内容。', 'Additional content.'],
  fileList: ['受控文件列表及上传状态。', 'Controlled file list and upload status.'],
  defaultFileList: ['初始文件列表。', 'Initial file list.'],
  onFilesChange: ['文件列表或上传状态变化时调用。', 'Called when files or upload states change.'],
  action: [
    '上传 POST 目标；未配置时只选择本地文件。',
    'POST upload URL; without it, files remain local.',
  ],
  beforeUpload: [
    '上传前校验；返回 false 拒绝文件。',
    'Validate before uploading; false rejects the file.',
  ],
  onRemove: ['移除前回调；返回 false 阻止移除。', 'Before removal; false prevents removal.'],
  customRequest: [
    '自定义请求，提供进度、成功、失败回调。',
    'Custom request with progress, success and error callbacks.',
  ],
  maxCount: [
    '列表最多保留的文件数；1 时替换文件。',
    'Maximum file count; 1 replaces the existing file.',
  ],
  draggable: ['允许拖放文件。', 'Allow dropping files.'],
  targetKeys: ['受控的目标栏键值。', 'Controlled keys in the target list.'],
  defaultTargetKeys: ['目标栏的初始键值。', 'Initial keys in the target list.'],
  titles: ['源栏和目标栏的标题。', 'Source and target list titles.'],
  percent: [
    '0–100 的进度值；越界自动限制。',
    'Progress from 0 to 100; out-of-range values are clamped.',
  ],
  format: ['自定义格式化显示内容。', 'Customize the formatted display content.'],
  strokeColor: ['进度条或圆环颜色。', 'Progress bar or circle color.'],
  showInfo: ['显示进度文本。', 'Show progress text.'],
  count: ['星数或计数。', 'Star count or item count.'],
  allowHalf: ['允许半星，键盘步进为半星。', 'Allow half stars and half-star keyboard steps.'],
  tooltips: ['每颗星的辅助文本。', 'Tooltip for each star.'],
  character: ['自定义评分字符。', 'Custom rating character.'],
  precision: ['保留的小数位数。', 'Number of decimal places.'],
  controls: ['显示数值增减按钮。', 'Show number increment/decrement controls.'],
  autoSize: [
    '按内容调整高度，可限制 minRows/maxRows。',
    'Resize to content with optional minRows/maxRows.',
  ],
  showCount: ['显示当前字符数。', 'Show the current character count.'],
  disabledDate: ['禁止选择指定日期。', 'Prevent selection of specific dates.'],
  cellRender: ['自定义日期单元格内容。', 'Custom date-cell content.'],
  headerRender: ['自定义日历标题。', 'Custom calendar header.'],
  fullscreen: ['使用完整日历外观。', 'Use the full calendar appearance.'],
  hourStep: ['小时选项的步长。', 'Hour option interval.'],
  minuteStep: ['分钟选项的步长。', 'Minute option interval.'],
  use12Hours: [
    '时间面板以 12 小时显示；值保留 24 小时格式。',
    'Display 12-hour options; values remain in 24-hour format.',
  ],
  disabledHours: ['禁止选择的小时。', 'Hours that cannot be selected.'],
  disabledMinutes: ['指定小时下禁止选择的分钟。', 'Unavailable minutes for the selected hour.'],
  defaultActiveIndex: ['走马灯初始页索引。', 'Initial carousel slide index.'],
  activeIndex: ['受控的走马灯页索引。', 'Controlled carousel slide index.'],
  autoplay: ['自动轮播。', 'Advance slides automatically.'],
  autoplaySpeed: ['自动轮播间隔，毫秒。', 'Autoplay interval in milliseconds.'],
  pauseOnHover: ['鼠标悬停时暂停轮播。', 'Pause autoplay on hover.'],
  afterChange: ['轮播页变化时调用。', 'Called when the active slide changes.'],
  defaultCurrent: ['初始阶段或页码。', 'Initial step or page.'],
  current: ['受控阶段或页码。', 'Controlled step or page.'],
  steps: ['引导步骤，可指定目标元素。', 'Tour steps with optional target elements.'],
  onFinish: ['完成时调用。', 'Called when finished.'],
  onCancel: ['取消或请求关闭时调用。', 'Called on cancel or dismissal.'],
  onOk: ['确认操作，可返回 Promise。', 'Confirm action; may return a Promise.'],
  onOkError: ['异步确认失败时调用。', 'Called when asynchronous confirmation fails.'],
  confirmLoading: ['确认按钮的加载状态。', 'Loading state of the confirm button.'],
  keyboard: ['允许 Escape 关闭。', 'Allow dismissal with Escape.'],
  maskClosable: ['允许点击遮罩关闭。', 'Allow dismissal by clicking the mask.'],
  footer: ['页脚内容；Modal 传 null 隐藏页脚。', 'Footer content; null hides the Modal footer.'],
  spinning: ['是否显示加载遮罩。', 'Whether to show the loading overlay.'],
  delay: ['延迟显示加载的毫秒数。', 'Delay before showing loading, in milliseconds.'],
  tip: ['加载提示。', 'Loading message.'],
  active: ['启用加载或骨架动画。', 'Enable loading or skeleton animation.'],
  rows: ['段落占位行数。', 'Number of paragraph placeholder rows.'],
  image: ['自定义空状态插画。', 'Custom empty-state illustration.'],
  description: ['辅助描述内容；false 可隐藏。', 'Description; false hides it.'],
  showUploadList: ['显示文件列表。', 'Show the file list.'],
  showText: ['显示颜色值。', 'Show the color value.'],
  presets: ['可选的预设颜色。', 'Preset color options.'],
  caption: ['图片说明。', 'Image caption.'],
  fallback: ['图片加载失败时的替代地址。', 'Fallback URL when the image fails to load.'],
  preview: ['启用可缩放和旋转的图片预览。', 'Enable image preview with zoom and rotation.'],
  reverse: ['逆序显示。', 'Display items in reverse order.'],
  pending: ['时间线的待完成内容。', 'Pending timeline content.'],
  formatter: ['自定义数值显示。', 'Custom value display.'],
  groupSeparator: ['数字分组分隔符。', 'Digit group separator.'],
  decimalSeparator: ['小数分隔符。', 'Decimal separator.'],
  destroyInactiveTabPanel: [
    '切换时卸载隐藏面板；false 时保留状态。',
    'Unmount hidden panels; false preserves their state.',
  ],
  destroyInactivePanel: [
    '折叠时卸载内容；false 时保留状态。',
    'Unmount collapsed content; false preserves its state.',
  ],
  gap: ['项目或平铺之间的间距。', 'Spacing between items or tiles.'],
  rotate: ['水印旋转角度。', 'Watermark rotation in degrees.'],
  opacity: ['水印透明度。', 'Watermark opacity.'],
  fontSize: ['字号。', 'Font size.'],
  mode: ['显示或选择模式。', 'Display or selection mode.'],
  layout: ['布局方式。', 'Layout orientation.'],
  bordered: ['显示边框。', 'Show the border.'],
  prefix: ['前置内容。', 'Prefix content.'],
  suffix: ['后置内容。', 'Suffix content.'],
  block: ['铺满父容器宽度。', 'Fill the parent width.'],
  span: ['占据的列数。', 'Number of columns spanned.'],
  column: ['描述内容列数。', 'Number of description columns.'],
};
const imports = [];
const entries = [];
for (const item of items) {
  if (item.key === 'button') {
    imports.push("import { buttonApiRows } from '../buttonDocs';");
    entries.push('  button: buttonApiRows,');
    continue;
  }
  const file = path.join(root, 'packages/react/src/components', item.key, 'index.tsx');
  const sf = program.getSourceFile(file);
  if (!sf) throw new Error('Missing feature ' + item.key);
  const typeSource = program.getSourceFile(file.replace(/index\.tsx$/, 'types.ts')) ?? sf;
  const interfaces = typeSource.statements.filter(
    (n) => ts.isInterfaceDeclaration(n) && n.name.text.endsWith('Props'),
  );
  const defaults = new Map();
  const visit = (n) => {
    if (
      (ts.isArrowFunction(n) || ts.isFunctionDeclaration(n)) &&
      n.parameters[0] &&
      ts.isObjectBindingPattern(n.parameters[0].name)
    )
      for (const el of n.parameters[0].name.elements) {
        if (el.initializer)
          defaults.set(
            el.propertyName?.getText(sf) ?? el.name.getText(sf),
            el.initializer.getText(sf),
          );
      }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  const sections = { zh: [], en: [] };
  for (const declaration of interfaces) {
    const rows = { zh: [], en: [] };
    for (const property of checker.getTypeAtLocation(declaration).getProperties()) {
      const definition = property.declarations?.[0];
      if (
        !definition ||
        !definition.getSourceFile().fileName.replaceAll('\\', '/').includes('/packages/react/src/')
      )
        continue;
      const name = property.getName();
      const description = descriptions[name] ?? [
        name + ' 的配置或回调。',
        'Configuration or callback for ' + name + '.',
      ];
      // Prefer the authored contract: resolved aliases can embed machine paths.
      const declaredType = ts.isPropertySignature(definition) ? definition.type : undefined;
      const type = (
        declaredType
          ? declaredType.getText().replace(/\s+/g, ' ')
          : checker.typeToString(
              checker.getTypeOfSymbolAtLocation(property, declaration),
              declaration,
              ts.TypeFormatFlags.NoTruncation,
            )
      )
        .replace(/import\(["'][^"']+["']\)\./g, '')
        .replace(/ \| undefined$/, '');
      const defaultValue = defaults.get(name) ?? '-';
      rows.zh.push([name, description[0], type, defaultValue]);
      rows.en.push([name, description[1], type, defaultValue]);
    }
    if (rows.zh.length) {
      sections.zh.push({ title: declaration.name.text.replace(/Props$/, ''), rows: rows.zh });
      sections.en.push({ title: declaration.name.text.replace(/Props$/, ''), rows: rows.en });
    }
  }
  const constName = item.key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'ApiRows';
  const curated = path.join(apiRoot, 'curated', item.key + '.ts');
  let header = "import type { ApiSection, SiteLanguage } from '../../types';\n";
  let body =
    'export const ' +
    constName +
    ': Record<SiteLanguage, ApiSection[]> = ' +
    JSON.stringify(sections, null, 2) +
    ';\n';
  if (fs.existsSync(curated)) {
    header +=
      'import { ' +
      constName +
      " as curated } from './curated/" +
      item.key +
      "';\nimport { mergeApiSections } from './merge';\n";
    body =
      'const generated: Record<SiteLanguage, ApiSection[]> = ' +
      JSON.stringify(sections, null, 2) +
      ';\nexport const ' +
      constName +
      ' = { zh: mergeApiSections(curated.zh, generated.zh), en: mergeApiSections(curated.en, generated.en) };\n';
  }
  fs.writeFileSync(
    path.join(apiRoot, item.key + '.ts'),
    '// Generated from component types. Run pnpm docs:api after changing props.\n' + header + body,
  );
  imports.push('import { ' + constName + " } from './" + item.key + "';");
  entries.push('  ' + JSON.stringify(item.key) + ': ' + constName + ',');
}
fs.writeFileSync(
  path.join(apiRoot, 'index.ts'),
  "import type { ApiContent, SiteLanguage } from '../../types';\n" +
    imports.join('\n') +
    '\nexport const componentApiRows: Record<string, Record<SiteLanguage, ApiContent>> = {\n' +
    entries.join('\n') +
    "\n};\nexport { fallbackApiRows } from './curated/fallback';\n",
);
console.log('Generated concrete API documentation for ' + items.length + ' routes.');
