'use client'


import React from "react";
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/listbox";
import {Button} from "@nextui-org/button";

type SidebarProps = {
    menus: SidebarMenu[]
    isSimple?: boolean,
} & React.HTMLAttributes<HTMLElement>

const Sidebar: React.FC<SidebarProps> = ({menus, className, isSimple = false, ...props}: {
    menus: SidebarMenu[],
    isSimple?: boolean,
    className?: string
}) => {
    const defaultClassName = isSimple?'w-12 p-1':'w-64 p-2'
    const finalClassName = `${defaultClassName} ${className ? className : ''}`
    return isSimple ? (
        <Listbox className={finalClassName} {...props}

        >
            {menus.map((item, index) => {
                return item.children ? (
                    <ListboxSection>
                        {item.children.map((child, index) => (
                            <ListboxItem key={child.key || index} href={child.link} startContent={child.icon}>
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                ):(
                    <ListboxItem key={item.key || index} startContent={item.icon} href={item.link}>
                    </ListboxItem>
                )
            })}

        </Listbox>
    ) : (
        <Listbox className={finalClassName} {...props}
        >
            {menus.map((item, index) => {
                return item.children ? (
                    <ListboxSection title={item.title} key={item.key || index}>
                        {item.children.map((child, index) => (
                            <ListboxItem key={child.key || index} href={child.link} startContent={child.icon}>
                                {child.title}
                            </ListboxItem>
                        ))}
                    </ListboxSection>

                ) : (
                    <ListboxItem key={item.key || index} startContent={item.icon} href={item.link}>
                        {item.title}
                    </ListboxItem>
                )
            })}

        </Listbox>
    );
};

export default Sidebar
