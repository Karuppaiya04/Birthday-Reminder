import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Bell, Menu, Search, LogOut, User } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks, projects, or team members..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-slate-100 rounded-lg relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">
                {user?.user_metadata?.full_name || 'User'}
              </div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>

              <button
                onClick={() => signOut()}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
