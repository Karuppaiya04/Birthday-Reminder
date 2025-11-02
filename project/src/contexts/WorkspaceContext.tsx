import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import { Database } from '../lib/database.types'

type Workspace = Database['public']['Tables']['workspaces']['Row']
type WorkspaceMember = Database['public']['Tables']['workspace_members']['Row']

interface WorkspaceContextType {
  currentWorkspace: Workspace | null
  workspaces: Workspace[]
  members: WorkspaceMember[]
  loading: boolean
  setCurrentWorkspace: (workspace: Workspace) => void
  createWorkspace: (name: string, description?: string) => Promise<Workspace | null>
  fetchWorkspaces: () => Promise<void>
}

const WorkspaceContext = createContext<WorkspaceContextType>({} as WorkspaceContextType)

export function useWorkspace() {
  return useContext(WorkspaceContext)
}

interface WorkspaceProviderProps {
  children: React.ReactNode
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const { user } = useAuth()
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [members, setMembers] = useState<WorkspaceMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchWorkspaces()
    }
  }, [user])

  useEffect(() => {
    if (currentWorkspace) {
      fetchMembers()
      localStorage.setItem('currentWorkspaceId', currentWorkspace.id)
    }
  }, [currentWorkspace])

  const fetchWorkspaces = async () => {
    if (!user) return

    try {
      const { data: memberData } = await supabase
        .from('workspace_members')
        .select('workspace_id')
        .eq('user_id', user.id)

      if (memberData && memberData.length > 0) {
        const workspaceIds = memberData.map(m => m.workspace_id)
        const { data: workspaceData } = await supabase
          .from('workspaces')
          .select('*')
          .in('id', workspaceIds)

        if (workspaceData) {
          setWorkspaces(workspaceData)

          const savedWorkspaceId = localStorage.getItem('currentWorkspaceId')
          const savedWorkspace = workspaceData.find(w => w.id === savedWorkspaceId)

          setCurrentWorkspace(savedWorkspace || workspaceData[0])
        }
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMembers = async () => {
    if (!currentWorkspace) return

    try {
      const { data } = await supabase
        .from('workspace_members')
        .select('*')
        .eq('workspace_id', currentWorkspace.id)

      if (data) {
        setMembers(data)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  const createWorkspace = async (name: string, description?: string) => {
    if (!user) return null

    try {
      const { data: workspace, error: workspaceError } = await supabase
        .from('workspaces')
        .insert({
          name,
          description,
          owner_id: user.id,
        })
        .select()
        .single()

      if (workspaceError) throw workspaceError

      await supabase.from('workspace_members').insert({
        workspace_id: workspace.id,
        user_id: user.id,
        role: 'admin',
      })

      await fetchWorkspaces()
      setCurrentWorkspace(workspace)
      return workspace
    } catch (error) {
      console.error('Error creating workspace:', error)
      return null
    }
  }

  const value = {
    currentWorkspace,
    workspaces,
    members,
    loading,
    setCurrentWorkspace,
    createWorkspace,
    fetchWorkspaces,
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}
