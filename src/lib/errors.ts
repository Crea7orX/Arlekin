import "server-only";

import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/exceptions";
import { NextResponse } from "next/server";
import { z } from "zod";

export function handleError(error: unknown) {
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (error instanceof ForbiddenError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(error.issues, { status: 422 });
  }

  console.error(error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
