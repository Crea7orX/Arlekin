import { authenticate } from "@/lib/auth";
import { handleError } from "@/lib/errors";
import { NotFoundError } from "@/lib/exceptions";
import { pinResponseSchema } from "@/lib/validation/pin";
import { pinDelete } from "@/server/db/queries";
import { NextResponse, type NextRequest } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(_: NextRequest, props: Props) {
  try {
    const { id } = await props.params;
    const { userId } = await authenticate();

    const pin = await pinDelete({ id, userId });
    if (!pin) throw new NotFoundError();

    return NextResponse.json(pinResponseSchema.parse(pin));
  } catch (error) {
    return handleError(error);
  }
}
