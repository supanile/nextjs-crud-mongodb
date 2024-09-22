"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditPostPage({ params }) {
    const { id } = params;

    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            setPostData(data.post);
            setNewTitle(data.post.title);
            setNewImg(data.post.img);
            setNewContent(data.post.content);
        } catch(error) {
            console.log(error);
            alert("Failed to load post data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newImg, newContent })
            })

            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            router.refresh();
            router.push("/");

        } catch(error) {
            console.log(error);
            alert("An error occurred while updating the post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className='max-w-2xl mx-auto py-8 px-4'>
            <h3 className='text-3xl font-bold mb-6'>Edit Post</h3>
            <Link href="/" className='inline-block bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mb-6'>Go back</Link>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    type="text" 
                    value={newTitle}
                    className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    placeholder='Post title' 
                />
                <input 
                    onChange={(e) => setNewImg(e.target.value)} 
                    type="text" 
                    value={newImg}
                    className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    placeholder='Post img url' 
                />
                <textarea 
                    onChange={(e) => setNewContent(e.target.value)} 
                    value={newContent}
                    className='w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32' 
                    placeholder='Enter your content'
                ></textarea>
                <button 
                    type='submit' 
                    className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    )
}

export default EditPostPage