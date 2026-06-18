

/** Serialize transactions to CSV and trigger a browser download. */
export function exportTransactionsCSV(rows, filename = 'lifeflow-expenses.csv') {
  const headers = ['Date', 'Type', 'Title', 'Category', 'Amount']
  const lines = rows.map((t) =>
    [t.date, t.type, `"${t.title.replace(/"/g, '""')}"`, t.category, t.amount].join(','),
  )
  const csv = [headers.join(','), ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
