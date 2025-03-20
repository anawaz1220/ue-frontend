import React from 'react';
import PropTypes from 'prop-types';
import { StyledTypography } from './Typography.styles';

const Typography = ({
  children,
  variant = 'body1',
  component,
  color,
  align = 'left',
  ...props
}) => {
  return (
    <StyledTypography
      as={component || variantMapping[variant]}
      variant={variant}
      color={color}
      align={align}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

// Default HTML elements for each typography variant
const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'body1', 'body2', 'button', 'caption']),
  component: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
};

export default Typography;