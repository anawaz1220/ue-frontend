import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContainer, StyledCheckbox, Label } from './Checkbox.styles';

const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  // Extract only valid HTML input attributes, exclude React-specific props
  const {
    // Remove these React-specific props from DOM
    // eslint-disable-next-line no-unused-vars
    label: _label,
    ...inputProps
  } = props;

  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...inputProps} // Now only contains valid HTML attributes
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;