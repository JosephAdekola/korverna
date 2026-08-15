import { handleSubmitQuote } from "@/actions/general/submit_quote";
import { quoteSchema } from "@/lib/zod/schemas/quote";

export const POST = async (req: Request) => {
    try {
        const {
            body: { quote }
        } = await req.json();

        const validate = quoteSchema.safeParse(quote)

        if (!validate.success) {
            return Response.json(
                {
                    success: false,
                    status: 400,
                    message: "Invalid request",
                    data: []
                },
                {
                    status: 400
                }
            )
        }

        const response = await handleSubmitQuote(quote);

        return Response.json(response, {
            status: response.status,
        });
    } catch (error) {
        console.error("Quote submission error:", error);

        return Response.json(
            {
                success: false,
                status: 500,
                message: "An error occurred. Try again",
                data: [],
            },
            {
                status: 500,
            }
        );
    }
};