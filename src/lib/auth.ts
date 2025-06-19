import { UnauthorizedError } from "@/lib/exceptions";
import { auth } from "@clerk/nextjs/server";

export async function authenticate() {
  const authObject = await auth();

  if (!authObject.userId) {
    throw new UnauthorizedError();
  }

  return {
    userId: authObject.userId,
  };
}
