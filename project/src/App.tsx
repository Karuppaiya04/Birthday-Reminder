import React from 'react'
import { useAuth } from './contexts/AuthContext'
import { useWorkspace } from './contexts/WorkspaceContext'
import { AuthScreen } from './components/auth/AuthScreen'
import { OnboardingScreen } from './components/onboarding/OnboardingScreen'
import { MainLayout } from './components/layout/MainLayout'

function App() {
  const { user, loading: authLoading } = useAuth()
  const { workspaces, loading: workspaceLoading } = useWorkspace()

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthScreen />
  }

  if (!workspaceLoading && workspaces.length === 0) {
    return <OnboardingScreen />
  }

  return <MainLayout />
}

export default App