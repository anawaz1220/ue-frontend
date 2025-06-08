// utils/authDebug.js
export const debugAuth = () => {
  if (process.env.NODE_ENV !== 'development') return;
  
  console.group('🔍 Auth Debug Info');
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log('Environment:', process.env.REACT_APP_ENVIRONMENT);
  console.log('Stored Token:', localStorage.getItem('urbanease_access_token'));
  console.log('Token Expired:', /* check expiration logic */);
  console.groupEnd();
};