// Create this as src/utils/testDeployment.js
// Test script to verify backend connectivity before deployment

const testBackendConnectivity = async () => {
  const baseURL = 'https://ue-backend-production.up.railway.app';
  const vercelOrigin = 'https://ue-frontend.vercel.app';
  
  console.log('🧪 Testing backend connectivity for deployment...');
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/health`, {
      headers: {
        'Origin': vercelOrigin
      }
    });
    console.log('✅ Health check:', healthResponse.status);
    
    // Test 2: CORS preflight
    console.log('2️⃣ Testing CORS preflight...');
    const corsResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': vercelOrigin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ CORS preflight:', corsResponse.status);
    
    // Test 3: Login endpoint (with invalid credentials to test connectivity)
    console.log('3️⃣ Testing login endpoint connectivity...');
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': vercelOrigin
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'testpassword'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login endpoint connectivity:', loginResponse.status);
    console.log('Response:', loginData);
    
    if (loginResponse.status === 400 || loginResponse.status === 401) {
      console.log('✅ Backend is responding correctly (authentication error expected)');
    } else if (loginResponse.status === 500) {
      console.log('⚠️ 500 error - there might be a backend issue');
    }
    
    console.log('🎉 Pre-deployment test completed!');
    
  } catch (error) {
    console.error('❌ Pre-deployment test failed:', error);
  }
};

// Run the test
if (typeof window !== 'undefined') {
  window.testBackendConnectivity = testBackendConnectivity;
}

export default testBackendConnectivity;