'use client';

import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Loader2, ExternalLink } from "lucide-react";
import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } from "@/redux/Api/projectsApi";
import { Navigate } from "@/components/shared/Navigate";
import { ImageUrl } from '@/redux/Api/baseApi';

const ProjectsPage = () => {
  const { data, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const projects = data?.data?.projects || [];

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    websiteLink: "",
    uiCodeLink: "",
    apiCodeLink: "",
    technologies: "",
    features: [{ title: "", description: "" }],
    bannerImage: null,
    secondImage: null,
    thirdImage: null,
  });

  const [previews, setPreviews] = useState({
    banner: "", second: "", third: ""
  });

  const resetForm = () => {
    setFormData({
      name: "", title: "", description: "", websiteLink: "", uiCodeLink: "", apiCodeLink: "",
      technologies: "", features: [{ title: "", description: "" }],
      bannerImage: null, secondImage: null, thirdImage: null,
    });
    setPreviews({ banner: "", second: "", third: "" });
    setSelectedProject(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name || "",
      title: project.title || "",
      description: project.description || "",
      websiteLink: project.websiteLink || "",
      uiCodeLink: project.uiCodeLink || "",
      apiCodeLink: project.apiCodeLink || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      features: project.features?.length > 0 ? project.features : [{ title: "", description: "" }],
      bannerImage: null, secondImage: null, thirdImage: null,
    });
    setPreviews({
      banner: project.bannerImage ? `${project.bannerImage}` : "",
      second: project.secondImage ? `${project.secondImage}` : "",
      third: project.thirdImage ? `${project.thirdImage}` : "",
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData({ ...formData, features: updated });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, { title: "", description: "" }] });
  };

  const removeFeature = (index) => {
    if (formData.features.length === 1) return;
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleImageChange = (type, file) => {
    setFormData({ ...formData, [type]: file });
    setPreviews({ ...previews, [type.replace('Image', '')]: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("websiteLink", formData.websiteLink);
    payload.append("uiCodeLink", formData.uiCodeLink);
    payload.append("apiCodeLink", formData.apiCodeLink);

    // Technologies
    const techArray = formData.technologies.split(",").map(t => t.trim()).filter(Boolean);
    payload.append("technologies", JSON.stringify(techArray));

    // Features
    payload.append("features", JSON.stringify(formData.features));

    // Images
    if (formData.bannerImage) payload.append("bannerImage", formData.bannerImage);
    if (formData.secondImage) payload.append("secondImage", formData.secondImage);
    if (formData.thirdImage) payload.append("thirdImage", formData.thirdImage);

    try {
      if (isEditMode && selectedProject) {
        await updateProject({ id: selectedProject._id, data: payload }).unwrap();
      } else {
        await createProject(payload).unwrap();
      }
      refetch();
      resetForm();
      alert(isEditMode ? "Project updated!" : "Project added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this project?")) {
      await deleteProject(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <Navigate title="Projects" />
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Project</th>
              <th className="px-6 py-4 text-left">Technologies</th>
              <th className="px-6 py-4 text-left">Links</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="text-center py-10">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-10">No projects found</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.bannerImage && (
                        <img src={`${project.bannerImage}`} alt="" className="w-12 h-12 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-medium text-white">{project.name}</p>
                        <p className="text-sm text-gray-400">{project.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="bg-[#2e4b4b] text-xs px-2 py-1 rounded">{tech}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {project.websiteLink && <a href={project.websiteLink} target="_blank" className="text-blue-400 hover:underline">Live</a>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleEdit(project)} className="text-amber-600 hover:text-amber-700">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-700">
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

      {/* Add/Edit Modal - Very Large because of many fields */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2421] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-auto">
            <div className="p-6 border-b border-slate-700 flex justify-between sticky top-0 bg-[#1a2421]">
              <h2 className="text-2xl font-bold text-white">
                {isEditMode ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={resetForm}><X size={26} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-slate-300">Project Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300">Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Description</label>
                <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-slate-300">Website Link</label>
                  <input type="text" value={formData.websiteLink} onChange={(e) => setFormData({...formData, websiteLink: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300">UI Code Link</label>
                  <input type="text" value={formData.uiCodeLink} onChange={(e) => setFormData({...formData, uiCodeLink: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300">API Code Link</label>
                  <input type="text" value={formData.apiCodeLink} onChange={(e) => setFormData({...formData, apiCodeLink: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block mb-2 text-slate-300">Technologies (comma separated)</label>
                <input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} placeholder="React.js, Next.js, Node.js" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
              </div>

              {/* Features */}
              <div>
                <label className="block mb-3 text-slate-300">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="bg-[#162b2c] p-4 rounded-xl mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Feature Title" value={feature.title} onChange={(e) => handleFeatureChange(index, "title", e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                      <input type="text" placeholder="Feature Description" value={feature.description} onChange={(e) => handleFeatureChange(index, "description", e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                    </div>
                    {formData.features.length > 1 && (
                      <button type="button" onClick={() => removeFeature(index)} className="text-red-500 text-sm mt-2">Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="text-blue-400 flex items-center gap-2">
                  <Plus size={18} /> Add Feature
                </button>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["banner", "second", "third"].map((type, i) => (
                  <div key={i}>
                    <label className="block mb-2 text-slate-300 capitalize">{type} Image</label>
                    {previews[type] && <img src={previews[type]} className="w-full h-40 object-cover rounded-xl mb-3" />}
                    <label className="cursor-pointer bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center block">
                      Upload {type} Image
                      <input type="file" accept="image/*" onChange={(e) => handleImageChange(`${type}Image`, e.target.files[0])} className="hidden" />
                    </label>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={isCreating || isUpdating} className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold">
                {(isCreating || isUpdating) && <Loader2 className="animate-spin inline mr-2" />}
                {isEditMode ? "Update Project" : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;