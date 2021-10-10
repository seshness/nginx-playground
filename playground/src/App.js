import "./App.css";

import { Box, Flex, Text } from "rebass";
import Editor from './editor';

function App() {
  return (
    <div className="App">
      <Flex mx={-2} height="100vh">
        <Box width={1 / 2} px={2}>
          <Editor />
        </Box>
        <Box width={1 / 2} px={2}>
          <Text p={1} color="background" bg="primary">
            Half
          </Text>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
