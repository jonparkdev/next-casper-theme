import { format } from 'date-fns'

// See documentation for 'date-fns' for other forms of formatStrings
export const formatDate = (date, formatString) => {
  const dateValue = new Date(date)
  return format(dateValue, formatString)
}
