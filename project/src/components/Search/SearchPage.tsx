import React, { useState, useMemo } from 'react'
import { useBirthdays } from '../../hooks/useBirthdays'
import { BirthdayCard } from '../Dashboard/BirthdayCard'
import { Search, Filter, X } from 'lucide-react'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const relations = ['all', 'family', 'friend', 'colleague', 'acquaintance', 'other']

export function SearchPage() {
  const { birthdays, loading } = useBirthdays()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [selectedRelation, setSelectedRelation] = useState('all')

  const filteredBirthdays = useMemo(() => {
    return birthdays.filter(birthday => {
      const matchesSearch = birthday.name.toLowerCase().includes(searchTerm.toLowerCase())
      const birthMonth = new Date(birthday.date_of_birth).getMonth()
      const matchesMonth = selectedMonth === 'all' || birthMonth === months.indexOf(selectedMonth)
      const matchesRelation = selectedRelation === 'all' || birthday.relation === selectedRelation

      return matchesSearch && matchesMonth && matchesRelation
    })
  }, [birthdays, searchTerm, selectedMonth, selectedRelation])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedMonth('all')
    setSelectedRelation('all')
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search & Filter Birthdays</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find specific contacts or filter by month and relationship
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search by name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Type a name..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by relation
            </label>
            <select
              value={selectedRelation}
              onChange={(e) => setSelectedRelation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {relations.map(relation => (
                <option key={relation} value={relation} className="capitalize">
                  {relation === 'all' ? 'All relations' : relation}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchTerm || selectedMonth !== 'all' || selectedRelation !== 'all') && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Filter className="h-4 w-4" />
              <span>Showing {filteredBirthdays.length} of {birthdays.length} birthdays</span>
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <X className="h-4 w-4" />
              <span>Clear filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredBirthdays.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No birthdays found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search term or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBirthdays.map(birthday => (
            <BirthdayCard key={birthday.id} birthday={birthday} />
          ))}
        </div>
      )}
    </div>
  )
}