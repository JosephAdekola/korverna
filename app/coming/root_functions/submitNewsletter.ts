import { handleSubmitNewsletter } from "@/actions/general/submit_newsletter";
import { Newsletter } from "@/generated/prisma/client";
import { NewsLetterProps, NewsLetterSchema } from "@/lib/zod/schemas/newsLetter";
import { ErrorMessageLogger } from "@/src/utils/error_message_logger";
import { Dispatch, SetStateAction } from "react";

export const submitNewsletter = async (
    payload: NewsLetterProps,
    landingPage: Newsletter["landingPage"],
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setIsSubmittingNewsLetter: Dispatch<SetStateAction<boolean>>
) => {

    setErrorMessage("")
    setSuccessMessage("")
    setIsSubmittingNewsLetter(false)

    const valid_error = NewsLetterSchema.safeParse(payload)

    if (!valid_error.success) {
        const errorMessage = valid_error.error.issues[0].message
        setErrorMessage(errorMessage)
        return
    }

    setIsSubmittingNewsLetter(true)

    try {
        
        const result = await handleSubmitNewsletter(
            payload,
            landingPage
        )

        if (result.success) {
            setSuccessMessage(result.message)
        } else {
            setErrorMessage(result.message)
        }

    } catch (error) {
        await ErrorMessageLogger(error, {
            log: true,
            onError: (errObj) => {
                setErrorMessage(errObj.message);
            },
        });
    } finally {
        setIsSubmittingNewsLetter(false)
    }
}