import { AspectRatio, Badge, Image, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { PokemonItemType } from "../../@types";
import { getOfficialArtwork } from "../../utils";
import PokemonFallbackImg from "../../assets/pokemon-fallback-img.png";

type PokemonCardProps = Pick<PokemonItemType, "id" | "name"> & {
  types?: Array<string>;
  variant?: VariantType;
};

type VariantType = "normal" | "compact";

function PokemonCard({
  id,
  name,
  types,
  variant = "normal",
}: PokemonCardProps) {
  const isNormalVariant = variant === "normal";

  return (
    <Link
      as={RouterLink}
      backgroundColor="gray.50"
      borderRadius="xl"
      p={isNormalVariant ? "3" : "2"}
      to={"/pokemon/" + name}
      _focusVisible={{
        boxShadow: "outline",
        transform: "scale(105%)",
      }}
      _hover={{ textDecoration: "none", transform: "scale(105%)" }}
    >
      <AspectRatio mb={isNormalVariant ? "3" : "1"} ratio={1}>
        <Image
          alt={name}
          fallbackSrc={PokemonFallbackImg}
          src={getOfficialArtwork(id)}
        />
      </AspectRatio>
      <Text
        fontSize={isNormalVariant ? "base" : "sm"}
        fontWeight={isNormalVariant ? "bold" : "normal"}
        noOfLines={2}
        overflowWrap="anywhere"
        textAlign={isNormalVariant ? "left" : "center"}
        textTransform="capitalize"
      >
        {name}
      </Text>
      {isNormalVariant && (
        <Text textTransform="capitalize" color="gray.600" fontSize="sm">
          #{id}
        </Text>
      )}
      {isNormalVariant && types && types.length > 0 && (
        <Stack direction="row">
          {types.map((typeName, i) => (
            <Badge colorScheme="teal" key={i}>
              {typeName}
            </Badge>
          ))}
        </Stack>
      )}
    </Link>
  );
}

export default PokemonCard;
