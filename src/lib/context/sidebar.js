import { sidebar } from "$lib/stores";

export function openSidebar(sidebarObject) {
    sidebar.set(sidebarObject);
}

export function closeSidebar() {
    sidebar.set(null);
}