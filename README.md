
﻿# Node server

### Instalação base
`npm init -y` -- Esse comando cria o arquivo `package.json` com as configurações iniciais do projeto.

`npm i typescript @types/node -D`  -- Isso instala o `TypeScript` e os tipos do Node.js como dependências de desenvolvimento.

`npx tsc --init` -- Esse comando cria o arquivo `tsconfig.json` para configurar o `TypeScript` no projeto.


>Acesse as configurações base do TypeScript no repositório [Tsconfig Bases](htps://github.com/tsconfig/bases) e configure o `tsconfig.json` de acordo com a versão do Node.js que você está utilizando.


`npm i tsx -D` -- O `tsx` facilita o desenvolvimento, permitindo a execução de arquivos `TypeScript` diretamente.

``` json
"scripts": {
    "dev": "tsx watch --env-file .env src/server.ts",
}
```
> Esse script permite rodar o servidor em modo de desenvolvimento com `npm run dev`. Ele também carrega variáveis de ambiente a partir de um arquivo `.env`.

### Fastify / Swagger
`npm i fastify` Instala a dependência `Fastify` para criar o servidor.
`npm i @fastify/cors` Instala o `Fastify Cors` para

`npm i @fastify/swagger`
`npm i @fastify/swagger-ui` 
> Instala o swagger / swagger-ui para documentação.


### Zod
`npm i zod` Instala a biblioteca `Zod` para validação de esquemas de dados.
`npm i fastify-type-provider-zod` Instala o provedor de tipos para integrar `Zod`com o `Fastify`.


###  Tsup
`npm i tsup -D` O `Tsup` é uma ferramenta para fazer a build do projeto.

``` json
"scripts": {
    "build": "tsup"
}
```
> Adicionar isso ao package.json para permitir compilar o código `TypeScript` para `JavaScript` com `npm run build`.

### DB - SLQITE3

`npm install --save-dev @types/sqlite3`
** Não consegui descobrir como usar o slqite3 com o fastify **

### DB - Prisma

> Prisma é um ORM (Object-Relational Mapping) moderno que facilita a interação com bancos de dados, permitindo que você trabalhe com banco de dados como SQLite, MySQL, PostgreSQL, etc., usando um modelo de dados TypeScript.

`npm i prisma -D`  -- Este comando instala a dependência do prisma em desenvolvimento.
`npx prisma init --datasource-provider SQLite` -- Configura o Prisma no projeto, criando o arquivo schema.prisma.

*É Necessário criar models no schema.prisma antes de fazer um migrate.*

Criar dentro de src > plugins > prisma.ts
```javascript
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
});
```

`npx prisma migrate dev` -- Aplica as migrações de banco de dados para a configuração inicial.
`npx prisma studio` -- Abre uma interface gráfica web para visualizar e manipular dados no banco de dados.

## Setup

### src > server.ts
```javascript
import { buildApp } from  "./app";

import fastify from  "fastify";

const  app  =  fastify();

buildApp(app).then(() => {
	app.listen({ port:  3333, host:  "0.0.0.0" }, (err, address) => {
	if (err) {
	    console.error(err);
		process.exit(1);
	}
		console.log(`Server running at ${address}`);
	});
});
```
### src > plugins > cors.ts
```javascript
import { FastifyInstance } from  "fastify";
import fastifyCors from  "@fastify/cors";

export  async  function  registerCors(app:  FastifyInstance) {
	app.register(fastifyCors, {
	origin:  "*", // permite todas as origens
	});
}
```
### src > swagger.ts
```javascript
import { jsonSchemaTransform } from  "fastify-type-provider-zod";
import { FastifyInstance } from  "fastify";
import fastifySwagger from  "@fastify/swagger";
import fastifySwaggerUi from  "@fastify/swagger-ui";

export  async  function  registerSwagger(app:  FastifyInstance) {
app.register(fastifySwagger, {
	swagger: {
		consumes: ["application/json"],
		produces: ["application/json"],
		info: {
			title:  "project name",
			description:  "project description",
			version:  "0.1.0", // project version
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix:  "/docs",
	});
}
```
### src > app.ts
```javascript
import { FastifyInstance } from  "fastify";
import { registerCors } from  "./plugins/cors";
import { registerSwagger } from  "./plugins/swagger";
import { routes } from  "./routes/ping";

export  async  function  buildApp(app:  FastifyInstance) {
	await  registerCors(app);
	await  registerSwagger(app);
	await  routes(app);
}
```
### src > routes > ping.ts
```javascript
import { FastifyInstance } from  "fastify";

export  async  function  routes(app:  FastifyInstance) {
	app.get('/ping', async (request, reply) => {
		return { message:  'pong' };
	});
}
```
