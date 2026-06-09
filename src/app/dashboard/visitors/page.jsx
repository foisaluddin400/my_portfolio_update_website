'use client';

import React from "react";
import { Eye, Calendar, Users, Activity } from "lucide-react";
import { useGetAllVisitorsQuery } from '@/redux/Api/visitorsApi';
import { Navigate } from "@/components/shared/Navigate";

const VisitorsPage = () => {
  const { data, isLoading } = useGetAllVisitorsQuery();

  const visitors = data?.data?.visitors || [];
  const totalUniqueVisitors = data?.data?.totalUniqueVisitors || 0;
  const totalVisits = data?.data?.totalVisits || 0;

  return (
    <div className="p-3 h-[87vh] bg-[#1a2421] rounded-lg shadow-xl overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Navigate title="Visitors Analytics" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#162b2c] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <Users className="text-blue-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Unique Visitors</p>
              <p className="text-3xl font-bold text-white">{totalUniqueVisitors}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#162b2c] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-xl">
              <Activity className="text-emerald-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Visits</p>
              <p className="text-3xl font-bold text-white">{totalVisits}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#162b2c] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <Calendar className="text-purple-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Avg Visits per Visitor</p>
              <p className="text-3xl font-bold text-white">
                {totalUniqueVisitors > 0 ? (totalVisits / totalUniqueVisitors).toFixed(1) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-[#1a2421] rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#162b2c] border-b">
            <tr>
              <th className="px-6 py-4 text-left">Device ID</th>
              <th className="px-6 py-4 text-left">IP Address</th>
              <th className="px-6 py-4 text-left">Visit Count</th>
              <th className="px-6 py-4 text-left">Last Visited</th>
              <th className="px-6 py-4 text-left">User Agent</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">Loading visitors data...</td>
              </tr>
            ) : visitors.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12">No visitors found</td>
              </tr>
            ) : (
              visitors.map((visitor) => (
                <tr key={visitor._id} className="border-b hover:bg-[#1f3333]">
                  <td className="px-6 py-4 font-mono text-sm text-slate-300 break-all">
                    {visitor.deviceId}
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono">
                    {visitor.ipAddress}
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center justify-center bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full font-semibold">
                      {visitor.visitCount} visits
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {new Date(visitor.lastVisited).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 max-w-md truncate">
                    {visitor.userAgent}
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

export default VisitorsPage;