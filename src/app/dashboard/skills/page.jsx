'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, X, Upload } from "lucide-react";
import { useCreateSkillMutation, useDeleteSkillMutation, useGetSkillsQuery } from "@/redux/Api/skillsApi";
import { Navigate } from "@/components/shared/Navigate";
import { ImageUrl } from "@/redux/Api/baseApi";

const SkillsPage = () => {
  const { data, isLoading, refetch } = useGetSkillsQuery();
  const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const skillsData = data?.data?.skills || [];

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [category, setCategory] = useState("");
  const [skillInputs, setSkillInputs] = useState([
    { languageName: "", icon: null }
  ]);

  const handleAddSkillField = () => {
    setSkillInputs([...skillInputs, { languageName: "", icon: null }]);
  };

  const handleRemoveSkillField = (index) => {
    if (skillInputs.length === 1) return;
    const updated = skillInputs.filter((_, i) => i !== index);
    setSkillInputs(updated);
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...skillInputs];
    updated[index][field] = value;
    setSkillInputs(updated);
  };

  const handleIconChange = (index, file) => {
    const updated = [...skillInputs];
    updated[index].icon = file;
    setSkillInputs(updated);
  };

  const resetForm = () => {
    setCategory("");
    setSkillInputs([{ languageName: "", icon: null }]);
    setShowAddModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);

    // Append skills as JSON string
    const skillsArray = skillInputs.map(skill => ({
      languageName: skill.languageName
    }));
    formData.append("skills", JSON.stringify(skillsArray));

    // Append icons with key names: icon_0, icon_1, etc.
    skillInputs.forEach((skill, index) => {
      if (skill.icon) {
        formData.append(`icon_${index}`, skill.icon);
      }
    });

    try {
      await createSkill(formData).unwrap();
      refetch();
      resetForm();
      alert("Skill category added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add skills");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this skill category?")) {
      await deleteSkill(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Navigate title="Skills" />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Skills
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Skills</th>
              <th className="px-6 py-4 text-left">Created At</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">Loading...</td>
              </tr>
            ) : skillsData.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10">No skills found</td>
              </tr>
            ) : (
              skillsData.map((skill) => (
                <tr key={skill._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4 font-medium text-white">{skill.category}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-3">
                      {skill.skills?.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#2e4b4b] px-3 py-1 rounded-lg">
                          {s.skillIconImage && (
                            <img
                              src={`${ImageUrl}/${s.skillIconImage}`}
                              alt={s.languageName}
                              className="w-8 h-8 object-cover rounded"
                            />
                          )}
                          <span className="text-sm text-gray-300">{s.languageName}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(skill.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="text-red-600 hover:text-red-800 transition"
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

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2421] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Add New Skill Category</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Category */}
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Category Name</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Frontend Development"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Dynamic Skills */}
              <div>
                <label className="block mb-3 text-slate-300 font-medium">Skills</label>
                
                {skillInputs.map((skill, index) => (
                  <div key={index} className="bg-[#162b2c] p-4 rounded-xl mb-4 border border-slate-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-slate-400">Skill #{index + 1}</span>
                      {skillInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkillField(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-xs text-slate-400">Language / Skill Name</label>
                        <input
                          type="text"
                          required
                          value={skill.languageName}
                          onChange={(e) => handleSkillChange(index, "languageName", e.target.value)}
                          placeholder="React.js"
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-xs text-slate-400">Icon Image</label>
                        <label className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500">
                          <Upload className="text-slate-400" size={20} />
                          <span className="text-slate-400 text-sm truncate">
                            {skill.icon ? skill.icon.name : "Choose icon image"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleIconChange(index, e.target.files?.[0])}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddSkillField}
                  className="text-blue-400 hover:text-blue-500 flex items-center gap-2 text-sm mt-2"
                >
                  <Plus size={18} /> Add More Skill
                </button>
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isCreating ? "Adding..." : "Add Skill Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsPage;