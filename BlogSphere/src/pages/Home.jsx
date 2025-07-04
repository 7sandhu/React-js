import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        setLoading(true);
        setError(null);
        setPosts([]);
        
        appwriteService.getPosts()
            .then((response) => {
                if (response && response.documents && Array.isArray(response.documents)) {
                    setPosts(response.documents);
                } else if (response === false) {
                    setError("Failed to fetch posts from database");
                } else {
                    setError("Invalid response format from server");
                }
            })
            .catch((error) => {
                setError(error.message || "Unknown error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [authStatus])
  
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <div className="spinner h-16 w-16 mx-auto mb-6"></div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Posts</h2>
                        <p className="text-gray-500">Please wait while we fetch the latest content...</p>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
                <Container>
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-red-600 mb-4 font-playfair">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {error}
                        </p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Try Again
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0 && !loading && !error) {
        // Check if user is authenticated
        if (!authStatus) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                    <Container>
                        {/* Hero Section */}
                        <div className="pt-20 pb-32 text-center">
                            <div className="max-w-4xl mx-auto">
                                <div className="animate-float mb-8">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                                <h1 className="text-6xl font-bold text-gray-900 mb-6 font-playfair">
                                    Welcome to <span className="text-gradient">BlogSphere</span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                                    Discover amazing stories, insightful articles, and creative content from writers around the world. Join our community and start sharing your ideas today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link 
                                        to="/login"
                                        className="btn-primary px-8 py-4 text-lg"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span>Start Reading</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                    <Link 
                                        to="/signup" 
                                        className="btn-secondary px-8 py-4 text-lg"
                                    >
                                        Join Community
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="py-20 bg-white rounded-3xl shadow-xl">
                            <div className="max-w-6xl mx-auto px-4">
                                <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 font-playfair">
                                    Why Choose BlogSphere?
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Rich Content</h3>
                                        <p className="text-gray-600">Create and share beautiful articles with our powerful editor and media support.</p>
                                    </div>
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                                        <p className="text-gray-600">Connect with like-minded writers and readers in our vibrant community.</p>
                                    </div>
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast & Modern</h3>
                                        <p className="text-gray-600">Built with cutting-edge technology for the best reading and writing experience.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        } else {
            // User is authenticated but no posts found
            return (
                <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
                    <Container>
                        <div className="text-center max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
                                No Posts Yet
                            </h1>
                            <p className="text-gray-600 mb-8 text-lg">
                                Be the first to share your thoughts and create amazing content for the community!
                            </p>
                            <Link 
                                to="/add-post"
                                className="btn-primary px-8 py-4 text-lg"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create Your First Post</span>
                                </div>
                            </Link>
                        </div>
                    </Container>
                </div>
            )
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12'>
            <Container>
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
                        Latest <span className="text-gradient">Stories</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover the most recent articles and insights from our community of writers
                    </p>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className=''>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Load More Section */}
                {posts.length > 0 && (
                    <div className="text-center mt-16">
                        <Link 
                            to="/all-posts"
                            className="btn-secondary px-8 py-4 text-lg"
                        >
                            View All Posts
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Home