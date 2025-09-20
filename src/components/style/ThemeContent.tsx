import { ColorTheme } from "./ColorTheme"
import React from "react"

export const ThemeContent = ({ colorGuide }: { colorGuide: any[] }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10">
                {
                    colorGuide.map((section: any, index: number) => (
                        <ColorTheme
                            key={index}
                            title={section.title}
                            swatches={section.swatches}
                        />
                    ))
                }
            </div>
        </div>
    )
}