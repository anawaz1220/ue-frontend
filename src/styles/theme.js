const theme = {
  colors: {
    primary: '#000000',
    secondary: '#F5A623',
    accent: '#F5F9FF',
    white: '#FFFFFF',
    lightGrey: '#E0E0E0',
    grey: '#4F4F4F',
    lightBackground: '#F8F8F8',
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
    // Add orange from the login button
    orange: '#FF5E14'
  },
  fontSizes: {
    xs: '10px',
    small: '12px',
    medium: '14px',
    large: '16px',
    xlarge: '20px',
    xxlarge: '24px',
    xxxlarge: '32px',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  spacing: {
    xs: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '48px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '9999px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '767px',
    tablet: '1023px',
    desktop: '1024px',
  },
  // Typography variants for consistent text styling
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.66,
    },
  }
};

export default theme;