import { PropsWithChildren } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          /**
           * Enable offset-based pagination strategy by generating a field policy
           * Ref: https://www.apollographql.com/docs/react/pagination/offset-based#the-offsetlimitpagination-helper
           */
          pokemon_v2_pokemon: offsetLimitPagination(["where", "name"]),
        },
      },
    },
  }),
});

function GraphQLProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
