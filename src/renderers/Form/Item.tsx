import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {IFormItemStore, IFormStore} from '../../store/form';
import {reaction} from 'mobx';

import {
  RendererProps,
  registerRenderer,
  TestFunc,
  RendererConfig
} from '../../factory';
import {anyChanged, ucFirst, getWidthRate, autobind} from '../../utils/helper';
import {observer} from 'mobx-react';
import {FormHorizontal, FormSchema, FormSchemaHorizontal} from '.';
import {Schema} from '../../types';
import {filter} from '../../utils/tpl';
import {SchemaRemark} from '../Remark';
import {BaseSchema, SchemaClassName} from '../../Schema';
import {TextControlSchema} from './Text';
import {SelectControlSchema} from './Select';
import {TextareaControlSchema} from './Textarea';
import {ArrayControlSchema} from './Array';
import {ComboControlSchema} from './Combo';
import {ButtonControlSchema} from './Button';
import {ButtonGroupControlSchema} from './ButtonGroup';
import {ButtonToolbarControlSchema} from './ButtonToolbar';
import {ChainedSelectControlSchema} from './ChainedSelect';
import {CheckboxControlSchema} from './Checkbox';
import {CheckboxesControlSchema} from './Checkboxes';
import {CityControlSchema} from './City';
import {ColorControlSchema} from './Color';
import {ConditionBuilderControlSchema} from './ConditionBuilder';
import {ContainerControlSchema} from './Container';
import {
  DateControlSchema,
  DateTimeControlSchema,
  MonthControlSchema,
  QuarterControlSchema,
  TimeControlSchema
} from './Date';
import {DateRangeControlSchema} from './DateRange';
import {DiffControlSchema} from './DiffEditor';
import {EditorControlSchema} from './Editor';
import {FieldSetControlSchema} from './FieldSet';
import {FileControlSchema} from './File';
import {FormulaControlSchema} from './Formula';
import {GridControlSchema} from './Grid';
import {GroupControlSchema} from './Group';
import {HBoxControlSchema} from './HBox';
import {HiddenControlSchema} from './Hidden';
import {IconPickerControlSchema} from './IconPicker';
import {ImageControlSchema} from './Image';
import {InputGroupControlSchema} from './InputGroup';
import {ListControlSchema} from './List';
import {LocationControlSchema} from './Location';
import {MatrixControlSchema} from './Matrix';
import {NestedSelectControlSchema} from './NestedSelect';
import {NumberControlSchema} from './Number';
import {PanelControlSchema} from './Panel';
import {PickerControlSchema} from './Picker';
import {RadiosControlSchema} from './Radios';
import {RangeControlSchema} from './Range';
import {RatingControlSchema} from './Rating';
import {RepeatControlSchema} from './Repeat';
import {RichTextControlSchema} from './RichText';
import {ServiceControlSchema} from './Service';
import {StaticControlRestSchema, StaticControlSchema} from './Static';
import {SubFormControlSchema} from './SubForm';
import {SwitchControlSchema} from './Switch';
import {TableControlSchema} from './Table';
import {TabsControlSchema} from './Tabs';
import {TabsTransferControlSchema} from './TabsTransfer';
import {TagControlSchema} from './Tag';
import {TransferControlSchema} from './Transfer';
import {TreeControlSchema} from './Tree';
import {TreeSelectControlSchema} from './TreeSelect';
import {UUIDControlSchema} from './UUID';
import {PlainSchema} from '../Plain';
import {TplSchema} from '../Tpl';
import {DividerSchema} from '../Divider';
import {HocStoreFactory} from '../../WithStore';
import {MonthRangeControlSchema} from './MonthRange';

export type FormControlType =
  | 'array'
  | 'button'
  | 'submit'
  | 'reset'
  | 'button-group'
  | 'button-toolbar'
  | 'chained-select'
  | 'chart-radios'
  | 'checkbox'
  | 'checkboxes'
  | 'city'
  | 'color'
  | 'combo'
  | 'condition-builder'
  | 'container'
  | 'date'
  | 'datetime'
  | 'time'
  | 'quarter'
  | 'month'
  | 'date-range'
  | 'diff'

  // editor ??????
  | 'editor'
  | 'bat-editor'
  | 'c-editor'
  | 'coffeescript-editor'
  | 'cpp-editor'
  | 'csharp-editor'
  | 'css-editor'
  | 'dockerfile-editor'
  | 'fsharp-editor'
  | 'go-editor'
  | 'handlebars-editor'
  | 'html-editor'
  | 'ini-editor'
  | 'java-editor'
  | 'javascript-editor'
  | 'json-editor'
  | 'less-editor'
  | 'lua-editor'
  | 'markdown-editor'
  | 'msdax-editor'
  | 'objective-c-editor'
  | 'php-editor'
  | 'plaintext-editor'
  | 'postiats-editor'
  | 'powershell-editor'
  | 'pug-editor'
  | 'python-editor'
  | 'r-editor'
  | 'razor-editor'
  | 'ruby-editor'
  | 'sb-editor'
  | 'scss-editor'
  | 'sol-editor'
  | 'sql-editor'
  | 'swift-editor'
  | 'typescript-editor'
  | 'vb-editor'
  | 'xml-editor'
  | 'yaml-editor'

  //
  | 'fieldset'
  | 'fieldSet'
  | 'file'
  | 'formula'
  | 'grid'
  | 'group'
  | 'hbox'
  | 'hidden'
  | 'icon-picker'
  | 'image'
  | 'input-group'
  | 'list'
  | 'location'
  | 'matrix'
  | 'month-range'
  | 'nested-select'
  | 'number'
  | 'panel'
  | 'picker'
  | 'radios'
  | 'range'
  | 'rating'
  | 'repeat'
  | 'rich-text'
  | 'select'
  | 'service'
  | 'static'
  | 'form'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'tabs-transfer'
  | 'tag'
  | 'text'
  | 'password'
  | 'email'
  | 'url'
  | 'uuid'
  | 'multi-select'
  | 'textarea'
  | 'transfer'
  | 'tree'
  | 'tree-select'

  // ????????????????????????????????????
  | 'divider'
  | 'html'
  | 'plain'
  | 'tpl';

export type FormControlSchema =
  | ArrayControlSchema
  | ButtonControlSchema
  | ButtonGroupControlSchema
  | ButtonToolbarControlSchema
  | ChainedSelectControlSchema
  | CheckboxControlSchema
  | CheckboxesControlSchema
  | CityControlSchema
  | ColorControlSchema
  | ComboControlSchema
  | ConditionBuilderControlSchema
  | ContainerControlSchema
  | DateControlSchema
  | DateTimeControlSchema
  | TimeControlSchema
  | MonthControlSchema
  | MonthControlSchema
  | QuarterControlSchema
  | DateRangeControlSchema
  | DiffControlSchema
  | EditorControlSchema
  | FieldSetControlSchema
  | FileControlSchema
  | FormulaControlSchema
  | GridControlSchema
  | GroupControlSchema
  | HBoxControlSchema
  | HiddenControlSchema
  | IconPickerControlSchema
  | ImageControlSchema
  | InputGroupControlSchema
  | ListControlSchema
  | LocationControlSchema
  | UUIDControlSchema
  | MatrixControlSchema
  | MonthRangeControlSchema
  | NestedSelectControlSchema
  | NumberControlSchema
  | PanelControlSchema
  | PickerControlSchema
  | RadiosControlSchema
  | RangeControlSchema
  | RatingControlSchema
  | RichTextControlSchema
  | RepeatControlSchema
  | SelectControlSchema
  | ServiceControlSchema
  | SubFormControlSchema
  | SwitchControlSchema
  | StaticControlSchema
  | StaticControlRestSchema
  | TableControlSchema
  | TabsControlSchema
  | TabsTransferControlSchema
  | TagControlSchema
  | TextControlSchema
  | TextareaControlSchema
  | TransferControlSchema
  | TreeControlSchema
  | TreeSelectControlSchema

  // ??????????????????????????????????????????
  | DividerSchema;

export type FormControlSchemaAlias = FormControlSchema;

export interface FormBaseControl extends Omit<BaseSchema, 'type'> {
  /**
   * ???????????????
   */
  type: FormControlType;

  /**
   * ???????????????
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';

  /**
   * ????????????
   */
  label?: string | false;

  /**
   * ?????? label className
   */
  labelClassName?: SchemaClassName;

  /**
   * ?????????????????????????????? key????????????????????????.??????????????? a.b.c
   */
  name?: string;

  /**
   * ?????????????????????, ??????????????????????????????????????????
   */
  remark?: SchemaRemark;

  /**
   * ?????????????????????, ??????????????????????????????????????????, ?????????????????? label ?????????
   */
  labelRemark?: SchemaRemark;

  /**
   * ????????????????????????????????????
   */
  hint?: string;

  /**
   * ??????????????????????????????????????????
   */
  submitOnChange?: boolean;

  /**
   * ????????????
   */
  readOnly?: boolean;

  /**
   * ????????????????????????????????????????????????????????????????????????????????????
   * ????????????????????????????????????????????????????????????????????????????????????
   */
  validateOnChange?: boolean;

  /**
   * ????????????????????? Html ?????????
   */
  description?: string;

  /**
   * @deprecated ??? description ??????
   */
  desc?: string;

  /**
   * ?????????????????? className
   */
  descriptionClassName?: SchemaClassName;

  /**
   * ?????????????????????????????????
   */
  mode?: 'normal' | 'inline' | 'horizontal';

  /**
   * ????????????????????????????????????????????????????????????????????????
   */
  horizontal?: FormSchemaHorizontal;

  /**
   * ?????? control ????????? inline ?????????
   */
  inline?: boolean;

  /**
   * ?????? input className
   */
  inputClassName?: SchemaClassName;

  /**
   * ?????????
   */
  placeholder?: string;

  /**
   * ???????????????
   */
  required?: boolean;

  /**
   * ???????????????????????????
   */
  validationErrors?: {
    isAlpha?: string;
    isAlphanumeric?: string;
    isEmail?: string;
    isFloat?: string;
    isInt?: string;
    isJson?: string;
    isLength?: string;
    isNumeric?: string;
    isRequired?: string;
    isUrl?: string;
    matchRegexp?: string;
    matchRegexp2?: string;
    matchRegexp3?: string;
    matchRegexp4?: string;
    matchRegexp5?: string;
    maxLength?: string;
    maximum?: string;
    minLength?: string;
    minimum?: string;

    [propName: string]: any;
  };

  validations?:
    | string
    | {
        /**
         * ???????????????
         */
        isAlpha?: boolean;

        /**
         * ?????????????????????
         */
        isAlphanumeric?: boolean;

        /**
         * ?????????????????????
         */
        isEmail?: boolean;

        /**
         * ??????????????????
         */
        isFloat?: boolean;

        /**
         * ???????????????
         */
        isInt?: boolean;

        /**
         * ????????? json
         */
        isJson?: boolean;

        /**
         * ?????????????????????
         */
        isLength?: number;

        /**
         * ???????????????
         */
        isNumeric?: boolean;

        /**
         * ???????????????
         */
        isRequired?: boolean;

        /**
         * ????????? URL ??????
         */
        isUrl?: boolean;

        /**
         * ????????????????????????
         */
        matchRegexp?: string;
        /**
         * ????????????????????????
         */
        matchRegexp1?: string;
        /**
         * ????????????????????????
         */
        matchRegexp2?: string;
        /**
         * ????????????????????????
         */
        matchRegexp3?: string;
        /**
         * ????????????????????????
         */
        matchRegexp4?: string;
        /**
         * ????????????????????????
         */
        matchRegexp5?: string;

        /**
         * ????????????????????????
         */
        maxLength?: number;

        /**
         * ?????????????????????
         */
        maximum?: number;

        /**
         * ????????????????????????
         */
        minLength?: number;

        /**
         * ?????????????????????
         */
        minimum?: number;

        [propName: string]: any;
      };

  /**
   * ?????????????????????????????????????????????????????????????????????????????????????????? name ?????????????????????
   */
  value?: any;

  /**
   * ???????????????????????????????????? Form ?????????????????????????????????????????????????????????????????????????????????
   */
  clearValueOnHidden?: boolean;
}

export interface FormItemBasicConfig extends Partial<RendererConfig> {
  type?: string;
  wrap?: boolean;
  renderLabel?: boolean;
  renderDescription?: boolean;
  test?: RegExp | TestFunc;
  storeType?: string;
  validations?: string;
  strictMode?: boolean;
  descriptionClassName?: string;
  storeExtendsData?: boolean;
  sizeMutable?: boolean;
  weight?: number;
  extendsData?: boolean;
  showErrorMsg?: boolean;

  // ???????????????????????????????????? Component ???????????? validate ???????????????
  validate?: (values: any, value: any) => string | boolean;
}

// ????????????????????????
export interface FormItemProps extends RendererProps {
  name?: string;
  formStore?: IFormStore;
  formItem?: IFormItemStore;
  formInited: boolean;
  formMode: 'normal' | 'horizontal' | 'inline' | 'row' | 'default';
  formHorizontal: FormHorizontal;
  defaultSize?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  btnDisabled: boolean;
  defaultValue: any;
  value?: any;
  prinstine: any;
  setPrinstineValue: (value: any) => void;
  onChange: (
    value: any,
    submitOnChange?: boolean,
    changeImmediately?: boolean
  ) => void;
  onBulkChange: (
    values: {[propName: string]: any},
    submitOnChange?: boolean
  ) => void;
  addHook: (fn: Function, mode?: 'validate' | 'init' | 'flush') => () => void;
  removeHook: (fn: Function, mode?: 'validate' | 'init' | 'flush') => void;
  renderFormItems: (
    schema: Partial<FormSchema>,
    region: string,
    props: any
  ) => JSX.Element;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;

  formItemValue: any; // ??????????????? ???????????? v1
  getValue: () => any; // ??????????????? ???????????? v1
  setValue: (value: any, key: string) => void; // ??????????????? ???????????? v1

  inputClassName?: string;
  renderControl?: (props: FormControlProps) => JSX.Element;

  inputOnly?: boolean;
  renderLabel?: boolean;
  renderDescription?: boolean;
  sizeMutable?: boolean;
  wrap?: boolean;
  hint?: string;
  description?: string;
  descriptionClassName?: string;
  // error ??????
  errors?: {
    [propName: string]: string;
  };
  // error string
  error?: string;
  showErrorMsg?: boolean;
}

// ?????????????????????
export type FormControlProps = RendererProps & {
  onOpenDialog: (schema: Schema, data: any) => Promise<any>;
} & Exclude<
    FormItemProps,
    | 'inputClassName'
    | 'renderControl'
    | 'defaultSize'
    | 'size'
    | 'error'
    | 'errors'
    | 'hint'
    | 'descriptionClassName'
    | 'inputOnly'
    | 'renderLabel'
    | 'renderDescription'
    | 'sizeMutable'
    | 'wrap'
  >;

export type FormItemComponent = React.ComponentType<FormItemProps>;
export type FormControlComponent = React.ComponentType<FormControlProps>;

export interface FormItemConfig extends FormItemBasicConfig {
  component: FormControlComponent;
}

export class FormItemWrap extends React.Component<FormItemProps> {
  reaction: any;

  componentWillMount() {
    const {formItem: model} = this.props;

    if (model) {
      this.reaction = reaction(
        () => `${model.errors.join('')}${model.isFocused}${model.dialogOpen}`,
        () => this.forceUpdate()
      );
    }
  }

  componentWillUnmount() {
    this.reaction && this.reaction();
  }

  @autobind
  handleFocus(e: any) {
    const {formItem: model} = this.props;
    model && model.focus();
    this.props.onFocus && this.props.onFocus(e);
  }

  @autobind
  handleBlur(e: any) {
    const {formItem: model} = this.props;
    model && model.blur();
    this.props.onBlur && this.props.onBlur(e);
  }

  @autobind
  async handleOpenDialog(schema: Schema, data: any) {
    const {formItem: model} = this.props;
    if (!model) {
      return;
    }

    return new Promise(resolve =>
      model.openDialog(schema, data, (result?: any) => resolve(result))
    );
  }

  @autobind
  handleDialogConfirm([values]: Array<any>) {
    const {formItem: model} = this.props;
    if (!model) {
      return;
    }

    model.closeDialog(values);
  }

  @autobind
  handleDialogClose() {
    const {formItem: model} = this.props;
    if (!model) {
      return;
    }
    model.closeDialog();
  }

  renderControl() {
    const {
      inputClassName,
      formItem: model,
      classnames: cx,
      children,
      type,
      renderControl,
      formItemConfig,
      sizeMutable,
      size,
      defaultSize,
      ...rest
    } = this.props;

    if (renderControl) {
      const controlSize = size || defaultSize;
      return renderControl({
        ...rest,
        onOpenDialog: this.handleOpenDialog,
        type,
        classnames: cx,
        formItem: model,
        className: cx(
          `Form-control`,
          {
            'is-inline': !!rest.inline,
            'is-error': model && !model.valid,
            [`Form-control--withSize Form-control--size${ucFirst(
              controlSize
            )}`]:
              sizeMutable !== false &&
              typeof controlSize === 'string' &&
              !!controlSize &&
              controlSize !== 'full'
          },
          inputClassName
        )
      });
    }

    return null;
  }

  renderHorizontal() {
    let {
      className,
      classnames: cx,
      description,
      descriptionClassName,
      captionClassName,
      desc,
      label,
      labelClassName,
      render,
      required,
      caption,
      remark,
      labelRemark,
      env,
      formItem: model,
      renderLabel,
      renderDescription,
      hint,
      data,
      showErrorMsg
    } = this.props;

    // ??????????????? label ??????
    if (renderLabel === false) {
      label = label === false ? false : '';
    }

    description = description || desc;
    const horizontal = this.props.horizontal || this.props.formHorizontal;
    const left = getWidthRate(horizontal.left);
    const right = getWidthRate(horizontal.right);

    return (
      <div
        data-role="form-item"
        className={cx(`Form-item Form-item--horizontal`, className, {
          [`is-error`]: model && !model.valid,
          [`is-required`]: required
        })}
      >
        {label !== false ? (
          <label
            className={cx(
              `Form-label`,
              {
                [`Form-itemColumn--${
                  typeof horizontal.leftFixed === 'string'
                    ? horizontal.leftFixed
                    : 'normal'
                }`]: horizontal.leftFixed,
                [`Form-itemColumn--${left}`]: !horizontal.leftFixed
              },
              labelClassName
            )}
          >
            <span>
              {filter(label, data)}
              {required && (label || labelRemark) ? (
                <span className={cx(`Form-star`)}>*</span>
              ) : null}
              {labelRemark
                ? render('label-remark', {
                    type: 'remark',
                    icon: labelRemark.icon || 'warning-mark',
                    tooltip: labelRemark,
                    className: cx(`Form-labelRemark`),
                    container:
                      env && env.getModalContainer
                        ? env.getModalContainer
                        : undefined
                  })
                : null}
            </span>
          </label>
        ) : null}

        <div
          className={cx(`Form-value`, {
            // [`Form-itemColumn--offset${getWidthRate(horizontal.offset)}`]: !label && label !== false,
            [`Form-itemColumn--${right}`]: !!right && right !== 12 - left
          })}
        >
          {this.renderControl()}

          {caption
            ? render('caption', caption, {
                className: cx(`Form-caption`, captionClassName)
              })
            : null}

          {remark
            ? render('remark', {
                type: 'remark',
                icon: remark.icon || 'warning-mark',
                tooltip: remark,
                className: cx(`Form-remark`),
                container:
                  env && env.getModalContainer
                    ? env.getModalContainer
                    : undefined
              })
            : null}

          {hint && model && model.isFocused
            ? render('hint', hint, {
                className: cx(`Form-hint`)
              })
            : null}

          {model &&
          !model.valid &&
          showErrorMsg !== false &&
          Array.isArray(model.errors) ? (
            <ul className={cx(`Form-feedback`)}>
              {model.errors.map((msg: string, key: number) => (
                <li key={key}>{msg}</li>
              ))}
            </ul>
          ) : null}

          {renderDescription !== false && description
            ? render('description', description, {
                className: cx(`Form-description`, descriptionClassName)
              })
            : null}
        </div>
      </div>
    );
  }

  renderNormal() {
    let {
      className,
      classnames: cx,
      desc,
      description,
      label,
      labelClassName,
      render,
      required,
      caption,
      remark,
      labelRemark,
      env,
      descriptionClassName,
      captionClassName,
      formItem: model,
      renderLabel,
      renderDescription,
      hint,
      formMode,
      data,
      showErrorMsg
    } = this.props;

    description = description || desc;

    return (
      <div
        data-role="form-item"
        className={cx(`Form-item Form-item--${formMode}`, className, {
          'is-error': model && !model.valid,
          [`is-required`]: required
        })}
      >
        {label && renderLabel !== false ? (
          <label className={cx(`Form-label`, labelClassName)}>
            <span>
              {filter(label, data)}
              {required && (label || labelRemark) ? (
                <span className={cx(`Form-star`)}>*</span>
              ) : null}
              {labelRemark
                ? render('label-remark', {
                    type: 'remark',
                    icon: labelRemark.icon || 'warning-mark',
                    tooltip: labelRemark,
                    className: cx(`Form-lableRemark`),
                    container:
                      env && env.getModalContainer
                        ? env.getModalContainer
                        : undefined
                  })
                : null}
            </span>
          </label>
        ) : null}

        {this.renderControl()}

        {caption
          ? render('caption', caption, {
              className: cx(`Form-caption`, captionClassName)
            })
          : null}

        {remark
          ? render('remark', {
              type: 'remark',
              icon: remark.icon || 'warning-mark',
              className: cx(`Form-remark`),
              tooltip: remark,
              container:
                env && env.getModalContainer ? env.getModalContainer : undefined
            })
          : null}

        {hint && model && model.isFocused
          ? render('hint', hint, {
              className: cx(`Form-hint`)
            })
          : null}

        {model &&
        !model.valid &&
        showErrorMsg !== false &&
        Array.isArray(model.errors) ? (
          <ul className={cx(`Form-feedback`)}>
            {model.errors.map((msg: string, key: number) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        ) : null}

        {renderDescription !== false && description
          ? render('description', description, {
              className: cx(`Form-description`, descriptionClassName)
            })
          : null}
      </div>
    );
  }

  renderInline() {
    let {
      className,
      classnames: cx,
      desc,
      description,
      label,
      labelClassName,
      render,
      required,
      caption,
      descriptionClassName,
      captionClassName,
      formItem: model,
      remark,
      labelRemark,
      env,
      hint,
      renderLabel,
      renderDescription,
      data,
      showErrorMsg
    } = this.props;

    description = description || desc;

    return (
      <div
        data-role="form-item"
        className={cx(`Form-item Form-item--inline`, className, {
          'is-error': model && !model.valid,
          [`is-required`]: required
        })}
      >
        {label && renderLabel !== false ? (
          <label className={cx(`Form-label`, labelClassName)}>
            <span>
              {filter(label, data)}
              {required && (label || labelRemark) ? (
                <span className={cx(`Form-star`)}>*</span>
              ) : null}
              {labelRemark
                ? render('label-remark', {
                    type: 'remark',
                    icon: labelRemark.icon || 'warning-mark',
                    tooltip: labelRemark,
                    className: cx(`Form-lableRemark`),
                    container:
                      env && env.getModalContainer
                        ? env.getModalContainer
                        : undefined
                  })
                : null}
            </span>
          </label>
        ) : null}

        <div className={cx(`Form-value`)}>
          {this.renderControl()}

          {caption
            ? render('caption', caption, {
                className: cx(`Form-caption`, captionClassName)
              })
            : null}

          {remark
            ? render('remark', {
                type: 'remark',
                icon: remark.icon || 'warning-mark',
                className: cx(`Form-remark`),
                tooltip: remark,
                container:
                  env && env.getModalContainer
                    ? env.getModalContainer
                    : undefined
              })
            : null}

          {hint && model && model.isFocused
            ? render('hint', hint, {
                className: cx(`Form-hint`)
              })
            : null}

          {model &&
          !model.valid &&
          showErrorMsg !== false &&
          Array.isArray(model.errors) ? (
            <ul className={cx(`Form-feedback`)}>
              {model.errors.map((msg: string, key: number) => (
                <li key={key}>{msg}</li>
              ))}
            </ul>
          ) : null}

          {renderDescription !== false && description
            ? render('description', description, {
                className: cx(`Form-description`, descriptionClassName)
              })
            : null}
        </div>
      </div>
    );
  }

  renderRow() {
    let {
      className,
      classnames: cx,
      desc,
      description,
      label,
      labelClassName,
      render,
      required,
      caption,
      remark,
      labelRemark,
      env,
      descriptionClassName,
      captionClassName,
      formItem: model,
      renderLabel,
      renderDescription,
      hint,
      formMode,
      data,
      showErrorMsg
    } = this.props;

    description = description || desc;

    return (
      <div
        data-role="form-item"
        className={cx(`Form-item Form-item--${formMode}`, className, {
          'is-error': model && !model.valid,
          [`is-required`]: required
        })}
      >
        <div className={cx('Form-rowInner')}>
          {label && renderLabel !== false ? (
            <label className={cx(`Form-label`, labelClassName)}>
              <span>
                {filter(label, data)}
                {required && (label || labelRemark) ? (
                  <span className={cx(`Form-star`)}>*</span>
                ) : null}
                {labelRemark
                  ? render('label-remark', {
                      type: 'remark',
                      icon: labelRemark.icon || 'warning-mark',
                      tooltip: labelRemark,
                      className: cx(`Form-lableRemark`),
                      container:
                        env && env.getModalContainer
                          ? env.getModalContainer
                          : undefined
                    })
                  : null}
              </span>
            </label>
          ) : null}

          {this.renderControl()}

          {caption
            ? render('caption', caption, {
                className: cx(`Form-caption`, captionClassName)
              })
            : null}

          {remark
            ? render('remark', {
                type: 'remark',
                icon: remark.icon || 'warning-mark',
                className: cx(`Form-remark`),
                tooltip: remark,
                container:
                  env && env.getModalContainer
                    ? env.getModalContainer
                    : undefined
              })
            : null}
        </div>

        {hint && model && model.isFocused
          ? render('hint', hint, {
              className: cx(`Form-hint`)
            })
          : null}

        {model &&
        !model.valid &&
        showErrorMsg !== false &&
        Array.isArray(model.errors) ? (
          <ul className={cx('Form-feedback')}>
            {model.errors.map((msg: string, key: number) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        ) : null}

        {description && renderDescription !== false
          ? render('description', description, {
              className: cx(`Form-description`, descriptionClassName)
            })
          : null}
      </div>
    );
  }

  render() {
    const {formMode, inputOnly, wrap, render, formItem: model} = this.props;

    if (wrap === false || inputOnly) {
      return this.renderControl();
    }

    return (
      <>
        {formMode === 'inline'
          ? this.renderInline()
          : formMode === 'horizontal'
          ? this.renderHorizontal()
          : formMode === 'row'
          ? this.renderRow()
          : this.renderNormal()}
        {model
          ? render(
              'modal',
              {
                type: 'dialog',
                ...model.dialogSchema
              },
              {
                show: model.dialogOpen,
                onClose: this.handleDialogClose,
                onConfirm: this.handleDialogConfirm,
                data: model.dialogData
              }
            )
          : null}
      </>
    );
  }
}

// ????????????????????????????????????????????????????????????????????????
// ????????????  strictMode
export const detectProps = [
  'formPristine', // ???????????????????????????
  'formInited',
  'addable',
  'addButtonClassName',
  'addButtonText',
  'addOn',
  'btnClassName',
  'btnLabel',
  'btnDisabled',
  'className',
  'clearable',
  'columns',
  'columnsCount',
  'controls',
  'desc',
  'description',
  'disabled',
  'draggable',
  'editable',
  'editButtonClassName',
  'formHorizontal',
  'formMode',
  'hideRoot',
  'horizontal',
  'icon',
  'inline',
  'inputClassName',
  'label',
  'labelClassName',
  'labelField',
  'language',
  'level',
  'max',
  'maxRows',
  'min',
  'minRows',
  'multiLine',
  'multiple',
  'option',
  'placeholder',
  'removable',
  'required',
  'remark',
  'hint',
  'rows',
  'searchable',
  'showCompressOptions',
  'size',
  'step',
  'showInput',
  'unit',
  'value',
  'diffValue'
];

export function asFormItem(config: Omit<FormItemConfig, 'component'>) {
  return (Control: FormControlComponent) => {
    const isSFC = !(Control.prototype instanceof React.Component);

    // ???????????? FormItem ?????????
    if (config.validate && !Control.prototype.validate) {
      const fn = config.validate;
      Control.prototype.validate = function () {
        const host = {
          input: this
        };

        return fn.apply(host, arguments);
      };
    } else if (config.validate) {
      console.error(
        'FormItem???????????? validate ???????????????????????????????????????????????????????????? validate ?????????????????????????????????????????????'
      );
    }

    if (config.storeType) {
      Control = HocStoreFactory({
        storeType: config.storeType,
        extendsData: config.extendsData
      })(observer(Control));
      delete config.storeType;
    }

    return hoistNonReactStatic(
      class extends FormItemWrap {
        static defaultProps = {
          className: '',
          renderLabel: config.renderLabel,
          renderDescription: config.renderDescription,
          sizeMutable: config.sizeMutable,
          wrap: config.wrap,
          showErrorMsg: config.showErrorMsg,
          ...Control.defaultProps
        };
        static propsList: any = [
          'value',
          'defaultValue',
          'onChange',
          'setPrinstineValue',
          'readOnly',
          'strictMode',
          ...((Control as any).propsList || [])
        ];

        static displayName = `FormItem${config.type ? `(${config.type})` : ''}`;
        static ComposedComponent = Control;

        ref: any;

        constructor(props: FormItemProps) {
          super(props);
          this.refFn = this.refFn.bind(this);
        }

        componentWillMount() {
          const {validations, formItem: model} = this.props;

          // ??????????????????????????????????????????????????????
          if (model && !validations && config.validations) {
            model.config({
              rules: config.validations
            });
          }

          super.componentWillMount();
        }

        shouldComponentUpdate(nextProps: FormControlProps) {
          if (nextProps.strictMode === false || config.strictMode === false) {
            return true;
          }

          // ???????????????????????????????????????????????????????????????????????????
          if (anyChanged(detectProps, this.props, nextProps)) {
            return true;
          }

          return false;
        }

        getWrappedInstance() {
          return this.ref;
        }

        refFn(ref: any) {
          this.ref = ref;
        }

        renderControl() {
          const {
            inputClassName,
            formItem: model,
            classnames: cx,
            children,
            type,
            size,
            defaultSize,
            ...rest
          } = this.props;

          const controlSize = size || defaultSize;

          return (
            <Control
              {...rest}
              onOpenDialog={this.handleOpenDialog}
              size={config.sizeMutable !== false ? undefined : size}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              type={type}
              classnames={cx}
              ref={isSFC ? undefined : this.refFn}
              forwardedRef={isSFC ? this.refFn : undefined}
              formItem={model}
              className={cx(
                `Form-control`,
                {
                  'is-inline': !!rest.inline,
                  'is-error': model && !model.valid,
                  [`Form-control--withSize Form-control--size${ucFirst(
                    controlSize
                  )}`]:
                    config.sizeMutable !== false &&
                    typeof controlSize === 'string' &&
                    !!controlSize &&
                    controlSize !== 'full'
                },
                inputClassName
              )}
            />
          );
        }
      },
      Control
    );
  };
}

export function registerFormItem(config: FormItemConfig): RendererConfig {
  let Control = asFormItem(config)(config.component);

  return registerRenderer({
    ...config,
    name: config.name || `${config.type}-control`,
    weight: typeof config.weight !== 'undefined' ? config.weight : -100, // ???????????????
    test:
      config.test ||
      new RegExp(
        `(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?${config.type}$`,
        'i'
      ),
    component: Control,
    isFormItem: true
  });
}

export function FormItem(config: FormItemBasicConfig) {
  return function (component: FormControlComponent): any {
    const renderer = registerFormItem({
      ...config,
      component
    });

    return renderer.component as any;
  };
}

export default FormItem;
