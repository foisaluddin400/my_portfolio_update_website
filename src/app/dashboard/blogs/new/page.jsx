"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X } from "lucide-react";
import { useCreateBlogMutation } from "@/redux/Api/blogsApi";
import { Navigate } from "@/components/shared/Navigate";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const NewBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    tags: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [anotherImages, setAnotherImages] = useState([]);
  const [anotherPreviews, setAnotherPreviews] = useState([]);

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const router = useRouter();

  useEffect(() => {
    return () => {
      anotherPreviews.forEach((url) => URL.revokeObjectURL(url));

      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [anotherPreviews, coverPreview]);

  const handleCoverImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCoverImage = () => {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverImage(null);
    setCoverPreview("");
  };

  const handleAdditionalImages = (e) => {
    const newFiles = Array.from(e.target.files || []);

    if (!newFiles.length) return;

    setAnotherImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setAnotherPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeAdditionalImage = (index) => {
    URL.revokeObjectURL(anotherPreviews[index]);

    setAnotherImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setAnotherPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
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

    anotherImages.forEach((file) => {
      data.append("anotherImages", file);
    });

    try {
      await createBlog(data).unwrap();
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="bg-[#1a2421] border border-slate-700 rounded-lg p-4 shadow-xl">
      <Navigate title="Add New Blog" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Title
          </label>

          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Short Description
          </label>

          <input
            type="text"
            required
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({
                ...formData,
                shortDescription: e.target.value,
              })
            }
            className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Tags
          </label>

          <input
            type="text"
            value={formData.tags}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value,
              })
            }
            placeholder="React, Next.js, Node.js"
            className="w-full bg-[#121a17] border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-3 text-slate-300 font-medium">
            Cover Image
          </label>

          {!coverPreview ? (
            <label className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-[#121a17] hover:border-blue-500 transition">
              <Upload className="h-12 w-12 text-slate-500 mb-3" />

              <span className="text-slate-400">
                Click to upload cover image
              </span>

              <input
                type="file"
                accept="image/*"
                required
                onChange={handleCoverImage}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-72 object-cover rounded-xl border border-slate-700"
              />

              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Additional Images */}
        <div>
          <label className="block mb-3 text-slate-300 font-medium">
            Additional Images
          </label>

          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-[#121a17] hover:border-blue-500 transition">
            <Upload className="h-10 w-10 text-slate-500 mb-2" />

            <span className="text-slate-400">
              Upload More Images (Multiple allowed)
            </span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAdditionalImages}
              className="hidden"
            />
          </label>

          {anotherPreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              {anotherPreviews.map((img, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="w-full h-36 object-cover rounded-xl border border-slate-700"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeAdditionalImage(index)
                    }
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Description - Jodit Editor */}
        <div>
          <label className="block mb-3 text-slate-300 font-medium">
            Full Description
          </label>

          <div className="overflow-hidden rounded-xl border border-slate-700">
            <JoditEditor
              value={formData.description}
              config={{
                minHeight: 400,
                placeholder: "Write your blog content here...",
              }}
              onBlur={(newContent) =>
                setFormData((prev) => ({
                  ...prev,
                  description: newContent,
                }))
              }
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading && (
            <Loader2 className="animate-spin h-5 w-5" />
          )}

          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlogPage;