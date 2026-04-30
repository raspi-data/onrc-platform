import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

function checkAdminAuth(request: NextRequest): boolean {
  const secret = request.headers.get("x-admin-secret");
  return secret === process.env.ADMIN_SECRET;
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return Response.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where = status ? { status } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.order.count({ where }),
  ]);

  return Response.json({ orders, total, page, pages: Math.ceil(total / limit) });
}

export async function PATCH(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return Response.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !status) {
    return Response.json({ error: "id și status sunt obligatorii" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return Response.json(order);
}
