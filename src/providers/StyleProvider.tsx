import { PropsWithChildren } from "react";
import {
  extendTheme,
  withDefaultColorScheme,
  ChakraProvider,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "teal" })
);

function StyleProvider({ children }: PropsWithChildren) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}

export default StyleProvider;
