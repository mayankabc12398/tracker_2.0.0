import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Toaster } from './components/ui/Toast'
import { CardSkeleton } from './components/ui/Skeleton'
import { useTheme } from './hooks/useTheme'

// Code-split each module for faster first paint.
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Habits = lazy(() => import('./pages/Habits'))
const Goals = lazy(() => import('./pages/Goals'))
const Expenses = lazy(() => import('./pages/Expenses'))
const Learning = lazy(() => import('./pages/Learning'))
const TopicDetail = lazy(() => import('./pages/TopicDetail'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))

function PageFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function App() {
  useTheme()
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="habits" element={<Suspense fallback={<PageFallback />}><Habits /></Suspense>} />
          <Route path="goals" element={<Suspense fallback={<PageFallback />}><Goals /></Suspense>} />
          <Route path="expenses" element={<Suspense fallback={<PageFallback />}><Expenses /></Suspense>} />
          <Route path="learning" element={<Suspense fallback={<PageFallback />}><Learning /></Suspense>} />
          <Route path="learning/:topicId" element={<Suspense fallback={<PageFallback />}><TopicDetail /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<PageFallback />}><Analytics /></Suspense>} />
          <Route path="calendar" element={<Suspense fallback={<PageFallback />}><Calendar /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<PageFallback />}><Profile /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageFallback />}><Settings /></Suspense>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}
