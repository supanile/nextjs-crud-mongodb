"use client"

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import DeleteBtn from './DeleteBtn';

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    } catch(error) {
      console.log("Error loading posts: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">NextJS CRUD</h1>
      <Link href="/create" className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-8">
        Create Post
      </Link>
     
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : postData && postData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {postData.map(val => (
            <div key={val._id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <Image 
                className='w-full h-48 object-cover'
                src={val.img}
                width={300}
                height={200}
                alt={val.title}
              />
              <div className="p-4">
                <h4 className='text-xl font-semibold mb-2'>{val.title}</h4>
                <p className="text-gray-600 mb-4">{val.content}</p>
                <div className='flex justify-between'>
                  <Link className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200' href={`/edit/${val._id}`}>Edit</Link>
                  <DeleteBtn id={val._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='bg-gray-100 p-4 rounded-md text-center'>
          You do not have any posts yet.
        </p>
      )}
    </main>
  );
}