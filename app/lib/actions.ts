"use server";

import { getUser, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { pool } from "../db/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { TransactionType } from "./types";

export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type TransactionState = {
  errors?: {
    name?: string[];
    description?: string[];
    amount?: string[];
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

const TransactionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(["debit", "credit"]),
  amount: z.string(),
  date: z.string(),
  userId: z.string(),
});

const CreateUser = UserSchema.omit({ id: true, date: true });

const CreateTransaction = TransactionSchema.omit({
  id: true,
  date: true,
  userId: true,
  type: true,
});

export async function createUser(prevState: UserState, formData: FormData) {
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
  const date = new Date().toISOString().split("T")[0]; // TODO: extract this date

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

export async function createTransaction(
  prevState: TransactionState,
  formData: FormData
) {
  console.log(formData);
  const type = "debit";
  const userEmail = "user@nextmail.com";
  const validatedFields = CreateTransaction.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    amount: formData.get("amount"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { name, description, amount } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  const user = await getUser(userEmail);

  const fixedAmount = Number(amount.toString() + "00");

  if (!user || !user.id) {
    return {
      message: "Failed to find user.",
    };
  }
  try {
    await pool.query(`
      INSERT INTO transactions (name, description, type, amount, date, userId)
      VALUES ('${name}', '${description}', '${type}', '${fixedAmount}', '${date}', '${user.id}');
    `);
  } catch (e) {
    return {
      message: "Database Error: Failed to create user.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
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
