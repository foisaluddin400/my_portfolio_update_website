'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  FolderOpen, 
  LogOut 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Visitors', href: '/dashboard/visitors', icon: Users },
  { name: 'About Us', href: '/dashboard/about-us', icon: Users },
  { name: 'Services', href: '/dashboard/services', icon: Users },
  { name: 'Skills', href: '/dashboard/skills', icon: Award },
  { name: 'Resume', href: '/dashboard/resume', icon: FolderOpen },
    { name: 'Client Review', href: '/dashboard/client-review', icon: FolderOpen },
      { name: 'Blogs', href: '/dashboard/blogs', icon: FolderOpen },
        
          { name: 'Projects', href: '/dashboard/projects', icon: Users },
          { name: 'Contact', href: '/dashboard/contact', icon: Users },
           { name: 'Profile', href: '/dashboard/profile', icon: Users },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#111816] text-gray-200">
      {/* Sidebar - Dark */}
      <div className="w-72 bg-[#1a2421] border-r border-gray-800 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 text-red-400 hover:bg-red-950/50 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header - Dark */}
        <header className="bg-[#1a2421] border-b border-gray-800 h-16 flex items-center px-8 justify-between">
          <h2 className="text-xl font-semibold text-white">
            Welcome back, Admin
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 bg-[#111816]">
          {children}
        </main>
      </div>
    </div>
  );
}