import styled, { css } from 'styled-components';

const inputStyles = css`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ hasError, theme }) =>
    hasError ? theme.colors.error || 'red' : '#F5A623'};
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.grey};
  transition: all 0.2s ease-in-out;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.colors.error || 'red' : '#F5A623'};
    box-shadow: 0 0 0 3px ${({ hasError }) =>
      hasError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(245, 166, 35, 0.2)'};
  }

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const FormFieldContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey};

  .required {
    color: ${({ theme }) => theme.colors.error || 'red'};
    margin-left: 0.25rem;
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
  min-height: 100px;
  resize: vertical;
`;

export const Select = styled.select`
  ${inputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
`;

export const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.error || 'red'};
`;

export const HelperText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey};
`;