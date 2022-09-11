import { gql } from "@apollo/client";

export function generateGetPokemonsQueryArgs(args: {
  types: Array<string>;
  generations: Array<string>;
}) {
  if (args.types.length <= 0 && args.generations.length <= 0) {
    return null;
  }

  return {
    pokemon_v2_pokemons: {
      pokemon_v2_pokemontypes: {
        pokemon_v2_type:
          args.types.length > 0 ? { name: { _in: args.types } } : {},
      },
      pokemon_v2_pokemonspecy: {
        pokemon_v2_generation:
          args.generations.length > 0
            ? { name: { _in: args.generations } }
            : {},
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

export const GET_POKEMON_QUERY = gql`
  query GetPokemonQuery($name: String!) {
    species: pokemon_v2_pokemonspecies(where: { name: { _eq: $name } }) {
      species_descriptions: pokemon_v2_pokemonspeciesflavortexts(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
        limit: 1
      ) {
        flavor_text
      }
      pokemons: pokemon_v2_pokemons(where: { name: { _eq: $name } }, limit: 1) {
        height
        name
        id
        weight
        types: pokemon_v2_pokemontypes {
          pokemonType: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
      }
      generation: pokemon_v2_generation {
        names: pokemon_v2_generationnames(
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          name
        }
      }
    }
    stats: pokemon_v2_pokemonstat(
      where: { pokemon_v2_pokemon: { name: { _eq: $name } } }
    ) {
      base_stat
      stat: pokemon_v2_stat {
        name
      }
    }
    colors: pokemon_v2_pokemoncolor(
      where: {
        pokemon_v2_pokemonspecies: {
          pokemon_v2_pokemons: { name: { _eq: $name } }
        }
      }
    ) {
      name
    }
    evolutions: pokemon_v2_evolutionchain(
      where: { pokemon_v2_pokemonspecies: { name: { _eq: $name } } }
    ) {
      species: pokemon_v2_pokemonspecies {
        id
        name
      }
    }
  }
`;
