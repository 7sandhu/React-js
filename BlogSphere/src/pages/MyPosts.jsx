import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { MyPostCard } from "../components";
import { Container } from "../components";

export default function MyPosts() {
    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData && userData.$id) {
            appwriteService.getPostsByUser(userData.$id)
                .then((userPosts) => {
                    setPosts(userPosts || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [userData]);

    const handleDelete = async (postId, featuredImage) => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            try {
                await appwriteService.deletePost(postId);
                if (featuredImage) {
                    await appwriteService.deleteFile(featuredImage);
                }
                setPosts((prev) => prev.filter((p) => p.$id !== postId));
            } catch (error) {
                alert("Failed to delete post. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <Container>
                <div className="py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center font-playfair">My Posts</h1>
                    {loading ? (
                        <div className="text-center text-gray-500">Loading your posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center text-gray-500">You haven't written any posts yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <MyPostCard key={post.$id} {...post} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
