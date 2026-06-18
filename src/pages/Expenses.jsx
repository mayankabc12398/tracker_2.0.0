import { useEffect, useMemo, useState } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Legend,
} from 'recharts'
import {
  Plus, Search, Download, Trash2, TrendingUp, TrendingDown, PiggyBank, Wallet,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'
import { formatCurrency, formatDate } from '@/lib/utils'
import { exportTransactionsCSV } from '@/lib/csv'


const CATS = ['Food', 'Shopping', 'Travel', 'Bills', 'Entertainment', 'Others']
const CAT_COLOR = {
  Food: '#22C55E', Shopping: '#8B5CF6', Travel: '#6366F1', Bills: '#F59E0B', Entertainment: '#EC4899', Others: '#64748B',
}

export default function Expenses() {
  const { transactions, addTransaction, deleteTransaction, settings } = useStore()
  const [query, setQuery] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  const thisMonth = new Date().toISOString().slice(0, 7)
  const monthTxns = transactions.filter((t) => t.date.startsWith(thisMonth))
  const income = monthTxns.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0)
  const spend = monthTxns.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
  const savings = income - spend
  const savingsRate = income ? Math.round((savings / income) * 100) : 0

  const byCategory = useMemo(
    () =>
      CATS.map((c) => ({
        name: c,
        value: monthTxns.filter((t) => t.type === 'expense' && t.category === c).reduce((a, t) => a + t.amount, 0),
        color: CAT_COLOR[c],
      })).filter((d) => d.value > 0),
    [monthTxns],
  )

  // 6-month income vs expense bars.
  const monthly = useMemo(() => {
    const out = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const key = d.toISOString().slice(0, 7)
      const list = transactions.filter((t) => t.date.startsWith(key))
      out.push({
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        income: list.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0),
        expense: list.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0),
      })
    }
    return out
  }, [transactions])

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (catFilter === 'All' ? true : t.category === catFilter))
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
  }, [transactions, catFilter, query])

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  useEffect(() => setPage(1), [query, catFilter])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expense Management"
        subtitle="Track spending, income & savings"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => { exportTransactionsCSV(filtered); toast.success('CSV exported') }}><Download size={16} /> Export</Button>
            <Button onClick={() => setOpen(true)}><Plus size={16} /> Add</Button>
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Summary label="Income" value={formatCurrency(income, settings.currency)} icon={TrendingUp} tone="text-brand-green" sub="This month" />
        <Summary label="Expenses" value={formatCurrency(spend, settings.currency)} icon={TrendingDown} tone="text-red-400" sub="This month" />
        <Summary label="Savings" value={formatCurrency(savings, settings.currency)} icon={PiggyBank} tone="text-brand-indigo" sub={`${savingsRate}% saved`} />
        <Summary label="Transactions" value={String(monthTxns.length)} icon={Wallet} tone="text-brand-amber" sub="This month" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Category Breakdown" subtitle="This month's spending" />
          {byCategory.length === 0 ? (
            <EmptyState title="No spending yet" description="Add an expense to see the breakdown." />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {byCategory.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v, settings.currency)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <CardHeader title="Income vs Expenses" subtitle="Last 6 months" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => formatCurrency(v, settings.currency)} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Transactions table */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions…" className="pl-9" />
          </div>
          <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value )} className="w-auto">
            <option value="All">All categories</option>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>

        {paged.length === 0 ? (
          <EmptyState title="No transactions found" description="Try a different search or filter." />
        ) : (
          <div className="space-y-1.5">
            {paged.map((t) => (
              <div key={t.id} className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <span className="h-9 w-9 shrink-0 rounded-lg" style={{ background: `${CAT_COLOR[t.category]}22`, border: `1px solid ${CAT_COLOR[t.category]}44` }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100">{t.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(t.date, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <Badge tone="slate">{t.category}</Badge>
                <span className={`w-24 text-right text-sm font-semibold ${t.type === 'income' ? 'text-brand-green' : 'text-slate-200'}`}>
                  {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount, settings.currency)}
                </span>
                <button onClick={() => { deleteTransaction(t.id); toast.info('Deleted') }} className="text-slate-500 opacity-0 transition hover:text-red-400 group-hover:opacity-100"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">Page {page} of {pages}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </Card>

      <ExpenseModal open={open} onClose={() => setOpen(false)} onSubmit={(d) => { addTransaction(d); toast.success('Transaction added'); setOpen(false) }} />
    </div>
  )
}

function Summary({ label, value, icon: Icon, tone, sub }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{label}</span>
        <Icon size={16} className={tone} />
      </div>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-slate-500">{sub}</p>
    </Card>
  )
}

function ExpenseModal({ open, onClose, onSubmit }) {
  const [type, setType] = useState('expense')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    if (open) { setType('expense'); setTitle(''); setAmount(''); setCategory('Food'); setDate(new Date().toISOString().slice(0, 10)) }
  }, [open])

  const submit = () => {
    const amt = parseFloat(amount)
    if (!title.trim() || !amt) { toast.error('Enter a title and amount'); return }
    onSubmit({ type, title, amount: amt, category, date })
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Transaction" footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={submit}>Add</Button></>}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {(['expense', 'income'] ).map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-xl border py-2.5 text-sm font-medium capitalize transition ${type === t ? 'border-brand-indigo/40 bg-brand-indigo/15 text-white' : 'border-white/10 text-slate-400'}`}>{t}</button>
          ))}
        </div>
        <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Groceries" autoFocus /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Amount"><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></Field>
          <Field label="Date"><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
        </div>
        <Field label="Category"><Select value={category} onChange={(e) => setCategory(e.target.value )}>{CATS.map((c) => <option key={c}>{c}</option>)}</Select></Field>
      </div>
    </Modal>
  )
}
