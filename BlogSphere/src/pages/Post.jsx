import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    setError("Post not found");
                }
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching post:", error);
                setError("Failed to load post");
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            try {
                const status = await appwriteService.deletePost(post.$id);
                if (status) {
                    await appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            } catch (error) {
                console.error("Error deleting post:", error);
                alert("Failed to delete post. Please try again.");
            }
        }
    };

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
        );
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
        );
    }

    return post ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <Container>
                {/* Hero Section */}
                <div className="pt-12 pb-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Navigation */}
                        <div className="mb-8">
                            <Link 
                                to="/all-posts"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to All Posts
                            </Link>
                        </div>

                        {/* Featured Image */}
                        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center mx-auto" style={{height: '320px', width: '100%', maxWidth: '600px'}}>
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover object-center rounded-2xl"
                                style={{height: '320px', width: '100%', borderRadius: '1rem'}}
                            />
                        </div>

                        {/* Post Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight font-playfair">
                                {post.title}
                            </h1>
                            
                            {/* Post Meta */}
                            <div className="flex items-center justify-center space-x-6 text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(post.$createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post Content */}
                <div className="pb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
                            <div className="prose prose-lg prose-blue max-w-none">
                                <div className="text-gray-800 leading-relaxed">
                                    {parse(post.content)}
                                </div>
                            </div>
                        </div>

                        {/* Author Card */}
                        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {post.username ? post.username.charAt(0).toUpperCase() : (post.userId ? 'A' : 'U')}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{post.username ? post.username : 'Author'}</h3>
                                    <p className="text-gray-600">Thanks for reading this post!</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-12 flex justify-between items-center">
                            <Link 
                                to="/all-posts"
                                className="btn-secondary"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>All Posts</span>
                                </div>
                            </Link>
                            
                            <Link 
                                to="/add-post"
                                className="btn-primary"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Write a Post</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}