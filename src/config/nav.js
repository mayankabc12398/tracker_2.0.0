import {
  LayoutDashboard,
  ListChecks,
  Target,
  Wallet,
  GraduationCap,
  Code2,
  Palette,
  Braces,
  Atom,
  Globe,
  Bot,
  BarChart3,
  CalendarDays,
  User,
  Settings as SettingsIcon,
} from 'lucide-react'

export const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/habits', label: 'Daily Routine', icon: ListChecks },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/expenses', label: 'Expenses', icon: Wallet },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/learn/html', label: 'HTML Course', icon: Code2 },
  { to: '/learn/css', label: 'CSS Course', icon: Palette },
  { to: '/learn/javascript', label: 'JavaScript Course', icon: Braces },
  { to: '/learn/react', label: 'React Course', icon: Atom },
  { to: '/learn/browser', label: 'Browser Internals', icon: Globe },
  { to: '/learn/ai', label: 'AI Integration', icon: Bot },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
]

export const footerNav = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
] 
