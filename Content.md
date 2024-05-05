Content:

- What is REST
  HTTP GET http://example-api.com/product/:id

  {
    name,
    price,
    weight

    reviews : Review [] 
  }

  HTTP GET http://example-api.com/reviews/product/:id
  {
    reviews : Review [] 
  }


- What is GraphQL?
query {

    product(id: 1){
        name
        price
        weight

        reviews {
            id
            title
            rating
        }
    }
    
}

mutation {
    addProduct()
    deleteProduct()
}

subscription {

}

- Limitation with single Graph? (Apollo federation)
multiple subgraphs and 1 supergraph

product subgraph

product {

} 


review subgraph

review {

}

extends product {
 ...product properties
  review properties
}


supergraph -> product | review | etc.

- Deploy options? AWS apprunner, quick to setup and integrate graphs but probably the most expensive option if you have bigger infrastructure
- Reason for this video is there is not much content out there on deployment of multiple graphs

Repo: https://github.com/hasham7861/federated-graph-example