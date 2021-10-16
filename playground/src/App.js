import "./App.css";

import { useRef, useState } from "react";

import { Box, Button, Divider, Flex, Heading, Text } from "theme-ui";
import Theme from "./theme";
import Editor from "./editor";
import Console from "./console";
import runNginx from "./nginx";
import runCurl from "./curl";

let consoleOutput = [];
function App() {
  const [consoleOutputCount, setConsoleOutputCount] = useState([]);
  const [nginxProcess, setNginxProcess] = useState(false);
  const [curlProcess, setCurlProcess] = useState(false);
  const monacoRef = useRef(null);

  function writeToConsole(message) {
    consoleOutput.push(message);
    setConsoleOutputCount(consoleOutput.length);
  }
  function clearConsole() {
    consoleOutput = [];
    setConsoleOutputCount(0);
  }

  function handleRun() {
    clearConsole();
    const nginxConf = monacoRef.current.getValue();
    const np = runNginx({
      nginxConf,
      writeToConsole,
      onExit() {
        setNginxProcess(null);
      },
      onAbort() {
        setNginxProcess(null);
      },
    });
    setNginxProcess(np);
  }

  function handleRunCurl() {
    const cp = runCurl({
      onExit() {
        setCurlProcess(null);
      },
      onAbort() {
        setCurlProcess(null);
      }
    });
    setCurlProcess(cp);
  }

  return (
    <Theme>
      <Flex className="App" sx={{ flexDirection: "column", height: "100vh" }}>
        <Flex pl="10px" sx={{ alignItems: "center" }}>
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
            <Button
              variant="primary"
              mr={2}
              onClick={handleRun}
              disabled={!!nginxProcess}
            >
              Run
            </Button>
          </Box>
        </Flex>
        <Divider />
        <Flex mx={-2} sx={{ flex: 1, alignItems: "stretch" }}>
          <Box px={2} sx={{ flex: 1 }}>
            <Editor monacoRef={monacoRef} />
          </Box>
          <Flex sx={{ flex: 1, flexDirection: "column" }}>
            <Flex sx={{ flex: "1 1 0px" }}>
              <Box>
                <Button
                  variant="secondary"
                  onClick={handleRunCurl}
                  disabled={!!curlProcess}
                >
                  Run curl
                </Button>
              </Box>
            </Flex>
            <Divider mx={-4} />
            <Box sx={{ flex: "1 1 0px", overflow: "hidden" }}>
              <Console
                consoleOutput={consoleOutput}
                consoleOutputCount={consoleOutputCount}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Theme>
  );
}

export default App;
