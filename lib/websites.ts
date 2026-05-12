import { prisma } from "@/lib/prisma";
import type { WebsiteInput } from "@/lib/validators";

export type WebsiteView = {
  id: string;
  name: string;
  url: string;
  category: string;
  note: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

function toWebsiteView(website: {
  id: string;
  name: string;
  url: string;
  category: string;
  note: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}): WebsiteView {
  return {
    ...website,
    createdAt: website.createdAt.toISOString(),
    updatedAt: website.updatedAt.toISOString()
  };
}

export async function listWebsites() {
  const websites = await prisma.website.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
  });

  return websites.map(toWebsiteView);
}

export async function createWebsite(input: WebsiteInput) {
  const website = await prisma.website.create({ data: input });
  return toWebsiteView(website);
}

export async function updateWebsite(id: string, input: WebsiteInput) {
  const website = await prisma.website.update({
    where: { id },
    data: input
  });

  return toWebsiteView(website);
}

export async function deleteWebsite(id: string) {
  await prisma.website.delete({ where: { id } });
}
