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

// HTML Learning course (its own full-page layout)
const LearnLayout = lazy(() => import('./learn/LearnLayout').then((m) => ({ default: m.LearnLayout })))
const HtmlHome = lazy(() => import('./learn/HtmlHome'))
const TopicPage = lazy(() => import('./learn/TopicPage'))

// CSS Learning course
const CssLayout = lazy(() => import('./learn/CssLayout').then((m) => ({ default: m.CssLayout })))
const CssHome = lazy(() => import('./learn/CssHome'))
const CssTopicPage = lazy(() => import('./learn/CssTopicPage'))

// JavaScript Learning course
const JsLayout = lazy(() => import('./learn/JsLayout').then((m) => ({ default: m.JsLayout })))
const JsHome = lazy(() => import('./learn/JsHome'))
const JsTopicPage = lazy(() => import('./learn/JsTopicPage'))

// React Learning course
const ReactLayout = lazy(() => import('./learn/ReactLayout').then((m) => ({ default: m.ReactLayout })))
const ReactHome = lazy(() => import('./learn/ReactHome'))
const ReactTopicPage = lazy(() => import('./learn/ReactTopicPage'))

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

        {/* HTML Learning course — dedicated full-page docs layout */}
        <Route path="/learn" element={<Suspense fallback={<PageFallback />}><LearnLayout /></Suspense>}>
          <Route path="html" element={<Suspense fallback={<PageFallback />}><HtmlHome /></Suspense>} />
          <Route path="html/:slug" element={<Suspense fallback={<PageFallback />}><TopicPage /></Suspense>} />
        </Route>

        {/* CSS Learning course */}
        <Route path="/learn/css" element={<Suspense fallback={<PageFallback />}><CssLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><CssHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><CssTopicPage /></Suspense>} />
        </Route>

        {/* JavaScript Learning course */}
        <Route path="/learn/javascript" element={<Suspense fallback={<PageFallback />}><JsLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><JsHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><JsTopicPage /></Suspense>} />
        </Route>

        {/* React Learning course */}
        <Route path="/learn/react" element={<Suspense fallback={<PageFallback />}><ReactLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><ReactHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><ReactTopicPage /></Suspense>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}
