import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { lazyWithRetry as lazy } from './lib/lazyWithRetry'
import { AppLayout } from './components/layout/AppLayout'
import { SyncManager } from './components/SyncManager'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from './components/ui/Toast'
import { CardSkeleton } from './components/ui/Skeleton'
import { useTheme } from './hooks/useTheme'

// Code-split each module for faster first paint.
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Habits = lazy(() => import('./pages/Habits'))
const Alarm = lazy(() => import('./pages/Alarm'))
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

// Browser Internals course
const BrowserLayout = lazy(() => import('./learn/BrowserLayout').then((m) => ({ default: m.BrowserLayout })))
const BrowserHome = lazy(() => import('./learn/BrowserHome'))
const BrowserTopicPage = lazy(() => import('./learn/BrowserTopicPage'))

// AI Integration course
const AiLayout = lazy(() => import('./learn/AiLayout').then((m) => ({ default: m.AiLayout })))
const AiHome = lazy(() => import('./learn/AiHome'))
const AiTopicPage = lazy(() => import('./learn/AiTopicPage'))

// AI App Engineering course
const AiAppLayout = lazy(() => import('./learn/AiAppLayout').then((m) => ({ default: m.AiAppLayout })))
const AiAppHome = lazy(() => import('./learn/AiAppHome'))
const AiAppTopicPage = lazy(() => import('./learn/AiAppTopicPage'))

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
        {/* Public login route */}
        <Route path="/login" element={<Suspense fallback={<PageFallback />}><LoginPage /></Suspense>} />

        {/* AppLayout renders a single Suspense above its page-transition
            AnimatePresence, so these children don't need their own.
            Wrapped in ProtectedRoute → personal app pages require login. */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="alarm" element={<Alarm />} />
          <Route path="goals" element={<Goals />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="learning" element={<Learning />} />
          <Route path="learning/:topicId" element={<TopicDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
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

        {/* Browser Internals course */}
        <Route path="/learn/browser" element={<Suspense fallback={<PageFallback />}><BrowserLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><BrowserHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><BrowserTopicPage /></Suspense>} />
        </Route>

        {/* AI Integration course */}
        <Route path="/learn/ai" element={<Suspense fallback={<PageFallback />}><AiLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><AiHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><AiTopicPage /></Suspense>} />
        </Route>

        {/* AI App Engineering course */}
        <Route path="/learn/ai-apps" element={<Suspense fallback={<PageFallback />}><AiAppLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<PageFallback />}><AiAppHome /></Suspense>} />
          <Route path=":slug" element={<Suspense fallback={<PageFallback />}><AiAppTopicPage /></Suspense>} />
        </Route>
      </Routes>
      <SyncManager />
      <Toaster />
    </>
  )
}
