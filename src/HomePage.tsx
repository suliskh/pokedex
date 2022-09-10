import React from "react";
import { Container, Grid, Heading, Skeleton } from "@chakra-ui/react";

import Header from "./components/Header/Header";
import PokemonCard from "./components/PokemonCard";

function HomePage() {
  // FIXME: fetch data
  const loading = true;

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
          {[...new Array(12)].map((_, id) =>
            loading ? (
              <Skeleton borderRadius="xl" height="56" />
            ) : (
              <PokemonCard
                id={String(id + 1)}
                name="bulbasuer"
                types={["grass", "fire"]}
              />
            )
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default HomePage;
