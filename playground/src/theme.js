import { ThemeProvider } from "theme-ui";
import { dark } from '@theme-ui/presets'

const theme = {
  ...dark,
  colors: {
    ...dark.colors,
    background: "#1e1e1e",
    divider: 'rgba(100, 100, 100, .7)',
  },
  buttons: {
    ...dark.buttons,
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      }
    },
  },
  styles: {
    ...dark.styles,
    hr: {
      color: 'divider',
    },
  }
};

export default function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
};
