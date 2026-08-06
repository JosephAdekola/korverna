"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "@/src/global_ui_vault/link";
import Button from "@/src/global_ui_vault/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { mainNavMenu } from "./data/nav_menu";
import { useRootContext } from "@/src/contexts/rootContext";

export default function MainNavBar({
    setShowDialogue
}: {
    setShowDialogue: Dispatch<SetStateAction<boolean>>
}) {

    const { dispatch } = useRootContext()

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (
        <nav className="relative container">
            <div className="flex items-center justify-between gap-(--space-5)">
                <Link
                    href="/"
                    className="relative h-[30px] w-[200px]"
                >
                    <Image
                        src="https://ik.imagekit.io/pleddsolca/korverna%20infrastructure/branding/logo%20and%20name.png"
                        alt="korverna_logo"
                        width={200}
                        height={50}
                        className="object-cover"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-(--space-2)">
                    {mainNavMenu.map((menu, idx) => (
                        <Button
                            key={idx}
                            variant={menu.special ? "primary" : "ghost"}
                            onClick={() => {

                                switch (menu.label) {
                                    case "Contact":
                                        setShowDialogue(true)
                                        break;
                                    case "Our Companies":
                                        dispatch("FOCUS_COMPANIES")
                                        setTimeout(() => {
                                            dispatch("UNFOCUS_COMPANIES")
                                        }, 1000)
                                        break;
                                    case "Notify Me":
                                        dispatch("FOCUS_NOTIFY_ME");
                                        setTimeout(()=>{
                                            dispatch("UNFOCUS_NOTIFY_ME")
                                        },10)
                                        break;

                                    default:
                                        break;
                                }
                            }} >

                            <span className={menu.special ? "font-bold text-white" : "font-bold"}>
                                {menu.label.charAt(0).toUpperCase() + menu.label.slice(1)}
                            </span>
                        </Button>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="md:hidden"
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute left-0 top-full mt-4 w-full rounded-xl bg-white shadow-lg border transition-all duration-300 md:hidden ${mobileMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-4"
                    }`}
            >
                <div className="flex flex-col p-(--space-3) gap-(--space-2)">
                    {mainNavMenu.map((menu, idx) => (
                        <Button
                            key={idx}
                            variant={menu.special ? "primary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => {
                                setMobileMenuOpen(false)
                                if (menu.label == "Contact") {
                                    setShowDialogue(true)
                                }

                                if (menu.label == "Our Companies") {
                                    dispatch("FOCUS_COMPANIES")
                                    setTimeout(() => {
                                        dispatch("UNFOCUS_COMPANIES")
                                    }, 2000)
                                }
                            }}
                        >
                            <span className={menu.special ? "font-bold text-white" : "font-bold"}>
                                {menu.label.charAt(0).toUpperCase() + menu.label.slice(1)}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
}