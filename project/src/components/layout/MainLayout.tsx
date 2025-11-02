import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Dashboard } from '../dashboard/Dashboard'
import { ProjectsView } from '../projects/ProjectsView'
import { TasksView } from '../tasks/TasksView'
import { AnalyticsView } from '../analytics/AnalyticsView'
import { TeamView } from '../team/TeamView'

export function MainLayout() {
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'projects':
        return <ProjectsView />
      case 'tasks':
        return <TasksView />
      case 'analytics':
        return <AnalyticsView />
      case 'team':
        return <TeamView />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  )
}
