import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { 
  InputContainer, 
  StyledInput, 
  Label, 
  ErrorMessage,
  IconButton,
  PasswordVisibilityIcon
} from './Input.styles';

const Input = forwardRef(({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}{required && ' *'}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledInput
          ref={ref} // Forward the ref
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          disabled={disabled}
          {...props}
        />
        {type === 'password' && (
          <IconButton 
            type="button" 
            onClick={togglePasswordVisibility}
          >
            <PasswordVisibilityIcon showPassword={showPassword} />
          </IconButton>
        )}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
});

// Add display name for debugging
Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Input;