import { format, isToday, isTomorrow, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns'

export function formatBirthdayDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'MMMM d')
}

export function getAge(dateString: string): number {
  const birthDate = parseISO(dateString)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function getNextBirthday(dateString: string): Date {
  const birthDate = parseISO(dateString)
  const today = new Date()
  const thisYear = today.getFullYear()
  
  let nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate())
  
  if (nextBirthday < today) {
    nextBirthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate())
  }
  
  return nextBirthday
}

export function getDaysUntilBirthday(dateString: string): number {
  const nextBirthday = getNextBirthday(dateString)
  const today = new Date()
  const diffTime = nextBirthday.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isBirthdayToday(dateString: string): boolean {
  const birthDate = parseISO(dateString)
  return isToday(new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate()))
}

export function isBirthdayTomorrow(dateString: string): boolean {
  const birthDate = parseISO(dateString)
  return isTomorrow(new Date(new Date().getFullYear(), birthDate.getMonth(), birthDate.getDate()))
}

export function getBirthdaysInRange(birthdays: any[], days: number) {
  const today = new Date()
  const endDate = addDays(today, days)
  
  return birthdays.filter(birthday => {
    const nextBirthday = getNextBirthday(birthday.date_of_birth)
    return nextBirthday >= today && nextBirthday <= endDate
  })
}

export function generateCalendarDays(date: Date) {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({ start, end })
}

export function getBirthdayForDate(birthdays: any[], date: Date) {
  return birthdays.filter(birthday => {
    const birthDate = parseISO(birthday.date_of_birth)
    return birthDate.getMonth() === date.getMonth() && birthDate.getDate() === date.getDate()
  })
}