import { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get('/ping', async (request, reply) => {
    return { message: 'pong' };
  });

}
