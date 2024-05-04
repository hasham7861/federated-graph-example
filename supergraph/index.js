const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

const PRODUCT_SUBGRAPH = process.env.PRODUCT_SUBGRAPH || "http://localhost:4001";
const REVIEW_SUBGRAPH = process.env.REVIEW_SUBGRAPH || "http://localhost:4002";

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'product', url: PRODUCT_SUBGRAPH },
    { name: 'review', url: REVIEW_SUBGRAPH},
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});