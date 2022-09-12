import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AspectRatio,
  Badge,
  Checkbox,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { PokemonType } from "../../@types";
import { getOfficialArtwork } from "../../utils";
import PokemonFallbackImg from "../../assets/pokemon-fallback-img.png";

type PokemonCardProps = Pick<PokemonType, "id" | "name"> & {
  isSelectable?: boolean;
  types?: Array<string>;
  variant?: VariantType;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type VariantType = "normal" | "compact";

function PokemonCard({
  id,
  isSelectable,
  name,
  types,
  variant = "normal",
  onChange,
}: PokemonCardProps) {
  const isNormalVariant = variant === "normal";

  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSelectable) {
      e.preventDefault();

      checkboxRef.current?.click();
    }
  };

  return (
    <Link
      as={RouterLink}
      backgroundColor="gray.50"
      borderRadius="xl"
      p={isNormalVariant ? "3" : "2"}
      position="relative"
      to={"/pokemon/" + name}
      _focusVisible={{
        boxShadow: "outline",
        transform: "scale(105%)",
      }}
      _hover={{ textDecoration: "none", transform: "scale(105%)" }}
      onClick={handleClick}
    >
      {isSelectable && (
        <Checkbox
          aria-label={name}
          m={isNormalVariant ? "3" : "2"}
          position="absolute"
          ref={checkboxRef}
          right="0"
          sx={{
            ".chakra-checkbox__control:not([data-checked])": {
              borderColor: "gray.400",
            },
          }}
          top="0"
          /**
           * Combine `id` and `name` data separated by comma as the Checkbox only support
           * string and number as value.
           * Upon consumption, we need to destructure the `id` and `name` using `.split()`
           */
          value={[id, name].join(",")}
          onChange={onChange}
        />
      )}
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
            <Badge key={i}>{typeName}</Badge>
          ))}
        </Stack>
      )}
    </Link>
  );
}

export default PokemonCard;
