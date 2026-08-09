import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react"

type InfrastructureContaxtProps = {
    showQuoteForm: boolean;
    setShowQuoteForm: Dispatch<SetStateAction<boolean>>;
    showAboutUs: boolean;
    setShowAboutUs: Dispatch<SetStateAction<boolean>>;
    showServices: boolean;
    setShowServices: Dispatch<SetStateAction<boolean>>
}

type InfrastructuresContextProviderProps = {
    children: ReactNode
}

const infrastructureContext = createContext<InfrastructureContaxtProps | null>(null)

export const InfrastructuresContextProvider = ({
    children
}: InfrastructuresContextProviderProps) => {

    const [showQuoteForm, setShowQuoteForm] = useState<boolean>(false)
    const [showAboutUs, setShowAboutUs] = useState<boolean>(false)
    const [showServices, setShowServices] = useState<boolean>(false)

    return  (
        <infrastructureContext.Provider
            value={{
                showQuoteForm,
                setShowQuoteForm,
                showAboutUs,
                setShowAboutUs,
                showServices,
                setShowServices
            }}>
            {children}
        </infrastructureContext.Provider>
    )

}

export const useInfrastructureContext = () => {

    const context = useContext(infrastructureContext)
    if (!context) {
        throw new Error(
            "useInfrastructureContext must be used within a InfrastructuresContextProvider"
        );
    }

    return context

}