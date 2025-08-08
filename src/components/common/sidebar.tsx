"use client";

import { SidebarHeader } from "@/components/common/sidebar-header";
import { SidebarBody } from "@/components/common/sidebar-body";
import { SidebarFooter } from "@/components/common/sidebar-footer";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
    isOpen: boolean;
};

export function Sidebar({ isOpen }: Props) {
    return (
        <aside
            className={cn(
                "flex h-screen shrink-0 flex-col border-r bg-background transition-[width]",
                isOpen ? "w-64" : "w-16"
            )}
        >
            <SidebarHeader isOpen={isOpen} />
            <Separator />
            <SidebarBody isOpen={isOpen} />
            <div className="mt-auto">
                <Separator />
                <SidebarFooter isOpen={isOpen} />
            </div>
        </aside>
    );
}
