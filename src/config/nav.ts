import {
    MapPinned, // módulos
    Layers,
    ServerCog,
    // menús
    Map, Globe, ListTree, Trash2,
} from "lucide-react";

export type ModuleKey = "destinations" | "catalogs" | "cache";

export type NavItem = {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

export const MODULES: { key: ModuleKey; label: string; basePath: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "destinations", label: "Destinations", basePath: "/destinations", icon: MapPinned },
    { key: "catalogs", label: "Catalogs", basePath: "/catalogs", icon: Layers     },
    { key: "cache", label: "Cache", basePath: "/cache", icon: ServerCog  },
];

export const MENUS: Record<ModuleKey, NavItem[]> = {
    destinations: [
        { href: "/destinations", label: "Destinations", icon: Map },
    ],
    catalogs: [
        { href: "/catalogs/countries", label: "Countries", icon: Globe   },
        { href: "/catalogs/destination-types", label: "Destination Types", icon: ListTree },
    ],
    cache: [
        { href: "/cache/clear", label: "Clear cache", icon: Trash2 },
    ],
};
