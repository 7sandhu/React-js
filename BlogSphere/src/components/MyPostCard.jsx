import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function MyPostCard({ $id, title, featuredImage, content, userId, username, onDelete }) {
    const placeholder = "https://placehold.co/600x400?text=No+Image";
    const [imageUrl, setImageUrl] = useState(placeholder);

    useEffect(() => {
        if (featuredImage) {
            try {
                const viewUrl = appwriteService.getFileView
                    ? appwriteService.getFileView(featuredImage)
                    : appwriteService.bucket.getFileView(
                        appwriteService.bucket.bucketId || appwriteService.bucket._bucketId,
                        featuredImage
                    );
                if (typeof viewUrl === 'string') {
                    setImageUrl(viewUrl);
                } else if (typeof viewUrl === 'object' && typeof viewUrl.toString === 'function') {
                    setImageUrl(viewUrl.toString());
                } else if (viewUrl instanceof Promise) {
                    viewUrl.then(url => setImageUrl(url.toString())).catch(() => setImageUrl(placeholder));
                }
            } catch {
                setImageUrl(placeholder);
            }
        } else {
            setImageUrl(placeholder);
        }
    }, [featuredImage]);

    return (
        <div className='group w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100'>
            <Link to={`/post/${$id}`}>
                <div className='relative overflow-hidden flex items-center justify-center bg-gray-100 mx-auto rounded-t-xl' style={{ height: '260px', width: '100%', maxWidth: '100%', minWidth: '180px' }}>
                    <img
                        src={imageUrl}
                        alt={title}
                        className='w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-t-xl'
                        style={{ height: '260px', width: '100%', borderRadius: '1rem 1rem 0 0' }}
                        onError={e => { e.target.onerror = null; e.target.src = placeholder; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </Link>
            <div className="p-6">
                <h2 className='text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 font-playfair'>
                    {title}
                </h2>
                <p className="text-xs text-gray-500 mb-2 font-medium">{username ? `By ${username}` : userId ? `By ${userId}` : ''}</p>
                {content && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {(() => {
                            const plain = content.replace(/<[^>]*>/g, '');
                            return plain.length > 20 ? plain.substring(0, 20) + '...' : plain;
                        })()}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => onDelete && onDelete($id, featuredImage)}
                        className="px-4 py-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out flex items-center gap-1 group/delete"
                    >
                        <svg className="w-4 h-4 text-white group-hover/delete:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-semibold tracking-wide">Delete</span>
                    </button>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                        <span>Read more</span>
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPostCard;
