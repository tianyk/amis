/**
 * @file Checkbox
 * @author fex
 */

import React from 'react';
import {ClassNamesFn, themeable} from '../theme';
import {autobind} from '../utils/helper';

interface CheckboxProps {
  id?: string;
  key?: string | number;
  style?: React.CSSProperties;
  type: 'checkbox' | 'radio';
  size?: 'sm' | 'lg' | 'small' | 'large';
  label?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (value: any) => void;
  value?: any;
  containerClass?: string;
  inline?: boolean;
  trueValue?: boolean;
  falseValue?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  checked?: boolean;
  name?: string;
  description?: string;
  classPrefix: string;
  classnames: ClassNamesFn;
  partial?: boolean;
  data?: any;
}

export class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: Pick<
    CheckboxProps,
    'trueValue' | 'falseValue' | 'type'
  > = {
    trueValue: true,
    falseValue: false,
    type: 'checkbox'
  };

  @autobind
  handleCheck(e: React.ChangeEvent<any>) {
    const {trueValue, falseValue, onChange} = this.props;

    if (!onChange) {
      return;
    }

    onChange(e.currentTarget.checked ? trueValue : falseValue);
  }

  render() {
    let {
      size,
      className,
      classnames: cx,
      value,
      label,
      partial,
      trueValue,
      children,
      disabled,
      description,
      readOnly,
      checked,
      type,
      name,
      labelClassName
    } = this.props;

    return (
      <label
        className={cx(`Checkbox Checkbox--${type}`, className, {
          'Checkbox--full': !partial,
          [`Checkbox--${size}`]: size
        })}
      >
        <input
          type={type}
          checked={
            typeof checked !== 'undefined'
              ? checked
              : typeof value === 'undefined'
              ? value
              : value == trueValue
          }
          onChange={this.handleCheck}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
        />
        <i />
        <span className={cx(labelClassName)}>{children || label}</span>
        {description ? (
          <div className={cx('Checkbox-desc')}>{description}</div>
        ) : null}
      </label>
    );
  }
}

export default themeable(Checkbox);
