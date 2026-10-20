import { z } from "zod";

export const OrderSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  deliveryAddress: z.string().trim().min(8, "Enter a complete delivery address.").max(500),
  neighbourhood: z.string().trim().min(2, "Enter your neighbourhood.").max(80),
  orderDetails: z.string().trim().min(3, "Tell us what you would like to order.").max(2000),
});