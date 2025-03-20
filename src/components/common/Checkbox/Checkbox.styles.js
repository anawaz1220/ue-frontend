import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const StyledCheckbox = styled.input`
  margin-right: ${({ theme }) => theme.spacing.small};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;
`;

export default { CheckboxContainer, StyledCheckbox, Label };