import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { InView } from "react-intersection-observer";

import Header from "./components/Header/Header";
import PokemonCard from "./components/PokemonCard";

import { GET_POKEMONS_QUERY } from "./queries";
import { PokemonItemType } from "./@types";

const LIMIT = 15;

function HomePage() {
  const { loading, data, fetchMore } = useQuery(GET_POKEMONS_QUERY, {
    variables: {
      offset: 0,
      limit: LIMIT,
    },
    notifyOnNetworkStatusChange: true,
  });

  const pokemons: Array<PokemonItemType> = useMemo(() => {
    return (
      data?.species?.map(({ id, name, pokemonTypes }: any) => ({
        id,
        name,
        types:
          (pokemonTypes &&
            pokemonTypes[0].types?.map((item: any) => item.name)) ||
          [],
      })) || []
    );
  }, [data]);

  return (
    <React.Fragment>
      <Header />

      <Container as="main" py="6">
        <Heading textAlign="center" size="xs" mb="6">
          Showing 40 Pokemons
        </Heading>

        <Grid
          gap={6}
          templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
        >
          {pokemons.map((pokemon) => (
            <PokemonCard
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))}

          {loading && <PokemonListSkeleton />}
        </Grid>
      </Container>
      <InView
        style={{ height: "1px" }}
        onChange={async (inView) => {
          if (inView && !loading) {
            await fetchMore({
              variables: {
                offset: data?.species?.length || 0,
              },
            });
          }
        }}
      />
    </React.Fragment>
  );
}

export default HomePage;

function PokemonListSkeleton() {
  return (
    <>
      {[...new Array(LIMIT)].map((_, i) => (
        <Skeleton key={i} borderRadius="xl" height="56" />
      ))}
    </>
  );
}
