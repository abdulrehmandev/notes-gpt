import { db } from "@/lib/prisma";
import { CredentialsValidator } from "@/lib/validators/credentials";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = CredentialsValidator.parse(body);

    // checking if user already exists before creating it
    const userExists = await db.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExists) {
      return new Response("User already exists", { status: 409 });
    }

    // hashing the password and then creating the user
    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return new Response(user.email, { status: 201 });
  } catch (error) {
    // if the passed value was not validated it means the request was not invalid
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create user at the moment", { status: 500 });
  }
}
