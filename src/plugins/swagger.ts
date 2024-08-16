import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function registerSwagger(app: FastifyInstance) {
  app.register(fastifySwagger, {
    swagger: {
      consumes: ["application/json"],
      produces: ["application/json"],
      info: {
        title: "project name",
        description: "project description",
        version: "0.1.0", // project version
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
}
