import { QuoteProps, quoteSchema } from "@/lib/zod/schemas/quote"
import { ErrorMessageLogger } from "@/src/utils/error_message_logger";
import { api } from "@/utils/api/api-fetch";
import { Dispatch, ReactNode, SetStateAction } from "react"

type HandleSubmitQuoteProps = {
    payload: QuoteProps;
    setErrorMessage: Dispatch<SetStateAction<string[]>>;
    setSuccessMessage: Dispatch<SetStateAction<string[]>>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>
}


export const handleSubmitQuote = async ({
    payload,
    setErrorMessage,
    setSuccessMessage,
    setIsSubmitting
}: HandleSubmitQuoteProps) => {

    setErrorMessage([])
    setSuccessMessage([])

    const validPayload = quoteSchema.safeParse(payload)
    if (!validPayload.success) {
        const errors = validPayload.error.issues.map(err => (
            err.message
        ))
        setErrorMessage(errors)
        return
    }

    const data = validPayload.data

    if (data.start && !data.end) {
        setErrorMessage(["You must set an end date"])
        return
    }

    if (data.end && !data.start) {
        setErrorMessage(["You must set a start date"])
        return
    }

    if (data.start && data.end) {
        const today = Date.now()
        const startDate = new Date(data.start).getTime()
        const endDate = new Date(data.end).getTime()

        if (startDate < today) {
            setErrorMessage(["Start date cannot be in the past"])
            return
        } else if (endDate < startDate) {
            setErrorMessage(["End date must be greater than start date"])
            return
        }
    }

    setIsSubmitting(true)

    try {

        const response = await api.post(
            "/api/v1/infrastructure/get-quote", data
        );
        
        setSuccessMessage([response?.message])

    } catch (error) {
        await ErrorMessageLogger(
            error,
            {
                log: true,
                onError: (er) => setErrorMessage([er.message])
            }
        )
    } finally {
        setIsSubmitting(false)
    }

}