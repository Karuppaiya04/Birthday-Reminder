import React from 'react'
import { CheckSquare } from 'lucide-react'

export function TasksView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
        <p className="text-slate-600 mt-1">View and manage all your tasks</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <CheckSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Task management coming soon</h3>
        <p className="text-slate-600">Advanced task board with drag-and-drop, filtering, and more</p>
      </div>
    </div>
  )
}
