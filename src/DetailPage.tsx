import { Container, Heading, IconButton, Text } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DetailPage() {
  let { name } = useParams();

  return (
    <Container>
      <IconButton
        aria-label="Back to home"
        as={Link}
        icon={<FaArrowLeft />}
        to="/"
      />
      <Heading>Detail Page</Heading>
      <Text>{name}</Text>
    </Container>
  );
}

export default DetailPage;
