# Task 1 Brief

## Global Constraints
- Name change: "Enileno"
- Typography: `Pixelify Sans`
- Colors: Background `#334173`, Primary accents `#F7AF4C`
- No rounded corners or soft drop-shadows anywhere. All borders must be sharp.

## Task Description
### Task 1: Setup Dependencies and Typography

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts` (if exists, or layout classes)

**Interfaces:**
- Consumes: Google Fonts (`next/font/google`)
- Produces: Global application of `Pixelify Sans`.

- [ ] **Step 1: Install `framer-motion`**

```bash
npm install framer-motion
```

- [ ] **Step 2: Update `layout.tsx` for Pixelify Sans**

```tsx
import { Pixelify_Sans } from 'next/font/google'

const pixelify = Pixelify_Sans({ subsets: ['latin'] })

// Replace Inter/existing font with Pixelify Sans in className
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pixelify.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json src/app/layout.tsx
git commit -m "chore: install framer-motion and setup Pixelify Sans font"
```
