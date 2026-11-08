import { useMemo, useState } from 'react'

import {
  LayoutDashboard, ChartNoAxesCombined, Package, ShoppingBag,
  Users, Settings, Search, Bell, ChevronDown, ArrowUpRight,
  ArrowDownRight, Menu, X, CalendarDays, Download
} from 'lucide-react'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

import './App.css'

const revenueData = {
  'Last 12 months': [
    { month: 'Jan', revenue: 18000 },
    { month: 'Feb', revenue: 24000 },
    { month: 'Mar', revenue: 21000 },
    { month: 'Apr', revenue: 32000 },
    { month: 'May', revenue: 29000 },
    { month: 'Jun', revenue: 41000 },
    { month: 'Jul', revenue: 36000 },
    { month: 'Aug', revenue: 48000 },
    { month: 'Sep', revenue: 43000 },
    { month: 'Oct', revenue: 56000 },
    { month: 'Nov', revenue: 51000 },
    { month: 'Dec', revenue: 68000 },
  ],
  'Last 30 days': [
    { month: 'Week 1', revenue: 12500 },
    { month: 'Week 2', revenue: 14800 },
    { month: 'Week 3', revenue: 13200 },
    { month: 'Week 4', revenue: 16700 },
  ],
  'Last 7 days': [
    { month: 'Mon', revenue: 1800 },
    { month: 'Tue', revenue: 2200 },
    { month: 'Wed', revenue: 1950 },
    { month: 'Thu', revenue: 2600 },
    { month: 'Fri', revenue: 2400 },
    { month: 'Sat', revenue: 3100 },
    { month: 'Sun', revenue: 2800 },
  ],
}

const metrics = {
  'Last 12 months': [
    { title: 'Total Revenue', value: '$84,254', change: '+12.8%', positive: true },
    { title: 'Total Orders', value: '2,450', change: '+8.2%', positive: true },
    { title: 'Total Customers', value: '1,842', change: '+5.4%', positive: true },
    { title: 'Conversion Rate', value: '3.62%', change: '-0.8%', positive: false },
  ],
  'Last 30 days': [
    { title: 'Total Revenue', value: '$57,200', change: '+9.4%', positive: true },
    { title: 'Total Orders', value: '684', change: '+6.1%', positive: true },
    { title: 'Total Customers', value: '512', change: '+4.8%', positive: true },
    { title: 'Conversion Rate', value: '3.48%', change: '+0.3%', positive: true },
  ],
  'Last 7 days': [
    { title: 'Total Revenue', value: '$16,850', change: '+5.6%', positive: true },
    { title: 'Total Orders', value: '186', change: '+7.2%', positive: true },
    { title: 'Total Customers', value: '143', change: '+3.9%', positive: true },
    { title: 'Conversion Rate', value: '3.71%', change: '-0.2%', positive: false },
  ],
}

const orders = [
  { id: '#AU-1042', customer: 'Olivia Martin', product: 'Minimalist Watch', date: 'Nov 08, 2026', amount: '$248.00', status: 'Completed' },
  { id: '#AU-1041', customer: 'James Cooper', product: 'Leather Backpack', date: 'Nov 08, 2026', amount: '$189.00', status: 'Processing' },
  { id: '#AU-1040', customer: 'Sophia Chen', product: 'Ceramic Table Lamp', date: 'Nov 07, 2026', amount: '$124.00', status: 'Completed' },
  { id: '#AU-1039', customer: 'Liam Johnson', product: 'Classic Sneakers', date: 'Nov 07, 2026', amount: '$215.00', status: 'Pending' },
  { id: '#AU-1038', customer: 'Emma Wilson', product: 'Everyday Tote', date: 'Nov 06, 2026', amount: '$96.00', status: 'Completed' },
]

const products = [
  { id: '01', name: 'Minimalist Watch', category: 'Accessories', revenue: '$12,480', stock: 48 },
  { id: '02', name: 'Leather Backpack', category: 'Bags', revenue: '$9,240', stock: 32 },
  { id: '03', name: 'Ceramic Table Lamp', category: 'Home decor', revenue: '$7,850', stock: 21 },
  { id: '04', name: 'Classic Sneakers', category: 'Footwear', revenue: '$6,420', stock: 56 },
  { id: '05', name: 'Everyday Tote', category: 'Accessories', revenue: '$5,180', stock: 37 },
]

const customers = [
  { name: 'Olivia Martin', email: 'olivia@example.com', orders: 24, spent: '$2,480' },
  { name: 'James Cooper', email: 'james@example.com', orders: 18, spent: '$1,890' },
  { name: 'Sophia Chen', email: 'sophia@example.com', orders: 16, spent: '$1,640' },
  { name: 'Liam Johnson', email: 'liam@example.com', orders: 12, spent: '$1,215' },
  { name: 'Emma Wilson', email: 'emma@example.com', orders: 9, spent: '$960' },
]

const navItems = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Analytics', icon: ChartNoAxesCombined },
  { name: 'Products', icon: Package },
  { name: 'Orders', icon: ShoppingBag },
  { name: 'Customers', icon: Users },
]

const orderStatuses = ['All', 'Completed', 'Processing', 'Pending']

type ProfileAction = 'profile' | 'help' | 'signout' | null

function App() {
  const [active, setActive] = useState('Overview')
  const [search, setSearch] = useState('')
  const [period, setPeriod] = useState('Last 12 months')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('All')
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileAction, setProfileAction] = useState<ProfileAction>(null)

  const filteredOrders = useMemo(() =>
    orders.filter(order => {
      const matchesSearch =
        `${order.id} ${order.customer} ${order.product} ${order.status}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter

      return matchesSearch && matchesStatus
    }), [search, statusFilter])

  const filteredProducts = products.filter(product =>
    `${product.name} ${product.category}`
      .toLowerCase().includes(search.toLowerCase())
  )

  const filteredCustomers = customers.filter(customer =>
    `${customer.name} ${customer.email}`
      .toLowerCase().includes(search.toLowerCase())
  )

  const exportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Product', 'Date', 'Amount', 'Status']

    const rows = filteredOrders.map(order => [
      order.id, order.customer, order.product,
      order.date, order.amount, order.status
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(value =>
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')).join('\n')

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'aurelia-orders.csv'

    document.body.appendChild(link)
    link.click()
    link.remove()

    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const changePage = (page: string) => {
    setActive(page)
    setSearch('')
    setStatusFilter('All')
    setMobileOpen(false)
    setProfileOpen(false)
    setProfileAction(null)
  }

  const currentMetrics = metrics[period as keyof typeof metrics]
  const currentRevenue = revenueData[period as keyof typeof revenueData]

  return (
    <div className="app-shell">

      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>

        <div className="brand">
          <div className="brand-mark">A</div>
          <span>AURELIA</span>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav>
          {navItems.map(item => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`nav-item ${active === item.name ? 'active' : ''}`}
                onClick={() => changePage(item.name)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">

          <button
            className={`nav-item ${active === 'Settings' ? 'active' : ''}`}
            onClick={() => changePage('Settings')}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="profile-wrapper">

            <button
              className="profile"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
            >
              <div className="avatar">JD</div>

              <div className="profile-info">
                <strong>Jordan Davis</strong>
                <span>Store owner</span>
              </div>

              <ChevronDown
                size={16}
                className={profileOpen ? 'chevron-rotated' : ''}
              />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <button
                  onClick={() => {
                    setProfileAction('profile')
                    setProfileOpen(false)
                  }}
                >
                  My Profile
                </button>

                <button onClick={() => changePage('Settings')}>
                  Account Settings
                </button>

                <button
                  onClick={() => {
                    setProfileAction('help')
                    setProfileOpen(false)
                  }}
                >
                  Help &amp; Support
                </button>

                <div className="dropdown-divider" />

                <button
                  onClick={() => {
                    setProfileAction('signout')
                    setProfileOpen(false)
                  }}
                >
                  Sign Out
                </button>

              </div>
            )}

          </div>
        </div>
      </aside>

      <main className="main-area">

        <header className="topbar">

          <button
            className="menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

         <div className="breadcrumb">
          <span className="breadcrumb-context">Workspace</span>
          <span className="breadcrumb-separator">/</span>
          <strong>{active}</strong>
</div>

          <div className="topbar-actions">

            <div className="search-box">
              <Search size={16} />

              <input
                placeholder={`Search ${active === 'Overview' ? 'anything' : active.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              <kbd>⌘ K</kbd>
            </div>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
              <i />
            </button>

            <div className="top-avatar">JD</div>
          </div>
        </header>

        <div className="page-content">

          <div className="page-heading">

            <div>
              <div className="eyebrow">SUNDAY, NOVEMBER 8, 2026</div>

              <h1>
                {active === 'Overview' ? 'Good afternoon, Jordan' : active}
              </h1>

              <p>Here's what's happening with your store today.</p>
            </div>

            <div className="heading-actions">

              <button className="secondary-button">
                <CalendarDays size={16} />

                <select
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                  aria-label="Select date range"
                >
                  <option>Last 12 months</option>
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                </select>
              </button>

              <button className="primary-button" onClick={exportCSV}>
                <Download size={16} /> Export
              </button>

            </div>
          </div>

          {(active === 'Overview' || active === 'Analytics') && (
            <>

              <section className="metrics-grid">
                {currentMetrics.map(metric => (
                  <Metric
                    key={metric.title}
                    {...metric}
                    detail="vs. previous period"
                  />
                ))}
              </section>

              <section className="dashboard-grid">

                <div className="panel revenue-panel">

                  <div className="panel-heading">
                    <div>
                      <h2>Revenue overview</h2>
                      <p>Track your store's revenue over time</p>
                    </div>

                    <button className="dots-button" aria-label="More options">
                      •••
                    </button>
                  </div>

                  <div className="chart-legend">
                    <span className="legend-dot" />
                    Revenue

                    <strong>
                      {period === 'Last 12 months'
                        ? '$84,254.00'
                        : period === 'Last 30 days'
                          ? '$57,200.00'
                          : '$16,850.00'}
                    </strong>
                  </div>

                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentRevenue}>

                        <defs>
                          <linearGradient
                            id="revenueFill"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#238567"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#238567"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <CartesianGrid
                          stroke="#edf0ed"
                          vertical={false}
                        />

                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#8b948e', fontSize: 12 }}
                        />

                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#8b948e', fontSize: 12 }}
                          tickFormatter={v => `$${v / 1000}k`}
                        />

                        <Tooltip
                          formatter={(value) => [
                            `$${Number(value).toLocaleString()}`,
                            'Revenue'
                          ]}
                        />

                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#238567"
                          strokeWidth={2.5}
                          fill="url(#revenueFill)"
                        />

                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="panel products-panel">

                  <div className="panel-heading">
                    <div>
                      <h2>Top products</h2>
                      <p>Best performers this month</p>
                    </div>

                    <button
                      className="text-button"
                      onClick={() => changePage('Products')}
                    >
                      View all
                    </button>
                  </div>

                  {products.slice(0, 4).map(product => (
                    <div className="product-row" key={product.id}>

                      <div className="product-number">
                        {product.id}
                      </div>

                      <div className="product-info">
                        <strong>{product.name}</strong>
                        <span>{product.category}</span>
                      </div>

                      <strong className="product-revenue">
                        {product.revenue}
                      </strong>

                    </div>
                  ))}

                </div>
              </section>
            </>
          )}

          {(active === 'Overview' || active === 'Orders') && (
            <section className="panel orders-panel">

              <div className="panel-heading">

                <div>
                  <h2>
                    {active === 'Orders' ? 'All orders' : 'Recent orders'}
                  </h2>

                  <p>
                    Showing {filteredOrders.length}{' '}
                    {filteredOrders.length === 1 ? 'order' : 'orders'}
                    {statusFilter !== 'All' ? ` · ${statusFilter}` : ''}
                  </p>
                </div>

                {active === 'Overview' && (
                  <button
                    className="text-button"
                    onClick={() => changePage('Orders')}
                  >
                    View all orders <ArrowUpRight size={15} />
                  </button>
                )}

              </div>

              {active === 'Orders' && (
                <div className="order-filters">
                  {orderStatuses.map(status => (
                    <button
                      key={status}
                      className={`filter-button ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                      aria-pressed={statusFilter === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}

              <div className="table-wrap">

                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id}>
                        <td className="order-id">{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td className="amount">{order.amount}</td>

                        <td>
                          <span className={`status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="empty-state">
                    No matching orders found.
                  </div>
                )}

              </div>
            </section>
          )}

          {active === 'Products' && (
            <section className="panel orders-panel">

              <div className="panel-heading">
                <div>
                  <h2>Product performance</h2>
                  <p>{filteredProducts.length} products in your catalogue</p>
                </div>
              </div>

              <div className="table-wrap">

                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Revenue</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id}>
                        <td className="order-id">{product.name}</td>
                        <td>{product.category}</td>
                        <td className="amount">{product.revenue}</td>
                        <td>{product.stock} units</td>
                        <td>
                          <span className="status completed">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    No matching products found.
                  </div>
                )}

              </div>
            </section>
          )}

          {active === 'Customers' && (
            <section className="panel orders-panel">

              <div className="panel-heading">
                <div>
                  <h2>Customer directory</h2>
                  <p>{filteredCustomers.length} customers in your view</p>
                </div>
              </div>

              <div className="table-wrap">

                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Total spent</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCustomers.map(customer => (
                      <tr key={customer.email}>
                        <td className="order-id">{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.orders}</td>
                        <td className="amount">{customer.spent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredCustomers.length === 0 && (
                  <div className="empty-state">
                    No matching customers found.
                  </div>
                )}

              </div>
            </section>
          )}

          {active === 'Settings' && (
            <section className="panel orders-panel">

              <div className="panel-heading">
                <div>
                  <h2>Workspace settings</h2>
                  <p>Store profile information</p>
                </div>
              </div>

              <div className="product-row">
                <div className="product-info">
                  <strong>Jordan Davis</strong>
                  <span>Store owner</span>
                </div>

                <strong>AURELIA</strong>
              </div>

              <p>Settings are currently in demonstration mode.</p>

            </section>
          )}

          {profileAction && (
            <div
              className="action-overlay"
              onClick={() => setProfileAction(null)}
            >
              <div
                className="action-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="action-modal-title"
                onClick={e => e.stopPropagation()}
              >

                <button
                  className="modal-close"
                  onClick={() => setProfileAction(null)}
                  aria-label="Close"
                >
                  <X size={19} />
                </button>

                {profileAction === 'profile' && (
                  <>
                    <div className="avatar modal-avatar">JD</div>

                    <h2 id="action-modal-title">My Profile</h2>

                    <p className="modal-description">
                      Your account information
                    </p>

                    <div className="profile-detail">
                      <span>Full name</span>
                      <strong>Jordan Davis</strong>
                    </div>

                    <div className="profile-detail">
                      <span>Role</span>
                      <strong>Store owner</strong>
                    </div>

                    <div className="profile-detail">
                      <span>Workspace</span>
                      <strong>AURELIA</strong>
                    </div>
                  </>
                )}

                {profileAction === 'help' && (
                  <>
                    <h2 id="action-modal-title">Help &amp; Support</h2>

                    <p className="modal-description">
                      Need help using AURELIA?
                    </p>

                    <div className="help-content">

                      <strong>Dashboard guide</strong>
                      <p>
                        Use the sidebar to navigate between Overview,
                        Analytics, Products, Orders and Customers.
                      </p>

                      <strong>Export orders</strong>
                      <p>
                        Select Export to download the currently filtered
                        orders as a CSV file.
                      </p>

                      <strong>Need further assistance?</strong>
                      <p>
                        Support contact is not configured in this demo.
                      </p>

                    </div>
                  </>
                )}

                {profileAction === 'signout' && (
                  <>
                    <h2 id="action-modal-title">Sign Out</h2>

                    <p className="modal-description">
                      This dashboard is running in demo mode.
                      No authentication session is connected, so a real
                      sign-out is not available.
                    </p>
                  </>
                )}

                <button
                  className="primary-button modal-action-button"
                  onClick={() => setProfileAction(null)}
                >
                  {profileAction === 'signout' ? 'Got it' : 'Close'}
                </button>

              </div>
            </div>
          )}

          <footer>
            © 2026 Aurelia Commerce Intelligence
            <span>Built for modern commerce.</span>
          </footer>

        </div>
      </main>
    </div>
  )
}

function Metric({
  title, value, change, positive, detail
}: {
  title: string
  value: string
  change: string
  positive: boolean
  detail: string
}) {
  return (
    <div className="metric-card">

      <div className="metric-top">
        <span>{title}</span>
        <span className="metric-icon">
          <ArrowUpRight size={17} />
        </span>
      </div>

      <div className="metric-value">{value}</div>

      <div className="metric-bottom">
        <span className={positive ? 'positive' : 'negative'}>
          {positive
            ? <ArrowUpRight size={14} />
            : <ArrowDownRight size={14} />}
          {change}
        </span>

        <span>{detail}</span>
      </div>

    </div>
  )
}

export default App