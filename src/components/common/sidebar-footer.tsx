"use client";

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

type Props = { isOpen: boolean };

export function SidebarFooter({ isOpen }: Props) {
    return (
        <div className="p-3">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-accent">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    {isOpen && (
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">Andrés Nazzari</span>
                            <span className="text-xs text-muted-foreground">andres@example.com</span>
                        </div>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>My profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
