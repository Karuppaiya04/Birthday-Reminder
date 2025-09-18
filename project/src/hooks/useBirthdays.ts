import { useEffect, useState } from 'react'
import { supabase, Database } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Birthday = Database['public']['Tables']['birthdays']['Row']

export function useBirthdays() {
  const { user } = useAuth()
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBirthdays = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('birthdays')
        .select('*')
        .eq('user_id', user.id)
        .order('date_of_birth')

      if (error) throw error
      setBirthdays(data || [])
    } catch (error) {
      console.error('Error fetching birthdays:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBirthday = async (birthday: Database['public']['Tables']['birthdays']['Insert']) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('birthdays')
        .insert({ ...birthday, user_id: user.id })
        .select()
        .single()

      if (error) throw error
      setBirthdays(prev => [...prev, data])
      return { data, error: null }
    } catch (error) {
      console.error('Error adding birthday:', error)
      return { data: null, error }
    }
  }

  const updateBirthday = async (id: string, updates: Database['public']['Tables']['birthdays']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('birthdays')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setBirthdays(prev => prev.map(b => b.id === id ? data : b))
      return { data, error: null }
    } catch (error) {
      console.error('Error updating birthday:', error)
      return { data: null, error }
    }
  }

  const deleteBirthday = async (id: string) => {
    try {
      const { error } = await supabase
        .from('birthdays')
        .delete()
        .eq('id', id)

      if (error) throw error
      setBirthdays(prev => prev.filter(b => b.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Error deleting birthday:', error)
      return { error }
    }
  }

  useEffect(() => {
    fetchBirthdays()
  }, [user])

  return {
    birthdays,
    loading,
    addBirthday,
    updateBirthday,
    deleteBirthday,
    refetch: fetchBirthdays,
  }
}