import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                } else {
                    setError("Post not found")
                }
                setLoading(false)
            }).catch((error) => {
                console.error("Error fetching post:", error)
                setError("Failed to load post")
                setLoading(false)
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <div className="spinner h-16 w-16 mx-auto mb-6"></div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Post</h2>
                        <p className="text-gray-500">Please wait while we fetch the content...</p>
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
                            Post Not Found
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {error}
                        </p>
                        <Link 
                            to="/"
                            className="btn-primary"
                        >
                            Back to Home
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12'>
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
                            Edit <span className="text-gradient">Post</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Update your content and make it even better. Your readers will appreciate the improvements!
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <PostForm post={post} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost