import React, { useState } from 'react'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { Briefcase, Sparkles } from 'lucide-react'

export function OnboardingScreen() {
  const { createWorkspace } = useWorkspace()
  const [workspaceName, setWorkspaceName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createWorkspace(workspaceName, description)
    } catch (error) {
      console.error('Error creating workspace:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Welcome to TaskMaster Pro!
            </h1>
            <p className="text-slate-600 text-lg">
              Let's create your first workspace to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Workspace Name
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., My Company"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="What is this workspace for?"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !workspaceName}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg"
            >
              {loading ? 'Creating Workspace...' : 'Create Workspace'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Pro tip:</strong> You can create multiple workspaces for different teams or
              projects later from the settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
