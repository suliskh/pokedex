import { AspectRatio, Badge, Image, Link, Stack, Text } from "@chakra-ui/react";

import { PokemonItemType } from "../../@types";
import { getOfficialArtwork } from "../../utils";
import PokemonFallbackImg from "../../assets/pokemon-fallback-img.png";

type PokemonCardProps = Pick<PokemonItemType, "id" | "name" | "types">;

function PokemonCard({ id, name, types }: PokemonCardProps) {
  return (
    <Link
      href={"/pokemon/" + name}
      backgroundColor="gray.50"
      p="3"
      borderRadius="xl"
      _focusVisible={{
        boxShadow: "outline",
        transform: "scale(105%)",
      }}
      _hover={{ textDecoration: "none", transform: "scale(105%)" }}
    >
      <AspectRatio mb="3" ratio={1}>
        <Image
          alt={name}
          fallbackSrc={PokemonFallbackImg}
          src={getOfficialArtwork(id)}
        />
      </AspectRatio>
      <Text
        fontWeight="bold"
        noOfLines={2}
        overflowWrap="anywhere"
        textTransform="capitalize"
      >
        {name}
      </Text>
      <Text textTransform="capitalize" color="gray.600" fontSize="sm">
        #{id}
      </Text>
      <Stack direction="row">
        {types.map((typeName, i) => (
          <Badge key={i}>{typeName}</Badge>
        ))}
      </Stack>
    </Link>
  );
}

export default PokemonCard;
