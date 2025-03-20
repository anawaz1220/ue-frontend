import React, { useState, useRef } from 'react';
import {
  ImageUploadContainer,
  Label,
  UploadArea,
  UploadIcon,
  UploadText,
  HiddenInput,
  ImagePreviewContainer,
  ImagePreview,
  RemoveButton,
  ErrorMessage,
  HelperText
} from './ImageUpload.styles';

const ImageUpload = ({
  label,
  name,
  onChange,
  maxFiles = 1,
  maxSize = 5, // In MB
  acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'],
  helperText,
  error,
  required = false,
  value = []
}) => {
  const [previewImages, setPreviewImages] = useState(value);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const validateFile = (file) => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file format. Accepted formats: ${acceptedFormats
          .map((format) => format.split('/')[1])
          .join(', ')}`
      };
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return {
        valid: false,
        error: `File size exceeds ${maxSize}MB limit`
      };
    }

    return { valid: true };
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let newImages = [...previewImages];
    let validationError = null;

    // Check if adding new files would exceed the max limit
    if (newImages.length + files.length > maxFiles) {
      validationError = `Maximum ${maxFiles} ${
        maxFiles === 1 ? 'image' : 'images'
      } allowed`;
      // Still process up to the max limit
      files.splice(0, maxFiles - newImages.length);
    }

    // Process each file
    files.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push({
            file,
            preview: event.target.result
          });
          setPreviewImages([...newImages]);
          
          // Notify parent component
          if (onChange) {
            onChange({
              target: {
                name,
                value: newImages
              }
            });
          }
        };
        reader.readAsDataURL(file);
      } else {
        validationError = validation.error;
      }
    });

    // If there was an error, you might want to handle it
    if (validationError && error) {
      error(validationError);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
    
    // Notify parent component
    if (onChange) {
      onChange({
        target: {
          name,
          value: newImages
        }
      });
    }
  };

  return (
    <ImageUploadContainer>
      {label && (
        <Label>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}
      
      {previewImages.length < maxFiles && (
        <UploadArea onClick={handleClick} hasError={!!error}>
          <UploadIcon>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </UploadIcon>
          <UploadText>
            Click to upload or drag and drop
            <br />
            <span>
              {acceptedFormats
                .map((format) => format.split('/')[1].toUpperCase())
                .join(', ')} (Max: {maxSize}MB)
            </span>
          </UploadText>
        </UploadArea>
      )}
      
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFormats.join(',')}
        multiple={maxFiles > 1}
      />
      
      {previewImages.length > 0 && (
        <ImagePreviewContainer>
          {previewImages.map((image, index) => (
            <ImagePreview key={index}>
              <img src={image.preview} alt={`Preview ${index + 1}`} />
              <RemoveButton
                onClick={() => handleRemoveImage(index)}
                aria-label="Remove image"
              >
                ×
              </RemoveButton>
            </ImagePreview>
          ))}
        </ImagePreviewContainer>
      )}
      
      {error && typeof error === 'string' && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </ImageUploadContainer>
  );
};

export default ImageUpload;