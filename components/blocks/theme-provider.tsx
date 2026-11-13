"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Wrap <body> children in app/layout.tsx:
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
 * and add suppressHydrationWarning to <html>.
 */
export function ThemeProvider(props: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />
}
