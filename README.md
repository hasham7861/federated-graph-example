# Apollo federation graph test

You can use this test query to see how reviews and product is setup
Reviews is own graph and product is own graph. Though reviews can just reference product and product service will resolve it based on upc value

query Query {
  reviews {
    body
    author
    product {
      upc
      name
      price
    }
  }
}
