import styled from 'styled-components';

export const StyledTypography = styled.p`
  margin: 0;
  color: ${({ theme, color }) => (color ? theme.colors[color] || color : theme.colors.grey)};
  text-align: ${({ align }) => align};
  
  /* Apply typography styles based on variant */
  ${({ theme, variant }) => {
    const styles = theme.typography[variant];
    return `
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
    `;
  }}
`;

export default { StyledTypography };