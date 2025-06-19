import { authenticate } from "@/lib/auth";
import { handleError } from "@/lib/errors";
import {
  pinCreateSchema,
  pinResponseSchema,
  type PinCreate,
} from "@/lib/validation/pin";
import { pinInsert, pinsGetAll } from "@/server/db/queries";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  try {
    const pins = await pinsGetAll();

    return NextResponse.json(pinResponseSchema.array().parse(pins));
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await authenticate();

    const json = (await request.json()) as PinCreate;
    const create = pinCreateSchema.parse(json);

    const pin = await pinInsert({ create, userId });

    return NextResponse.json(pinResponseSchema.parse(pin), {
      status: 201,
    });
  } catch (error) {
    return handleError(error);
  }
}
