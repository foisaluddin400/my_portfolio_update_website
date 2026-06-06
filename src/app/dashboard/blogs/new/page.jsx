'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useCreateBlogMutation } from '@/redux/Api/blogsApi';

const NewBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    tags: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [anotherImages, setAnotherImages] = useState([]);

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('shortDescription', formData.shortDescription);
    data.append('description', formData.description);
    data.append('tags', formData.tags);

    if (coverImage) data.append('coverImage', coverImage);
    anotherImages.forEach((file) => data.append('anotherImages', file));

    try {
      await createBlog(data).unwrap();
      router.push('/dashboard/blogs');
    } catch (err) {
      alert('Failed to create blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Create New Blog</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-6">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Short Description</label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="JavaScript, React, Next.js"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Cover Image</label>
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            accept="image/*"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Additional Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setAnotherImages(Array.from(e.target.files || []))}
            accept="image/*"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Full Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={10}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlogPage;