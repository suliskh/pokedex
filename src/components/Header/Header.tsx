import { Container, Box, Heading, Button } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";

function Header() {
  return (
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
        <Heading as="h1" size="lg">
          Pokedex
        </Heading>
        <Button rightIcon={<FaFilter />}>Filter</Button>
      </Container>
    </Box>
  );
}

export default Header;
