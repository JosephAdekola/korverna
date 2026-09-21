// import { AdminSendEmailPayloadValidator } from "@/lib/zod/schemas/adminSendEmail";
// import { emailValidator } from "@/lib/zod/schemas/email";
// import { ErrorMessageLogger } from "@/utils/helpers/error_message_logger";
// import { Dispatch, SetStateAction, TransitionStartFunction } from "react"

// export const handleSendEmail = ({
//     payload,
//     setErrorMessage,
//     setSuccessMessage,
//     startSendingEmail
// }: {
//     payload: unknown,
//     setErrorMessage: Dispatch<SetStateAction<string>>,
//     setSuccessMessage: Dispatch<SetStateAction<string>>,
//     startSendingEmail: TransitionStartFunction
// }) => {

//     setErrorMessage("");
//     setSuccessMessage("")

//     const validate = AdminSendEmailPayloadValidator.safeParse(payload)

//     if (!validate.success) {
//         setErrorMessage(validate.error.issues[0].message)
//         return
//     }

//     const reveivers = validate.data.receiver.split(",")
//     const hasInvalidEmail = reveivers.some(recieve => {
//         const validEmail = emailValidator.safeParse(recieve)
//         return !validEmail.success
//     })

//     if (hasInvalidEmail) {
//         setErrorMessage("one or all of receiver emails are not a valid email address")
//         return
//     }

//     startSendingEmail(async () => {
//         try {
            
            

//         } catch (error) {
//             await ErrorMessageLogger(
//                 error,
//                 {
//                     onError(info) {
//                         setErrorMessage(info.message)
//                     },
//                 }
//             )
//         }
//     })

// }



import { sendAdminEmailAction } from "@/actions/admin/sendAdminEmailAction";
import { AdminSendEmailPayloadValidator } from "@/lib/zod/schemas/adminSendEmail";
import { emailValidator } from "@/lib/zod/schemas/email";
import { ErrorMessageLogger } from "@/utils/helpers/error_message_logger";
import {
    Dispatch,
    SetStateAction,
    TransitionStartFunction,
} from "react";

export const handleSendEmail = ({
    payload,
    setErrorMessage,
    setSuccessMessage,
    startSendingEmail,
}: {
    payload: unknown;
    setErrorMessage: Dispatch<SetStateAction<string>>;
    setSuccessMessage: Dispatch<SetStateAction<string>>;
    startSendingEmail: TransitionStartFunction;
}) => {

    setErrorMessage("");
    setSuccessMessage("");

    /*
     * Client-side validation for immediate feedback.
     */
    const validate =
        AdminSendEmailPayloadValidator.safeParse(payload);

    if (!validate.success) {
        setErrorMessage(
            validate.error.issues[0].message
        );
        return;
    }

    /*
     * Validate receiver emails.
     */
    const receivers = validate.data.receiver
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);

    const hasInvalidEmail = receivers.some(
        (email) =>
            !emailValidator.safeParse(email).success
    );

    if (hasInvalidEmail) {
        setErrorMessage(
            "One or more receiver emails are not valid email addresses"
        );
        return;
    }

    startSendingEmail(async () => {
        try {

            const result =
                await sendAdminEmailAction(
                    validate.data
                );

            setSuccessMessage(result.message);

        } catch (error) {

            await ErrorMessageLogger(
                error,
                {
                    onError(info) {
                        setErrorMessage(info.message);
                    },
                }
            );

        }
    });
};