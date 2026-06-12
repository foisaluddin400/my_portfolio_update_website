'use client';
 
import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Loader2, Upload } from "lucide-react";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation
} from '@/redux/Api/servicesApi';
import { Navigate } from '@/components/shared/Navigate';

 
const ServicesPage = () => {
  const { data: servicesData, isLoading, refetch } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
 
  const services = servicesData?.data?.services || [];
 
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
 
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    iconImage: null,
  });
 
  const [previewImage, setPreviewImage] = useState("");
 
  const resetForm = () => {
    setFormData({ title: "", description: "", iconImage: null });
    setPreviewImage("");
    setSelectedService(null);
    setIsEditMode(false);
    setShowModal(false);
  };
 
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      iconImage: null,
    });
    setPreviewImage(service.iconImage ? `{service.iconImage}` : "");
    setIsEditMode(true);
    setShowModal(true);
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, iconImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    
    if (formData.iconImage) {
      payload.append("iconImage", formData.iconImage);
    }
 
    try {
      if (isEditMode && selectedService) {
        await updateService({
          id: selectedService._id,
          data: payload
        }).unwrap();
        alert("Service updated successfully!");
      } else {
        await createService(payload).unwrap();
        alert("Service created successfully!");
      }
      refetch();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "Failed to save service");
    }
  };
 
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id).unwrap();
        refetch();
        alert("Service deleted successfully!");
      } catch (error) {
        alert("Failed to delete service");
      }
    }
  };
 
  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <Navigate title="Services" />
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Service
        </button>
      </div>
 
      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Icon</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">Loading...</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10">No services found</td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4">
                    {service.iconImage && (
                      <img
                        src={`{service.iconImage}`}
                        alt={service.title}
                        className="w-12 h-12 object-cover rounded-lg border border-slate-600"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{service.title}</td>
                  <td className="px-6 py-4 text-gray-400 line-clamp-2">{service.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-amber-600 hover:text-amber-700 transition"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
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
                {isEditMode ? "Edit Service" : "Add New Service"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
 
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Icon Image */}
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Service Icon</label>
                <div className="flex items-center gap-4">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-slate-600"
                    />
                  )}
                  <label className="cursor-pointer bg-slate-900 border border-slate-700 hover:border-blue-500 px-4 py-3 rounded-xl flex-1 text-center">
                    <Upload className="inline mr-2" size={20} />
                    {formData.iconImage ? formData.iconImage.name : "Upload Icon Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
 
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Web Development"
                />
              </div>
 
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Description</label>
                <textarea
                  rows={5}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Describe the service..."
                />
              </div>
 
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {(isCreating || isUpdating) && <Loader2 className="animate-spin h-5 w-5" />}
                {isEditMode ? "Update Service" : "Create Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ServicesPage;