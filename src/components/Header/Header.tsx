import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  Heading,
} from "@chakra-ui/react";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();

  // FIXME: fetch options from PokeAPI
  const typeOptions: Array<string> = [
    "grass",
    "fire",
    "water",
    "thunder",
    "other",
    "merdeka",
    "tuwa",
    "indone",
    "asde",
  ];
  const generationOptions: Array<string> = [
    "generation-i",
    "generation-ii",
    "generation-iii",
    "generation-iv",
    "generation-v",
    "generation-vi",
    "generation-vii",
  ];

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Serialize form data
    let data = new FormData(e.currentTarget);
    let types = data.getAll("types") as Array<string>;
    let generations = data.getAll("generations") as Array<string>;

    setSearchParams({ types, generations });
    onClose();
  };

  const selectedTypes = searchParams.getAll("types");
  const selectedGenerations = searchParams.getAll("generations");

  return (
    <>
      <Box
        as="header"
        bgColor="white"
        boxShadow="base"
        position="sticky"
        top="0"
        zIndex="1"
      >
        <Container
          alignItems="center"
          display="flex"
          height="14"
          justifyContent="space-between"
        >
          <Heading as="h1" size="lg" color="teal">
            Pokédex
          </Heading>
          <Button rightIcon={<FaFilter />} size="sm" onClick={onOpen}>
            Filter
          </Button>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <form onSubmit={handleApply} method="POST">
            <DrawerHeader>Filter</DrawerHeader>

            <DrawerBody>
              <Box as="section" mb="8">
                <Heading as="h3" mb="3" size="sm">
                  Types
                </Heading>
                <CheckboxGroup defaultValue={selectedTypes}>
                  <Grid
                    columnGap="4"
                    gridTemplateColumns="repeat(3, 1fr)"
                    rowGap="2"
                  >
                    {typeOptions.map((typeName, i) => (
                      <Checkbox
                        key={typeName + i}
                        name="types"
                        overflowWrap="anywhere"
                        textTransform="capitalize"
                        value={typeName}
                        checked={true}
                      >
                        {typeName}
                      </Checkbox>
                    ))}
                  </Grid>
                </CheckboxGroup>
              </Box>
              <Box as="section" mb="8">
                <Heading as="h3" mb="3" size="sm">
                  Generations
                </Heading>
                <CheckboxGroup defaultValue={selectedGenerations}>
                  <Grid
                    columnGap="4"
                    gridTemplateColumns="repeat(2, 1fr)"
                    rowGap="2"
                  >
                    {generationOptions.map((generationName, i) => (
                      <Checkbox
                        key={generationName + i}
                        name="generations"
                        overflowWrap="anywhere"
                        textTransform="uppercase"
                        value={generationName}
                      >
                        {generationName}
                      </Checkbox>
                    ))}
                  </Grid>
                </CheckboxGroup>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose} width="full">
                Cancel
              </Button>
              <Button type="submit" width="full">
                Apply
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
