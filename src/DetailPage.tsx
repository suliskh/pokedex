import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { BsArrowRight } from "react-icons/bs";
import {
  Badge,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Progress,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

import PokemonCard from "./components/PokemonCard";
import BackButton from "./components/BackButton";

import { getOfficialArtwork } from "./utils";
import PokemonFallbackImg from "./assets/pokemon-fallback-img.png";
import { GET_POKEMON_QUERY } from "./queries";
import { PokemonType } from "./@types";

function DetailPage() {
  const { name } = useParams();

  const { loading, data } = useQuery(GET_POKEMON_QUERY, {
    variables: { name },
  });

  const pokemon: PokemonType = useMemo<PokemonType>(
    () => ({
      abilities:
        data?.species[0]?.pokemons[0]?.abilities?.map(
          (item: { ability: { name: string } }) => item.ability.name
        ) || [],
      color: data?.colors[0]?.name || "",
      description: data?.species[0]?.species_descriptions[0]?.flavor_text || "",
      evolutions:
        data?.evolutions[0]?.species?.map(
          (item: { id: string; name: string }) => ({
            id: item.id,
            name: item.name,
          })
        ) || [],
      generationName: data?.species[0]?.generation?.names[0]?.name || "",
      height: data?.species[0]?.pokemons[0]?.height || "0",
      id: data?.species[0]?.pokemons[0]?.id || "",
      name: data?.species[0]?.pokemons[0]?.name || "",
      stats:
        data?.stats?.map(
          (item: { base_stat: string; stat: { name: string } }) => ({
            label: item.stat.name,
            value: item.base_stat,
          })
        ) || [],
      types: data?.species[0]?.pokemons[0]?.types?.map(
        (item: { pokemonType: { name: string } }) => item.pokemonType.name || ""
      ),
      weight: data?.species[0]?.pokemons[0]?.weight || "0",
    }),
    [data]
  );

  if (loading) return <DetailPageSkeleton />;

  return (
    <>
      <Box as="header" bgColor="gray.100" height="48">
        <Container
          height="full"
          display="flex"
          justifyContent="space-between"
          py="3"
        >
          <Box position="relative">
            <BackButton
              aria-label="Back to home"
              position="absolute"
              size="sm"
              top="0"
              left="0"
            />
          </Box>
          <Box mt="auto" w="full">
            <Stack direction="row" mb="2">
              {pokemon.types.map((typeName) => (
                <Badge key={typeName}>{typeName}</Badge>
              ))}
            </Stack>
            <Heading
              as="h1"
              color="gray.900"
              noOfLines={2}
              overflowWrap="anywhere"
              size="lg"
              textTransform="capitalize"
            >
              {name}
            </Heading>
            <Text color="gray.500" fontWeight="bold">
              {`#${pokemon.id} ∙ ${pokemon.generationName}`}
            </Text>
          </Box>
          <Image
            alt={name}
            fallbackSrc={PokemonFallbackImg}
            ml="4"
            objectFit="contain"
            src={getOfficialArtwork(pokemon.id || "")}
            _hover={{
              transitionPoperty: "transform",
              transitionDuration: "normal",
              transform: "scale(105%) rotate(5deg)",
            }}
          />
        </Container>
      </Box>
      <Container as="main" py="8">
        <Grid gap="6" gridTemplateColumns="1fr 1fr" width="100%">
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Description
            </Heading>
            <Text color="gray.800">{pokemon.description}</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Height
            </Heading>
            <Text color="gray.800">{pokemon.height} m</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Weight
            </Heading>
            <Text color="gray.800">{pokemon.weight} kg</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full" colSpan={2}>
            <Heading as="h3" mb="1" size="sm">
              Abilities
            </Heading>
            <Text color="gray.800" textTransform="capitalize">
              {pokemon.abilities.join(", ")}
            </Text>
          </GridItem>
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Heading as="h3" mb="3" size="sm">
              Stats
            </Heading>
            <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={3} columnGap={6}>
              {pokemon.stats.map((stat, i) => (
                <GridItem key={i}>
                  <Text color="gray.800" fontSize="sm" fontWeight="bold" mb="1">
                    {`${stat.label} (${stat.value})`}
                  </Text>
                  <Progress borderRadius="full" height="2" value={20} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Heading as="h3" mb="3" size="sm">
              Evolutions
            </Heading>
            <Stack
              alignItems="center"
              border="1px"
              borderColor="gray.300"
              borderRadius="2xl"
              display="inline-flex"
              direction="row"
              divider={<Icon as={BsArrowRight} width="8" border="none" />}
              flexWrap="nowrap"
              justifyContent="center"
              maxWidth="full"
              overflowX="auto"
              p="3"
              width="auto"
            >
              {pokemon.evolutions.map((evolution) => (
                <Box
                  display="flex"
                  flexGrow={0}
                  flexShrink={0}
                  height="auto"
                  key={evolution.id}
                  width="20"
                  justifyContent="center"
                  sx={{
                    "> *": {
                      width: "full",
                    },
                  }}
                >
                  <PokemonCard
                    id={evolution.id}
                    name={evolution.name}
                    variant="compact"
                  />
                </Box>
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}

export default DetailPage;

function DetailPageSkeleton() {
  return (
    <>
      <Box as="header" bgColor="gray.100" height="48">
        <Container
          height="full"
          display="flex"
          justifyContent="space-between"
          py="3"
        >
          <Box position="relative">
            <BackButton
              aria-label="Back to home"
              position="absolute"
              size="sm"
              top="0"
              left="0"
            />
          </Box>
          <Box mt="auto" w="full">
            <Skeleton width="20" height="3" mb="2" />
            <Skeleton width="60" height="8" mb="1" />
            <Skeleton width="44" height="4" mb="1" />
          </Box>
          <Image
            src={PokemonFallbackImg}
            ml="4"
            objectFit="contain"
            _hover={{
              transitionPoperty: "transform",
              transitionDuration: "normal",
              transform: "scale(105%) rotate(5deg)",
            }}
          />
        </Container>
      </Box>
      <Container as="main" py="8">
        <Grid gap="6" gridTemplateColumns="1fr 1fr" width="100%">
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Skeleton w="full" height="3" mb="1" />
            <Skeleton w="full" height="3" mb="1" />
            <Skeleton w="full" height="3" mb="1" />
            <Skeleton w="40" height="3" mb="1" />
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Skeleton w="full" height="3" mb="1" />
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Skeleton w="full" height="3" mb="1" />
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Skeleton w="full" height="3" mb="1" />
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Skeleton w="full" height="3" mb="1" />
          </GridItem>
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />
            <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={3} columnGap={6}>
              {[...new Array(8)].map((_, i) => (
                <GridItem key={i}>
                  <Skeleton w="20" height="3" mb="1" />
                  <Skeleton w="full" height="2" mb="1" />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Skeleton w="24" height="4" mb="2" />

            <Stack
              alignItems="center"
              border="1px"
              borderColor="gray.300"
              borderRadius="2xl"
              direction="row"
              display="inline-flex"
              divider={<Icon as={BsArrowRight} width="8" border="none" />}
              flexWrap="nowrap"
              maxWidth="full"
              overflowX="auto"
              p="3"
              width="auto"
            >
              {[...new Array(3)].map((_, i) => (
                <Skeleton
                  borderRadius="lg"
                  display="flex"
                  flexGrow={0}
                  flexShrink={0}
                  height={36}
                  key={i}
                  width={32}
                />
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
