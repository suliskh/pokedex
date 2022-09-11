import { gql } from "@apollo/client";

export const GET_POKEMONS_QUERY = gql`
  query GetPokemonsQuery($limit: Int, $offset: Int!) {
    species: pokemon_v2_pokemonspecies(
      where: {}
      order_by: { id: asc }
      offset: $offset
      limit: $limit
    ) {
      name
      id
      pokemonTypes: pokemon_v2_pokemons {
        types: pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;
