import { useNavigate } from "react-router-dom";
import { RiSwordFill } from "react-icons/ri";
import { IconButton, Container, Button } from "@chakra-ui/react";

/**
 * TODO: handle comparison mode
 *
 * [ ] Select/unselect pokemons
 * [ ] Display selected pokemons in a floating section
 * [ ] Go to /comparison?names=
 */
function CompareAction() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/comparison?names=pikachu&names=charizard&names=alakazam");
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
        transform="translateX(-50%)"
        zIndex="10"
        onClick={handleClick}
      >
        Compare
      </Button>
    </>
  );
}

export default CompareAction;
