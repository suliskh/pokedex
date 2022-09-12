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
} from "@chakra-ui/react";

import BackButton from "./components/BackButton";

import { getOfficialArtwork } from "./utils";

function ComparisonPage() {
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
          <Table variant="simple" maxWidth="full" overflowX="auto" border="0">
            <Thead backgroundColor="gray.100">
              <Tr>
                <Th></Th>
                <Th>
                  <Box boxSize="20">
                    <Image src={getOfficialArtwork("1")} alt="Bulbasaur" />
                  </Box>
                  <Text fontWeight="bold">Bulbasaur</Text>
                </Th>
                <Th>
                  <Box boxSize="20">
                    <Image src={getOfficialArtwork("2")} alt="Bulbasaur" />
                  </Box>
                  <Text fontWeight="bold">Bulbasaur</Text>
                </Th>
                <Th>
                  <Box boxSize="20">
                    <Image src={getOfficialArtwork("3")} alt="Bulbasaur" />
                  </Box>
                  <Text fontWeight="bold">Bulbasaur</Text>
                </Th>
                <Th>
                  <Box boxSize="20">
                    <Image src={getOfficialArtwork("4")} alt="Bulbasaur" />
                  </Box>
                  <Text fontWeight="bold">Bulbasaur</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
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
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
              </Tr>
              <Tr>
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
                <Td>centimetres (cm)</Td>
                <Td>30.48</Td>
                <Td>30.48</Td>
                <Td>30.48</Td>
              </Tr>
              <Tr>
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
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
              </Tr>
              <Tr>
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
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>0.91444</Td>
              </Tr>
              <Tr>
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
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
                <Td>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ComparisonPage;
