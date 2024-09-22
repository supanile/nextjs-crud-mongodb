"use client"

import React, { useState } from 'react'

function DeleteBtn({ id }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");

        if (confirmed) {
            setIsDeleting(true);
            try {
                const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    window.location.reload();
                } else {
                    throw new Error("Failed to delete post");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to delete post. Please try again.");
            } finally {
                setIsDeleting(false);
            }
        }
    }

    return (
        <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}

export default DeleteBtn