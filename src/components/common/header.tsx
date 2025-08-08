"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/destinations", label: "Destinations" },
    { href: "/catalog", label: "Catálogos" },
];

export function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    function isActive(href: string) {
        return href === "/" ? pathname === "/" : pathname?.startsWith(href);
    }

    return (
        <header className="w-full border-b bg-background">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-semibold">
                    BediaX
                </Link>

                <nav className="hidden gap-4 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm transition ${
                                isActive(item.href)
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {mounted && (
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Cambiar tema"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
