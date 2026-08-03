import { ReactNode } from "react";
import Image from "next/image";
import MainNavBar from "./root_components/main_nav/main_nav_bar";
import { contactInfo } from "./root_components/main_nav/data/contact_info";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ComingSoonLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="https://ik.imagekit.io/pleddsolca/korverna%20limited/ChatGPT%20Image%20Jul%2031,%202026,%2007_33_04%20AM%20-%20Edited%20(1).png?updatedAt=1785480222848"
                    alt="hero_banner"
                    fill
                    priority
                    className="object-cover object-[75%_50%]"
                />
            </div>

            {/* Navbar */}
            <nav className="relative z-30 flex h-[10vh] items-center justify-center bg-background/90">
                <MainNavBar />
            </nav>

            {/* Hero */}
            <div className="relative z-20 h-[90vh] pb-15">
                {/* Full-screen overlay */}

                <div className=" absolute inset-0 grid grid-cols-1 lg:grid-cols-[6fr_4fr] ">
                    <div className="w-full h-full bg-background/90"></div>
                    <div className="hidden lg:grid grid-cols-[4fr_6fr] ">
                        <div className="bg-linear-to-r from-background/90 via-background/60 to-transparent"></div>
                    </div>
                </div>

                <div className="relative z-20 overflow-y-scroll h-full py-(--space-5)">
                    {children}
                </div>
                <div className="absolute bottom-0 right-0 left-0 h-fit bg-foreground
                        flex flex-col lg:flex-row gap-5 justify-between p-3 z-30 ">
                    <div className="flex items-center gap-5">
                        {
                            contactInfo.map((info, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2">
                                    {
                                        info.type === "email" ?
                                            <Mail size={15} className="text-primary" /> :
                                            info.type == "phone" ?
                                                <Phone size={15} className="text-primary" /> :
                                                <MapPin size={15} className="text-primary" />
                                    }
                                    <p className="text-background! text-[8px]! lg:text-xs!">
                                        {info.value}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <p className="text-xs! text-background!">
                            2026 Korverna Limited. All rights reserved
                        </p>
                        <Image
                            src={"/logo.png"}
                            alt="logo"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </main>
    );
}