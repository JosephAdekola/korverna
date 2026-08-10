import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useReducer,
    useState
} from "react";

import machines from "@/app/infrastructure/data/machines.json";

type InfraStateProps = {
    current_machine: {
        id: number;
        name:
            | "Payloader"
            | "Excavator"
            | "Grader"
            | "Backhoe Loader"
            | "Bulldozer";
        description: string;
        image_url: string;
    };
};

export type InfraActionProps =
    | "NEXT"
    | "PREVIOUS"
    | "Payloader"
    | "Excavator"
    | "Grader"
    | "Backhoe Loader"
    | "Bulldozer";

type InfrastructureContextProps = {
    showQuoteForm: boolean;
    setShowQuoteForm: Dispatch<SetStateAction<boolean>>;

    showAboutUs: boolean;
    setShowAboutUs: Dispatch<SetStateAction<boolean>>;

    showServices: boolean;
    setShowServices: Dispatch<SetStateAction<boolean>>;

    infraState: InfraStateProps;
    infraDispatch: Dispatch<InfraActionProps>;
};

type InfrastructuresContextProviderProps = {
    children: ReactNode;
};

const defaultMachine = machines[0];

const initialInfraState: InfraStateProps = {
    current_machine: {
        id: defaultMachine.id,
        name:
            defaultMachine.name as InfraStateProps["current_machine"]["name"],
        description: defaultMachine.description,
        image_url: defaultMachine.image_url
    }
};

const reducer = (
    infraState: InfraStateProps,
    infraDispatch: InfraActionProps
): InfraStateProps => {
    const totalMachine = machines.length;

    switch (infraDispatch) {
        case "NEXT": {
            if (infraState.current_machine.id === totalMachine) {
                const targetMachine = machines[0];

                return {
                    ...infraState,
                    current_machine: {
                        id: targetMachine.id,
                        name:
                            targetMachine.name as InfraStateProps["current_machine"]["name"],
                        description: targetMachine.description,
                        image_url: targetMachine.image_url
                    }
                };
            }

            const targetMachine = machines[infraState.current_machine.id];

            return {
                ...infraState,
                current_machine: {
                    id: targetMachine.id,
                    name:
                        targetMachine.name as InfraStateProps["current_machine"]["name"],
                    description: targetMachine.description,
                    image_url: targetMachine.image_url
                }
            };
        }

        case "PREVIOUS": {
            if (infraState.current_machine.id === 1) {
                const targetMachine = machines[machines.length - 1];

                return {
                    ...infraState,
                    current_machine: {
                        id: targetMachine.id,
                        name:
                            targetMachine.name as InfraStateProps["current_machine"]["name"],
                        description: targetMachine.description,
                        image_url: targetMachine.image_url
                    }
                };
            }

            const targetMachine = machines[infraState.current_machine.id - 2];

            return {
                ...infraState,
                current_machine: {
                    id: targetMachine.id,
                    name:
                        targetMachine.name as InfraStateProps["current_machine"]["name"],
                    description: targetMachine.description,
                    image_url: targetMachine.image_url
                }
            };
        }

        case "Payloader":
        case "Backhoe Loader":
        case "Bulldozer":
        case "Excavator":
        case "Grader": {
            const targetMachine = machines.find(
                (machine) => machine.name === infraDispatch
            );

            if (!targetMachine) return initialInfraState;

            return {
                ...infraState,
                current_machine: {
                    id: targetMachine.id,
                    name:
                        targetMachine.name as InfraStateProps["current_machine"]["name"],
                    description: targetMachine.description,
                    image_url: targetMachine.image_url
                }
            };
        }

        default:
            return initialInfraState;
    }
};

const infrastructureContext =
    createContext<InfrastructureContextProps | null>(null);

export const InfrastructuresContextProvider = ({
    children
}: InfrastructuresContextProviderProps) => {
    const [infraState, infraDispatch] = useReducer(
        reducer,
        initialInfraState
    );

    const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false);
    const [showAboutUs, setShowAboutUs] = useState<boolean>(false);
    const [showServices, setShowServices] = useState<boolean>(false);

    return (
        <infrastructureContext.Provider
            value={{
                showQuoteForm,
                setShowQuoteForm,
                showAboutUs,
                setShowAboutUs,
                showServices,
                setShowServices,
                infraState,
                infraDispatch
            }}
        >
            {children}
        </infrastructureContext.Provider>
    );
};

export const useInfrastructureContext = () => {
    const context = useContext(infrastructureContext);

    if (!context) {
        throw new Error(
            "useInfrastructureContext must be used within a InfrastructuresContextProvider"
        );
    }

    return context;
};