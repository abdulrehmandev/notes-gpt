import { z } from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { signUpSchema } from "@/lib/definitions/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = signUpSchema.parse(body);

    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return new Response("User already exists", { status: 400 });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });

    return new Response("User Created Successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
