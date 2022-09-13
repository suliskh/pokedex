import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  CheckboxGroup,
  Container,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { InView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

import PokemonComparison from "./components/PokemonComparison";
import Header from "./components/Header/Header";
import PokemonCard from "./components/PokemonCard";

import { generateGetPokemonsQueryArgs, GET_POKEMONS_QUERY } from "./queries";
import { PokemonType } from "./@types";

const LIMIT = 15;

function HomePage() {
  const [searchParams] = useSearchParams();

  const [selectedPokemons, setSelectedPokemons] = useState<
    Array<Pick<PokemonType, "id" | "name">>
  >([]);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);

  const handleSelectedPokemonChanges = (values: Array<string>) => {
    const newSelectedPokemons = values.map((value) => {
      const [id, name] = value.split(",");

      return { id, name };
    });

    setSelectedPokemons(newSelectedPokemons);
  };

  const { loading, data, fetchMore } = useQuery(GET_POKEMONS_QUERY, {
    variables: {
      offset: 0,
      limit: LIMIT,
      args: generateGetPokemonsQueryArgs({
        types: searchParams.getAll("types"),
        generations: searchParams.getAll("generations"),
      }),
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    pokemons,
    dataCount,
  }: {
    pokemons: Array<Pick<PokemonType, "id" | "name" | "types">>;
    dataCount: number;
  } = useMemo(() => {
    const pokemons =
      data?.species?.map(({ id, name, pokemons }: any) => ({
        id,
        name,
        types:
          (pokemons &&
            pokemons[0].types?.map((item: any) => item?.pokemonType?.name)) ||
          [],
      })) || [];

    const dataCount = data?.species_aggregate.aggregate.count || 0;

    return { pokemons, dataCount };
  }, [data]);

  return (
    <React.Fragment>
      <Header />

      <Container as="main" py="6" position="relative">
        <Heading textAlign="center" size="xs" mb="6">
          Showing {dataCount} Pokemons
        </Heading>

        <CheckboxGroup
          colorScheme="yellow"
          onChange={handleSelectedPokemonChanges}
        >
          <Grid
            gap={6}
            templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }}
          >
            {pokemons.map((pokemon, i) => (
              <PokemonCard
                id={pokemon.id}
                isSelectable={isCompareMode}
                key={`${pokemon.id}-${i}`}
                name={pokemon.name}
                types={pokemon.types}
              />
            ))}

            {loading && <PokemonListSkeleton />}
          </Grid>
        </CheckboxGroup>

        <PokemonComparison
          pokemons={selectedPokemons}
          onCancel={() => setIsCompareMode(false)}
          onTrigger={() => setIsCompareMode(true)}
        />
      </Container>
      <InView
        style={{ height: "1px" }}
        onChange={async (inView) => {
          const displayedPokemonsCount = data?.species?.length;
          const shouldFetchMore =
            inView && !loading && displayedPokemonsCount < dataCount;

          if (shouldFetchMore) {
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
