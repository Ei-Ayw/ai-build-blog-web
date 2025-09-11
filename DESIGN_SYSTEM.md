# Design System Documentation

## Overview

This design system implements a comprehensive, modern SaaS dashboard design with minimalist luxury aesthetics. It features a structured color hierarchy, typography system, and component library built on shadcn/ui principles.

## Core Principles

- **Minimalist Luxury**: Clean, airy layouts with generous whitespace
- **Information Density Control**: Clear hierarchy with bg-1~bg-4 and text-1~text-4
- **Consistent Interactions**: Unified hover, focus, and disabled states
- **Mobile-First**: Responsive design with proper breakpoints
- **Accessibility**: Keyboard navigation and screen reader support

## Color System

### Background Hierarchy
- `bg-1`: Page background (lightest)
- `bg-2`: Group/tag background
- `bg-3`: Card background
- `bg-4`: Modal background (darkest)

### Text Hierarchy
- `text-1`: Primary text (highest contrast)
- `text-2`: Secondary text
- `text-3`: Tertiary text
- `text-4`: Quaternary text (lowest contrast)

### Semantic Colors
- `positive`: Success states (green)
- `negative`: Error states (red)
- `warning`: Warning states (orange)
- `info`: Information states (blue)

### Usage
```css
/* Background utilities */
.bg-page { @apply bg-bg-1; }
.bg-group { @apply bg-bg-2; }
.bg-card { @apply bg-bg-3; }
.bg-modal { @apply bg-bg-4; }

/* Text utilities */
.text-primary { @apply text-text-1; }
.text-secondary { @apply text-text-2; }
.text-tertiary { @apply text-text-3; }
.text-quaternary { @apply text-text-4; }
```

## Typography

### Hierarchy
- `text-display`: Large display text (4xl-5xl)
- `text-h1`: Main headings (3xl-4xl)
- `text-h2`: Section headings (2xl-3xl)
- `text-h3`: Subsection headings (xl-2xl)
- `text-h4`: Component headings (lg-xl)
- `text-body`: Body text with proper line height
- `text-caption`: Secondary information
- `text-label`: Form labels and small text

### Usage
```jsx
<h1 className="text-display text-primary">Main Title</h1>
<h2 className="text-h2 text-primary">Section Title</h2>
<p className="text-body text-secondary">Body content</p>
<label className="text-label text-quaternary">Form Label</label>
```

## Components

### Base Components (shadcn/ui style)

#### Button
```jsx
import { Button } from '../components/ui/button'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="positive">Positive</Button>
<Button variant="negative">Negative</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

#### Input
```jsx
import { Input } from '../components/ui/input'

<Input placeholder="Enter text..." />
```

#### Select
```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Card
```jsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

#### Dialog
```jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
    </DialogHeader>
    Modal content
  </DialogContent>
</Dialog>
```

#### Tabs
```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Business Components

#### MetricCard
```jsx
import { MetricCard } from '../components/business/MetricCard'

<MetricCard
  title="Total Revenue"
  value={45231.89}
  change={20.1}
  unit="$"
  precision={2}
  showSign={true}
  variant="positive"
/>
```

#### DataTable
```jsx
import { DataTable } from '../components/business/DataTable'

const columns = [
  { key: 'name', title: 'Name', width: '25%' },
  { key: 'email', title: 'Email', width: '30%' },
  { 
    key: 'status', 
    title: 'Status', 
    width: '15%',
    render: (value) => <StatusBadge status={value} />
  }
]

<DataTable
  title="User Management"
  data={userData}
  columns={columns}
  striped
  compact
/>
```

#### StatusBadge
```jsx
import { StatusBadge } from '../components/business/StatusBadge'

<StatusBadge status="success" size="sm">Active</StatusBadge>
<StatusBadge status="warning" size="md">Pending</StatusBadge>
<StatusBadge status="error" size="lg">Inactive</StatusBadge>
```

#### Skeleton Components
```jsx
import { Skeleton, SkeletonCard, SkeletonTable } from '../components/business/Skeleton'

<Skeleton height="1rem" width="100%" />
<SkeletonCard />
<SkeletonTable rows={5} columns={4} />
```

#### EmptyState
```jsx
import { EmptyState } from '../components/business/EmptyState'

<EmptyState
  variant="search"
  title="No results found"
  description="Try adjusting your search criteria."
  action={{
    label: "Clear filters",
    onClick: () => console.log("Clear filters")
  }}
/>
```

## Layout Patterns

### Card Hierarchy
```jsx
// Page background
<div className="bg-page min-h-screen">
  {/* Group background */}
  <div className="bg-group p-6 rounded-lg">
    {/* Card background */}
    <Card className="bg-card">
      <CardContent>
        Content
      </CardContent>
    </Card>
  </div>
</div>
```

### Responsive Grid
```jsx
// Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {item.content}
    </Card>
  ))}
</div>
```

### Three-Column Layout
```jsx
<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
  {/* Left sidebar - 3 columns */}
  <div className="xl:col-span-3">
    <Card>Form content</Card>
  </div>
  
  {/* Main content - 7 columns */}
  <div className="xl:col-span-7">
    <Card>Main content</Card>
  </div>
  
  {/* Right sidebar - 2 columns */}
  <div className="xl:col-span-2">
    <Card>Sidebar content</Card>
  </div>
</div>
```

## Interaction States

### Hover States
- Subtle scale transforms (1.02-1.05)
- Background color changes
- Shadow elevation changes

### Focus States
- Ring outline with brand color
- Keyboard navigation support
- High contrast for accessibility

### Disabled States
- Reduced opacity (50%)
- Cursor not-allowed
- No interaction feedback

## Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Considerations
- Touch-friendly button sizes (min 44px)
- Horizontal scrolling for tables
- Collapsible navigation
- Stacked layouts on small screens

## Accessibility

### Keyboard Navigation
- Tab order follows logical flow
- Focus indicators visible
- Escape key closes modals
- Enter/Space activates buttons

### Screen Reader Support
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images
- Proper heading hierarchy

### Color Contrast
- WCAG AA compliance
- High contrast mode support
- Color not the only indicator

## Best Practices

### Component Composition
- Single responsibility principle
- Props interface clearly defined
- Consistent naming conventions
- TypeScript for type safety

### Performance
- Lazy loading for heavy components
- Memoization for expensive calculations
- Optimized bundle sizes
- Efficient re-renders

### Code Organization
- Atomic design principles
- Business components combine base components
- Single file under 300 lines
- Clear separation of concerns

## Demo

Visit `/design-system` to see all components in action with live examples and code snippets.

## Migration Guide

### From Existing Components
1. Replace Ant Design components with shadcn/ui equivalents
2. Update color classes to use new hierarchy
3. Apply typography utilities consistently
4. Test responsive behavior

### Color Migration
```jsx
// Old
<div className="bg-white text-gray-900">

// New
<div className="bg-bg-1 text-text-1">
```

### Typography Migration
```jsx
// Old
<h1 className="text-3xl font-bold text-black">

// New
<h1 className="text-h1 text-primary">
```

This design system provides a solid foundation for building modern, accessible, and maintainable user interfaces with consistent visual language and interaction patterns.
