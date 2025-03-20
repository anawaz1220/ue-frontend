import React from 'react';
import {
  FormFieldContainer,
  Label,
  Input,
  TextArea,
  Select,
  ErrorMessage,
  HelperText
} from './FormField.styles';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  options,
  required = false,
  ...props
}) => {
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <TextArea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            hasError={!!error}
            {...props}
          />
        );
      case 'select':
        return (
          <Select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            hasError={!!error}
            {...props}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Select>
        );
      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            hasError={!!error}
            {...props}
          />
        );
    }
  };

  return (
    <FormFieldContainer>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}
      {renderField()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </FormFieldContainer>
  );
};

export default FormField;