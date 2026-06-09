'use client';

import React from 'react';
import { useGetContactsQuery } from '@/redux/Api/contactApi';
import { useGetProjectsQuery } from '@/redux/Api/projectsApi';
import { useGetReviewsQuery } from '@/redux/Api/reviewApi';
import { useGetVisitorsStatsQuery } from '@/redux/Api/visitorsApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Navigate } from "@/components/shared/Navigate";

const visitorData = [
  { month: 'Jan', visitors: 1240 },
  { month: 'Feb', visitors: 1890 },
  { month: 'Mar', visitors: 1650 },
  { month: 'Apr', visitors: 2450 },
  { month: 'May', visitors: 3120 },
  { month: 'Jun', visitors: 2780 },
];

export default function DashboardPage() {
  const { data: contactsData } = useGetContactsQuery();
  const { data: projectsData } = useGetProjectsQuery();
  const { data: reviewsData } = useGetReviewsQuery();
  const { data: visitorsData } = useGetVisitorsStatsQuery();

  const contacts = contactsData?.data?.contacts || [];
  const totalContacts = contactsData?.data?.total || 0;
  const totalProjects = projectsData?.data?.total || projectsData?.data?.projects?.length || 0;
  const totalReviews = reviewsData?.data?.total || reviewsData?.data?.reviews?.length || 0;
  const totalVisits = visitorsData?.data?.totalVisits || 0;

  // Get recent 3 contacts (sorted by newest first)
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="space-y-4 ">
      {/* Header */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a2421] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500 transition-all">
          <p className="text-gray-400 text-sm">Portfolio Visitors</p>
          <p className="text-4xl font-bold text-white mt-3">{totalVisits}</p>
        </div>

        <div className="bg-[#1a2421] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500 transition-all">
          <p className="text-gray-400 text-sm">Total Projects</p>
          <p className="text-4xl font-bold text-white mt-3">{totalProjects}</p>
        </div>

        <div className="bg-[#1a2421] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500 transition-all">
          <p className="text-gray-400 text-sm">Total Reviews</p>
          <p className="text-4xl font-bold text-white mt-3">{totalReviews}</p>
        </div>

        <div className="bg-[#1a2421] border border-gray-800 p-6 rounded-2xl hover:border-emerald-500 transition-all">
          <p className="text-gray-400 text-sm">Total Contacts</p>
          <p className="text-4xl font-bold text-white mt-3">{totalContacts}</p>
        </div>
      </div>

      {/* Visitors Chart */}
      <div className="bg-[#1a2421] border border-gray-800 p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Portfolio Visitors Trend</h2>
          <p className="text-gray-400 text-sm">Last 6 Months</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a2421', 
                  border: '1px solid #4b5563',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="natural" 
                dataKey="visitors" 
                stroke="#10b981" 
                strokeWidth={4} 
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Contacts - REAL DATA */}
      <div className="bg-[#1a2421] border border-gray-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Recent Contacts</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-4 text-gray-400 font-medium">Name</th>
                <th className="pb-4 text-gray-400 font-medium">Email</th>
                <th className="pb-4 text-gray-400 font-medium">Message</th>
                <th className="pb-4 text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentContacts.length > 0 ? (
                recentContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-800/50 transition-all">
                    <td className="py-5 text-white font-medium">{contact.name}</td>
                    <td className="py-5 text-gray-400">{contact.email}</td>
                    <td className="py-5 text-gray-300 max-w-md truncate">
                      {contact.message}
                    </td>
                    <td className="py-5 text-gray-500 text-sm">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    No contacts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/dashboard/contact" 
            className="text-emerald-500 hover:text-emerald-400 font-medium text-sm inline-flex items-center gap-1"
          >
            View All Contacts →
          </a>
        </div>
      </div>
    </div>
  );
}