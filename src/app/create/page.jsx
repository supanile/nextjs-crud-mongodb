"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!title || !img || !content) {
            alert("Please complete all inputs.");
            setIsSubmitting(false);
            return;      
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, img, content })
            })

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }

        } catch(error) {
            console.log(error);
            alert("An error occurred while creating the post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <div className='max-w-2xl mx-auto py-8 px-4'>
        <h3 className='text-3xl font-bold mb-6'>Create Post</h3>
        <Link href="/" className='inline-block bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mb-6'>Go back</Link>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                placeholder='Post title' 
            />
            <input 
                onChange={(e) => setImg(e.target.value)} 
                type="text" 
                className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                placeholder='Post img url' 
            />
            <textarea 
                onChange={(e) => setContent(e.target.value)} 
                className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32' 
                placeholder='Enter your content'
            ></textarea>
            <button 
                type='submit' 
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
        </form>
    </div>
  )
}

export default CreatePostPage