"use client"

import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from "react"

interface TabsProps<T> {
    id: number
    label: ReactNode
    value: T
}

interface TabSwitchProps<U> {
    tabs?: TabsProps<U>[]
    setState?: Dispatch<SetStateAction<U>>

    // Colors
    containerColor?: string
    activeColor?: string
    inactiveColor?: string
    activeTextColor?: string
    inactiveTextColor?: string
    hoverColor?: string
    borderColor?: string

    // Styling
    className?: string
}

const defaultTabs: TabsProps<string>[] = [
    {
        id: 1,
        label: "Option 1",
        value: "opt1"
    },
    {
        id: 2,
        label: "Option 2",
        value: "opt2"
    }
]

export default function TabSwitch<W = string>({
    tabs = defaultTabs as TabsProps<W>[],
    setState,

    containerColor = "bg-gray-dark/10",
    activeColor = "bg-primary",
    inactiveColor = "bg-transparent",
    activeTextColor = "text-primary-foreground",
    inactiveTextColor = "text-foreground-secondary",
    hoverColor = "hover:bg-primary/10",
    borderColor = "border-transparent",

    className = ""
}: TabSwitchProps<W>) {

    const [currentTab, setCurrentTab] = useState<W>(
        tabs[0]?.value as W
    )

    const handleTabChange = (value: W) => {
        setCurrentTab(value)
        setState?.(value)
    }

    return (
        <div
            className={`
                w-fit
                flex
                items-center
                gap-1
                p-1
                rounded-full
                border
                ${borderColor}
                ${containerColor}
                ${className}
            `}
        >
            {tabs.map((tab) => {

                const isActive = Object.is(tab.value, currentTab)

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.value)}
                        className={`
                            relative
                            rounded-full
                            px-4
                            py-2
                            text-sm
                            font-medium
                            capitalize
                            whitespace-nowrap
                            transition-all
                            duration-200
                            ease-out
                            cursor-pointer
                            select-none
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-ring
                            focus-visible:ring-offset-2
                            ${isActive
                                ? `${activeColor} ${activeTextColor} shadow-sm`
                                : `${inactiveColor} ${inactiveTextColor} ${hoverColor}`
                            }
                        `}
                    >
                        <span
                            className={`
                                relative
                                z-10
                                transition-transform
                                duration-200
                                ease-out
                                ${isActive ? "scale-[1.02]" : "scale-100"}
                            `}
                        >
                            {tab.label}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}