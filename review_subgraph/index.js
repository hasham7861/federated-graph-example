const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const reviews = require("./data.json").reviews;

const PORT = process.env.PORT || 4002;

const typeDefs = gql`
  type Review {
    body: String
    author: String
    product: Product # you can use entity from another subgraph just by referencing it
  }

  # product entity can be extended and add more properties to it and be part of this service   
  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }

  type Query {
    reviews: [Review]
  }
`;

const resolvers = {
  Review: {
    // the review.product is just the upc value that is fetched during the query for review and then it will be resolved from another subgraph
    product(review) {
      return { __typename: "Product", upc: review.product };
    }
  },
  Product: {
    // field resolver on reviews property in type Product
    reviews(product) {
      return reviews.filter(review => review.product === product.upc);
    }
  },
  Query: {
    reviews: () => reviews,
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});