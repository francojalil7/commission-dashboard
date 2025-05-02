import {NextResponse} from "next/server";

import {prisma} from "@/lib/prisma";
import {dealsArraySchema} from "@/schemas";

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      orderBy: {date: "desc"},
    });

    return NextResponse.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);

    return NextResponse.json({error: "Error fetching deals"}, {status: 500});
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parse = dealsArraySchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        {error: "Invalid data", issues: parse.error.format()},
        {status: 400},
      );
    }

    const deals = parse.data;

    const existing = await prisma.deal.findMany({
      where: {
        id: {in: deals.map((d) => d.id)},
      },
      select: {id: true},
    });

    const existingIds = new Set(existing.map((d) => d.id));
    const newDeals = deals.filter((d) => !existingIds.has(d.id));

    await prisma.deal.createMany({
      data: newDeals.map((d) => ({
        ...d,
        date: new Date(d.date),
      })),
    });

    return NextResponse.json({added: newDeals.length});
  } catch (error) {
    console.error("Error saving deals:", error);

    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
