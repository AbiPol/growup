export interface MenuItem {
    label: string;
    icon: string;
    route: string;
    roles?: string[]; // Roles permitidos. Si undefined, es para todos.
}