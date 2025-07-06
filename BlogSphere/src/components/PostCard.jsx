import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage, content, userId, username}) {
    const placeholder = "https://placehold.co/600x400?text=No+Image";
    const [imageUrl, setImageUrl] = useState(placeholder);

    useEffect(() => {
        if (featuredImage) {
            try {
                const preview = appwriteService.getFilePreview(featuredImage);
                if (typeof preview === 'string') {
                    setImageUrl(preview);
                } else if (typeof preview === 'object' && typeof preview.toString === 'function') {
                    setImageUrl(preview.toString());
                } else if (preview instanceof Promise) {
                    preview.then(url => setImageUrl(url.toString())).catch(() => setImageUrl(placeholder));
                }
            } catch {
                setImageUrl(placeholder);
            }
        } else {
            setImageUrl(placeholder);
        }
    }, [featuredImage]);
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='group w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100'>
            <div className='relative overflow-hidden'>
                <img 
                    src={imageUrl} 
                    alt={title}
                    className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110' 
                    onError={e => { e.target.onerror = null; e.target.src = placeholder; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                        <span>Read more</span>
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default PostCard