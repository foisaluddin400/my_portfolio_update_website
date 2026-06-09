'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Edit, Trash2, ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { useDeleteBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } from '@/redux/Api/blogsApi';
import { ImageUrl } from '@/redux/Api/baseApi';
import JoditEditor from 'jodit-react';

const BlogDetailPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = params.id;
  const isEditMode = searchParams.get('edit') === 'true';

  const { data: blogData, isLoading: isFetching } = useGetSingleBlogQuery(id);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blog = blogData?.data?.blogs?.[0] || blogData?.data;

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    tags: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [anotherImages, setAnotherImages] = useState([]); // New uploaded files
  const [anotherPreviews, setAnotherPreviews] = useState([]); // New previews

  // Existing images from database (for Edit Mode)
  const [existingAnotherImages, setExistingAnotherImages] = useState([]);

  // Populate form + existing images when blog loads
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        shortDescription: blog.shortDescription || "",
        description: blog.description || "",
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : "",
      });

      // Set existing additional images
      setExistingAnotherImages(blog.anotherImages || []);
    }
  }, [blog]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      anotherPreviews.forEach((url) => URL.revokeObjectURL(url));
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [anotherPreviews, coverPreview]);

  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (coverPreview) URL.revokeObjectURL(coverPreview);

    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCoverImage = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverImage(null);
    setCoverPreview("");
  };

  const handleAdditionalImages = (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    setAnotherImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setAnotherPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewAdditionalImage = (index) => {
    URL.revokeObjectURL(anotherPreviews[index]);
    setAnotherImages((prev) => prev.filter((_, i) => i !== index));
    setAnotherPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingAdditionalImage = (index) => {
    setExistingAnotherImages((prev) => prev.filter((_, i) => i !== index));
    // Note: You may need backend support to actually delete from server
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("shortDescription", formData.shortDescription);
    data.append("description", formData.description);
    data.append("tags", formData.tags);

    if (coverImage) {
      data.append("coverImage", coverImage);
    }

    // Append new additional images
    anotherImages.forEach((file) => {
      data.append("anotherImages", file);
    });

    try {
      await updateBlog({ id, data }).unwrap();
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error(error);
      alert("Failed to update blog");
    }
  };

  if (isFetching) return <div className="text-center py-20">Loading blog...</div>;
  if (!blog) return <div className="text-center py-20 text-red-500">Blog not found</div>;
console.log(ImageUrl)
  return (
    <div className="bg-[#1a2421] rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {!isEditMode && (
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/dashboard/blogs/${id}?edit=true`)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit size={18} /> Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Delete this blog?")) {
                  deleteBlog(id);
                  router.push("/dashboard/blogs");
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        )}
      </div>

      {isEditMode ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title, Short Description, Tags */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block mb-2 text-slate-300 font-medium">Short Description</label>
            <input type="text" required value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block mb-2 text-slate-300 font-medium">Tags</label>
            <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="tag1, tag2, tag3" className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-3 text-slate-300 font-medium">Cover Image</label>
            {!coverPreview ? (
              <label className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-[#121a17] hover:border-blue-500 transition">
                <Upload className="h-12 w-12 text-slate-500 mb-3" />
                <span className="text-slate-400">Upload New Cover Image (Optional)</span>
                <input type="file" accept="image/*" onChange={handleCoverImage} className="hidden" />
              </label>
            ) : (
              <div className="relative">
                <img src={coverPreview} alt="Cover" className="w-full h-72 object-cover rounded-xl border border-slate-700" />
                <button type="button" onClick={removeCoverImage} className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"><X size={18} /></button>
              </div>
            )}
          </div>

          {/* Existing + New Additional Images */}
          <div>
            <label className="block mb-3 text-slate-300 font-medium">Additional Images</label>

            {/* Existing Images */}
            {existingAnotherImages.length > 0 && (
              <div className="mb-6">
                <p className="text-slate-400 mb-3">Current Images:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingAnotherImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img src={`${ImageUrl}/${img}`} alt={`Existing ${index}`} className="w-full h-36 object-cover rounded-xl border border-slate-700" />
                      <button type="button" onClick={() => removeExistingAdditionalImage(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-[#121a17] hover:border-blue-500 transition">
              <Upload className="h-10 w-10 text-slate-500 mb-2" />
              <span className="text-slate-400">Upload More Images</span>
              <input type="file" multiple accept="image/*" onChange={handleAdditionalImages} className="hidden" />
            </label>

            {/* New Previews */}
            {anotherPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {anotherPreviews.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`New ${index}`} className="w-full h-36 object-cover rounded-xl border border-slate-700" />
                    <button type="button" onClick={() => removeNewAdditionalImage(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Jodit Editor */}
          <div>
            <label className="block mb-3 text-slate-300 font-medium">Full Description</label>
            <div className="overflow-hidden rounded-xl border border-slate-700">
              <JoditEditor
                value={formData.description}
                config={{ minHeight: 400, placeholder: "Write your blog content here..." }}
                onBlur={(newContent) => setFormData((prev) => ({ ...prev, description: newContent }))}
              />
            </div>
          </div>

          <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {isUpdating && <Loader2 className="animate-spin h-5 w-5" />}
            Update Blog
          </button>
        </form>
      ) : (
        // View Mode (Already improved previously)
        <div className="">
          <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>
          <p className="text-slate-400 text-lg mb-8">{blog.shortDescription}</p>

          {blog.coverImage && (
            <img src={`${ImageUrl}/${blog.coverImage}`} alt={blog.title} className="w-full rounded-2xl mb-10 object-cover" />
          )}

          {blog.anotherImages?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-white">Additional Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blog.anotherImages.map((img, index) => (
                  <img key={index} src={`${ImageUrl}/${img}`} alt={`Gallery ${index}`} className="w-full h-64 object-cover rounded-2xl border border-slate-700" />
                ))}
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: blog.description }} />

          {blog.tags?.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="bg-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-sm">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;