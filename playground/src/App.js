import "./App.css";

import { loader } from "@monaco-editor/react";
import registerNginxSyntax from "./register-nginx-syntax";

import { Box, Flex, Text } from "rebass";

import Editor from "@monaco-editor/react";

(async () => {
  const monaco = await loader.init();
  registerNginxSyntax(monaco);
})();

function App() {
  return (
    <div className="App">
      <Flex mx={-2} height="100vh">
        <Box width={1 / 2} px={2}>
          <Editor
            theme="vs-dark"
            path="nginx.conf"
            defaultLanguage="nginx"
            defaultValue={`\
error_log stderr debug;

events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    location /mount {
      root /www/data;
    }
    location / {
      return 200 'hello world';
    }
  }
}`}
          />
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
