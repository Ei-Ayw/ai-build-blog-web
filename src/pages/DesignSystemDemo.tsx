import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { MetricCard } from '../components/business/MetricCard'
import { DataTable } from '../components/business/DataTable'
import { StatusBadge } from '../components/business/StatusBadge'
import { Skeleton, SkeletonCard, SkeletonTable } from '../components/business/Skeleton'
import { EmptyState } from '../components/business/EmptyState'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Star,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react'

// Sample data for the demo
const sampleMetrics = [
  { title: 'Total Revenue', value: 45231.89, change: 20.1, unit: '$', precision: 2, showSign: true },
  { title: 'Active Users', value: 2350, change: -5.2, unit: '', precision: 0, showSign: true },
  { title: 'Conversion Rate', value: 3.2, change: 12.5, unit: '%', precision: 1, showSign: true },
  { title: 'Avg. Session', value: 4.5, change: 0, unit: 'min', precision: 1, showSign: false }
]

const sampleTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin', lastLogin: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User', lastLogin: '1 day ago' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Moderator', lastLogin: '30 min ago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'pending', role: 'User', lastLogin: 'Never' }
]

const tableColumns = [
  { key: 'name' as keyof typeof sampleTableData[0], title: 'Name', width: '25%' },
  { key: 'email' as keyof typeof sampleTableData[0], title: 'Email', width: '30%' },
  { 
    key: 'status' as keyof typeof sampleTableData[0], 
    title: 'Status', 
    width: '15%',
    render: (value: string) => (
      <StatusBadge 
        status={value === 'active' ? 'success' : value === 'inactive' ? 'error' : 'warning'}
        size="sm"
      >
        {value}
      </StatusBadge>
    )
  },
  { key: 'role' as keyof typeof sampleTableData[0], title: 'Role', width: '15%' },
  { key: 'lastLogin' as keyof typeof sampleTableData[0], title: 'Last Login', width: '15%' }
]

const DesignSystemDemo: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <motion.div
        className="bg-card border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-display text-primary mb-4">
              Design System Demo
            </h1>
            <p className="text-body text-secondary max-w-2xl mx-auto">
              Comprehensive design system with color hierarchy, typography, components, and business patterns.
              Built with shadcn/ui style components and modern design principles.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="colors" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Colors & Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="business">Business Patterns</TabsTrigger>
            <TabsTrigger value="states">States & Feedback</TabsTrigger>
          </TabsList>

          {/* Colors & Typography Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Hierarchy */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Color Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Backgrounds</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bg-1 border border-border rounded"></div>
                        <span className="text-body text-secondary">bg-1 (Page)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bg-2 border border-border rounded"></div>
                        <span className="text-body text-secondary">bg-2 (Group/Tag)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bg-3 border border-border rounded"></div>
                        <span className="text-body text-secondary">bg-3 (Card)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bg-4 border border-border rounded"></div>
                        <span className="text-body text-secondary">bg-4 (Modal)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Text Colors</h4>
                    <div className="space-y-2">
                      <div className="text-text-1 text-h4">Primary Text (text-1)</div>
                      <div className="text-text-2 text-body">Secondary Text (text-2)</div>
                      <div className="text-text-3 text-caption">Tertiary Text (text-3)</div>
                      <div className="text-text-4 text-label">Quaternary Text (text-4)</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Semantic Colors</h4>
                    <div className="flex gap-2 flex-wrap">
                      <StatusBadge status="success">Success</StatusBadge>
                      <StatusBadge status="warning">Warning</StatusBadge>
                      <StatusBadge status="error">Error</StatusBadge>
                      <StatusBadge status="info">Info</StatusBadge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Typography Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-display text-primary">Display Text</div>
                  <div className="text-h1 text-primary">Heading 1</div>
                  <div className="text-h2 text-primary">Heading 2</div>
                  <div className="text-h3 text-primary">Heading 3</div>
                  <div className="text-h4 text-primary">Heading 4</div>
                  <div className="text-body text-secondary">
                    Body text with proper line height and spacing for optimal readability.
                  </div>
                  <div className="text-caption text-tertiary">Caption text for secondary information</div>
                  <div className="text-label text-quaternary">LABEL TEXT</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="positive">Positive</Button>
                    <Button variant="negative">Negative</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="info">Info</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Star className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-label text-quaternary">Input Field</label>
                    <Input 
                      placeholder="Enter your text..." 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-label text-quaternary">Select Dropdown</label>
                    <Select value={selectedValue} onValueChange={setSelectedValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Business Patterns Tab */}
          <TabsContent value="business" className="space-y-8">
            {/* Metric Cards */}
            <div>
              <h2 className="text-h2 text-primary mb-6">Metric Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sampleMetrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    unit={metric.unit}
                    precision={metric.precision}
                    showSign={metric.showSign}
                    variant={metric.change > 0 ? 'positive' : metric.change < 0 ? 'negative' : 'default'}
                  />
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div>
              <h2 className="text-h2 text-primary mb-6">Data Table</h2>
              <DataTable
                title="User Management"
                data={sampleTableData}
                columns={tableColumns}
                striped
                compact
              />
            </div>
          </TabsContent>

          {/* States & Feedback Tab */}
          <TabsContent value="states" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Loading States */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Loading States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Skeleton Components</h4>
                    <div className="space-y-2">
                      <Skeleton height="1rem" width="100%" />
                      <Skeleton height="1rem" width="80%" />
                      <Skeleton height="1rem" width="60%" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Skeleton Card</h4>
                    <SkeletonCard />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-h4 text-primary">Skeleton Table</h4>
                    <SkeletonTable rows={3} columns={3} />
                  </div>
                </CardContent>
              </Card>

              {/* Empty States */}
              <Card className="card-base">
                <CardHeader>
                  <CardTitle className="text-h3 text-primary">Empty States</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EmptyState
                    variant="search"
                    title="No results found"
                    description="Try adjusting your search criteria or filters to find what you're looking for."
                    action={{
                      label: "Clear filters",
                      onClick: () => console.log("Clear filters")
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DesignSystemDemo
