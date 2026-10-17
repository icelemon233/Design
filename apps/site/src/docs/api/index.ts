import type { ApiContent, SiteLanguage } from '../../types';
import { buttonApiRows } from '../buttonDocs';
import { typographyApiRows } from './typography';
import { floatButtonApiRows } from './float-button';
import { dividerApiRows } from './divider';
import { spaceApiRows } from './space';
import { flexApiRows } from './flex';
import { gridApiRows } from './grid';
import { layoutApiRows } from './layout';
import { splitterApiRows } from './splitter';
import { breadcrumbApiRows } from './breadcrumb';
import { tabsApiRows } from './tabs';
import { stepsApiRows } from './steps';
import { paginationApiRows } from './pagination';
import { menuApiRows } from './menu';
import { anchorApiRows } from './anchor';
import { affixApiRows } from './affix';
import { inputApiRows } from './input';
import { textareaApiRows } from './textarea';
import { inputNumberApiRows } from './input-number';
import { selectApiRows } from './select';
import { autoCompleteApiRows } from './auto-complete';
import { cascaderApiRows } from './cascader';
import { checkboxApiRows } from './checkbox';
import { radioApiRows } from './radio';
import { switchApiRows } from './switch';
import { sliderApiRows } from './slider';
import { rateApiRows } from './rate';
import { segmentedApiRows } from './segmented';
import { datePickerApiRows } from './date-picker';
import { timePickerApiRows } from './time-picker';
import { colorPickerApiRows } from './color-picker';
import { mentionsApiRows } from './mentions';
import { treeSelectApiRows } from './tree-select';
import { uploadApiRows } from './upload';
import { formApiRows } from './form';
import { transferApiRows } from './transfer';
import { cardApiRows } from './card';
import { avatarApiRows } from './avatar';
import { badgeApiRows } from './badge';
import { tagApiRows } from './tag';
import { tableApiRows } from './table';
import { listApiRows } from './list';
import { descriptionsApiRows } from './descriptions';
import { statisticApiRows } from './statistic';
import { timelineApiRows } from './timeline';
import { collapseApiRows } from './collapse';
import { calendarApiRows } from './calendar';
import { carouselApiRows } from './carousel';
import { imageApiRows } from './image';
import { treeApiRows } from './tree';
import { watermarkApiRows } from './watermark';
import { emptyApiRows } from './empty';
import { alertApiRows } from './alert';
import { messageApiRows } from './message';
import { notificationApiRows } from './notification';
import { progressApiRows } from './progress';
import { skeletonApiRows } from './skeleton';
import { resultApiRows } from './result';
import { spinApiRows } from './spin';
import { loadingApiRows } from './loading';
import { popupApiRows } from './popup';
import { modalApiRows } from './modal';
import { drawerApiRows } from './drawer';
import { tourApiRows } from './tour';
export const componentApiRows: Record<string, Record<SiteLanguage, ApiContent>> = {
  button: buttonApiRows,
  typography: typographyApiRows,
  'float-button': floatButtonApiRows,
  divider: dividerApiRows,
  space: spaceApiRows,
  flex: flexApiRows,
  grid: gridApiRows,
  layout: layoutApiRows,
  splitter: splitterApiRows,
  breadcrumb: breadcrumbApiRows,
  tabs: tabsApiRows,
  steps: stepsApiRows,
  pagination: paginationApiRows,
  menu: menuApiRows,
  anchor: anchorApiRows,
  affix: affixApiRows,
  input: inputApiRows,
  textarea: textareaApiRows,
  'input-number': inputNumberApiRows,
  select: selectApiRows,
  'auto-complete': autoCompleteApiRows,
  cascader: cascaderApiRows,
  checkbox: checkboxApiRows,
  radio: radioApiRows,
  switch: switchApiRows,
  slider: sliderApiRows,
  rate: rateApiRows,
  segmented: segmentedApiRows,
  'date-picker': datePickerApiRows,
  'time-picker': timePickerApiRows,
  'color-picker': colorPickerApiRows,
  mentions: mentionsApiRows,
  'tree-select': treeSelectApiRows,
  upload: uploadApiRows,
  form: formApiRows,
  transfer: transferApiRows,
  card: cardApiRows,
  avatar: avatarApiRows,
  badge: badgeApiRows,
  tag: tagApiRows,
  table: tableApiRows,
  list: listApiRows,
  descriptions: descriptionsApiRows,
  statistic: statisticApiRows,
  timeline: timelineApiRows,
  collapse: collapseApiRows,
  calendar: calendarApiRows,
  carousel: carouselApiRows,
  image: imageApiRows,
  tree: treeApiRows,
  watermark: watermarkApiRows,
  empty: emptyApiRows,
  alert: alertApiRows,
  message: messageApiRows,
  notification: notificationApiRows,
  progress: progressApiRows,
  skeleton: skeletonApiRows,
  result: resultApiRows,
  spin: spinApiRows,
  loading: loadingApiRows,
  popup: popupApiRows,
  modal: modalApiRows,
  drawer: drawerApiRows,
  tour: tourApiRows,
};
export { fallbackApiRows } from './curated/fallback';
