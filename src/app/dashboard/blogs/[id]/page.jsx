'use client';

import React, { useState, useEffect } from 'react';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useDeleteBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } from '@/redux/Api/blogsApi';

const BlogDetailPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id ;
  const isEditMode = searchParams.get('edit') === 'true';

  const { data: blogData } = useGetSingleBlogQuery(id);
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blog = blogData?.data;

  // Form state for edit
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        shortDescription: blog.shortDescription,
        description: blog.description,
        tags: blog.tags.join(', '),
      });
    }
  }, [blog]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Implement update with FormData if needed
    await updateBlog({ id, ...formData }).unwrap();
    router.refresh();
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft /> Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/dashboard/blogs/${id}?edit=true`)}
            className="bg-amber-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit size={18} /> Edit
          </button>
          <button
            onClick={() => deleteBlog(id)}
            className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {isEditMode ? (
        <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow">
          {/* Same form fields as New Blog - you can copy and adjust */}
          <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>
          {/* ... form inputs ... */}
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg">
            Update Blog
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-6">{blog.shortDescription}</p>

          {blog.coverImage && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${blog.coverImage}`}
              alt={blog.title}
              className="w-full rounded-xl mb-8"
            />
          )}

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.description }} />

          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 px-4 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;