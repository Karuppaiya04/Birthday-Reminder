import React from 'react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  Zap,
  ChevronLeft
} from 'lucide-react'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onToggle: () => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', name: 'Projects', icon: FolderKanban },
  { id: 'tasks', name: 'Tasks', icon: CheckSquare },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'team', name: 'Team', icon: Users },
]

export function Sidebar({ activeView, onViewChange, isOpen, onToggle }: SidebarProps) {
  const { currentWorkspace } = useWorkspace()

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50"
      >
        <ChevronLeft className="h-5 w-5 transform rotate-180" />
      </button>
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">TaskMaster</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-xs text-slate-500 mb-1">Current Workspace</div>
          <div className="font-medium text-slate-900 truncate">
            {currentWorkspace?.name || 'Loading...'}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
