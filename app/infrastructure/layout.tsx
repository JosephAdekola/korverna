"use client"
import { ReactNode, useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import DialogueBox from "@/src/global_ui_vault/dialogueBox";
import InfraNavBar from "./components/infra_main_nav/infra_nav_bar";
import { contactInfo } from "./components/infra_main_nav/data/contact_info";
import { useRootContext } from "@/src/contexts/rootContext";
import { useInfrastructureContext } from "@/src/contexts/infrastructureContext";
import Button from "@/src/global_ui_vault/button";

export default function ComingSoonLayout({
    children,
}: {
    children: ReactNode;
}) {

    const {
        showContact,
        setShowContact
    } = useRootContext()

    const {
        infraState,
        infraDispatch
    } = useInfrastructureContext()

    return (
        <main className="relative min-h-screen overflow-hidden ">
            <Button
                className="fixed right-4 top-1/2 -translate-y-1/2 z-99"
                onClick={()=>infraDispatch("NEXT")}>
                <ArrowRight />
            </Button>
            {/* Background Image */}

            <div className="absolute w-full h-[70vh] lg:!fixed lg:h-screen lg:inset-0 -z-10">
                <Image
                    src={infraState.current_machine.image_url}
                    alt="hero_banner"
                    fill
                    priority
                    className="hidden lg:!block object-cover object-[75%_50%]"
                />

                <Image
                    src={infraState.current_machine.image_url}
                    alt="hero_banner"
                    fill
                    priority
                    className="lg:!hidden object-cover object-[75%_50%]"
                />
            </div>

            {/* Navbar */}
            <nav className="relative z-30 flex h-[10vh] items-center justify-center">
                <div
                    className="absolute inset-0 bg-linear-to-b from-foreground/30 to-foreground/50" />
                <InfraNavBar
                    setShowDialogue={setShowContact} />
            </nav>

            {
                showContact && (
                    <DialogueBox
                        setDialogueBoxState={setShowContact}
                        classname='bg-background'
                        body={
                            <div className='flex flex-col gap-5'>
                                {
                                    contactInfo.map((info, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2">
                                            {
                                                info.type === "email" ?
                                                    <Mail size={25} className="text-primary" /> :
                                                    info.type == "phone" ?
                                                        <Phone size={25} className="text-primary" /> :
                                                        <MapPin size={25} className="text-primary" />
                                            }
                                            <p className="">
                                                {info.value}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        } />
                )
            }

            {/* Hero */}
            <div className="relative z-20 h-[50vh] lg:h-[90vh] pb-15">
                {/* Full-screen overlay */}

                <div className=" absolute inset-0 grid grid-cols-1 lg:grid-cols-2 ">
                    <div className="w-full h-full bg-linear-to-b from-foreground/50 via-foreground to-foreground
                            lg:bg-linear-to-r lg:from-foreground/50 lg:via-foreground/50 lg:to-foreground/30"></div>
                    {/* <div className="hidden lg:grid grid-cols-[4fr_6fr] "> */}
                    {/* <div className="bg-linear-to-r from-background/90 via-background/60 to-transparent"></div> */}
                    {/* </div> */}
                </div>

                <div className="relative z-20 overflow-y-scroll h-full py-(--space-5) mt-[40vh] lg:mt-0">

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