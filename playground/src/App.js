import "./App.css";

import { Box, Flex, Heading, Text } from "rebass";
import Theme from "./theme";
import Editor from "./editor";

function App() {
  return (
    <Theme>
      <Flex className="App" flexDirection="column" height="100vh">
        <Flex pl="10px" color="#e1e1e1" bg="#1e1e1e" height="48px" flexDirection="column">
          <Box>
            <Heading>Nginx playground</Heading>
          </Box>
          <Box color="#e1e1e1" bg="#1e1e1e">
            <Text fontFamily='monospace'>nginx.conf</Text>
          </Box>
        </Flex>
        <Flex mx={-2} flex={1}>
          <Box width={1 / 2} px={2}>
            <Editor />
          </Box>
          <Box width={1 / 2} px={2}>
            <Text p={1} color="background" bg="primary">
              Half
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Theme>
  );
}

export default App;
