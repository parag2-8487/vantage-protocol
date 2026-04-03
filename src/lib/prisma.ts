import { PrismaClient } from '../generated/client'


const prismaClientSingleton = () => {
    // Prevent Prisma from establishing connections during static analysis if no DB is available
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return {} as any;
    }
    return new PrismaClient({
        log: ['error'],
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
