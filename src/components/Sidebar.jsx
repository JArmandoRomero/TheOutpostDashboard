import { LayoutDashboard, Users, Settings, ArchiveX } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
      <div className="p-6 text-xl font-bold">Outpost Travel</div>
      <nav className="flex-1 space-y-2 px-4">
        <NavItem to="/" icon={<LayoutDashboard />} label="Dashboard" />
        <NavItem to="/articles" icon={<ArchiveX />} label="Articles" />
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
        `flex items-center gap-3 px-4 py-2 rounded-lg ${
          isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}