import { MODULES, MENUS } from "@/config/nav";

export function buildRouteNameMap(): Record<string, string> {
    const map: Record<string, string> = {};

    MODULES.forEach((m) => {
        map[m.basePath.replace("/", "")] = m.label;

        MENUS[m.key].forEach((item) => {
            const segments = item.href.split("/").filter(Boolean);
            segments.forEach((seg) => {
                if (!map[seg]) map[seg] = item.label;
            });
        });
    });

    return map;
}