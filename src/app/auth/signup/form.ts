import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z.string().min(1, { message: "Must not be blank" }),
    username: z.string().min(1, { message: "Must not be blank" }),

    email: z
      .string()
      .min(1, {
        message: "Must not be blank",
      })
      .email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),

    passwordConfirmation: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"], // This will attach the error to `passwordConfirmation` field
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
