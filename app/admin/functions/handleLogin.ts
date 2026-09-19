import { authClient } from "@/lib/better-auth/auth-client";
import { emailValidator } from "@/lib/zod/schemas/email";
import { ErrorMessageLogger } from "@/utils/helpers/error_message_logger";
import React, {
    Dispatch,
    SetStateAction,
    TransitionStartFunction
} from "react";

export const handleAdminLogin = (
    email: string,
    startAuthentication: TransitionStartFunction,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>
) => {
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    const result = emailValidator.safeParse(email);

    if (!result.success) {
        setErrorMessage("Enter a valid email address");
        return;
    }

    const validatedEmail = result.data;

    startAuthentication(async () => {
        try {
            const { error } = await authClient.signIn.magicLink({
                email: validatedEmail,
                name: "admin",
                callbackURL: "/admin/dashboard",
                errorCallbackURL: "/admin",
            });

            if (error) {
                setErrorMessage(
                    error.message || "Unable to send authentication email. Please try again."
                );
                return;
            }

            setSuccessMessage(
                "A sign-in link has been sent to your email address."
            );
        } catch (error) {
            await ErrorMessageLogger(
                error,
                {
                    onError(info) {
                        setErrorMessage(info.message)
                    },
                }
            )
        }
    });
};