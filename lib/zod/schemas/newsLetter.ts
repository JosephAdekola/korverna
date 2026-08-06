import * as z from "zod"; 
 
export const NewsLetterSchema = z.object({ 
  email: z.email("Please enter a valid email address")
});

export type NewsLetterProps = z.infer<typeof NewsLetterSchema>