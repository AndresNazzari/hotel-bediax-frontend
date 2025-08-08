"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENUS, ModuleKey } from "@/config/nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";

function getActiveModule(pathname: string): ModuleKey {
    if (pathname.startsWith("/catalogs")) return "catalogs";
    if (pathname.startsWith("/cache")) return "cache";
    return "destinations";
}

type Props = { isOpen: boolean };

export function SidebarBody({ isOpen }: Props) {
    const pathname = usePathname() ?? "/";
    const activeModule = useMemo(() => getActiveModule(pathname), [pathname]);
    const currentMenu = MENUS[activeModule];

    return (
        <div className="px-3">
            <div className="text-xs font-medium text-muted-foreground px-1 mb-2">
                Menú
            </div>
            <ScrollArea className="max-h-[50vh]">
                <nav className="flex flex-col gap-1 pb-2">
                    {currentMenu.map(item => {
                        const isActive = (pathname ?? "").startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition
                  ${isActive
                                    ? "bg-secondary text-secondary-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className="h-4 w-4" />
                                {isOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
        </div>
    );
}
