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
import { useParams, Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";

import { getOfficialArtwork } from "./utils";
import PokemonFallbackImg from "./assets/pokemon-fallback-img.png";
import PokemonCard from "./components/PokemonCard";

function DetailPage() {
  let { name } = useParams();

  // FIXME: get data from PokeAPI
  const DUMMY_TYPES = ["grass", "fire"];
  const DUMMY_ID = "1";
  const loading = false;

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
            <IconButton
              aria-label="Back to home"
              as={Link}
              colorScheme="teal"
              icon={<FaArrowLeft />}
              position="absolute"
              top="0"
              left="0"
              size="sm"
              to="/"
            />
          </Box>
          <Box mt="auto" w="full">
            <Stack direction="row" mb="2">
              {DUMMY_TYPES.map((typeName, i) => (
                <Badge colorScheme="teal" key={i}>
                  {typeName}
                </Badge>
              ))}
            </Stack>
            <Heading
              as="h1"
              color="gray.900"
              noOfLines={2}
              overflowWrap="anywhere"
              size="lg"
            >
              Bulbasaur-Gal
            </Heading>
            <Text color="gray.600" fontWeight="bold">
              #{"001"}
            </Text>
          </Box>
          <Image
            alt={name}
            fallbackSrc={PokemonFallbackImg}
            ml="4"
            objectFit="contain"
            src={getOfficialArtwork(DUMMY_ID)}
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
            <Text color="gray.800">
              Exposure to sunlight adds to its strength. Sunlight also makes the
              bud on its back grow larger.
            </Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Height
            </Heading>
            <Text color="gray.800">3' 30"</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Weight
            </Heading>
            <Text color="gray.800">431 lbs</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Gender
            </Heading>
            <Text color="gray.800">Male (45%), Female (55%)</Text>
          </GridItem>
          <GridItem as="section" maxWidth="full">
            <Heading as="h3" mb="1" size="sm">
              Abilities
            </Heading>
            <Text color="gray.800">Punch, Bloren, Sabal</Text>
          </GridItem>
          <GridItem as="section" colSpan={2} maxWidth="full">
            <Heading as="h3" mb="3" size="sm">
              Stats
            </Heading>
            <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={3} columnGap={6}>
              {[...new Array(8)].map((_, i) => (
                <GridItem key={i}>
                  <Text color="gray.800" fontSize="sm" fontWeight="bold" mb="1">
                    HP (65)
                  </Text>
                  <Progress
                    borderRadius="full"
                    colorScheme="teal"
                    height="2"
                    value={20}
                  />
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
              maxWidth="full"
              overflowX="auto"
              p="3"
              width="auto"
            >
              {[...new Array(5)].map((_, i) => (
                <Box
                  display="flex"
                  flexGrow={0}
                  flexShrink={0}
                  height="auto"
                  width={32}
                >
                  <PokemonCard id="1" name="samingun-glvax" variant="compact" />
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
            <IconButton
              aria-label="Back to home"
              as={Link}
              colorScheme="teal"
              icon={<FaArrowLeft />}
              position="absolute"
              top="0"
              left="0"
              size="sm"
              to="/"
            />
          </Box>
          <Box mt="auto" w="full">
            <Skeleton width="20" height="3" mb="2" />
            <Skeleton width="60" height="8" mb="1" />
            <Skeleton width="10" height="4" mb="1" />
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
