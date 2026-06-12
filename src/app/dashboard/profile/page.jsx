'use client';

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2, Upload } from "lucide-react";
import { useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation } from '@/redux/Api/profileApi';
import { Navigate } from "@/components/shared/Navigate";


const ProfilePage = () => {
  const { data, isLoading, refetch } = useGetProfileQuery();
  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profile = data?.data;
  

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    professionName: "",
    resumeLink: "",
    email: "",
    phone: "",
    address: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  // Auto fill form when profile exists
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        professionName: profile.professionName || "",
        resumeLink: profile.resumeLink || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        profileImage: null,
      });
      setPreviewImage(profile.profileImage ? `${profile.profileImage}` : "");
    }
  }, [profile]);

  const resetForm = () => {
    setFormData({
      name: "", professionName: "", resumeLink: "", email: "", phone: "", address: "", profileImage: null
    });
    setPreviewImage("");
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("professionName", formData.professionName);
    payload.append("resumeLink", formData.resumeLink);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("address", formData.address);

    if (formData.profileImage) {
      payload.append("profileImage", formData.profileImage);
    }

    try {
      if (profile) {
        // Update
        await updateProfile({data: payload }).unwrap();
        alert("Profile updated successfully!");
      } else {
        // Create
        await createProfile(payload).unwrap();
        alert("Profile created successfully!");
      }
      refetch();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to save profile");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <Navigate title="Profile" />
        
        {!profile && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
          >
            <Plus size={20} /> Create Profile
          </button>
        )}
      </div>

      {/* Profile Display */}
      {profile ? (
        <div className="bg-[#1a2421] border border-slate-700 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={`${profile.profileImage}`}
                alt={profile.name}
                className="w-48 h-48 object-cover rounded-2xl border-4 border-slate-600"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white">{profile.name}</h1>
                <p className="text-2xl text-emerald-400 mt-1">{profile.professionName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p>{profile.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Address</p>
                  <p>{profile.address}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Resume</p>
                  <a href={profile.resumeLink} target="_blank" className="text-blue-400 hover:underline">
                    {profile.resumeLink}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <Edit size={18} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-slate-400">No profile found</p>
          <p className="text-slate-500 mt-2">Create your professional profile</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2421] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {profile ? "Edit Profile" : "Create Profile"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Profile Image</label>
                <div className="flex items-center gap-4">
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-28 h-28 object-cover rounded-2xl" />
                  )}
                  <label className="cursor-pointer bg-slate-900 border border-slate-700 hover:border-blue-500 px-6 py-4 rounded-xl flex-1 text-center">
                    <Upload className="inline mr-2" size={22} />
                    {formData.profileImage ? formData.profileImage.name : "Upload Profile Image"}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-slate-300">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300">Profession</label>
                  <input type="text" required value={formData.professionName} onChange={(e) => setFormData({ ...formData, professionName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-slate-300">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 text-slate-300">Phone</label>
                  <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Address</label>
                <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" />
              </div>

              <div>
                <label className="block mb-2 text-slate-300">Resume Link</label>
                <input type="text" required value={formData.resumeLink} onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })} className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3" placeholder="https://yourresume.com" />
              </div>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {(isCreating || isUpdating) && <Loader2 className="animate-spin h-5 w-5" />}
                {profile ? "Update Profile" : "Create Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;