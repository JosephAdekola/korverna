import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer } from "react"


interface RootContextProviderProps {
    children: ReactNode
}

type StateProps = {
    focus_companies: boolean,
    focus_notify_me: boolean
}

type SignalsProps =
    | "FOCUS_COMPANIES"
    | "UNFOCUS_COMPANIES"
    | "FOCUS_NOTIFY_ME"
    | "UNFOCUS_NOTIFY_ME"

interface RootContextProps {
    state: StateProps;
    dispatch: Dispatch<SignalsProps>;
}

const reducer = (
    state: StateProps, signal: SignalsProps
): StateProps => {
    switch (signal) {
        case "FOCUS_COMPANIES":
            return {
                ...state, focus_companies: true
            }

        case "UNFOCUS_COMPANIES":
            return {
                ...state, focus_companies: false
            }

        case "FOCUS_NOTIFY_ME":
            return {
                ...state, focus_notify_me: true
            }

        case "UNFOCUS_NOTIFY_ME":
            return {
                ...state, focus_notify_me: false
            }

        default:
            return state
    }
}

const initialState: StateProps = {
    focus_companies: false,
    focus_notify_me: false
}

const RootContext = createContext<RootContextProps | null>(null)

export const RootContextProvider = ({
    children
}: RootContextProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <RootContext.Provider
            value={{
                state,
                dispatch
            }}>
            {children}
        </RootContext.Provider>
    )

}

export const useRootContext = () => {
    const context = useContext(RootContext)

    if (!context) {
        throw new Error(
            "useRootContext must be used within a RootContextProvider"
        );
    }

    return context

}