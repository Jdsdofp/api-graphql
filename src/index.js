import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { predictiveCertificateTypeDefs } from './schema/predictiveCertificateTypeDefs.js';
import { predictiveCertificateResolvers } from './resolvers/predictiveCertificateResolver.js';
import { db } from './db.js';
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs: [predictiveCertificateTypeDefs],
    resolvers: [predictiveCertificateResolvers],
});
await server.start();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
    context: async ({ req }) => {
        const token = req.headers.webkey || req.headers.authorization;
        const empresa_id = Array.isArray(req.headers.empresa_id)
            ? req.headers.empresa_id[0]
            : req.headers.empresa_id;
        const user = Array.isArray(req.headers.user)
            ? req.headers.user[0]
            : req.headers.user;
        if (token !== 'E0D02A31-7BA4-4A1C-A7FA-0396DDB22EB5') {
            throw new Error('Token inválido ou não autorizado');
        }
        if (!empresa_id) {
            throw new Error('ID da empresa não enviado no header');
        }
        return { db, empresa_id, user };
    },
}));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log('🚀 Servidor GraphQL rodando em http://localhost:4000/graphql');
//# sourceMappingURL=index.js.map