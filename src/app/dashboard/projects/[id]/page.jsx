'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useDeleteProjectMutation, useGetSingleProjectQuery } from '@/redux/Api/projectsApi';
import { ImageUrl } from '@/redux/Api/baseApi';

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data: projectData, isLoading } = useGetSingleProjectQuery(id);
  const [deleteProject] = useDeleteProjectMutation();

  const project = projectData?.data;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id).unwrap();
      router.push("/dashboard/projects");
    }
  };

  if (isLoading) return <div className="text-center py-20 text-xl">Loading project...</div>;
  if (!project) return <div className="text-center py-20 text-red-500">Project not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={22} /> Back to Projects
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/dashboard/projects/${id}?edit=true`)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit size={18} /> Edit Project
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
        {/* Project Name & Title */}
        <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
        <h2 className="text-2xl text-slate-400 mb-8">{project.title}</h2>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {project.bannerImage && (
            <div>
              <p className="text-slate-400 text-sm mb-2">Banner Image</p>
              <img
                src={`${ImageUrl}/${project.bannerImage}`}
                alt="Banner"
                className="w-full h-72 object-cover rounded-2xl border border-slate-600"
              />
            </div>
          )}

          {project.secondImage && (
            <div>
              <p className="text-slate-400 text-sm mb-2">Second Image</p>
              <img
                src={`${ImageUrl}/${project.secondImage}`}
                alt="Second"
                className="w-full h-72 object-cover rounded-2xl border border-slate-600"
              />
            </div>
          )}

          {project.thirdImage && (
            <div>
              <p className="text-slate-400 text-sm mb-2">Third Image</p>
              <img
                src={`${ImageUrl}/${project.thirdImage}`}
                alt="Third"
                className="w-full h-72 object-cover rounded-2xl border border-slate-600"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-slate-700 text-slate-300 px-5 py-2 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              <ExternalLink size={20} /> Live Website
            </a>
          )}

          {project.uiCodeLink && (
            <a
              href={project.uiCodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition"
            >
              <ExternalLink size={20} /> UI Code
            </a>
          )}

          {project.apiCodeLink && (
            <a
              href={project.apiCodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition"
            >
              <ExternalLink size={20} /> API Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;