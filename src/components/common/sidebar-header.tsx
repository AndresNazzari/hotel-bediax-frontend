"use client";

import { usePathname, useRouter } from "next/navigation";
import { MODULES, ModuleKey } from "@/config/nav";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

function getActiveModule(pathname: string): ModuleKey {
    if (pathname.startsWith("/catalogs")) return "catalogs";
    if (pathname.startsWith("/cache")) return "cache";
    return "destinations";
}

type Props = { isOpen: boolean };

export function SidebarHeader({ isOpen }: Props) {
    const pathname = usePathname() ?? "/";
    const router = useRouter();

    const activeModule = useMemo(() => getActiveModule(pathname), [pathname]);
    const current = MODULES.find(m => m.key === activeModule)!;

    const CurrentIcon = current.icon;

    return (
        <div className="p-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <CurrentIcon className="h-4 w-4" />
                {isOpen && <span>{current.label}</span>}
            </span>
                        {isOpen && <ChevronDown className="h-4 w-4 opacity-70" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-56">
                    <DropdownMenuLabel>Módulos</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {MODULES.map(m => {
                        const Icon = m.icon;
                        return (
                            <DropdownMenuItem key={m.key} onClick={() => router.push(m.basePath)}>
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{m.label}</span>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
