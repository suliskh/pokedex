import React, { useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  useDisclosure,
  Badge,
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

import { GET_ARGS_QUERY } from "../../queries";
import { OptionType } from "../../@types";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery(GET_ARGS_QUERY);

  const {
    types,
    generations,
  }: {
    types: Array<OptionType>;
    generations: Array<OptionType>;
  } = useMemo(() => {
    let types: Array<OptionType> = [];
    let generations: Array<OptionType> = [];

    if (data?.types) {
      types = data.types.map((item: { id: string; name: string }) => ({
        label: item.name,
        value: item.name,
      }));
    }

    if (data?.generations) {
      generations = data.generations.map(
        (item: {
          name: string;
          generation_names: Array<{ name: string }>;
        }) => ({
          label: item.generation_names[0]?.name,
          value: item.name,
        })
      );
    }

    return { types, generations };
  }, [data]);

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Serialize form data
    let data = new FormData(e.currentTarget);
    let types = data.getAll("types") as Array<string>;
    let generations = data.getAll("generations") as Array<string>;

    setSearchParams({ types, generations });
    onClose();
  };

  const selectedTypes = searchParams.getAll("types") || [];
  const selectedGenerations = searchParams.getAll("generations") || [];
  const filterCount = selectedTypes.length + selectedGenerations.length;

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
          <Button leftIcon={<FaFilter />} size="sm" onClick={onOpen}>
            <Box>Filter</Box>
            {filterCount > 0 && (
              <Badge colorScheme="teal" ml="2">
                {filterCount}
              </Badge>
            )}
          </Button>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <form onSubmit={handleApply} method="POST">
            <DrawerHeader maxWidth="container.sm" mx="auto" position="relative">
              <DrawerCloseButton />
              Filter
            </DrawerHeader>

            <DrawerBody maxWidth="container.sm" mx="auto">
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
                    {types.map(({ label, value }) => (
                      <Checkbox
                        key={value}
                        name="types"
                        overflowWrap="anywhere"
                        textTransform="capitalize"
                        value={value}
                      >
                        {label}
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
                    {generations.map(({ label, value }) => (
                      <Checkbox
                        key={value}
                        name="generations"
                        overflowWrap="anywhere"
                        value={value}
                      >
                        {label}
                      </Checkbox>
                    ))}
                  </Grid>
                </CheckboxGroup>
              </Box>
            </DrawerBody>

            <DrawerFooter maxWidth="container.sm" mx="auto">
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
