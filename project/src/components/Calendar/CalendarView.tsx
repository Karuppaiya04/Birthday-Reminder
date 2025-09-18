import React, { useState } from 'react'
import { useBirthdays } from '../../hooks/useBirthdays'
import { generateCalendarDays, getBirthdayForDate } from '../../utils/dateUtils'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

export function CalendarView() {
  const { birthdays, loading } = useBirthdays()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Birthday Calendar</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View all birthdays in a calendar format
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
          </div>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {calendarDays.map(day => {
              const dayBirthdays = getBirthdayForDate(birthdays, day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isTodayDate = isToday(day)

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-[100px] p-2 border rounded-lg transition-colors ${
                    isTodayDate
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                      : isCurrentMonth
                      ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'bg-gray-25 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 opacity-50'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isTodayDate
                      ? 'text-blue-600 dark:text-blue-400'
                      : isCurrentMonth
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {dayBirthdays.map(birthday => (
                      <div
                        key={birthday.id}
                        className="text-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded truncate"
                        title={`${birthday.name} - ${birthday.relation}`}
                      >
                        🎂 {birthday.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Birthday Legend */}
      {birthdays.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">This Month's Birthdays</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {birthdays
              .filter(birthday => {
                const birthDate = new Date(birthday.date_of_birth)
                return birthDate.getMonth() === currentDate.getMonth()
              })
              .map(birthday => (
                <div key={birthday.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="h-3 w-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{birthday.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(birthday.date_of_birth), 'MMMM d')} • {birthday.relation}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}