'use client';

import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Loader2 } from "lucide-react";
import { useCreateResumeMutation, useDeleteResumeMutation, useGetResumeQuery, useUpdateResumeMutation } from '@/redux/Api/resumeApi';
import { Navigate } from "@/components/shared/Navigate";

const ResumePage = () => {
  const { data, isLoading, refetch } = useGetResumeQuery();
  const [createResume, { isLoading: isCreating }] = useCreateResumeMutation();
  const [updateResume, { isLoading: isUpdating }] = useUpdateResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();

  const resumes = data?.data?.resumes || [];

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  // Form State
const [formData, setFormData] = useState({
  title: "",
  instituteName: "",
  description: "",
  startingYear: "",
  passingYear: "",
  running: false,
  type: "education",
});

  const resetForm = () => {
 setFormData({
  title: "",
  instituteName: "",
  description: "",
  startingYear: "",
  passingYear: "",
  running: false,
  type: "education",
});
    setSelectedResume(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleEdit = (resume) => {
    setSelectedResume(resume);
  setFormData({
  title: resume.title || "",
  instituteName: resume.instituteName || "",
  description: resume.description || "",
  startingYear: resume.startingYear || "",
  passingYear: resume.passingYear || "",
  running: resume.running || false,
  type: resume.type || "education",
});
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  const payload = {
  title: formData.title,
  instituteName: formData.instituteName,
  description: formData.description,
  startingYear: Number(formData.startingYear),
  passingYear: formData.passingYear
    ? Number(formData.passingYear)
    : null,
  running: formData.running,
  type: formData.type,
};
    try {
      if (isEditMode && selectedResume) {
        await updateResume({ id: selectedResume._id, ...payload }).unwrap();
      } else {
        await createResume(payload).unwrap();
      }
      refetch();
      resetForm();
      alert(isEditMode ? "Resume updated successfully!" : "Resume added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save resume");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this resume entry?")) {
      await deleteResume(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Navigate title="Resume" />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Entry
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Title / Degree</th>
              <th className="px-6 py-4 text-left">Institute</th>
              <th className="px-6 py-4 text-left">Years</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">Loading...</td>
              </tr>
            ) : resumes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">No resume entries found</td>
              </tr>
            ) : (
              resumes.map((resume) => (
                <tr key={resume._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4 font-medium text-white">{resume.title}</td>
                  <td className="px-6 py-4 text-gray-300">{resume.instituteName}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {resume.startingYear} - {resume.running ? "Present" : resume.passingYear}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resume.running 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {resume.running ? "Running" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(resume)}
                        className="text-amber-600 hover:text-amber-700 transition"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="text-red-600 hover:text-red-700 transition"
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2421] border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {isEditMode ? "Edit Resume Entry" : "Add New Resume Entry"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Degree / Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="BSc in Computer Science"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300 font-medium">Institute Name</label>
                <input
                  type="text"
                  required
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="North South University"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-slate-300 font-medium">Starting Year</label>
                  <input
                    type="number"
                    required
                    value={formData.startingYear}
                    onChange={(e) => setFormData({ ...formData, startingYear: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300 font-medium">Passing Year</label>
                  <input
                    type="number"
                    value={formData.passingYear}
                    onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                    disabled={formData.running}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="running"
                  checked={formData.running}
                  onChange={(e) => setFormData({ ...formData, running: e.target.checked, passingYear: "" })}
                  className="w-5 h-5 accent-emerald-600"
                />
                <label htmlFor="running" className="text-slate-300">Currently Running</label>
              </div>
<div>
  <label className="block mb-2 text-slate-300 font-medium">
    Type
  </label>

  <select
    value={formData.type}
    onChange={(e) =>
      setFormData({ ...formData, type: e.target.value })
    }
    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
  >
    <option value="education">Education</option>
    <option value="experience">Experience</option>
  </select>
</div>
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Short description about this education..."
                />
              </div>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {(isCreating || isUpdating) && <Loader2 className="animate-spin h-5 w-5" />}
                {isEditMode ? "Update Entry" : "Add Entry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePage;