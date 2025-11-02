import React, { useEffect, useState } from 'react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { supabase } from '../../lib/supabase'
import { StatsCards } from './StatsCards'
import { RecentTasks } from './RecentTasks'
import { ActivityFeed } from './ActivityFeed'
import { UpcomingDeadlines } from './UpcomingDeadlines'
import { ProjectProgress } from './ProjectProgress'
import { Database } from '../../lib/database.types'

type Task = Database['public']['Tables']['tasks']['Row']
type Project = Database['public']['Tables']['projects']['Row']
type ActivityLog = Database['public']['Tables']['activity_logs']['Row']

export function Dashboard() {
  const { currentWorkspace } = useWorkspace()
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentWorkspace) {
      fetchDashboardData()
    }
  }, [currentWorkspace])

  const fetchDashboardData = async () => {
    if (!currentWorkspace) return

    try {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('workspace_id', currentWorkspace.id)
        .eq('status', 'active')

      if (projectsData) {
        setProjects(projectsData)

        const projectIds = projectsData.map(p => p.id)

        const { data: tasksData } = await supabase
          .from('tasks')
          .select('*')
          .in('project_id', projectIds)
          .order('created_at', { ascending: false })
          .limit(20)

        if (tasksData) {
          setTasks(tasksData)
        }
      }

      const { data: activitiesData } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('workspace_id', currentWorkspace.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (activitiesData) {
        setActivities(activitiesData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <StatsCards tasks={tasks} projects={projects} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentTasks tasks={tasks.slice(0, 5)} />
          <ProjectProgress projects={projects} />
        </div>

        <div className="space-y-6">
          <UpcomingDeadlines tasks={tasks} />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  )
}
