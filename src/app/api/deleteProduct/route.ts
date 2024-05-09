import { NextResponse } from "next/server";

type RouteParams = {
  id: string;
};

export default function DELETE(
  request: Request,
  { params }: { params: RouteParams }
) {
  const id = params.id;
  console.log({ id });
  return NextResponse.json(request);
}
