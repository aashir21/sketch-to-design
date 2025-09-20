import React from "react"
import { cn } from "@/lib/utils"
import ColorSwatch from "./ColorSwatch"

type Props = {
    title: string,
    swatches: Array<{
        name: string,
        hexColor: string,
        description?: string
    }>
    className?: string
}


export const ColorTheme = ({ title, swatches, className }: Props) => {
    return (
        <div className={cn("flex flex-col gap-5", className)}>
            <div className="text-lg font-medium text-foreground/50">
                <h3>{title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    swatches.map((swatch: any) => (
                        <div key={swatch.name}>
                            <ColorSwatch
                                name={swatch.name}
                                value={swatch.hexColor}
                            />
                            {
                                swatch.description && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {swatch.description}
                                    </p>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}