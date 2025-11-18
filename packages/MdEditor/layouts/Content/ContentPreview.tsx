// eslint-disable-next-line vue/prefer-import-from-vue
import { LooseRequired } from '@vue/shared';
import {
  defineComponent,
  inject,
  ExtractPropTypes,
  ComputedRef,
  resolveDynamicComponent,
  h,
  Component,
  unref
} from 'vue';
import { prefix } from '~/config';

import { SettingType } from '~/type';
import {
  useCopyCode,
  userZoom,
  useMarkdownIt,
  useTaskState,
  useRemount
} from './composition';
import { contentPreviewProps } from './props';
import UpdateOnDemand from './UpdateOnDemand';

export type ContentPreviewProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof contentPreviewProps>>>
>;

const ContentPreview = defineComponent({
  name: 'ContentPreview',
  props: contentPreviewProps,
  setup(props) {
    const editorId = inject('editorId') as string;
    const setting = inject('setting') as ComputedRef<SettingType>;
    // const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');
    // const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
    // markdown => html
    const { html, key, segments } = useMarkdownIt(props, props.previewOnly);
    // 复制代码
    useCopyCode(props, html, key);
    // 图片点击放大
    userZoom(props, html);
    // 任务状态
    useTaskState(props, html);
    // 标准的重新渲染事件，能够正确获取到html
    useRemount(props, html, key);

    const getSegmentsComponent = () => {
      return segments.value.map((item) => {
        if (item.type === 'html') {
          return <UpdateOnDemand key={item.id} html={item.content || ''} />;
        }
        if (item.type === 'component') {
          const componentSource = unref(item.component);
          const comp = resolveDynamicComponent(componentSource);
          if (typeof comp === 'string' || comp == null) {
            return null;
          }
          return h(comp as Component, {
            key: item.id,
            ...item.props
          });
        }

        return null;
      });
    };

    return () => {
      return (
        <>
          {setting.value.preview &&
            (props.previewOnly ? (
              // <UpdateOnDemand key={key.value} html={html.value} />
              <div key={key.value} class={[`${prefix}-preview--reset`]}>
                {getSegmentsComponent()}
              </div>
            ) : (
              <div
                id={`${editorId}-preview-wrapper`}
                class={`${prefix}-preview-wrapper`}
                key="content-preview-wrapper"
              >
                {/* <UpdateOnDemand key={key.value} html={html.value} /> */}
                <div key={key.value} class={[`${prefix}-preview--reset`]}>
                  {getSegmentsComponent()}
                </div>
              </div>
            ))}

          {setting.value.htmlPreview && (
            <div
              id={`${editorId}-html-wrapper`}
              class={`${prefix}-preview-wrapper`}
              key="html-preview-wrapper"
            >
              <div class={`${prefix}-html`}>{html.value}</div>
            </div>
          )}
        </>
      );
    };
  }
});

export default ContentPreview;
