import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IconButton, type IconButtonProps } from "@chakra-ui/react";

function BackButton(props: IconButtonProps) {
  const navigate = useNavigate();

  return (
    <IconButton
      {...props}
      icon={<FaArrowLeft />}
      onClick={() => navigate(-1)}
    />
  );
}

export default BackButton;
