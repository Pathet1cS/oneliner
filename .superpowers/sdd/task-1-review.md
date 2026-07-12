## Commits
36d850e fix(typography): add primary color to theme and enforce sharp borders
27bea89 chore: install framer-motion and setup Pixelify Sans font

## Stat
 package-lock.json   | 45 +++++++++++++++++++++++++++++++++++++++++++--
 package.json        |  1 +
 src/app/globals.css | 10 ++++++++++
 src/app/layout.tsx  | 19 +++++++------------
 test-dates.ts       | 16 ++++++++++++++++
 5 files changed, 77 insertions(+), 14 deletions(-)

## Diff
diff --git a/package-lock.json b/package-lock.json
index 7f44f93..9d640b9 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -1,20 +1,21 @@
 {
   "name": "oneliner-app",
   "version": "0.1.0",
   "lockfileVersion": 3,
   "requires": true,
   "packages": {
     "": {
       "name": "oneliner-app",
       "version": "0.1.0",
       "dependencies": {
+        "framer-motion": "^12.42.2",
         "next": "16.2.10",
         "react": "19.2.4",
         "react-dom": "19.2.4"
       },
       "devDependencies": {
         "@tailwindcss/postcss": "^4",
         "@testing-library/jest-dom": "^6.9.1",
         "@testing-library/react": "^16.3.2",
         "@types/node": "^20",
         "@types/react": "^19",
@@ -2774,21 +2775,20 @@
       "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
       "dev": true,
       "license": "MIT"
     },
     "node_modules/@types/node": {
       "version": "20.19.43",
       "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.43.tgz",
       "integrity": "sha512-6oYBAi5ikg4Pl+kGsoYtawUMBT2zZMCvPNF7pVLnHZfd1zf38DRiWn/gT01RYCdUqkv7Fhr+C9ot4/tb+2sVvA==",
       "dev": true,
       "license": "MIT",
-      "peer": true,
       "dependencies": {
         "undici-types": "~6.21.0"
       }
     },
     "node_modules/@types/react": {
       "version": "19.2.17",
       "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.17.tgz",
       "integrity": "sha512-MXfmqaVPEVgkBT/aY0aGCkRWWtByiYQXo3xdQ8r5RzuFrPiRn8Gar2tQdXSUQ2GKV3bkXckek89V8wQBY2Q/Aw==",
       "dev": true,
       "license": "MIT",
@@ -5348,20 +5348,47 @@
       "dependencies": {
         "is-callable": "^1.2.7"
       },
       "engines": {
         "node": ">= 0.4"
       },
       "funding": {
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/framer-motion": {
+      "version": "12.42.2",
+      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.42.2.tgz",
+      "integrity": "sha512-5XY9luDiu0oHfHBjpDthFMh0ES+122w6p/papSJBweMkO8Sn+PW2QaEgRblQBpWFnuvZS5qvarpt/hO2pjGmnw==",
+      "license": "MIT",
+      "dependencies": {
+        "motion-dom": "^12.42.2",
+        "motion-utils": "^12.39.0",
+        "tslib": "^2.4.0"
+      },
+      "peerDependencies": {
+        "@emotion/is-prop-valid": "*",
+        "react": "^18.0.0 || ^19.0.0",
+        "react-dom": "^18.0.0 || ^19.0.0"
+      },
+      "peerDependenciesMeta": {
+        "@emotion/is-prop-valid": {
+          "optional": true
+        },
+        "react": {
+          "optional": true
+        },
+        "react-dom": {
+          "optional": true
+        }
+      }
+    },
     "node_modules/fsevents": {
       "version": "2.3.3",
       "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
       "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
       "dev": true,
       "hasInstallScript": true,
       "license": "MIT",
       "optional": true,
       "os": [
         "darwin"
@@ -5566,21 +5593,20 @@
       "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
       "dev": true,
       "license": "ISC"
     },
     "node_modules/happy-dom": {
       "version": "20.10.6",
       "resolved": "https://registry.npmjs.org/happy-dom/-/happy-dom-20.10.6.tgz",
       "integrity": "sha512-6QD0ilzDDt93tX44y8tbmZdAcdTRYDhUP+Asgi6pC8Pp5IA3cvaZGyoVN/EGtlq9ziT65iPuBBn3ASLr6hCgVw==",
       "dev": true,
       "license": "MIT",
-      "peer": true,
       "dependencies": {
         "@types/node": ">=20.0.0",
         "@types/whatwg-mimetype": "^3.0.2",
         "@types/ws": "^8.18.1",
         "buffer-image-size": "^0.6.4",
         "entities": "^7.0.1",
         "whatwg-mimetype": "^3.0.0",
         "ws": "^8.21.0"
       },
       "engines": {
@@ -6889,20 +6915,35 @@
     "node_modules/minimist": {
       "version": "1.2.8",
       "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
       "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
       "dev": true,
       "license": "MIT",
       "funding": {
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/motion-dom": {
+      "version": "12.42.2",
+      "resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.42.2.tgz",
+      "integrity": "sha512-5gIMWLp/PycBtJRJWRgjxke5n8dlvkSn2DrYW+tr3XcqAZY1xZh6BJyooJXCM8wdfM7wfMjkBJNLge1CKPUIRA==",
+      "license": "MIT",
+      "dependencies": {
+        "motion-utils": "^12.39.0"
+      }
+    },
+    "node_modules/motion-utils": {
+      "version": "12.39.0",
+      "resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.39.0.tgz",
+      "integrity": "sha512-8nadJAJjTtqRkmRF36FoJTrywK9nnFmnPwnSMyxaOCU7GDjN9RTMJIxx9De8ErM+vpPhMccr/6fo5WciyQLnMQ==",
+      "license": "MIT"
+    },
     "node_modules/mrmime": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/mrmime/-/mrmime-2.0.1.tgz",
       "integrity": "sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==",
       "dev": true,
       "license": "MIT",
       "engines": {
         "node": ">=10"
       }
     },
diff --git a/package.json b/package.json
index 29b404a..08095ea 100644
--- a/package.json
+++ b/package.json
@@ -3,20 +3,21 @@
   "version": "0.1.0",
   "private": true,
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "eslint",
     "test": "vitest run --passWithNoTests"
   },
   "dependencies": {
+    "framer-motion": "^12.42.2",
     "next": "16.2.10",
     "react": "19.2.4",
     "react-dom": "19.2.4"
   },
   "devDependencies": {
     "@tailwindcss/postcss": "^4",
     "@testing-library/jest-dom": "^6.9.1",
     "@testing-library/react": "^16.3.2",
     "@types/node": "^20",
     "@types/react": "^19",
diff --git a/src/app/globals.css b/src/app/globals.css
index f1d8c73..bc0ca73 100644
--- a/src/app/globals.css
+++ b/src/app/globals.css
@@ -1 +1,11 @@
 @import "tailwindcss";
+
+@theme {
+  --color-primary: #f7af4c;
+}
+
+@layer base {
+  *, ::before, ::after {
+    border-radius: 0 !important;
+  }
+}
diff --git a/src/app/layout.tsx b/src/app/layout.tsx
index 976eb90..251586f 100644
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,33 +1,28 @@
 import type { Metadata } from "next";
-import { Geist, Geist_Mono } from "next/font/google";
+import { Pixelify_Sans } from "next/font/google";
 import "./globals.css";
 
-const geistSans = Geist({
-  variable: "--font-geist-sans",
-  subsets: ["latin"],
-});
-
-const geistMono = Geist_Mono({
-  variable: "--font-geist-mono",
+const pixelify = Pixelify_Sans({
   subsets: ["latin"],
+  variable: "--font-pixelify",
 });
 
 export const metadata: Metadata = {
-  title: "Create Next App",
-  description: "Generated by create next app",
+  title: "Enileno",
+  description: "Enileno application",
 };
 
 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <html
       lang="en"
-      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
+      className={`${pixelify.variable} ${pixelify.className} h-full antialiased`}
     >
-      <body className="min-h-full flex flex-col">{children}</body>
+      <body className="min-h-full flex flex-col bg-[#334173] text-white">{children}</body>
     </html>
   );
 }
diff --git a/test-dates.ts b/test-dates.ts
new file mode 100644
index 0000000..a3118f7
--- /dev/null
+++ b/test-dates.ts
@@ -0,0 +1,16 @@
+import { generatePuzzle } from './src/lib/gameLogic';
+
+for (let i = 1; i <= 365; i++) {
+  const dateStr = `2026-01-${String(i).padStart(2, '0')}`;
+  try {
+    const start = performance.now();
+    generatePuzzle(dateStr);
+    const end = performance.now();
+    if (end - start > 10) {
+      console.log(`Took ${end - start}ms for ${dateStr}`);
+    }
+  } catch(e) {
+    console.error(`Failed for ${dateStr}: ${(e as Error).message}`);
+  }
+}
+console.log("Done");

