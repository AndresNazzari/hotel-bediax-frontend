"use client";

import { Sidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PanelLeftIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {buildRouteNameMap} from "@/config/buildRouteNameMap";
import React from "react";

type Props = { children: React.ReactNode };

export function AppShell({ children }: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const routeNameMap = useMemo(() => buildRouteNameMap(), []);

    const breadcrumbs = useMemo(() => {
        if (!pathname) return [];
        const segments = pathname.split("/").filter(Boolean);

        return segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            return {
                label: routeNameMap[segment] ?? segment,
                href,
                isLast: index === segments.length - 1,
            };
        });
    }, [pathname, routeNameMap]);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />

            <div className="flex-1">
                <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
                    <div className="mx-auto flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Toggle sidebar"
                                onClick={() => setIsSidebarOpen((v) => !v)}
                            >
                                <PanelLeftIcon className="h-4 w-4" />
                            </Button>

                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/">Home</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    {breadcrumbs.map((crumb, idx) => (
                                        <React.Fragment key={idx}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                {crumb.isLast ? (
                                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink asChild>
                                                        <Link href={crumb.href}>{crumb.label}</Link>
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                </header>

                <main className="mx-auto p-4">{children}</main>
            </div>
        </div>
    );
}
