const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const PORT = process.env.PORT || 4000;

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'product', url: 'http://localhost:4001' },
    { name: 'review', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});