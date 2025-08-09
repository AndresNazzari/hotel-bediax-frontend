import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppShell } from "@/components/common/app-shell";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "BediaX Frontend",
    description: "Frontend Next.js + shadcn/ui for BediaX",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <AppShell>{children}</AppShell>
                </ThemeProvider>
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}