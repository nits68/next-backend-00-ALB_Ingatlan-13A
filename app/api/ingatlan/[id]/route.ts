import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.ingatlan.delete({
      where: { id: Number(id) },
    });
    // Content (body) nélküli üzenet küldése:
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("No record was found for a delete.")) {
      return NextResponse.json({ message: "Az ingatlan nem létezik." }, { status: 404 });
    }
    // Általános hibakezelés
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Ismeretlen hiba!",
      },
      { status: 500 },
    );
  }
}
