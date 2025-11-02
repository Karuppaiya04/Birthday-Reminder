import React from 'react'
import { Database } from '../../lib/database.types'
import { Activity } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

type ActivityLog = Database['public']['Tables']['activity_logs']['Row']

interface ActivityFeedProps {
  activities: ActivityLog[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          No recent activity
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex space-x-3">
              <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  {activity.action.replace(/_/g, ' ')}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
