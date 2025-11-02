import React from 'react'
import { Users } from 'lucide-react'

export function TeamView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Team</h1>
        <p className="text-slate-600 mt-1">Manage team members and permissions</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Team management coming soon</h3>
        <p className="text-slate-600">Invite members, set roles, and collaborate effectively</p>
      </div>
    </div>
  )
}
