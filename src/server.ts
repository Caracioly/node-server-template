import { buildApp } from "./app";

import fastify from "fastify";

const app = fastify();

buildApp(app).then(() => {
    app.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server running at ${address}`);
    });
  });