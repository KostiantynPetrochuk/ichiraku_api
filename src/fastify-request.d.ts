import 'src/fastify-request';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      sub: string;
      login: string;
    };
  }
}
