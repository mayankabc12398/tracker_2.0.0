/**
 * Example React Query hooks backed by the LifeFlow API.
 * These are ready to wire up once the backend is running — the UI currently
 * reads from the Zustand local-first store for zero-setup demoing.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'


export function useHabitsQuery() {
  return useQuery({
    queryKey: ['habits'],
    queryFn: () => api.get('/habits'),
  })
}

export function useCreateHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (habit) => api.post('/habits', habit),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['habits'] }),
  })
}

export function useToggleHabit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, date }) => api.post(`/habits/${id}/toggle`, { date }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['habits'] }),
  })
}

export function useGoalsQuery() {
  return useQuery({ queryKey: ['goals'], queryFn: () => api.get('/goals') })
}

export function useExpensesQuery(params = '') {
  return useQuery({
    queryKey: ['expenses', params],
    queryFn: () => api.get(`/expenses${params}`),
  })
}

export function useAnalyticsSummary() {
  return useQuery({ queryKey: ['analytics', 'summary'], queryFn: () => api.get('/analytics/summary') })
}
