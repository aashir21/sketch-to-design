import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Hash, LayoutIcon, Type } from 'lucide-react'
import React from 'react'

type Props = {
    children: React.ReactNode
}


const CanvasLayout = ({ children }: Props) => {
    return (
        <div>{children}</div>
    )
}

export default CanvasLayout