interface SidebarMenu {
    title: string;
    key?: string;
    icon?: React.ReactNode;
    link: string;
    children?: SidebarMenu[];
}
