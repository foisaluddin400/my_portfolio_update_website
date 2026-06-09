"use client";

import React, { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "@/redux/Api/aboutApi";
import { Plus, X } from "lucide-react";

const Page = () => {
  const { data, isLoading } = useGetAboutQuery();
  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

  const [formData, setFormData] = useState({
    titles: [""],
    description1: "",
  });

  // Load existing data
  useEffect(() => {
    if (data?.data) {
      setFormData({
        titles: data.data.titles?.length > 0 ? data.data.titles : [""],
        description1: data.data.description1 || "",
      });
    }
  }, [data]);

  const handleTitleChange = (index, value) => {
    const updatedTitles = [...formData.titles];
    updatedTitles[index] = value;
    setFormData({ ...formData, titles: updatedTitles });
  };

  const addTitleField = () => {
    setFormData({ ...formData, titles: [...formData.titles, ""] });
  };

  const removeTitleField = (index) => {
    if (formData.titles.length === 1) return;
    const updatedTitles = formData.titles.filter((_, i) => i !== index);
    setFormData({ ...formData, titles: updatedTitles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove empty titles
    const filteredTitles = formData.titles.filter(title => title.trim() !== "");

    if (filteredTitles.length === 0) {
      alert("At least one title is required");
      return;
    }

    try {
      await updateAbout({
        titles: filteredTitles,
        description1: formData.description1,
      }).unwrap();
      
      alert("About Us updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Failed to update");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen p-4">
      <div className="bg-[#1a2421] border border-slate-700 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8">About Us Management</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Multiple Titles */}
          <div>
            <label className="block mb-3 text-slate-300 font-medium">
              Titles (You can add multiple)
            </label>
            
            {formData.titles.map((title, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className="flex-1 bg-[#121a17] border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder={`Title ${index + 1}`}
                  required
                />
                {formData.titles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTitleField(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-xl"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addTitleField}
              className="text-emerald-400 hover:text-emerald-500 flex items-center gap-2 mt-2"
            >
              <Plus size={18} /> Add Another Title
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Description
            </label>
            <div className="overflow-hidden rounded-xl border border-slate-600">
              <JoditEditor
                value={formData.description1}
                onBlur={(newContent) =>
                  setFormData((prev) => ({
                    ...prev,
                    description1: newContent,
                  }))
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="bg-emerald-600 hover:bg-emerald-700 transition-all text-white font-medium px-10 py-3.5 rounded-xl disabled:opacity-50 w-full"
          >
            {isUpdating ? "Updating..." : "Update About Us"}
          </button>
        </form>

        {/* Live Preview */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <h3 className="text-xl font-semibold text-white mb-5">Live Preview</h3>
          <div className="bg-[#121a17] border border-slate-700 rounded-xl p-8">
            <div className="space-y-4">
              {formData.titles.map((title, i) => (
                <h1 key={i} className="text-3xl font-bold text-white">
                  {title || "Untitled"}
                </h1>
              ))}
            </div>

            <div
              className="prose prose-invert max-w-none mt-6"
              dangerouslySetInnerHTML={{
                __html: formData.description1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;