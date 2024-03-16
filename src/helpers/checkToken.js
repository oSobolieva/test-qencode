
export default async function verifyAccessToken(accessToken) {
    try {
        const response = await fetch('https://auth-qa.qencode.com/v1/auth/access-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.status; 
    } catch (error) {
        console.error('Error!:', error);
    }
}
