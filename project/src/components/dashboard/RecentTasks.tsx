import React from 'react'
import { Database } from '../../lib/database.types'
import { Clock, User, Flag } from 'lucide-react'
import { format } from 'date-fns'

type Task = Database['public']['Tables']['tasks']['Row']

interface RecentTasksProps {
  tasks: Task[]
}

const statusColors = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-blue-100 text-blue-700',
  review: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const priorityColors = {
  low: 'text-slate-500',
  medium: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Tasks</h2>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          No tasks yet. Create your first task to get started!
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-slate-900">{task.title}</h3>
                  <Flag className={`h-4 w-4 ${priorityColors[task.priority]}`} />
                </div>
                {task.description && (
                  <p className="text-sm text-slate-600 line-clamp-1">{task.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  {task.due_date && (
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(new Date(task.due_date), 'MMM d')}
                    </div>
                  )}
                  {task.assigned_to && (
                    <div className="flex items-center text-xs text-slate-500">
                      <User className="h-3 w-3 mr-1" />
                      Assigned
                    </div>
                  )}
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
