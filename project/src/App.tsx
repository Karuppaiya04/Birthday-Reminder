import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import { AuthForm } from './components/Auth/AuthForm'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard/Dashboard'
import { AddBirthdayForm } from './components/AddBirthday/AddBirthdayForm'
import { SearchPage } from './components/Search/SearchPage'
import { CalendarView } from './components/Calendar/CalendarView'

function App() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'add':
        return <AddBirthdayForm />
      case 'search':
        return <SearchPage />
      case 'calendar':
        return <CalendarView />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  )
}

export default App