import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';

export default function SimplePostForm() {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        status: 'active'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('=== SIMPLE FORM SUBMISSION ===');
        console.log('Form Data:', formData);
        console.log('User Data:', userData);
        
        if (!userData || !userData.$id) {
            setError('You must be logged in to create a post.');
            return;
        }

        if (!formData.title || !formData.content) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create slug from title (but don't store it in database)
            const slug = formData.title
                .toLowerCase()
                .trim()
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                + '-' + Date.now();

            console.log('Generated slug (for reference only):', slug);

            // Create post without slug since it's not in the database schema
            const postData = {
                title: formData.title,
                content: formData.content,
                status: formData.status,
                userId: userData.$id,
                featuredImage: 'default' // Placeholder for now
            };

            console.log('Attempting to create post:', postData);
            
            const result = await appwriteService.createPost(postData);
            console.log('Post creation result:', result);

            if (result) {
                alert('Post created successfully!');
                navigate('/');
            } else {
                setError('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setError(error.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Create New Post (Simple Test)</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your post content here..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                        loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                >
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded">
                <h3 className="font-medium mb-2">Debug Info:</h3>
                <p><strong>User ID:</strong> {userData?.$id || 'Not logged in'}</p>
                <p><strong>Current Title:</strong> {formData.title}</p>
                <p><strong>Content Length:</strong> {formData.content.length}</p>
            </div>
        </div>
    );
}
