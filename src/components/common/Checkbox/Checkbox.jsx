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
  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
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