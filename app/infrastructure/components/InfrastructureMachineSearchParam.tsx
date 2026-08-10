"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { InfraActionProps, useInfrastructureContext } from "@/src/contexts/infrastructureContext";

export default function InfrastructureMachineSearchParam() {
    const params = useSearchParams();
    const { infraDispatch } = useInfrastructureContext();

    const currentMachine = params.get("machine");

    useEffect(() => {
        if (!currentMachine) return;

        infraDispatch(currentMachine as InfraActionProps);
    }, [currentMachine, infraDispatch]);

    return null;
}