import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react"

export const handleFieldChange = (
    value: any,
    setErrorMessage: Dispatch<SetStateAction<string[]>>,
    setSuccessMessage: Dispatch<SetStateAction<string[]>>,
    setValue: Dispatch<SetStateAction<any>>,
) => {
    setErrorMessage([])
    setSuccessMessage([])
    setValue(value)
}