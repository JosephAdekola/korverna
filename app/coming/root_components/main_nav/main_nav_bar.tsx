"use client";

import { useState } from "react";
import Link from "@/src/global_ui_vault/link";
import Button from "@/src/global_ui_vault/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { mainNavMenu } from "./data/nav_menu";

export default function MainNavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="relative">
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
                        >
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
                className={`absolute left-0 top-full mt-4 w-full rounded-xl bg-white shadow-lg border transition-all duration-300 md:hidden ${
                    mobileMenuOpen
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
                            onClick={() => setMobileMenuOpen(false)}
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