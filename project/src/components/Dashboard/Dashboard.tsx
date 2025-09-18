import React from 'react'
import { useBirthdays } from '../../hooks/useBirthdays'
import { BirthdayCard } from './BirthdayCard'
import { StatsCard } from './StatsCard'
import { isBirthdayToday, getBirthdaysInRange, getDaysUntilBirthday } from '../../utils/dateUtils'
import { Calendar, Gift, Users, Clock } from 'lucide-react'

export function Dashboard() {
  const { birthdays, loading } = useBirthdays()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const todaysBirthdays = birthdays.filter(b => isBirthdayToday(b.date_of_birth))
  const upcomingBirthdays = getBirthdaysInRange(birthdays, 30)
    .sort((a, b) => getDaysUntilBirthday(a.date_of_birth) - getDaysUntilBirthday(b.date_of_birth))
    .slice(0, 5)

  const stats = [
    { title: 'Total Contacts', value: birthdays.length, icon: Users, color: 'bg-blue-500' },
    { title: "Today's Birthdays", value: todaysBirthdays.length, icon: Gift, color: 'bg-pink-500' },
    { title: 'This Month', value: getBirthdaysInRange(birthdays, 30).length, icon: Calendar, color: 'bg-purple-500' },
    { title: 'Upcoming (7 days)', value: getBirthdaysInRange(birthdays, 7).length, icon: Clock, color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Gift className="h-6 w-6 mr-2" />
            🎉 Today's Birthdays!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysBirthdays.map(birthday => (
              <div key={birthday.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-lg">{birthday.name}</h3>
                <p className="text-pink-100">{birthday.relation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Birthdays */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Birthdays</h2>
        {upcomingBirthdays.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No upcoming birthdays in the next 30 days</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBirthdays.map(birthday => (
              <BirthdayCard key={birthday.id} birthday={birthday} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}