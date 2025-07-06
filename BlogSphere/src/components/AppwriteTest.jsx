// Simple test component to diagnose Appwrite connection
import React, { useState } from 'react';
import authService from '../appwrite/auth';
import appwriteService from '../appwrite/config';
import conf from '../conf/conf';

export default function AppwriteTest() {
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState(false);

    const runTests = async () => {
        setLoading(true);
        const results = {};

        // Test 1: Configuration
        results.config = {
            url: conf.appwriteUrl,
            projectId: conf.appwriteProjectId,
            databaseId: conf.appwriteDatabaseId,
            collectionId: conf.appwriteCollectionId,
        };

        // Test 2: Auth connection
        try {
            await authService.getCurrentUser();
            results.authConnection = "✅ Auth service connected";
        } catch (error) {
            results.authConnection = `❌ Auth error: ${error.message}`;
        }

        // Test 3: Database connection
        try {
            const posts = await appwriteService.getPosts();
            results.databaseConnection = `✅ Database connected. Posts: ${posts ? posts.documents?.length || 0 : 'Failed'}`;
        } catch (error) {
            results.databaseConnection = `❌ Database error: ${error.message}`;
        }

        setTestResults(results);
        setLoading(false);
    };

    return (
        <div className="p-6 bg-gray-100 m-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Appwrite Connection Test</h2>
            
            <button 
                onClick={runTests}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
                {loading ? 'Testing...' : 'Run Tests'}
            </button>

            {Object.keys(testResults).length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Test Results:</h3>
                    
                    <div>
                        <strong>Configuration:</strong>
                        <pre className="bg-gray-800 text-white p-2 rounded text-sm overflow-x-auto">
                            {JSON.stringify(testResults.config, null, 2)}
                        </pre>
                    </div>
                    
                    <div>
                        <strong>Auth Connection:</strong> {testResults.authConnection}
                    </div>
                    
                    <div>
                        <strong>Database Connection:</strong> {testResults.databaseConnection}
                    </div>
                </div>
            )}
        </div>
    );
}
