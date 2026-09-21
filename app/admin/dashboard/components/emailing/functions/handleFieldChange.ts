import { Dispatch, SetStateAction } from "react"

interface HandleFielldChangeProps<T> {
    setErrorMessage: Dispatch<SetStateAction<string>>;
    setSuccessMessage: Dispatch<SetStateAction<string>>;
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
}

export const handleFielldChange = <U = string>({
    setErrorMessage,
    setSuccessMessage,
    value,
    setValue
}: HandleFielldChangeProps<U>) => {

    if (!value) {
        return
    }

    setErrorMessage("")
    setSuccessMessage("")

    setValue(value)
}