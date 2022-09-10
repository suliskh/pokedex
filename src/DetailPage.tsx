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
            <Stack direction="row">
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
        <Grid gap="6" gridTemplateColumns="1fr 1fr">
          <GridItem as="section" colSpan={2}>
            <Heading as="h3" mb="1" size="sm">
              Description
            </Heading>
            <Text color="gray.800">
              Exposure to sunlight adds to its strength. Sunlight also makes the
              bud on its back grow larger.
            </Text>
          </GridItem>
          <GridItem as="section">
            <Heading as="h3" mb="1" size="sm">
              Height
            </Heading>
            <Text color="gray.800">3' 30"</Text>
          </GridItem>
          <GridItem as="section">
            <Heading as="h3" mb="1" size="sm">
              Weight
            </Heading>
            <Text color="gray.800">431 lbs</Text>
          </GridItem>
          <GridItem as="section">
            <Heading as="h3" mb="1" size="sm">
              Gender
            </Heading>
            <Text color="gray.800">Male (45%), Female (55%)</Text>
          </GridItem>
          <GridItem as="section">
            <Heading as="h3" mb="1" size="sm">
              Abilities
            </Heading>
            <Text color="gray.800">Punch, Bloren, Sabal</Text>
          </GridItem>
          <GridItem as="section" colSpan={2}>
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
          <GridItem as="section" colSpan={2}>
            <Heading as="h3" mb="3" size="sm">
              Evolutions
            </Heading>
            <Stack
              alignItems="center"
              direction="row"
              divider={<Icon as={BsArrowRight} width="8" border="none" />}
              overflowX="auto"
              p="3"
              width="full"
              flexWrap="nowrap"
              border="1px"
              borderColor="gray.300"
              borderRadius="2xl"
            >
              {[...new Array(8)].map((_, i) => (
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
