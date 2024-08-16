import { FastifyInstance } from "fastify";
import { registerCors } from "./plugins/cors";
import { registerSwagger } from "./plugins/swagger";
import { routes } from "./routes/ping";

export async function buildApp(app: FastifyInstance) {
  await registerCors(app);
  await registerSwagger(app);
  await routes(app);
}
