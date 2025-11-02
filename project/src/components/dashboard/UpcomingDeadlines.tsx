import React from 'react'
import { Database } from '../../lib/database.types'
import { Calendar, AlertCircle } from 'lucide-react'
import { format, isToday, isTomorrow, isPast } from 'date-fns'

type Task = Database['public']['Tables']['tasks']['Row']

interface UpcomingDeadlinesProps {
  tasks: Task[]
}

export function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  const tasksWithDeadlines = tasks
    .filter(t => t.due_date && t.status !== 'completed' && t.status !== 'cancelled')
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
    .slice(0, 5)

  const getDeadlineLabel = (date: string) => {
    const dueDate = new Date(date)
    if (isPast(dueDate)) return 'Overdue'
    if (isToday(dueDate)) return 'Today'
    if (isTomorrow(dueDate)) return 'Tomorrow'
    return format(dueDate, 'MMM d')
  }

  const getDeadlineColor = (date: string) => {
    const dueDate = new Date(date)
    if (isPast(dueDate)) return 'text-red-600 bg-red-50'
    if (isToday(dueDate)) return 'text-orange-600 bg-orange-50'
    if (isTomorrow(dueDate)) return 'text-yellow-600 bg-yellow-50'
    return 'text-blue-600 bg-blue-50'
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h2>
      </div>

      {tasksWithDeadlines.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          No upcoming deadlines
        </div>
      ) : (
        <div className="space-y-3">
          {tasksWithDeadlines.map(task => {
            const isOverdue = isPast(new Date(task.due_date!))
            return (
              <div
                key={task.id}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-900 flex-1">
                    {task.title}
                  </h3>
                  {isOverdue && (
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 ml-2" />
                  )}
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getDeadlineColor(task.due_date!)}`}>
                  {getDeadlineLabel(task.due_date!)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
