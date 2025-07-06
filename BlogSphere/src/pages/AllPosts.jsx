import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await appwriteService.getPosts([])
                if (response && response.documents) {
                    setPosts(response.documents)
                } else {
                    setError("Failed to fetch posts")
                }
            } catch (error) {
                console.error("Error fetching posts:", error)
                setError(error.message || "An error occurred while fetching posts")
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <div className="spinner h-16 w-16 mx-auto mb-6"></div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading All Posts</h2>
                        <p className="text-gray-500">Fetching the latest content...</p>
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
                            Failed to Load Posts
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

    if (posts.length === 0) {
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
                            Be the first to share your thoughts and create amazing content!
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

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12'>
            <Container>
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
                        All <span className="text-gradient">Posts</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our complete collection of articles and stories from our community
                    </p>
                    <div className="mt-8">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {posts.length} {posts.length === 1 ? 'Post' : 'Posts'} Available
                        </span>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
                            Want to Share Your Story?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join our community of writers and share your unique perspective with the world.
                        </p>
                        <Link 
                            to="/add-post"
                            className="btn-primary px-8 py-3"
                        >
                            <span>Write a Post</span>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AllPosts