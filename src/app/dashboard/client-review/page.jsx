'use client';

import React, { useState } from "react";
import { Plus, Trash2, Edit, X, Loader2, Star, Upload } from "lucide-react";
import { useCreateReviewMutation, useDeleteReviewMutation, useGetReviewsQuery, useUpdateReviewMutation } from '@/redux/Api/reviewApi';
import { Navigate } from "@/components/shared/Navigate";


const ReviewsPage = () => {
  const { data, isLoading, refetch } = useGetReviewsQuery();
  console.log(data)
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const reviews = data?.data?.reviews || [];

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    profession: "",
    description: "",
    rating: 5,
    date: "",
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const resetForm = () => {
    setFormData({
      clientName: "",
      profession: "",
      description: "",
      rating: 5,
      date: "",
      profileImage: null,
    });
    setPreviewImage("");
    setSelectedReview(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setFormData({
      clientName: review.clientName || "",
      profession: review.profession || "",
      description: review.description || "",
      rating: review.rating || 5,
      date: review.date ? new Date(review.date).toISOString().split('T')[0] : "",
      profileImage: null,
    });
    setPreviewImage(review.profileImage ? `${review.profileImage}` : "");
    setIsEditMode(true);
    setShowModal(true);
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

    const data = new FormData();
    data.append("clientName", formData.clientName);
    data.append("profession", formData.profession);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    if (formData.date) data.append("date", formData.date);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      if (isEditMode && selectedReview) {
        await updateReview({ id: selectedReview._id, data }).unwrap();
      } else {
        await createReview(data).unwrap();
      }
      refetch();
      resetForm();
      alert(isEditMode ? "Review updated successfully!" : "Review added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save review");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Navigate title="Client Reviews" />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> Add New Review
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Profession</th>
              <th className="px-6 py-4 text-left">Rating</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">Loading...</td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">No reviews found</td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {review.profileImage && (
                        <img
                          src={`${review.profileImage}`}
                          alt={review.clientName}
                          className="w-10 h-10 object-cover rounded-full border border-slate-600"
                        />
                      )}
                      <div>
                        <p className="font-medium text-white">{review.clientName}</p>
                        <p className="text-sm text-gray-400 line-clamp-1">{review.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{review.profession}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                      <span className="text-white ml-1">({review.rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {new Date(review.date || review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-amber-600 hover:text-amber-700 transition"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
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
                {isEditMode ? "Edit Review" : "Add New Review"}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Profile Image */}
              <div>
                <label className="block mb-2 text-slate-300 font-medium">Client Profile Image</label>
                <div className="flex items-center gap-4">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full border border-slate-600"
                    />
                  )}
                  <label className="cursor-pointer bg-slate-900 border border-slate-700 hover:border-blue-500 px-4 py-3 rounded-xl flex-1 text-center">
                    <Upload className="inline mr-2" size={20} />
                    {formData.profileImage ? formData.profileImage.name : "Upload Image"}
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
                <label className="block mb-2 text-slate-300 font-medium">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300 font-medium">Profession</label>
                <input
                  type="text"
                  required
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300 font-medium">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-slate-300 font-medium">Review Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
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
                  placeholder="Write client feedback..."
                />
              </div>

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {(isCreating || isUpdating) && <Loader2 className="animate-spin h-5 w-5" />}
                {isEditMode ? "Update Review" : "Add Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;