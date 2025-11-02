import React from 'react'
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react'
import { Database } from '../../lib/database.types'

type Task = Database['public']['Tables']['tasks']['Row']
type Project = Database['public']['Tables']['projects']['Row']

interface StatsCardsProps {
  tasks: Task[]
  projects: Project[]
}

export function StatsCards({ tasks, projects }: StatsCardsProps) {
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length
  const overdueTasks = tasks.filter(t => {
    if (!t.due_date) return false
    return new Date(t.due_date) < new Date() && t.status !== 'completed'
  }).length

  const completionRate = tasks.length > 0
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0

  const stats = [
    {
      title: 'Active Projects',
      value: projects.length,
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Overdue',
      value: overdueTasks,
      icon: AlertCircle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              {index === 2 && (
                <div className="text-sm font-medium text-green-600">
                  {completionRate}%
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-600">{stat.title}</p>
          </div>
        )
      })}
    </div>
  )
}
