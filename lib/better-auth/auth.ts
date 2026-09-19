import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "../prisma/prisma";
import { magicLink } from "better-auth/plugins"
import { sendMagicLinkEmail } from "../resend/senders/sendMagicLinkEmail";
import { findUserByEmail } from "@/utils/helpers/findUserByEmail";

export const auth = betterAuth({
    database: prismaAdapter(
        prisma, {
        provider: "postgresql"
    }
    ),
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            
        })
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url, metadata }, ctx) => {

                const existingUser = await findUserByEmail(email)
                if (!existingUser?.success) {
                    throw new APIError(
                        "NOT_FOUND",
                        {
                            message: "user does not exist"
                        }
                    )
                }

                await sendMagicLinkEmail({
                    email,
                    url,
                });
            }
        })
    ]
});