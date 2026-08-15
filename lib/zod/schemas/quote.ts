import * as z from "zod";

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  company: z
    .string()
    .trim()
    .max(150, "Company name cannot exceed 150 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters")
    .max(30, "Phone number cannot exceed 30 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email address cannot exceed 254 characters")
    .optional(),

  location: z
    .string()
    .trim()
    .max(300, "Location cannot exceed 300 characters")
    .optional(),

  start: z.string()
    .optional(),

  end: z.string()
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description cannot exceed 5000 characters"),
});

export type QuoteProps = z.infer<typeof quoteSchema>;