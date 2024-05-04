const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const products = require("./data.json").products;


const PORT = process.env.PORT || 4001;

const typeDefs = gql`

  # using the key directive makes the Product an entity and you can make use of it and pass upc field to it 
  type Product @key(fields: "upc") {
    upc: String!
    name: String
    price: Int
  }

  type Query {
    product(upc: String!): Product
  }
`;

const resolvers = {
  // Product entity can be resolved when used in another subgraph
  Product: {
    __resolveReference(object) {
      return products.find(product => product.upc === object.upc);
    }
  },
  Query: {
    // You can use the product query on its own
    product: (parent, args) => products.find(product => product.upc === args.upc),
  }
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});