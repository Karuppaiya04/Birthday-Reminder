import React from 'react'
import { BarChart3 } from 'lucide-react'

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Track your team's productivity and insights</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics dashboard coming soon</h3>
        <p className="text-slate-600">Charts, insights, and detailed productivity metrics</p>
      </div>
    </div>
  )
}
