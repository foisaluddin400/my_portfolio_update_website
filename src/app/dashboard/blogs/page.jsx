'use client';

import React from 'react';
import Link from 'next/link';

import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/redux/Api/blogsApi';

const BlogsPage = () => {
  const { data, isLoading } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.data?.blogs || [];

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id).unwrap();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Blogs</h1>
        <Link
          href="/dashboard/blogs/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Short Description</th>
              <th className="px-6 py-4 text-left">Tags</th>
              <th className="px-6 py-4 text-left">Created At</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-10">No blogs found</td></tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                    {blog.shortDescription}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.map((tag, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link href={`/dashboard/blogs/${blog._id}`}>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye size={20} />
                        </button>
                      </Link>
                      <Link href={`/dashboard/blogs/${blog._id}?edit=true`}>
                        <button className="text-amber-600 hover:text-amber-800">
                          <Edit size={20} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsPage;