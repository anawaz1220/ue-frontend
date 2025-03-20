import styled from 'styled-components';

export const ImageUploadContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey};

  .required {
    color: ${({ theme }) => theme.colors.error || 'red'};
    margin-left: 0.25rem;
  }
`;

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed ${({ hasError, theme }) =>
    hasError ? theme.colors.error || 'red' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}05`};
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.colors.error || 'red' : theme.colors.primary};
  }
`;

export const UploadIcon = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  
  svg {
    width: 48px;
    height: 48px;
  }
`;

export const UploadText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.9rem;
  
  span {
    font-size: 0.8rem;
    color: #bdbdbd;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  
  ${ImagePreview}:hover & {
    opacity: 1;
  }
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