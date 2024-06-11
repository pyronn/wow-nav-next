'use client'

import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Switch} from "@nextui-org/switch";
import {MoonIcon, SunIcon} from "@nextui-org/shared-icons";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => {
        setMounted(true)
    })
    return (
        <Switch
            defaultSelected size={"sm"}
            color={'secondary'}
            thumbIcon={({isSelected, className}) => isSelected ? (<SunIcon className={className}/>) :
                <MoonIcon className={className}/>}
            onValueChange={(isSelected) => {
                isSelected ? setTheme('light') : setTheme('dark')
            }}>
        </Switch>
    )
}
