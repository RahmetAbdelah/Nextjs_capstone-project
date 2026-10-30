import { z } from "zod";

export const OrderSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().min(7, "Enter your phone number.").max(25, "Phone number must be 25 characters or fewer.")
    .regex(/^\+?[\d\s().-]+$/, "Enter a valid phone number.")
    .refine((phone) => (phone.match(/\d/g) ?? []).length >= 7, "Enter a phone number with at least 7 digits."),
  deliveryAddress: z.string().trim().min(8, "Enter a complete delivery address.").max(500),
  neighbourhood: z.string().trim().min(2, "Enter your neighbourhood.").max(80),
  orderDetails: z.string().trim().min(3, "Tell us what you would like to order.").max(2000),
});

export const AccountRegistrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254)
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Use at least 8 characters.").max(128),
  confirmPassword: z.string().max(128),
}).superRefine((account, context) => {
  if (account.password !== account.confirmPassword) {
    context.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    });
  }
});