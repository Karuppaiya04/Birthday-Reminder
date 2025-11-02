import React, { useEffect, useState } from 'react'
import { Database } from '../../lib/database.types'
import { FolderKanban } from 'lucide-react'
import { supabase } from '../../lib/supabase'

type Project = Database['public']['Tables']['projects']['Row']

interface ProjectProgressProps {
  projects: Project[]
}

interface ProjectWithProgress extends Project {
  totalTasks: number
  completedTasks: number
  progress: number
}

export function ProjectProgress({ projects }: ProjectProgressProps) {
  const [projectsWithProgress, setProjectsWithProgress] = useState<ProjectWithProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjectProgress()
  }, [projects])

  const fetchProjectProgress = async () => {
    try {
      const progressData = await Promise.all(
        projects.map(async (project) => {
          const { data: tasks } = await supabase
            .from('tasks')
            .select('status')
            .eq('project_id', project.id)

          const totalTasks = tasks?.length || 0
          const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0
          const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

          return {
            ...project,
            totalTasks,
            completedTasks,
            progress,
          }
        })
      )

      setProjectsWithProgress(progressData)
    } catch (error) {
      console.error('Error fetching project progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FolderKanban className="h-5 w-5 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-900">Project Progress</h2>
      </div>

      {projectsWithProgress.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          No active projects
        </div>
      ) : (
        <div className="space-y-4">
          {projectsWithProgress.map(project => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <span className="text-sm font-medium text-slate-900">{project.name}</span>
                </div>
                <span className="text-sm text-slate-600">
                  {project.completedTasks}/{project.totalTasks}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
