import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12'>
        <Container>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
                        Create New <span className="text-gradient">Post</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Share your ideas, stories, and insights with our community. Let your creativity flow!
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <PostForm />
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default AddPost