import { ThemeProvider } from "@emotion/react";
import preset from "@rebass/preset";

export default function Theme(props) {
  return <ThemeProvider theme={preset}>{props.children}</ThemeProvider>
};
