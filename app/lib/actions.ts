"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  date: z.string(),
});

const CreateUser = UserSchema.omit({ id: true, date: true });

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      message: "Passwords don't match",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];

  try {
    await pool.query(`
      INSERT INTO users (name, email, password, date)
      VALUES ('${name}', '${email}', '${hashedPassword}', '${date}');
    `);
  } catch (e) {
    return {
      message: "Database Error: Failed to create user.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong";
      }
    }
    throw e;
  }
}
