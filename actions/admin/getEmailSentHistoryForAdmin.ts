"use server"

import { prisma } from "@/lib/prisma/prisma"
import { getServerSession } from "../general/getServerSession"
import { ErrorMessageLogger } from "@/utils/helpers/error_message_logger"

export const getEmailSentHistoryForAdmin = async (
    limit: number = 10,
    page: number = 1
) => {
    try {
        const session = await getServerSession()

        if (!session || !session.user) {
            return {
                success: false,
                message: "Unauthenticated"
            }
        }

        if (session.user.email !== process.env.ADMIN_EMAIL) {
            return {
                success: false,
                message: "Denied!"
            }
        }

        const skip = (page - 1) * limit

        const [emailHistory, total] = await Promise.all([
            prisma.adminEmailSentLog.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    attachments: {
                        select: {
                            url: true,
                            fileName: true,
                            id: true
                        }
                    }
                }
            }),

            prisma.adminEmailSentLog.count()
        ])

        return {
            success: true,
            data: emailHistory,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        }

    } catch (error) {

        let returnMessage

        ErrorMessageLogger(
            error,
            {
                log: true,
                onError: (info)=>{
                    returnMessage = {
                        success: false,
                        message: info.message
                    }
                }
            }
        )

        return returnMessage
    }
}