import { useNavigate } from "react-router-dom";
import { RiSwordFill } from "react-icons/ri";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Image,
  Slide,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { getOfficialArtwork } from "../../utils";
import PokemonFallbackImg from "../../assets/pokemon-fallback-img.png";
import { PokemonType } from "../../@types";

type CompareActionProps = {
  pokemons: Array<Pick<PokemonType, "id" | "name">>;
  onCancel?: () => void;
  onTrigger?: () => void;
};

function CompareAction({ pokemons, onCancel, onTrigger }: CompareActionProps) {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleTrigger = () => {
    if (onTrigger) onTrigger();

    onToggle();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();

    onToggle();
  };

  const handleSubmit = () => {
    const searchParams = pokemons
      .map((pokemon) => `names=${pokemon.name}`)
      .join("&");

    navigate("/comparison?" + searchParams);
  };

  return (
    <>
      <Button
        bottom="8"
        boxShadow="xl"
        colorScheme="yellow"
        left="50%"
        leftIcon={<RiSwordFill />}
        position="fixed"
        rounded="full"
        transform="translateX(-50%)"
        onClick={handleTrigger}
      >
        Compare
      </Button>

      <Slide direction="bottom" in={isOpen}>
        <Container>
          <Box
            bgColor="white"
            mb="6"
            position="relative"
            p={{ base: "2", md: "3" }}
            rounded={{ base: "2xl", sm: "full" }}
            shadow="2xl"
            w="full"
            zIndex="20"
          >
            <Stack
              direction={{ base: "column", sm: "row" }}
              height="full"
              justifyContent={{ base: "center", sm: "space-between" }}
            >
              <Stack
                direction="row"
                alignItems="center"
                height="12"
                justifyContent="center"
              >
                <AvatarGroup size="md" max={4}>
                  {pokemons.map((pokemon) => (
                    <Avatar
                      bgColor="gray.100"
                      icon={<Image src={PokemonFallbackImg} alt="" />}
                      name={pokemon.name}
                      src={getOfficialArtwork(pokemon.id)}
                    />
                  ))}
                </AvatarGroup>
                {pokemons.length < 4 && (
                  <Text noOfLines={2} fontSize="sm">
                    Select 2 or more pokemons
                  </Text>
                )}
              </Stack>
              <Stack direction="row" alignItems="center">
                <Button
                  colorScheme="yellow"
                  w={{ base: "full", sm: "auto" }}
                  size={{ base: "sm", sm: "md" }}
                  variant="outline"
                  rounded="full"
                  flexGrow={1}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="yellow"
                  size={{ base: "sm", sm: "md" }}
                  rounded="full"
                  flexGrow={1}
                  w={{ base: "full", sm: "auto" }}
                  onClick={handleSubmit}
                >
                  Compare Now
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Slide>
    </>
  );
}

export default CompareAction;
