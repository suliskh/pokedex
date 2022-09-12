import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Image,
  Stack,
  Box,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react";

import BackButton from "./components/BackButton";

import { getOfficialArtwork } from "./utils";
import { GET_POKEMONS_COMPARISON_QUERY } from "./queries";
import { PokemonType } from "./@types";
import PokemonFallbackImg from "./assets/pokemon-fallback-img.png";

type ComparisonDataType = Pick<
  PokemonType,
  | "abilities"
  | "generationName"
  | "height"
  | "id"
  | "name"
  | "stats"
  | "types"
  | "weight"
>;

function ComparisonPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading, data } = useQuery(GET_POKEMONS_COMPARISON_QUERY, {
    variables: { names: searchParams.getAll("names") },
  });

  const pokemons = useMemo<Array<ComparisonDataType>>(() => {
    if (!data) return [];

    return data.species?.map((specy: any) => ({
      abilities:
        specy.pokemons[0]?.abilities?.map(
          (item: { ability: { name: string } }) => item.ability.name
        ) || [],
      generationName: specy.generation?.names[0]?.name || "",
      height: specy.pokemons[0]?.height || "0",
      id: specy.pokemons[0]?.id || "0",
      name: specy.pokemons[0]?.name || "",
      stats:
        specy.pokemons[0]?.stats?.map(
          (item: { base_stat: string; stat: { name: string } }) => ({
            label: item.stat.name,
            value: item.base_stat,
          })
        ) || [],
      types: specy.pokemons[0]?.types?.map(
        (item: { pokemonType: { name: string } }) => item.pokemonType.name || ""
      ),
      weight: specy.pokemons[0]?.weight || "0",
    }));
  }, [data]);

  const renderTableHeads = () =>
    pokemons.map((pokemon) => (
      <Th key={pokemon.id}>
        <Box boxSize="20">
          <Image
            alt={pokemon.name}
            fallbackSrc={PokemonFallbackImg}
            src={getOfficialArtwork(pokemon.id)}
          />
        </Box>
        <Text fontWeight="bold">{pokemon.name}</Text>
      </Th>
    ));

  return (
    <>
      <Container py="3" bg="gray.100">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton aria-label="Back to home" size="sm" />
          <Flex width="full" justifyContent="center">
            <Heading size="md">Comparison</Heading>
          </Flex>
        </Stack>
      </Container>
      <Container px="0">
        <TableContainer>
          <Table
            variant="simple"
            maxWidth="full"
            overflowX="auto"
            border="0"
            backgroundColor="gray.100"
          >
            {loading ? (
              <ComparionTableSkeleton
                noOfPokemons={searchParams.getAll("names")?.length || 0}
              />
            ) : (
              <>
                <Thead backgroundColor="gray.100">
                  <Tr>
                    <Th></Th>
                    {renderTableHeads()}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Types
                    </Td>
                    {pokemons.map(({ id, types }) => (
                      <Td key={id} textTransform="capitalize">
                        {types.join(", ")}
                      </Td>
                    ))}
                  </Tr>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Generation
                    </Td>
                    {pokemons.map(({ generationName, id }) => (
                      <Td key={id}>{generationName}</Td>
                    ))}
                  </Tr>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Abilities
                    </Td>
                    {pokemons.map(({ abilities, id }) => (
                      <Td key={id} textTransform="capitalize">
                        {abilities.join(", ")}
                      </Td>
                    ))}
                  </Tr>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Height
                    </Td>
                    {pokemons.map(({ height, id }) => (
                      <Td key={id}>{height}m</Td>
                    ))}
                  </Tr>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Weight
                    </Td>
                    {pokemons.map(({ id, weight }) => (
                      <Td key={id}>{weight}kg</Td>
                    ))}
                  </Tr>
                  <Tr bgColor="white">
                    <Td
                      bgColor="teal.50"
                      borderRightColor="teal.100"
                      borderRightWidth="1px"
                      fontWeight="bold"
                      left="0"
                      position="sticky"
                    >
                      Stats
                    </Td>
                    {pokemons.map(({ id, stats }) => (
                      <Td key={id}>
                        <Stack direction="column">
                          {stats.map((stat) => (
                            <Text
                              key={stat.label}
                              textTransform="uppercase"
                              fontSize="sm"
                            >
                              {stat.label} <b>({stat.value})</b>
                            </Text>
                          ))}
                        </Stack>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </>
            )}
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ComparisonPage;

type ComparisonTableSkeletonProps = {
  noOfPokemons: number;
};

function ComparionTableSkeleton({
  noOfPokemons,
}: ComparisonTableSkeletonProps) {
  return (
    <>
      <Thead backgroundColor="gray.100">
        <Tr>
          <Th></Th>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Th key={i}>
              <Box boxSize="20">
                <Image alt="" src={PokemonFallbackImg} />
              </Box>

              <Skeleton width="20" height="3" />
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Types
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Skeleton width="28" height="4" />
            </Td>
          ))}
        </Tr>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Generation
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Skeleton width="14" height="4" />
            </Td>
          ))}
        </Tr>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Abilities
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Skeleton width="32" height="4" />
            </Td>
          ))}
        </Tr>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Height
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Skeleton width="8" height="4" />
            </Td>
          ))}
        </Tr>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Weight
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Skeleton width="8" height="4" />
            </Td>
          ))}
        </Tr>
        <Tr bgColor="white">
          <Td
            bgColor="teal.50"
            borderRightColor="teal.100"
            borderRightWidth="1px"
            fontWeight="bold"
            left="0"
            position="sticky"
          >
            Stats
          </Td>
          {[...new Array(noOfPokemons)].map((_, i) => (
            <Td key={i}>
              <Stack direction="column">
                <Skeleton width="20" height="4" />
                <Skeleton width="20" height="4" />
                <Skeleton width="20" height="4" />
                <Skeleton width="20" height="4" />
                <Skeleton width="20" height="4" />
                <Skeleton width="20" height="4" />
              </Stack>
            </Td>
          ))}
        </Tr>
      </Tbody>
    </>
  );
}
