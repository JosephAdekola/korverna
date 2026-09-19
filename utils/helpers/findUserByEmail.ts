"use server"

import { prisma } from "@/lib/prisma/prisma"
import * as z from "zod"
import { ErrorMessageLogger } from "./error_message_logger"
import { emailValidator } from "@/lib/zod/schemas/email"

export const findUserByEmail = async (email: string) => {
    const validatedEmail = emailValidator.safeParse(email)

    if (!validatedEmail.success) {
        return {
            success: false,
            message: "invalid email address",
            data: null
        }
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: validatedEmail.data,
            },
        })

        if (!user) {
            return {
                success: false,
                message: "user not found",
                data: null
            }
        }

        return {
            success: true,
            message: "found user",
            data: user
        }
    } catch (error) {
        await ErrorMessageLogger(
            error,
            {
                onError: info=>{
                    return {
                        success: false,
                        message: info.message,
                        data: null
                    }
                }
            }
        )
    }
}