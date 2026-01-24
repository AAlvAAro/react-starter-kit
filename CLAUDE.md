# Inertia Rails React Starter Kit — Claude Code Guidelines

## Overview

This is a modern full-stack starter application with Rails backend and React frontend using Inertia.js. Use this file to guide AI assistants when building on top of this starter kit.

---

## Tech Stack

- **Backend:** Ruby on Rails
- **Frontend Bridge:** Inertia.js (inertia-rails)
- **Frontend:** React 18+ with TypeScript
- **Styling:** Tailwind CSS 3.x
- **UI Components:** shadcn/ui (pre-installed)
- **Icons:** Lucide React
- **Build:** Vite (via vite-ruby)
- **Authentication:** Built-in (based on Authentication Zero)
- **Deployment:** Kamal (optional)

### Key Differences from Pure React SPA

- **No React Router** — Routing is handled by Rails (`config/routes.rb`). Inertia handles page transitions.
- **No client-side routing** — Use `<Link href="...">` from `@inertiajs/react` instead of React Router's `<Link to="...">`
- **Pages receive props from Rails** — Controllers pass data via `render inertia: 'PageName', props: { ... }`
- **Forms use Inertia** — Use `useForm` hook from `@inertiajs/react` for form submissions

---

## File Structure

The frontend code lives in `app/frontend/` (Rails convention with Inertia):

```
app/
├── frontend/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (pre-installed)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   ├── app-sidebar.tsx        # App-specific sidebar
│   │   ├── nav-main.tsx           # Main navigation
│   │   ├── nav-user.tsx           # User dropdown
│   │   └── ...                    # Other shared components
│   ├── layouts/
│   │   ├── app-layout.tsx         # Authenticated app layout (with sidebar)
│   │   ├── auth-layout.tsx        # Auth pages layout (centered card)
│   │   └── settings/              # Settings-specific layouts
│   ├── pages/
│   │   ├── home/
│   │   │   └── index.tsx          # Landing page
│   │   ├── dashboard/
│   │   │   └── index.tsx          # Dashboard page
│   │   ├── sessions/              # Sign in
│   │   │   └── new.tsx
│   │   ├── users/                 # Sign up
│   │   │   └── new.tsx
│   │   ├── identity/              # Password reset, email verification
│   │   └── settings/              # User settings pages
│   ├── hooks/                     # Custom React hooks
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   ├── types/                     # TypeScript type definitions
│   └── entrypoints/
│       └── inertia.ts             # Inertia app entry point
├── controllers/                   # Rails controllers
├── models/                        # Rails models
└── views/
    └── layouts/
        └── application.html.erb   # Main HTML template

config/
└── routes.rb                      # All routes defined here (NOT in React)
```

---

## Coding Standards

### General Rules

1. **TypeScript strict mode** — always define types/interfaces
2. **Functional components only** — no class components
3. **Named exports** for components
4. **One component per file** — unless tightly coupled
5. **Props interface** above component definition

### Component Template

```tsx
import { LucideIcon } from 'lucide-react';

interface ComponentNameProps {
  title: string;
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'danger';
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({
  title,
  icon: Icon,
  variant = 'default',
  className = '',
  children,
}: ComponentNameProps) {
  return (
    <div className={`base-classes ${className}`}>
      {Icon && <Icon className="w-5 h-5" />}
      <h3>{title}</h3>
      {children}
    </div>
  );
}
```

### Utility Function (cn)

The `cn` utility is provided at `app/frontend/lib/utils.ts`:

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Navigation with Inertia

Use Inertia's `Link` component instead of React Router:

```tsx
import { Link } from '@inertiajs/react';

// Navigation link
<Link href="/dashboard" className="...">
  Dashboard
</Link>

// With method (for logout, etc.)
<Link href="/sessions" method="delete" as="button">
  Log out
</Link>
```

### Forms with Inertia

Use the `useForm` hook for form handling:

```tsx
import { useForm } from '@inertiajs/react';

export function ExampleForm() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/sign_in');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={data.email}
        onChange={(e) => setData('email', e.target.value)}
        error={errors.email}
      />
      <Button type="submit" disabled={processing}>
        {processing ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

### Page Props from Rails

Pages receive props from Rails controllers:

```tsx
// app/frontend/pages/dashboard/index.tsx
import { usePage } from '@inertiajs/react';

interface DashboardProps {
  user: { name: string; email: string };
}

export default function Dashboard() {
  const { user } = usePage<{ props: DashboardProps }>().props;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
}
```

---

## Accessibility Requirements

1. **Semantic HTML** — use `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`, etc.
2. **Heading hierarchy** — one `<h1>` per page, logical `<h2>`-`<h6>` order
3. **Labels for inputs** — always associate `<label>` with inputs
4. **Focus states** — all interactive elements must have visible focus rings
5. **Alt text** — all images need descriptive alt text
6. **ARIA when needed** — `aria-label`, `aria-expanded`, `aria-hidden` for custom components
7. **Color contrast** — text must meet WCAG AA (4.5:1 for normal text)

---

## Responsive Breakpoints

```
sm:   640px   — Mobile landscape
md:   768px   — Tablets
lg:   1024px  — Desktop
xl:   1280px  — Large desktop
2xl:  1536px  — Extra large
```

**Mobile-first approach:** Write base styles for mobile, use `sm:`, `md:`, `lg:` for larger screens.

---

## Adding New Features

### Add a new route + page

1. Add route in `config/routes.rb`:
   ```ruby
   get :example, to: "example#index"
   ```

2. Create Rails controller:
   ```ruby
   # app/controllers/example_controller.rb
   class ExampleController < ApplicationController
     def index
       render inertia: 'example/index', props: {
         # data to pass to React
       }
     end
   end
   ```

3. Create React page at `app/frontend/pages/example/index.tsx`

### Add a new component

1. For UI primitives: add to `app/frontend/components/ui/`
2. For app-specific: add to `app/frontend/components/`
3. Use shadcn/ui as base when possible

---

## Project Customization

For project-specific guidelines (design system, colors, business logic), create a `PROJECT.md` file that extends these base guidelines. Structure it as:

1. **Project Overview** — What the app does
2. **Design System** — Colors, typography, spacing specific to your brand
3. **Domain Models** — Key data structures
4. **Page Guidelines** — Specific layouts and patterns
5. **Example Prompts** — Templates for generating features

The `PROJECT.md` should reference this file:
```markdown
> This project extends the [react-starter-kit CLAUDE.md](./CLAUDE.md).
> See that file for tech stack, file structure, and coding patterns.
```
