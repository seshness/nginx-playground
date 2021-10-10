import "./App.css";

import { Box, Button, Divider, Flex, Heading, Text } from "theme-ui";
import Theme from "./theme";
import Editor from "./editor";
import Console from './console';

function App() {
  return (
    <Theme>
      <Flex className="App" sx={{ flexDirection: "column", height: "100vh" }}>
        <Flex
          pl="10px"
          sx={{ alignItems: "center" }}
        >
          <Flex sx={{ flexDirection: "column" }}>
            <Box>
              <Heading>Nginx playground</Heading>
            </Box>
            <Box color="#e1e1e1" bg="#1e1e1e">
              <Text fontFamily="monospace">nginx.conf</Text>
            </Box>
          </Flex>
          <Flex sx={{ flex: "1 1 auto" }} />
          <Box>
            <Button variant="primary" mr={2}>
              Run
            </Button>
          </Box>
        </Flex>
        <Divider />
        <Flex mx={-2} sx={{ flex: 1, alignItems: "stretch" }}>
          <Box px={2} sx={{ flex: 1 }}>
            <Editor />
          </Box>
          <Flex sx={{ flex: 1, flexDirection: 'column' }}>
            <Flex sx={{ flex: '1 1 auto' }} />
            <Divider mx={-4} />
            <Box sx={{ borderTop: '1px ', flex: '1 1 auto' }}>
              <Console />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Theme>
  );
}

export default App;
