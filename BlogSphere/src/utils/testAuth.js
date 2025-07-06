// Test utility to verify Appwrite connection
import authService from '../appwrite/auth';
import conf from '../conf/conf';

export const testAppwriteConnection = async () => {
    console.log('Testing Appwrite Configuration:');
    console.log('URL:', conf.appwriteUrl);
    console.log('Project ID:', conf.appwriteProjectId);
    
    try {
        // Test if we can get current user (will fail if not logged in, but connection should work)
        const user = await authService.getCurrentUser();
        console.log('Appwrite connection successful!');
        return true;
    } catch (error) {
        console.error('Appwrite connection failed:', error.message);
        return false;
    }
};

// Test login with demo credentials
export const testLogin = async (email = "test@example.com", password = "password123") => {
    try {
        console.log('Testing login with:', email);
        const session = await authService.login({ email, password });
        console.log('Login test successful:', session);
        return true;
    } catch (error) {
        console.error('Login test failed:', error.message);
        return false;
    }
};
