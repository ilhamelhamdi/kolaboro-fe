import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z.string().min(1, { message: "Must not be empty" }),
    username: z.string().min(1, { message: "Must not be empty" }),

    email: z
      .string()
      .min(1, {
        message: "Must not be empty",
      })
      .email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(1, { message: "Must not be empty" }),

    passwordConfirmation: z.string().min(1, {
      message: "Must not be empty",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"], // This will attach the error to `passwordConfirmation` field
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
