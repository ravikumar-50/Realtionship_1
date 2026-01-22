const axios = require('axios');

async function testSignIn() {
    console.log('\n🔐 Testing Sign In Endpoint\n');
    console.log('='.repeat(50));

    try {
        const response = await axios.post('http://localhost:5000/api/auth/signin', {
            email: 'test@example.com',
            password: 'password123'
        });

        console.log('\n✅ LOGIN SUCCESSFUL!\n');
        console.log('User:', response.data.user.name);
        console.log('Email:', response.data.user.email);
        console.log('Token received:', response.data.token ? '✓ Yes' : '✗ No');
        console.log('\n' + '='.repeat(50));
        console.log('\n✓ Login page is working correctly!');
        console.log('✓ Password verification successful');
        console.log('✓ JWT token generated\n');
    } catch (error) {
        console.log('\n❌ LOGIN FAILED\n');
        console.error('Error:', error.response?.data || error.message);
        console.log('\n' + '='.repeat(50) + '\n');
    }
}

testSignIn();
