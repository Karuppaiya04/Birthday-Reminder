import React from 'react'
import { formatBirthdayDate, getDaysUntilBirthday, getAge, isBirthdayToday } from '../../utils/dateUtils'
import { Calendar, Gift, User, Cake } from 'lucide-react'
import { Database } from '../../lib/supabase'

type Birthday = Database['public']['Tables']['birthdays']['Row']

interface BirthdayCardProps {
  birthday: Birthday
  showActions?: boolean
}

export function BirthdayCard({ birthday, showActions = false }: BirthdayCardProps) {
  const daysUntil = getDaysUntilBirthday(birthday.date_of_birth)
  const age = getAge(birthday.date_of_birth) + 1 // Next age
  const isToday = isBirthdayToday(birthday.date_of_birth)

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
      isToday ? 'border-pink-300 ring-2 ring-pink-200 dark:border-pink-600 dark:ring-pink-800' : 'border-gray-200 dark:border-gray-700'
    } p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {birthday.profile_picture_url ? (
            <img
              src={birthday.profile_picture_url}
              alt={birthday.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{birthday.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{birthday.relation}</p>
          </div>
        </div>
        {isToday && <Gift className="h-6 w-6 text-pink-500" />}
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          {formatBirthdayDate(birthday.date_of_birth)}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Cake className="h-4 w-4 mr-2" />
          Turning {age}
        </div>
      </div>

      <div className={`mt-4 px-3 py-2 rounded-lg text-sm font-medium ${
        isToday
          ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
          : daysUntil <= 7
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      }`}>
        {isToday ? '🎉 Today!' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days left`}
      </div>

      {birthday.notes && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">{birthday.notes}</p>
        </div>
      )}
    </div>
  )
}