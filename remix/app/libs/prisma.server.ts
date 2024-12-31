// import { PrismaClient } from '@prisma/client'
//
// const prisma = new PrismaClient()
// export default prisma

import { PrismaClient } from "@prisma/client";

declare global {
	var client: PrismaClient | undefined;
}

const prisma = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default prisma;
