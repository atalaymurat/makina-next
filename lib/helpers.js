export const pad = (n) => {
  return n < 10 ? '0' + n : n
}

export const formingDate = (date) =>
  date
    ? `${pad(new Date(date).getDate())}/${pad(
        new Date(date).getMonth() + 1
      )}/${new Date(date).getFullYear()} ${pad(
        new Date(date).getHours()
      )}:${pad(new Date(date).getMinutes())}`
    : ''

export const formatCurrency = (c) => {
  if (c === 'eur') return '€'
  if (c === 'usd') return '$'
  if (c === 'tl') return '₺'
  return '-'
}
