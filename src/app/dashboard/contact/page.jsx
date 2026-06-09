'use client';

import React from "react";
import { Trash2, Mail, Eye, EyeOff } from "lucide-react";
import { useDeleteContactMutation, useGetContactsQuery } from '@/redux/Api/contactApi';
import { Navigate } from "@/components/shared/Navigate";

const ContactsPage = () => {
  const { data, isLoading, refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const contacts = data?.data?.contacts || [];
  const unreadCount = data?.data?.unreadCount || 0;

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteContact(id).unwrap();
      refetch();
    }
  };

  const markAsRead = async (id) => {
    // If you have update mutation, you can call it here
    // For now, just refetch (or implement later)
    alert("Mark as read functionality can be added later");
  };

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Navigate title="Contacts" />
          {unreadCount > 0 && (
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">Loading contacts...</td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10">No contacts found</td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr 
                  key={contact._id} 
                  className={`border-b hover:bg-[#1f3333] ${!contact.isRead ? 'bg-[#1f2a2a]' : ''}`}
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <a href={`mailto:${contact.email}`} className="hover:underline flex items-center gap-2">
                      <Mail size={16} />
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-300 max-w-md truncate">
                    {contact.message}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      contact.isRead 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-orange-500/20 text-orange-400"
                    }`}>
                      {contact.isRead ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      {!contact.isRead && (
                        <button
                          onClick={() => markAsRead(contact._id)}
                          className="text-blue-500 hover:text-blue-400"
                          title="Mark as Read"
                        >
                          <Eye size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="text-red-600 hover:text-red-700 transition"
                        title="Delete"
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
    </div>
  );
};

export default ContactsPage;