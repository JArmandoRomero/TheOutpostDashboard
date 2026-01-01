import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ClipboardList
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold">Outpost Travel</div>

      <nav className="flex-1 space-y-2 px-4">
        <NavItem to="/" icon={<LayoutDashboard />} label="Dashboard" />
        <NavItem to="/forms" icon={<FileText />} label="Forms" />
        <NavItem to="/submissions" icon={<ClipboardList />} label="Submissions" />
        <NavItem to="/articles" icon={<FileText />} label="Articles" />
        <NavItem to="/users" icon={<Users />} label="Users" />
        <NavItem to="/settings" icon={<Settings />} label="Settings" />
      </nav>
    </aside>
  )
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
        }`
      }
    >
      {React.cloneElement(icon, {
        className: 'h-5 w-5 shrink-0'
      })}
      <span>{label}</span>
    </NavLink>
  )
}
