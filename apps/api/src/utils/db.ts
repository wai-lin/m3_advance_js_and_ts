import { PrismaClient } from "@prisma/client";

declare global {
	// eslint-disable-next-line vars-on-top
	var __db: PrismaClient | undefined;
}

export const db = globalThis.__db || new PrismaClient();

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== "production") {
	globalThis.__db = db;
}
