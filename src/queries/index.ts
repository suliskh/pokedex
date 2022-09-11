import { gql } from "@apollo/client";

export function generateGetPokemonsQueryArgs(args: { types: Array<string> }) {
  if (args.types.length <= 0) {
    return null;
  }
  return {
    pokemon_v2_pokemons: {
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: { name: { _in: args.types } },
      },
    },
  };
}

export const GET_POKEMONS_QUERY = gql`
  query GetPokemonsQuery(
    $limit: Int
    $offset: Int!
    $args: pokemon_v2_pokemonspecies_bool_exp
  ) {
    species: pokemon_v2_pokemonspecies(
      where: $args
      order_by: { id: asc }
      offset: $offset
      limit: $limit
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons(
        where: { is_default: { _eq: true } }
        limit: 1
      ) {
        types: pokemon_v2_pokemontypes {
          pokemonType: pokemon_v2_type {
            name
          }
        }
      }
    }
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(where: $args) {
      aggregate {
        count(distinct: true)
      }
    }
  }
`;

export const GET_ARGS_QUERY = gql`
  query GetArgsQuery {
    types: pokemon_v2_type {
      id
      name
    }
    generations: pokemon_v2_generation {
      name
      generation_names: pokemon_v2_generationnames(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
        limit: 1
      ) {
        name
      }
    }
  }
`;
