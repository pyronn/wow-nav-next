import React from "react";

export const Logo = ({fill, size, height, width, ...props}: {
    fill?: string,
    size?: string | number,
    height?: string | number,
    width?: string | number,
} & React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width={size || width || 24} height={size || height || 24} viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12 1L24 22H0L12 1Z" fill="#000000"/>
        </svg>
    )
}
