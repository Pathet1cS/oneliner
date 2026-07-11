### Task 1: Scaffolding and Test Setup

**Files:**
- Create: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

**Interfaces:**
- Consumes: None
- Produces: A working Next.js App with Tailwind and Vitest.

- [ ] **Step 1: Scaffold Next.js with Tailwind**
Run: `npx -y create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`
Expected: Next.js project is created. 

- [ ] **Step 2: Install Vitest**
Run: `npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom`
Expected: Dependencies installed.

- [ ] **Step 3: Configure Vitest**
Create file `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

- [ ] **Step 4: Create Vitest Setup File**
Create file `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script and commit**
Run: `npm pkg set scripts.test="vitest run"`
Run: `git add . && git commit -m "chore: initial next.js scaffold with vitest"`
Expected: PASS
