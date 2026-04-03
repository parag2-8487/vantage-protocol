import { PrismaClient } from '@prisma/client'

let _prisma: PrismaClient | null = null;

const getPrisma = () => {
    if (_prisma) return _prisma;

    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return {} as any;
    }

    console.log('[Prisma] Initializing Client. Engine:', process.env.PRISMA_CLIENT_ENGINE_TYPE || 'default');

    _prisma = new PrismaClient({
        log: ['error'],
    });

    return _prisma;
};

// Use a Proxy to allow standard 'prisma.user.findMany()' syntax while deferring initialization
const prisma = new Proxy({} as PrismaClient, {
    get: (target, prop, receiver) => {
        const client = getPrisma();
        return Reflect.get(client, prop, receiver);
    }
});

export default prisma;
