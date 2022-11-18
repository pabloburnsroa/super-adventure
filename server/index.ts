import fastify, { FastifyRequest } from 'fastify';
import sensible from '@fastify/sensible';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
dotenv.config();
const Port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = fastify();

server.register(sensible);

// cors
server.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});

const prisma = new PrismaClient();

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
};

// Route for getting all posts
server.get('/posts', async (req, res) => {
  return await commitToDb(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    })
  );
});

// Route for getting an individual post
server.get(
  '/posts/:id',
  async (
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    res
  ) => {
    return await commitToDb(
      prisma.post.findUnique({
        where: { id: req.params.id },
        select: {
          body: true,
          title: true,
          comments: {
            orderBy: {
              createdAt: 'desc',
            },
            select: COMMENT_SELECT_FIELDS,
          },
        },
      })
    );
  }
);

// commitToDb will handle any errors
async function commitToDb(promise: Promise<unknown>) {
  const [error, data] = await server.to(promise);
  if (error) return server.httpErrors.internalServerError(error.message);
  return data;
}
// listen for server
server.listen({ port: Port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
